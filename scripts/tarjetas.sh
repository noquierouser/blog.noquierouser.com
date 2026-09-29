#!/usr/bin/env bash
# Regenera las imágenes para redes sociales (public/img/tarjeta-{girlmode,boymode}.png)
# a partir de content/tarjeta.njk. Necesita Firefox.
set -euo pipefail
cd "$(dirname "$0")/.."

PUERTO=8765
npx @11ty/eleventy --serve --port "$PUERTO" --quiet >/dev/null 2>&1 &
SERVIDOR=$!
PERFIL=$(mktemp -d)
trap 'kill "$SERVIDOR" 2>/dev/null; rm -rf "$PERFIL"' EXIT

until curl -sf "http://localhost:$PUERTO/tarjeta/" >/dev/null; do sleep 0.5; done

mkdir -p public/img
for modo in girlmode boymode; do
	firefox --headless --no-remote --profile "$PERFIL" --window-size=1200,630 \
		--screenshot "$PWD/public/img/tarjeta-$modo.png" "http://localhost:$PUERTO/tarjeta/#$modo" >/dev/null 2>&1
	echo "public/img/tarjeta-$modo.png"
done
