#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/seanstone35/seanstone35.github.io.git"
DEFAULT_BRANCH="main"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script from the repository root." >&2
  exit 1
fi

current_branch=$(git branch --show-current)
if [[ -z "$current_branch" ]]; then
  echo "Cannot determine current branch; make sure you are on a branch." >&2
  exit 1
fi

echo "Verifying working tree is clean..."
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Please commit or stash changes before publishing." >&2
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  origin_url=$(git remote get-url origin)
  echo "Using existing origin remote: $origin_url"
else
  echo "Adding origin remote pointing to $REPO_URL"
  git remote add origin "$REPO_URL"
fi

if [[ $(git remote get-url origin) =~ ^git@github\.com: ]]; then
  cat <<'EOF'
WARNING: The origin remote is using the SSH URL.
If you do not have SSH keys configured for your GitHub account inside this environment, the push will fail.
Either configure SSH or run:
  git remote set-url origin https://github.com/seanstone35/seanstone35.github.io.git
and rerun this script.
EOF
fi

if [[ "$current_branch" != "$DEFAULT_BRANCH" ]]; then
  echo "Pushing current branch '$current_branch' to '$DEFAULT_BRANCH' on origin..."
  git push origin "$current_branch:$DEFAULT_BRANCH"
else
  echo "Pushing '$DEFAULT_BRANCH' to origin..."
  git push origin "$DEFAULT_BRANCH"
fi

echo "Done. Visit https://github.com/seanstone35/seanstone35.github.io/settings/pages to ensure Pages is enabled."