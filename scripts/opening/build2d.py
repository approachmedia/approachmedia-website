"""
The two 2D phases of the Approach Media opening, from the owner's clips.

  A  Imagine  six extreme close-ups of stands as line drawings over a brand
              duotone (blue -> teal -> green), each with a slow push, cut on
              white flashes. 24 fps.
  B  Create   nine fast cuts of real footage under a moving blue/green wash,
              a light streak, and large outlined words drifting through:
              the brand line and the company's real figures only.

usage: python3 build2d.py <W> <H> <outdir>
"""
import subprocess, sys, os

W, H, OUT = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
os.makedirs(OUT, exist_ok=True)
C = '/home/user/approachmedia-website/clips/'
FONTS = '/root/.claude/skills/synced/481da401-6579-4373-acfb-47da9f1f1f6e_39637918-e487-4e7c-bfbd-e26bd098aa4f/approach-media-brand-guidelines/assets/fonts/'
MANROPE = FONTS + 'manrope/static/Manrope-ExtraBold.ttf'
INTER = FONTS + 'inter/static/Inter-SemiBold.ttf'
FPS = 24
PORTRAIT = H > W


def run(args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)


def crop_for(sw, sh, fx, fy, zoom):
    """A crop of the source at the output's shape, centred on (fx, fy) (0..1),
    covering 1/zoom of the source's limiting side."""
    ar = W / H
    if sw / sh > ar:
        ch = sh / zoom; cw = ch * ar
    else:
        cw = sw / zoom; ch = cw / ar
    cw, ch = int(cw) // 2 * 2, int(ch) // 2 * 2
    x = int(min(max(fx * sw - cw / 2, 0), sw - cw))
    y = int(min(max(fy * sh - ch / 2, 0), sh - ch))
    return cw, ch, x, y


def probe(f):
    out = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip()
    w, h = out.split(',')
    return int(w), int(h)


# ── A: Imagine ──────────────────────────────────────────────────────────
# (clip, time, focus x, focus y, zoom, duotone dark, duotone light, line tint)
BLUE = ((6, 10, 40), (92, 120, 235), (200, 215, 255))
TEAL = ((4, 16, 30), (55, 140, 165), (200, 245, 240))
GREEN = ((3, 14, 4), (80, 160, 40), (225, 255, 200))
A_SHOTS = [
    ('award-winning-stall-design-and-fabrication-agency-03.mp4', 1.5, 0.45, 0.35, 2.6, BLUE),
    ('award-winning-stall-design-and-fabrication-agency-01.mp4', 2.0, 0.42, 0.45, 2.4, BLUE),
    ('custom-exhibition-stand-design-india-01.mp4', 2.5, 0.78, 0.25, 2.8, TEAL),
    ('custom-trade-show-booth-design-india-03.mp4', 2.5, 0.72, 0.5, 2.6, TEAL),
    ('pharma-exhibition-stall-design-02.mp4', 2.5, 0.42, 0.5, 2.4, GREEN),
    ('real-estate-exhibition-stall-design-01.mp4', 2.5, 0.42, 0.28, 2.6, GREEN),
]
A_DUR, A_FLASH = 0.72, 0.12


def lut(dark, light):
    r0, g0, b0 = dark; r1, g1, b1 = light
    return (f"lutrgb=r='{r0}+({r1}-{r0})*val/255':g='{g0}+({g1}-{g0})*val/255':b='{b0}+({b1}-{b0})*val/255'")


