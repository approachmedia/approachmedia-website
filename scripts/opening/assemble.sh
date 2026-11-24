#!/bin/bash
# assemble.sh <dir with A.mp4 B.mp4> <3d frames dir> <out.mp4>
set -e
D=$1; F=$2; OUT=$3
A=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $D/A.mp4)
B=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $D/B.mp4)
o1=$(python3 -c "print(round($A-0.15,3))")
o2=$(python3 -c "print(round($A-0.15+$B-0.25,3))")
ffmpeg -v error -y -i $D/A.mp4 -i $D/B.mp4 -framerate 24 -i $F/f%04d.png -filter_complex \
"[0:v]fps=24,settb=AVTB,format=yuv420p[a];[1:v]fps=24,settb=AVTB,format=yuv420p[b];\
[2:v]fps=24,settb=AVTB,noise=alls=4:allf=t,format=yuv420p[c];\
[a][b]xfade=transition=fadewhite:duration=0.15:offset=$o1[ab];\
[ab][c]xfade=transition=fadewhite:duration=0.25:offset=$o2[v]" \
-map "[v]" -an -c:v libx264 -crf 12 -preset medium -pix_fmt yuv420p $OUT
ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT
