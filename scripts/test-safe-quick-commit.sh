#!/usr/bin/env bash
set -eu
script="$(cd "$(dirname "$0")" && pwd)/safe-quick-commit.sh"
temp=$(mktemp -d)
trap 'rm -rf "$temp"' EXIT
export log="$temp/log" state="$temp/state"
git() {
  printf '%s\n' "git $*" >> "$log"
  case "$1 $2" in
    'branch --show-current') cat "$state";;
    'status --porcelain') if [[ "$scenario" != empty && ! -f "$state.done" ]]; then echo ' M content'; fi;;
    'rev-parse --is-inside-work-tree') echo true;;
    'rev-parse origin/main') if [[ $scenario == outdated ]]; then echo old; else echo sha; fi;;
    'rev-parse '*) echo sha;;
    'ls-files --others') if [[ $scenario == blocked ]]; then printf 'private dir/.env.local\0'; fi;;
    'diff --cached') case "$*" in
      *--quiet*) return 1;;
      *--name-only*) if [[ $scenario == rename ]]; then printf 'scripts/old name\0new name\0'; else printf 'image 2027.png\0'; fi;;
      esac;;
    'switch -c') echo "$3" > "$state";;
    'switch main') echo main > "$state";;
    'commit -m') touch "$state.done";;
  esac
  return 0
}
gh() {
  echo "gh $*" >> "$log"
  case "$1 $2" in
    'pr create') [[ $scenario != createfail ]] || return 1; echo https://example.test/pull/1;;
    'pr view') if [[ "$*" == *statusCheckRollup* ]]; then echo 2; elif [[ $scenario == mergefail ]]; then echo OPEN; else echo MERGED; fi;;
    'pr checks') [[ $scenario != checkfail ]] || return 1;;
  esac
}
npm() { echo "npm $*" >> "$log"; }
sleep() { :; }
export -f git gh npm sleep
for scenario in empty wrong outdated blocked rename staged success createfail checkfail mergefail; do
  export scenario
  echo main > "$state"; rm -f "$state.done"; : > "$log"
  [[ $scenario != wrong ]] || echo feature > "$state"
  result=0; bash "$script" > "$temp/out" 2>&1 || result=$?
  case "$scenario" in
    empty) [[ $result == 0 ]] && ! grep -q 'git add' "$log" || exit 1;;
    staged|success) [[ $result == 0 ]] && grep -q 'git add --all' "$log" && grep -q 'git branch -d' "$log" && grep -q 'git merge --ff-only' "$log" || { cat "$temp/out"; exit 1; };;
    *) [[ $result != 0 ]] && ! grep -q 'git branch -d' "$log" || exit 1;;
  esac
  echo "PASS $scenario"
done