def build_a():
    """Pushes into the 4K line drawings made by lineart.py (in OUT/la*.png)."""
    args, fc = [], []
    n = int(round(A_DUR * FPS))
    for i in range(len(A_SHOTS)):
        args += ['-loop', '1', '-framerate', str(FPS), '-t', f'{A_DUR + 0.1:.2f}', '-i', f'{OUT}/la{i}.png']
        push = f"1+0.07*on/{n}" if i % 2 == 0 else f"1.07-0.07*on/{n}"
        fc.append(f"[{i}:v]zoompan=z='{push}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS},"
                  f"trim=end_frame={n},setpts=PTS-STARTPTS,format=yuv420p,setsar=1[A{i}]")
    prev, acc = 'A0', A_DUR
    for i in range(1, len(A_SHOTS)):
        fc.append(f"[{prev}][A{i}]xfade=transition=fadewhite:duration={A_FLASH}:offset={acc - A_FLASH:.3f}[ax{i}]")
        prev, acc = f'ax{i}', acc - A_FLASH + A_DUR
    fc.append(f"[{prev}]fade=t=in:st=0:d=0.45[aout]")
    run([*args, '-filter_complex', ';'.join(fc), '-map', '[aout]', '-an', '-c:v', 'libx264', '-crf', '10', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{OUT}/A.mp4'])
    return acc


# ── B: Create ───────────────────────────────────────────────────────────
# (clip, in-point, focus x, focus y, zoom, big outlined word, small line)
B_SHOTS = [
    ('custom-trade-show-booth-design-india-01.mp4', 1.0, 0.5, 0.5, 1.0, 'IMAGINE', ''),
    ('custom-trade-show-booth-design-india-04.mp4', 1.2, 0.5, 0.5, 1.0, 'CREATE', ''),
    ('technology1.mp4', 0.6, 0.55, 0.5, 1.0, 'DELIVER', ''),
    ('technology2.mp4', 0.5, 0.5, 0.45, 1.0, 'SINCE 2002', 'Exhibition stall design and fabrication'),
    ('pharma-exhibition-stall-design-02.mp4', 1.4, 0.5, 0.5, 1.0, '23+ YEARS', ''),
    ('indusfood-exhibition-stall-design-01.mp4', 1.0, 0.5, 0.5, 1.0, '6000+ STALLS', ''),
    ('indusfood-exhibition-stall-design-02.mp4', 0.4, 0.5, 0.5, 1.0, '14+ COUNTRIES', ''),
    ('award-winning-stall-design-and-fabrication-agency-02.mp4', 0.8, 0.5, 0.5, 1.0, '', ''),
    ('custom-exhibition-stand-design-india-01.mp4', 1.6, 0.5, 0.5, 1.0, '', ''),
]
B_DUR, B_X = 0.58, 0.1
WASH = ['softlight', 'overlay', 'softlight']


def build_b():
    args, fc = [], []
    n_in = len(B_SHOTS)
    for i, (clip, t, fx, fy, z, word, small) in enumerate(B_SHOTS):
        sw, sh = probe(C + clip)
        cw, ch, x, y = crop_for(sw, sh, fx, fy, z)
        args += ['-ss', str(t), '-t', str(B_DUR + 0.05), '-i', C + clip]
    # moving brand wash and a light streak, shared
    args += ['-f', 'lavfi', '-i', f"gradients=s={W}x{H}:c0=0x172F9D:c1=0x53B618:c2=0x0F1F63:n=3:speed=0.035:type=linear:r={FPS},trim=duration=6"]
    g = n_in
    fs = int(H * (0.16 if PORTRAIT else 0.24))
    if PORTRAIT:
        fs = int(W * 0.2)
    small_fs = max(18, int(min(W, H) * 0.028))
    fc.append(f"[{g}:v]split={n_in}" + ''.join(f'[g{i}]' for i in range(n_in)))
    for i, (clip, t, fx, fy, z, word, small) in enumerate(B_SHOTS):
        sw, sh = probe(C + clip)
        cw, ch, x, y = crop_for(sw, sh, fx, fy, z)
        d = 1 if i % 2 == 0 else -1
        chain = (f"[{i}:v]fps={FPS},setpts=PTS-STARTPTS,crop={cw}:{ch}:{x}:{y},hqdn3d=1.5:1.5:2:2,scale={W}:{H}:flags=lanczos,unsharp=5:5:0.55:5:5:0,"
                 f"eq=contrast=1.12:saturation=1.15,format=gbrp[s{i}];"
                 f"[g{i}]trim=start={i*0.5}:duration={B_DUR+0.05},setpts=PTS-STARTPTS,format=gbrp[w{i}];"
                 f"[s{i}][w{i}]blend=all_mode={WASH[i%3]}:all_opacity=0.7,format=yuv420p")
        # light streak sweeping down the frame
        chain += (f",drawbox=x=0:y='ih*(0.15+0.7*t/{B_DUR})':w=iw:h=2:color=white@0.55:t=fill")
        if word:
            chain += (f",drawtext=fontfile='{MANROPE}':text='{word}':fontsize={fs}:fontcolor=white@0.0:borderw=3:bordercolor=white@0.6:"
                      f"x='(w-tw)/2+{d}*(0.5-t/{B_DUR})*{int(W*0.18)}':y='(h-th)/2'")
        if small:
            chain += (f",drawtext=fontfile='{INTER}':text='{small.upper()}':fontsize={small_fs}:fontcolor=white@0.85:"
                      f"x='(w-tw)/2':y='(h+{fs})/2+{small_fs}'")
        chain += f",setsar=1[B{i}]"
        fc.append(chain)
    prev, acc = 'B0', B_DUR
    for i in range(1, n_in):
        tr = 'fade' if i % 3 else 'smoothleft'
        fc.append(f"[{prev}][B{i}]xfade=transition={tr}:duration={B_X}:offset={acc - B_X:.3f}[bx{i}]")
        prev, acc = f'bx{i}', acc - B_X + B_DUR
    run([*args, '-filter_complex', ';'.join(fc), '-map', f'[{prev}]', '-an', '-c:v', 'libx264', '-crf', '10', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{OUT}/B.mp4'])
    return acc


if __name__ == '__main__':
    a = build_a(); print('A', round(a, 2))
    b = build_b(); print('B', round(b, 2))
