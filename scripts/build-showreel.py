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
# The owner's original supplied clips (clips/), not the re-encoded copies in
# public/: every one is 1280 wide, and technology1 is 1920x1080.
P = 'clips/'
SRC = {
 'mount':   P+'award-winning-stall-design-and-fabrication-agency-01.mp4',
 'lounge':  P+'award-winning-stall-design-and-fabrication-agency-02.mp4',
 'gold':    P+'award-winning-stall-design-and-fabrication-agency-03.mp4',
 'dev':     P+'custom-exhibition-stand-design-india-01.mp4',
 'texspin': P+'custom-trade-show-booth-design-india-01.mp4',
 'create':  P+'custom-trade-show-booth-design-india-03.mp4',
 'walk':    P+'custom-trade-show-booth-design-india-04.mp4',
 'zeon':    P+'pharma-exhibition-stall-design-02.mp4',
 'pramukh': P+'real-estate-exhibition-stall-design-01.mp4',
 'vr':      P+'technology1.mp4',
 'dst':     P+'technology2.mp4',
}
W, H = 1920, 960          # 2:1, the footage's own shape and close to the hero's
T = 0.45
FPS = 25
# (source, in-point, length, push direction)
SHOTS = [('mount',0.3,2.3,'in'),('gold',0.4,2.0,'out'),('dst',0.3,2.2,'in'),('walk',1.0,2.2,'out'),
         ('vr',0.5,2.0,'in'),('create',1.0,2.0,'in'),('zeon',1.0,2.2,'out'),('pramukh',0.5,2.2,'in'),
         ('lounge',0.5,2.0,'out'),('dev',1.0,2.4,'out'),('texspin',1.0,2.4,'in')]
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
    z = f"1+0.04*{p}" if dirn=='in' else f"1.04-0.04*{p}"
    # Light denoise first so the sharpening lifts edges, not compression
    # blocks; upscale once with lanczos to 1.5x the output so the push has
    # sub-pixel headroom (zoompan rounds to whole pixels).
    fc.append(f"[{i}:v]trim=start={a}:duration={d},setpts=PTS-STARTPTS,fps={FPS},hqdn3d=1.2:1.2:2.5:2.5,"
              f"scale={W*3//2}:{H*3//2}:force_original_aspect_ratio=increase:flags=lanczos,crop={W*3//2}:{H*3//2},"
              f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS},"
              f"eq=contrast=1.06:saturation=1.1:gamma=0.98,unsharp=5:5:0.6:5:5:0,setsar=1,format=yuv420p[v{i}]")
prev, acc = 'v0', segs[0][2]
for i in range(1, len(segs)):
    out = f'x{i}'
    fc.append(f"[{prev}][v{i}]xfade=transition={XF[i-1]}:duration={T}:offset={acc-T:.3f}[{out}]")
    acc = acc - T + segs[i][2]
    prev = out
print('length', round(acc,2), file=sys.stderr)
cmd = ['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(fc),'-map',f'[{prev}]','-an',
       '-c:v','libx264','-crf','12','-preset','medium','-pix_fmt','yuv420p', sys.argv[1]]
subprocess.run(cmd, check=True)

# Web versions, from the master (N=public/home-intro/exhibition-stall-design-showreel):
#   ffmpeg -i master.mp4 -an -c:v libvpx-vp9 -b:v 2400k -crf 30 -maxrate 3600k -row-mt 1 -deadline good -cpu-used 1 -g 50 -pix_fmt yuv420p $N.webm
#   ffmpeg -i master.mp4 -an -c:v libx264 -profile:v high -preset slower -tune film -crf 22 -maxrate 3000k -bufsize 6000k -g 50 -pix_fmt yuv420p -movflags +faststart $N.mp4
#   ffmpeg -i master.mp4 -an -vf "crop=540:960:690:0,scale=720:1280:flags=lanczos,unsharp=5:5:0.3:5:5:0" -c:v libx264 -profile:v high -preset slower -tune film -crf 25 -maxrate 1400k -bufsize 2800k -g 50 -pix_fmt yuv420p -movflags +faststart $N-m.mp4
#   ffmpeg -i master.mp4 -frames:v 1 -c:v libwebp -quality 82 $N-poster.webp
