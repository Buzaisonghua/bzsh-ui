#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm update:version

pnpm build

cd dist/bzsh-ui
npm publish --provenance
cd -

echo "✅ Publish completed"

