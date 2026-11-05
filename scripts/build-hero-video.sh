#!/usr/bin/env bash
# Builds the home-page hero background video from the raw iPhone footage
# ("Video Water Flow to new canal*.MOV").
#
#   scripts/build-hero-video.sh "/path/to/TCS Videos"
#
# Output (public/hero/):
#   canal-hero-1080.webm   VP9, desktop (Chrome / Edge / Firefox)
#   canal-hero-1080.mp4    H.264, desktop fallback (Safari)
#   canal-hero-mobile.mp4  H.264, 608x1080 center crop for phones
#   canal-hero-poster.jpg  first frame, shown before playback and for
#                          prefers-reduced-motion
#
# The source clips are HLG HDR (BT.2020). VideoToolbox (scale_vt) does the
# HDR -> SDR BT.709 tone-map; without it the footage comes out grey and flat.
# Requires macOS + Homebrew ffmpeg (brew install ffmpeg).
#
# To swap a shot: edit CUTS below (source file suffix + start second) and rerun.

set -euo pipefail

SRC_DIR="${1:?usage: $0 <dir with the .MOV files>}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/hero"
# Set HERO_WORK_DIR to keep the intermediate shots + master for inspection.
if [[ -n "${HERO_WORK_DIR:-}" ]]; then WORK="$HERO_WORK_DIR"; mkdir -p "$WORK"
else WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT; fi

SEG=4.0   # seconds pulled per shot (includes the dissolve overlap)
FADE=0.6  # dissolve length between shots

# "<file suffix>:<start seconds>"  (suffix "" = "Video Water Flow to new canal.MOV")
CUTS=(
  "16:4.5"    # wide: new canal running toward the triple box culverts
  "15:4.5"    # excavator digging out the plug, water churning
  ":0.2"      # bucket pulls the last of the plug, water breaks through
  ":48.0"     # water gushing through the breach
  "7:80.0"    # water racing down the new canal, excavator on the berm
  "16:60.0"   # excavator working the bank, steady wide
  "8:19.0"    # flow reaching the box culvert headwall
  "15:72.8"   # finished canal, long view down the tree line
)

src_for() {
  if [[ -z "$1" ]]; then echo "$SRC_DIR/Video Water Flow to new canal.MOV"
  else echo "$SRC_DIR/Video Water Flow to new canal-$1.MOV"; fi
}

echo "==> Cutting ${#CUTS[@]} shots (tone-mapped to SDR, 1080p30)"
i=0
for cut in "${CUTS[@]}"; do
  suffix="${cut%%:*}"; start="${cut##*:}"
  ffmpeg -v error -y \
    -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld \
    -ss "$start" -t "$SEG" -i "$(src_for "$suffix")" -an \
    -vf "scale_vt=w=1920:h=1080:color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,hwdownload,format=p010le,format=yuv420p,fps=30,setpts=PTS-STARTPTS" \
    -c:v libx264 -preset veryfast -crf 8 \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
    "$WORK/seg$i.mp4"
  i=$((i + 1))
done

# Dissolve chain: shot1 .. shot8, then shot1 again. Trimming the result to
# [FADE, FADE + N*(SEG-FADE)) makes the last dissolve land exactly on the
# first frame, so the loop has no visible seam.
N=${#CUTS[@]}
inputs=(); for ((k = 0; k < N; k++)); do inputs+=(-i "$WORK/seg$k.mp4"); done
inputs+=(-i "$WORK/seg0.mp4")

graph=""; prev="[0:v]"
for ((k = 1; k <= N; k++)); do
  offset=$(awk "BEGIN{printf \"%.3f\", $k*($SEG-$FADE)}")
  graph+="${prev}[$k:v]xfade=transition=fade:duration=$FADE:offset=$offset[x$k];"
  prev="[x$k]"
done
loop_len=$(awk "BEGIN{printf \"%.3f\", $N*($SEG-$FADE)}")
graph+="${prev}trim=start=$FADE:duration=$loop_len,setpts=PTS-STARTPTS,format=yuv420p[out]"

echo "==> Assembling ${loop_len}s seamless loop"
ffmpeg -v error -y "${inputs[@]}" -filter_complex "$graph" -map "[out]" \
  -c:v libx264 -preset veryfast -crf 8 -r 30 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  "$WORK/master.mp4"

COLOR=(-color_primaries bt709 -color_trc bt709 -colorspace bt709)
mkdir -p "$OUT_DIR"

# Rippling water + dirt texture is close to worst-case for a video encoder:
# constant-quality modes land at 20MB+. A light temporal denoise plus
# two-pass target bitrates keeps the whole loop to a few MB, and the
# softening is invisible under the hero's navy scrim.
DENOISE="hqdn3d=2:1.5:6:6"

# two_pass <bitrate> <maxrate> <extra -vf> <out> <codec args...>
two_pass() {
  local br=$1 max=$2 vf=$3 out=$4; shift 4
  local log="$WORK/$(basename "$out")"
  ffmpeg -v error -y -i "$WORK/master.mp4" -an -vf "$vf" "$@" -g 60 \
    -b:v "$br" -pass 1 -passlogfile "$log" -f null /dev/null
  ffmpeg -v error -y -i "$WORK/master.mp4" -an -vf "$vf" "$@" -g 60 \
    -b:v "$br" -maxrate "$max" -bufsize "$max" -pass 2 -passlogfile "$log" \
    -pix_fmt yuv420p "${COLOR[@]}" "$out"
}

echo "==> Encoding web versions"
pids=()
two_pass 1800k 3000k "$DENOISE" "$OUT_DIR/canal-hero-1080.webm" \
  -c:v libvpx-vp9 -row-mt 1 -deadline good -cpu-used 2 & pids+=($!)
two_pass 2500k 4000k "$DENOISE" "$OUT_DIR/canal-hero-1080.mp4" \
  -c:v libx264 -preset slow -profile:v high -level 4.1 -movflags +faststart & pids+=($!)
# Phones only ever show a center slice of the frame (object-cover on a tall
# hero), so they get a 9:16 center crop at full 1080 height: same framing,
# ~1.5x sharper than a downscaled 720p, and a smaller file.
two_pass 1100k 1800k "$DENOISE,crop=608:1080" "$OUT_DIR/canal-hero-mobile.mp4" \
  -c:v libx264 -preset slow -profile:v high -level 4.0 -movflags +faststart & pids+=($!)
for pid in "${pids[@]}"; do wait "$pid"; done  # fail the build if any encode failed

# Poster = the loop's first frame, so the swap from image to video is seamless.
ffmpeg -v error -y -i "$WORK/master.mp4" -frames:v 1 -q:v 3 \
  "$OUT_DIR/canal-hero-poster.jpg"

echo "==> Done"
ls -lh "$OUT_DIR"/canal-hero-*
