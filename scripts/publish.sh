#!/bin/sh

set -e

pnpm i --frozen-lockfile


pnpm build

cd dist/bzsh-ui
npm publish --provenance
cd -

echo "✅ Publish completed"

