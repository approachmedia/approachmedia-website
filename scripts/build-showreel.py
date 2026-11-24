"""
Cut the home page showreel (public/home-intro/) from the owner's own build
clips. Run from the repo root:

  python3 scripts/build-showreel.py /tmp/master.mp4

then encode the web versions from that master (commands at the bottom).
Eleven shots, one grade, a slow push on each, mixed transitions, and shot
one split so the last frame flows back into the first (a seamless loop).
No audio and no burnt-in text: the headline is live text on the page.
"""
import subprocess, sys
P = 'public/services-flow/'
SRC = {
 1: P+'award-winning-stall-design-and-fabrication-agency-01.mp4',
 3: P+'award-winning-stall-design-and-fabrication-agency-03.mp4',
 4: P+'custom-exhibition-stand-design-india-01.mp4',
 5: P+'custom-trade-show-booth-design-india-01.mp4',
 6: P+'custom-trade-show-booth-design-india-04.mp4',
 7: P+'exhibition-stall-av-technology-integration-01.mp4',
 8: P+'exhibition-stall-av-technology-integration-02.mp4',
 10: P+'exhibition-stall-design-company-ahmedabad-01.mp4',
 12: P+'pharma-exhibition-stall-design-02.mp4',
 13: P+'real-estate-exhibition-stall-design-01.mp4',
 15: 'public/about-flow/01-approach.mp4',
}
T = 0.45
FPS = 25
# (source, in-point, length, push direction)
SHOTS = [(1,0.3,2.4,'in'),(3,0.4,2.0,'out'),(8,0.3,2.2,'in'),(6,1.0,2.2,'out'),(7,0.5,2.0,'in'),
         (10,0.3,1.9,'in'),(12,1.0,2.2,'out'),(13,0.5,2.2,'in'),(4,1.0,2.6,'out'),(15,0.6,2.2,'in'),(5,1.0,2.4,'out')]
XF = ['smoothleft','circleopen','fade','smoothup','fade','smoothright','fade','circleopen','fade','smoothleft','fade']
# Segments: shot 1 starts T late; a T-long tail of shot 1 closes the loop.
segs = []
s0 = SHOTS[0]
segs.append((s0[0], s0[1]+T, s0[2]-T, s0[3], T, s0[2]))
for s in SHOTS[1:]: segs.append((s[0], s[1], s[2], s[3], 0, s[2]))
segs.append((s0[0], s0[1], T, s0[3], 0, s0[2]))
inputs, fc = [], []
for i,(src,a,d,dirn,off,full) in enumerate(segs):
    inputs += ['-i', SRC[src]]
    N = full*FPS
    p = f"((on+{off*FPS})/{N})"
    z = f"1+0.07*{p}" if dirn=='in' else f"1.07-0.07*{p}"
    fc.append(f"[{i}:v]trim=start={a}:duration={d},setpts=PTS-STARTPTS,fps={FPS},"
              f"scale=2560:1440:force_original_aspect_ratio=increase:flags=lanczos,crop=2560:1440,"
              f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1280x720:fps={FPS},"
              f"eq=contrast=1.06:saturation=1.1:gamma=0.98,unsharp=5:5:0.35,setsar=1,format=yuv420p[v{i}]")
prev, acc = 'v0', segs[0][2]
for i in range(1, len(segs)):
    out = f'x{i}'
    fc.append(f"[{prev}][v{i}]xfade=transition={XF[i-1]}:duration={T}:offset={acc-T:.3f}[{out}]")
    acc = acc - T + segs[i][2]
    prev = out
print('length', round(acc,2), file=sys.stderr)
cmd = ['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(fc),'-map',f'[{prev}]','-an',
       '-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p', sys.argv[1]]
subprocess.run(cmd, check=True)

# Web versions, from the master (N=public/home-intro/exhibition-stall-design-showreel):
#   ffmpeg -i master.mp4 -an -c:v libx264 -profile:v high -preset slower -crf 27 -maxrate 1400k -bufsize 2800k -g 50 -pix_fmt yuv420p -movflags +faststart .mp4
#   ffmpeg -i master.mp4 -an -c:v libvpx-vp9 -b:v 1000k -crf 38 -maxrate 1500k -row-mt 1 -deadline good -cpu-used 2 -g 50 -pix_fmt yuv420p .webm
#   ffmpeg -i master.mp4 -an -vf "crop=406:720:437:0,scale=540:960:flags=lanczos" -c:v libx264 -profile:v high -preset slower -crf 28 -maxrate 750k -bufsize 1500k -g 50 -pix_fmt yuv420p -movflags +faststart -m.mp4
#   ffmpeg -i master.mp4 -frames:v 1 -c:v libwebp -quality 72 -poster.webp
