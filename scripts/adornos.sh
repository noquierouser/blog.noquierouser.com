#!/usr/bin/env bash
# Regenera las fuentes de adornos en public/fonts/:
#   adornos-girlmode.woff2  ♡ ♥ ★ ☆ ♪ ※ de Gamja Flower
#   adornos-boymode.woff2   los mismos, de Hachi Maru Pop
#   adornos.woff2           el resto (✧ ✶ ✿ …) de Noto Sans Symbols 2, de respaldo
# Necesita fonttools y brotli (pip install fonttools brotli). Si agregas un símbolo,
# súmalo aquí y al unicode-range correspondiente en css/fonts.css.
set -euo pipefail
cd "$(dirname "$0")/.."

MANUSCRITOS="♡♥★☆♪※"
RESPALDO="✧✦✶✷✸✹⋆✿❀❁✎✏✐✂☕☀☁☂✉✔✘➜➝➔❤❥"

# Las fuentes completas pesan varios MB: se descargan una vez a .cache/
mkdir -p .cache/fuentes
descargar() {
	[ -f ".cache/fuentes/$2" ] || curl -sfL -o ".cache/fuentes/$2" "https://raw.githubusercontent.com/google/fonts/main/ofl/$1/$2"
}
descargar gamjaflower GamjaFlower-Regular.ttf
descargar hachimarupop HachiMaruPop-Regular.ttf

recortar() {
	pyftsubset "$1" --text="$2" --output-file="$3" \
		--flavor=woff2 --layout-features='' --no-hinting --desubroutinize
	echo "$3: $(python3 -c "import sys; print(', '.join(f'U+{ord(c):04X}' for c in sys.argv[1]))" "$2")"
}

recortar .cache/fuentes/GamjaFlower-Regular.ttf "$MANUSCRITOS" public/fonts/adornos-girlmode.woff2
recortar .cache/fuentes/HachiMaruPop-Regular.ttf "$MANUSCRITOS" public/fonts/adornos-boymode.woff2
recortar node_modules/@fontsource/noto-sans-symbols-2/files/noto-sans-symbols-2-symbols-400-normal.woff2 "$RESPALDO" public/fonts/adornos.woff2
