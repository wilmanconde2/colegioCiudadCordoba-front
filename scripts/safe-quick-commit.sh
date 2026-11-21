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

paths=$(mktemp)
trap 'rm -f "$paths"' EXIT
trap 'echo "Operación interrumpida. Revisa git status y el PR antes de reintentar." >&2' ERR
validate_paths() {
    while IFS= read -r -d '' file; do
        if [[ "$file" =~ $BLOCKED_PATTERN || "$file" =~ (^|/)(\.npmrc|\.aws|\.ssh|credentials)(/|$)|\.(pem|key|p12|pfx)$ ]]; then
            printf 'Ruta bloqueada: %q\n' "$file" >&2
            return 1
        fi
    done < "$paths"
}
git diff --cached --no-renames --name-only -z > "$paths"
git diff --no-renames --name-only -z >> "$paths"
git ls-files --others --exclude-standard -z >> "$paths"
validate_paths

# -------------------------------------------------------
# Verificar main
# -------------------------------------------------------

echo
echo "Verificando origin/$BASE_BRANCH..."

git fetch origin "$BASE_BRANCH" --quiet

LOCAL="$(git rev-parse "$BASE_BRANCH")"
REMOTE="$(git rev-parse "origin/$BASE_BRANCH")"

if [[ "$LOCAL" != "$REMOTE" ]]; then
    echo "ERROR: $BASE_BRANCH local no coincide con origin/$BASE_BRANCH."
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
echo "Verificando diff en archivos de texto..."

git diff --check -- \
    ':(exclude)*.pdf' \
    ':(exclude)*.png' \
    ':(exclude)*.jpg' \
    ':(exclude)*.jpeg' \
    ':(exclude)*.gif' \
    ':(exclude)*.webp' \
    ':(exclude)*.ico'

# -------------------------------------------------------
# Crear rama temporal
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
git diff --cached --no-renames --name-only -z > "$paths"
validate_paths
git diff --cached --check

if git diff --cached --quiet; then
    echo "No hay cambios para hacer commit."
    git switch "$BASE_BRANCH"
    git branch -d "$QUICK_BRANCH"
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

PR_NUMBER="$PR_URL"

echo
echo "PR #$PR_NUMBER creado:"
echo "$PR_URL"

# -------------------------------------------------------
# Auto-merge
# -------------------------------------------------------

echo
echo "Activando auto-merge..."

git_head=$(git rev-parse HEAD)
if ! gh pr merge "$PR_NUMBER" --auto --squash --match-head-commit "$git_head"; then
    [[ $(gh pr view "$PR_NUMBER" --json state --jq .state) == MERGED ]] || exit 1
fi

echo
echo "Auto-merge activado."
echo "Esperando quality gates de GitHub..."

# -------------------------------------------------------
# Esperar checks
# -------------------------------------------------------

for attempt in {1..30}; do
    checks=$(gh pr view "$PR_NUMBER" --json statusCheckRollup --jq '.statusCheckRollup | length')
    [[ "$checks" != 0 ]] && break
    sleep 2
done
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
# Esperar confirmación del merge
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
    echo "ERROR: GitHub todavía no confirmó el merge."
    echo "Revisa:"
    echo "$PR_URL"
    exit 1
fi

# -------------------------------------------------------
# Sincronizar y limpiar
# -------------------------------------------------------

echo
echo "PR fusionado correctamente."
echo "Sincronizando y limpiando entorno local..."

[[ -z $(git status --porcelain) && $(git branch --show-current) == "$QUICK_BRANCH" && $(git rev-parse HEAD) == "$git_head" ]] || exit 1
git switch "$BASE_BRANCH"

# Actualizar main
git fetch origin "$BASE_BRANCH" --quiet
git merge --ff-only "origin/$BASE_BRANCH"

# Eliminar solo la rama temporal local publicada y ya fusionada.
git branch -d "$QUICK_BRANCH" || echo "Rama local conservada: $QUICK_BRANCH"

# Resultado
# -------------------------------------------------------

echo
echo "======================================"
echo "OK: cambio publicado correctamente."
echo "PR #$PR_NUMBER fusionado."
echo "$BASE_BRANCH está actualizado."
echo "Limpieza local finalizada."

echo
echo "Working tree:"
git status --short
echo
echo "Últimos commits:"
git log --oneline --graph --decorate -8
echo "======================================"