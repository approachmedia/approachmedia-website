#!/bin/bash
# assemble2.sh <2d dir> <3d frames (supersampled)> <plate png (2x)> <W> <H> <out.mp4>
# Imagine -> flash -> Create -> flash -> 3D -> dissolve -> the official logo on Soft White, slow push.
set -e
D=$1; F=$2; PL=$3; W=$4; H=$5; OUT=$6
A=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $D/A.mp4)
B=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $D/B.mp4)
NC=$(ls $F | wc -l); C=$(python3 -c "print($NC/24)")
PD=2.4; NP=$(python3 -c "print(int($PD*24))")
o1=$(python3 -c "print(round($A-0.15,4))")
o2=$(python3 -c "print(round($A-0.15+$B-0.25,4))")
o3=$(python3 -c "print(round($A-0.15+$B-0.25+$C-0.7,4))")
ffmpeg -v error -y -i $D/A.mp4 -i $D/B.mp4 -framerate 24 -i $F/f%04d.png -loop 1 -framerate 24 -t $(python3 -c "print($PD+0.2)") -i $PL -filter_complex \
"[0:v]fps=24,settb=AVTB,format=yuv420p[a];[1:v]fps=24,settb=AVTB,format=yuv420p[b];\
[2:v]scale=$W:$H:flags=lanczos,fps=24,settb=AVTB,format=yuv420p[c];\
[3:v]zoompan=z='1+0.025*on/$NP':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=24,trim=end_frame=$NP,setpts=PTS-STARTPTS,settb=AVTB,format=yuv420p[p];\
[a][b]xfade=transition=fadewhite:duration=0.15:offset=$o1[ab];\
[ab][c]xfade=transition=fadewhite:duration=0.25:offset=$o2[abc];\
[abc][p]xfade=transition=fade:duration=0.7:offset=$o3[v]" \
-map "[v]" -an -c:v libx264 -crf 10 -preset medium -pix_fmt yuv420p $OUT
ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT
