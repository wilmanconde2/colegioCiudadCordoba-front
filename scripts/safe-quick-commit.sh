#!/usr/bin/env bash

set -euo pipefail

COMMIT_MESSAGE="chore: apply minor content update"
BASE_BRANCH="main"

echo "== Safe Quick Commit =="

# Verificar herramientas
command -v git >/dev/null || {
    echo "ERROR: Git no está disponible."
    exit 1
}

command -v gh >/dev/null || {
    echo "ERROR: GitHub CLI (gh) no está disponible."
    exit 1
}

# Verificar repositorio
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
    echo "ERROR: No estás dentro de un repositorio Git."
    exit 1
}

# Este flujo debe iniciarse desde main
CURRENT_BRANCH="$(git branch --show-current)"

if [[ "$CURRENT_BRANCH" != "$BASE_BRANCH" ]]; then
    echo "ERROR: Ejecuta este script desde '$BASE_BRANCH'."
    echo "Rama actual: $CURRENT_BRANCH"
    exit 1
fi

# Verificar cambios
if [[ -z "$(git status --porcelain)" ]]; then
    echo "No hay cambios para publicar."
    exit 0
fi

# Bloquear archivos sensibles o estructurales
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

# Verificar que main esté sincronizada
echo
echo "Verificando origin/main..."
git fetch origin "$BASE_BRANCH" --quiet

LOCAL="$(git rev-parse "$BASE_BRANCH")"
REMOTE="$(git rev-parse "origin/$BASE_BRANCH")"

if [[ "$LOCAL" != "$REMOTE" ]]; then
    echo "ERROR: main local no coincide con origin/main."
    echo "Sincroniza el repositorio antes de continuar."
    exit 1
fi

echo
echo "Cambios detectados:"
git status --short

echo
git diff --stat

# Quality gates locales
echo
echo "Ejecutando lint..."
npm run lint

echo
echo "Ejecutando build..."
npm run build

echo
echo "Verificando diff..."
git diff --check

# Crear rama temporal
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
QUICK_BRANCH="quick/minor-update-$TIMESTAMP"

echo
echo "Creando rama: $QUICK_BRANCH"
git switch -c "$QUICK_BRANCH"

# Stage
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

# Commit y push
git commit -m "$COMMIT_MESSAGE"

echo
echo "Publicando rama..."
git push -u origin "$QUICK_BRANCH"

# Crear PR
echo
echo "Creando Pull Request..."

PR_URL="$(gh pr create \
    --base "$BASE_BRANCH" \
    --head "$QUICK_BRANCH" \
    --title "$COMMIT_MESSAGE" \
    --body "Automated minor content update created by safe-quick-commit.")"

echo
echo "PR creado:"
echo "$PR_URL"

# Solicitar auto-merge
echo
echo "Configurando auto-merge..."

gh pr merge "$QUICK_BRANCH" --auto --squash

echo
echo "OK: cambio publicado."
echo "GitHub hará merge automáticamente cuando los quality gates sean aprobados."