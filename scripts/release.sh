#!/bin/bash
set -e

BUMP=${1:-patch}
echo "🔖 Bumping $BUMP version..."
npm version $BUMP --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

git add package.json
git commit -m "chore: release v$VERSION"
git tag "v$VERSION"

echo "✅ Tagged v$VERSION — ahora haz: git push && git push --tags"