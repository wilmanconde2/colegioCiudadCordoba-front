#!/usr/bin/env bash

set -euo pipefail

COMMIT_MESSAGE="chore: apply minor content update"
BRANCH="main"

echo "== Safe Quick Commit =="

# 1. Verificar que estamos dentro de un repositorio Git
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
    echo "ERROR: No estás dentro de un repositorio Git."
    exit 1
}

# 2. Verificar rama
CURRENT_BRANCH="$(git branch --show-current)"

if [[ "$CURRENT_BRANCH" != "$BRANCH" ]]; then
    echo "ERROR: Este flujo solo puede ejecutarse desde '$BRANCH'."
    echo "Rama actual: $CURRENT_BRANCH"
    exit 1
fi

# 3. Verificar que existan cambios
if [[ -z "$(git status --porcelain)" ]]; then
    echo "No hay cambios para publicar."
    exit 0
fi

# 4. Bloquear archivos sensibles / estructurales
BLOCKED_PATTERN='(^|/)(\.env($|\.)|package\.json$|package-lock\.json$|netlify\.toml$|vite\.config\.[^/]+$)|^\.github/|^netlify/functions/'

CHANGED_FILES="$(git status --porcelain | sed 's/^...//')"

while IFS= read -r file; do
    if [[ "$file" =~ $BLOCKED_PATTERN ]]; then
        echo
        echo "ERROR: Cambio no permitido por el flujo rápido:"
        echo "  $file"
        echo
        echo "Usa el flujo normal con branch + revisión."
        exit 1
    fi
done <<< "$CHANGED_FILES"

# 5. Comprobar estado remoto
echo
echo "Actualizando información de origin..."
git fetch origin main --quiet

LOCAL="$(git rev-parse main)"
REMOTE="$(git rev-parse origin/main)"
BASE="$(git merge-base main origin/main)"

if [[ "$LOCAL" != "$REMOTE" ]]; then
    if [[ "$LOCAL" == "$BASE" ]]; then
        echo "ERROR: Tu main está detrás de origin/main."
    elif [[ "$REMOTE" == "$BASE" ]]; then
        echo "ERROR: Tu main contiene commits todavía no publicados."
    else
        echo "ERROR: main y origin/main han divergido."
    fi

    echo "Sincroniza el repositorio antes de usar el flujo rápido."
    exit 1
fi

# 6. Mostrar exactamente qué se modificó
echo
echo "Archivos modificados:"
git status --short

echo
echo "Resumen:"
git diff --stat

# 7. Validaciones
echo
echo "Ejecutando lint..."
npm run lint

echo
echo "Ejecutando build..."
npm run build

echo
echo "Verificando whitespace..."
git diff --check

# 8. Stage
echo
echo "Preparando cambios..."
git add --all

# 9. Protección adicional
if git diff --cached --quiet; then
    echo "No hay cambios para hacer commit."
    exit 0
fi

echo
echo "Cambios que entrarán al commit:"
git diff --cached --stat

# 10. Commit
echo
echo "Creando commit..."
git commit -m "$COMMIT_MESSAGE"

# 11. Push
echo
echo "Publicando en origin/main..."
git push origin main

echo
echo "OK: cambio publicado correctamente."