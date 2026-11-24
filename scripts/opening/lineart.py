"""
Clean line drawings of the stands for the Imagine phase.

Each shot: a frame at full resolution, cropped to the output's shape, upscaled
to twice the output size, smoothed on flat surfaces (edges kept), its edges
traced and each traced line smoothed, then drawn as anti-aliased strokes over
a brand duotone of the same frame. Drawn at 2x the output so the push and the
final reduction keep the lines crisp.

usage: python3 lineart.py <W> <H> <outdir>
"""
import subprocess, sys, os
import numpy as np
import cv2

W, H, OUT = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
os.makedirs(OUT, exist_ok=True)
C = '/home/user/approachmedia-website/clips/'
K = 2                    # draw at 2x
BW, BH = W * K, H * K

BLUE = ((8, 12, 48), (88, 116, 240), (214, 226, 255))
TEAL = ((4, 16, 30), (40, 120, 150), (205, 245, 245))
GREEN = ((3, 14, 5), (60, 140, 34), (228, 255, 205))
# (clip, time, focus x, focus y, zoom, palette)
SHOTS = [
    ('award-winning-stall-design-and-fabrication-agency-03.mp4', 1.5, 0.45, 0.4, 1.6, BLUE),
    ('award-winning-stall-design-and-fabrication-agency-01.mp4', 2.0, 0.42, 0.45, 1.5, BLUE),
    ('custom-exhibition-stand-design-india-01.mp4', 2.5, 0.72, 0.35, 1.6, TEAL),
    ('custom-trade-show-booth-design-india-03.mp4', 2.5, 0.7, 0.5, 1.5, TEAL),
    ('pharma-exhibition-stall-design-02.mp4', 2.5, 0.45, 0.5, 1.4, GREEN),
    ('real-estate-exhibition-stall-design-01.mp4', 2.5, 0.45, 0.35, 1.5, GREEN),
]


def frame(clip, t):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', C + clip, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
                         capture_output=True, check=True).stdout
    return cv2.imdecode(np.frombuffer(out, np.uint8), cv2.IMREAD_COLOR)


def crop(img, fx, fy, zoom):
    sh, sw = img.shape[:2]
    ar = W / H
    if sw / sh > ar:
        ch = sh / zoom; cw = ch * ar
    else:
        cw = sw / zoom; ch = cw / ar
    x = int(min(max(fx * sw - cw / 2, 0), sw - cw)); y = int(min(max(fy * sh - ch / 2, 0), sh - ch))
    return img[y:y + int(ch), x:x + int(cw)]


def smooth_line(pts, k=7):
    if len(pts) < k * 2:
        return pts
    p = pts.astype(np.float32)
    ker = np.ones(k) / k
    xs = np.convolve(p[:, 0], ker, mode='same'); ys = np.convolve(p[:, 1], ker, mode='same')
    h = k // 2
    xs[:h], xs[-h:] = p[:h, 0], p[-h:, 0]; ys[:h], ys[-h:] = p[:h, 1], p[-h:, 1]
    return np.stack([xs, ys], 1)


def render(img, pal):
    dark, light, ink = pal
    big = cv2.resize(img, (BW, BH), interpolation=cv2.INTER_LANCZOS4)
    soft = big
    for _ in range(3):
        soft = cv2.bilateralFilter(soft, 9, 40, 9)
    gray = cv2.cvtColor(soft, cv2.COLOR_BGR2GRAY)
    # duotone ground, with lifted contrast
    g = cv2.normalize(gray.astype(np.float32), None, 0, 1, cv2.NORM_MINMAX)
    g = np.clip((g - 0.5) * 1.3 + 0.45, 0, 1)
    d = np.array(dark[::-1], np.float32); l = np.array(light[::-1], np.float32)
    ground = (d + (l - d) * g[..., None])
    # traced lines
    edges = cv2.Canny(cv2.GaussianBlur(gray, (0, 0), 2.2), 28, 70)
    contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
    layer = np.zeros((BH, BW), np.uint8)
    for c in contours:
        if cv2.arcLength(c, False) < BW * 0.02:
            continue
        p = smooth_line(c[:, 0, :])
        cv2.polylines(layer, [np.round(p * 16).astype(np.int32)], False, 255, thickness=3, lineType=cv2.LINE_AA, shift=4)
    a = (layer.astype(np.float32) / 255)[..., None]
    ink_c = np.array(ink[::-1], np.float32)
    out = ground * (1 - a * 0.9) + ink_c * a * 0.95
    # soft vignette
    yy, xx = np.mgrid[0:BH, 0:BW].astype(np.float32)
    r = np.sqrt(((xx - BW / 2) / (BW / 2)) ** 2 + ((yy - BH / 2) / (BH / 2)) ** 2)
    out *= np.clip(1.15 - 0.35 * r, 0.55, 1)[..., None]
    return np.clip(out, 0, 255).astype(np.uint8)


for i, (clip, t, fx, fy, z, pal) in enumerate(SHOTS):
    img = crop(frame(clip, t), fx, fy, z)
    cv2.imwrite(f'{OUT}/la{i}.png', render(img, pal))
    print('shot', i, img.shape[1], 'x', img.shape[0], '->', BW, 'x', BH)
