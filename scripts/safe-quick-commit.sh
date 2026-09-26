#!/usr/bin/env bash

set -euo pipefail

COMMIT_MESSAGE="chore: apply minor content update"
BASE_BRANCH="main"

echo "== Safe Quick Commit =="

# -------------------------------------------------------
# Preflight
# -------------------------------------------------------

command -v git >/dev/null || {
    echo "ERROR: Git no está disponible."
    exit 1
}

command -v gh >/dev/null || {
    echo "ERROR: GitHub CLI (gh) no está disponible."
    exit 1
}

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
    echo "ERROR: No estás dentro de un repositorio Git."
    exit 1
}

CURRENT_BRANCH="$(git branch --show-current)"

if [[ "$CURRENT_BRANCH" != "$BASE_BRANCH" ]]; then
    echo "ERROR: Ejecuta este script desde '$BASE_BRANCH'."
    echo "Rama actual: $CURRENT_BRANCH"
    exit 1
fi

if [[ -z "$(git status --porcelain)" ]]; then
    echo "No hay cambios para publicar."
    exit 0
fi

# -------------------------------------------------------
# Protección de archivos sensibles / estructurales
# -------------------------------------------------------

BLOCKED_PATTERN='(^|/)(\.env($|\.)|package\.json$|package-lock\.json$|netlify\.toml$|vite\.config\.[^/]+$)|^\.github/|^netlify/functions/|^scripts/'

CHANGED_FILES="$(git status --porcelain | sed 's/^...//')"

while IFS= read -r file; do
    if [[ "$file" =~ $BLOCKED_PATTERN ]]; then
        echo
        echo "ERROR: Archivo no permitido en el flujo rápido:"
        echo "  $file"
        echo
        echo "Usa el flujo normal para este cambio."
        exit 1
    fi
done <<< "$CHANGED_FILES"

# -------------------------------------------------------
# Verificar main
# -------------------------------------------------------

echo
echo "Verificando origin/main..."

git fetch origin "$BASE_BRANCH" --quiet

LOCAL="$(git rev-parse "$BASE_BRANCH")"
REMOTE="$(git rev-parse "origin/$BASE_BRANCH")"

if [[ "$LOCAL" != "$REMOTE" ]]; then
    echo "ERROR: main local no coincide con origin/main."
    echo "Ejecuta: git pull --ff-only"
    exit 1
fi

# -------------------------------------------------------
# Mostrar cambios
# -------------------------------------------------------

echo
echo "Cambios detectados:"
git status --short

echo
echo "Resumen:"
git diff --stat

# -------------------------------------------------------
# Quality gates locales
# -------------------------------------------------------

echo
echo "Ejecutando lint..."
npm run lint

echo
echo "Ejecutando build..."
npm run build

echo
echo "Verificando diff..."
git diff --check

# -------------------------------------------------------
# Crear branch
# -------------------------------------------------------

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
QUICK_BRANCH="quick/minor-update-$TIMESTAMP"

echo
echo "Creando rama:"
echo "$QUICK_BRANCH"

git switch -c "$QUICK_BRANCH"

# -------------------------------------------------------
# Commit
# -------------------------------------------------------

git add --all

if git diff --cached --quiet; then
    echo "No hay cambios para hacer commit."
    git switch "$BASE_BRANCH"
    git branch -D "$QUICK_BRANCH"
    exit 0
fi

echo
echo "Contenido del commit:"
git diff --cached --stat

git commit -m "$COMMIT_MESSAGE"

# -------------------------------------------------------
# Push
# -------------------------------------------------------

echo
echo "Publicando rama..."

git push -u origin "$QUICK_BRANCH"

# -------------------------------------------------------
# Pull Request
# -------------------------------------------------------

echo
echo "Creando Pull Request..."

PR_URL="$(gh pr create \
    --base "$BASE_BRANCH" \
    --head "$QUICK_BRANCH" \
    --title "$COMMIT_MESSAGE" \
    --body "Automated minor content update created by safe-quick-commit.")"

PR_NUMBER="$(gh pr view "$QUICK_BRANCH" --json number --jq '.number')"

echo
echo "PR #$PR_NUMBER creado:"
echo "$PR_URL"

# -------------------------------------------------------
# Auto-merge
# -------------------------------------------------------

echo
echo "Activando auto-merge..."

gh pr merge "$PR_NUMBER" --auto --squash

echo
echo "Auto-merge activado."
echo "Esperando quality gates de GitHub..."

# -------------------------------------------------------
# Esperar checks
# -------------------------------------------------------

if ! gh pr checks "$PR_NUMBER" --watch --fail-fast; then
    echo
    echo "ERROR: Uno o más quality gates fallaron."
    echo "El PR #$PR_NUMBER permanece abierto para revisión."
    echo
    echo "PR:"
    echo "$PR_URL"
    exit 1
fi

# -------------------------------------------------------
# Esperar confirmación efectiva del merge
# -------------------------------------------------------

echo
echo "Quality gates aprobados."
echo "Esperando confirmación del merge..."

for attempt in {1..30}; do
    PR_STATE="$(gh pr view "$PR_NUMBER" --json state --jq '.state')"

    if [[ "$PR_STATE" == "MERGED" ]]; then
        break
    fi

    sleep 2
done

PR_STATE="$(gh pr view "$PR_NUMBER" --json state --jq '.state')"

if [[ "$PR_STATE" != "MERGED" ]]; then
    echo
    echo "El PR pasó los checks, pero GitHub todavía no confirmó el merge."
    echo "Revisa:"
    echo "$PR_URL"
    exit 1
fi

# -------------------------------------------------------
# Restaurar entorno local
# -------------------------------------------------------

echo
echo "PR fusionado correctamente."
echo "Sincronizando entorno local..."

git switch "$BASE_BRANCH"
git fetch origin "$BASE_BRANCH" --prune
git merge --ff-only "origin/$BASE_BRANCH"

# Eliminar branch local si todavía existe
if git show-ref --verify --quiet "refs/heads/$QUICK_BRANCH"; then
    git branch -D "$QUICK_BRANCH"
fi

echo
echo "======================================"
echo "OK: cambio publicado correctamente."
echo "PR #$PR_NUMBER fusionado."
echo "main está actualizado."
echo "Working tree:"
git status --short

echo "======================================"
