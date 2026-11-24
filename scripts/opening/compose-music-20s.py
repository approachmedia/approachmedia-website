"""
Original music for the Approach Media opening, three characters, each timed to
the film's cuts. Notes are placed at absolute times (seconds), written to MIDI,
rendered with the FluidR3 General MIDI orchestra, then mixed with synthesised
sound design (sub booms, impacts, risers, whooshes) and a convolution reverb.

usage: python3 compose.py <option 1|2|3> <out.wav>
"""
import sys, subprocess, os
import numpy as np
import mido
from scipy.signal import fftconvolve, butter, sosfilt
from scipy.io import wavfile

OPT, OUT = int(sys.argv[1]), sys.argv[2]
SR = 48000
LEN = 20.8
SF2 = '/usr/share/sounds/sf2/FluidR3_GM.sf2'
WORK = os.path.dirname(os.path.abspath(OUT))

# film beat points
PHOTO = [0.0, 2.5, 5.0]                              # act 1: each photograph
WORD = [1.5, 4.0, 6.5]                               # act 1: each word slams in
FL = PHOTO + WORD
CR0 = 7.35; CUT = [round(CR0 + 0.48 * i, 2) for i in range(9)]   # Create cuts (125 BPM)
F3D = 11.558                                         # flash into 3D
REVEAL, SWOOP0, HIT = 14.258, 14.558, 17.118         # logo revealed, swoop, logo lands
WHITE = 17.317; END = 20.317

# ── MIDI helpers ─────────────────────────────────────────────────────────
TPB = 960; BPM = 120; TPS = TPB * BPM / 60          # ticks per second
events = []                                          # (tick, priority, channel, msg)
GM = dict(strings=48, strings2=49, trem=44, pizz=45, harp=46, timp=47, choir=52, ohit=55,
          trumpet=56, trombone=57, tuba=58, horn=60, brass=61, synbass=38, pad=89, warm=89,
          piano=0, celesta=8, glock=9, taiko=116, cello=42, contrabass=43, synbrass=62, bell=14)
chan_prog = {}


def ch(name):
    if name not in chan_prog:
        c = len(chan_prog)
        if c >= 9: c += 1                            # skip drum channel 10
        chan_prog[name] = c
        events.append((0, 0, c, mido.Message('program_change', channel=c, program=GM[name])))
    return chan_prog[name]


def note(name, t, pitches, dur, vel=90):
    c = ch(name)
    for p in ([pitches] if isinstance(pitches, int) else pitches):
        events.append((int(t * TPS), 2, c, mido.Message('note_on', channel=c, note=p, velocity=int(min(127, vel)))))
        events.append((int((t + dur) * TPS), 1, c, mido.Message('note_off', channel=c, note=p, velocity=0)))


def drum(t, key, vel=100):
    events.append((int(t * TPS), 2, 9, mido.Message('note_on', channel=9, note=key, velocity=vel)))
    events.append((int((t + 0.3) * TPS), 1, 9, mido.Message('note_off', channel=9, note=key, velocity=0)))


def expr(name, t0, t1, v0, v1, steps=24):
    """Expression (CC11) ramp, for crescendos."""
    c = ch(name)
    for i in range(steps + 1):
        tt = t0 + (t1 - t0) * i / steps
        events.append((int(tt * TPS), 0, c, mido.Message('control_change', channel=c, control=11, value=int(v0 + (v1 - v0) * i / steps))))


def write_midi(path):
    mid = mido.MidiFile(ticks_per_beat=TPB)
    tr = mido.MidiTrack(); mid.tracks.append(tr)
    tr.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(BPM)))
    for c in range(16):
        tr.append(mido.Message('control_change', channel=c, control=91, value=70))   # reverb send
        tr.append(mido.Message('control_change', channel=c, control=7, value=110))
    last = 0
    for tick, _, _, msg in sorted(events, key=lambda e: (e[0], e[1])):
        tr.append(msg.copy(time=tick - last)); last = tick
    mid.save(path)


# note names
def n(s):
    names = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
    k = names[s[0]]; i = 1
    if len(s) > 2 or (len(s) == 2 and s[1] in '#b'):
        if s[1] == '#': k += 1; i = 2
        elif s[1] == 'b': k -= 1; i = 2
    return 12 * (int(s[i:]) + 1) + k


def chord(*names): return [n(x) for x in names]


# ── sound design (numpy) ─────────────────────────────────────────────────
def env_exp(nlen, tau):
    return np.exp(-np.arange(nlen) / (tau * SR))


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype='band', fs=SR, output='sos'), x)


def lowpass(x, f, order=2):
    return sosfilt(butter(order, f, btype='low', fs=SR, output='sos'), x)


def highpass(x, f, order=2):
    return sosfilt(butter(order, f, btype='high', fs=SR, output='sos'), x)


rng = np.random.default_rng(3)
fx = np.zeros(int(LEN * SR))


def place(sig, t, gain=1.0):
    i = int(t * SR)
    j = min(len(fx), i + len(sig))
    if i < 0: sig = sig[-i:]; i = 0
    fx[i:j] += gain * sig[:j - i]


def sub_boom(dur=2.6, f0=62, f1=28):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 4)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(nlen, dur / 3)
    click = lowpass(rng.standard_normal(nlen), 2500) * env_exp(nlen, 0.012) * 0.6
    return s + click


def impact(dur=2.2, bright=4000):
    nlen = int(dur * SR)
    body = lowpass(rng.standard_normal(nlen), bright) * env_exp(nlen, dur / 5)
    return body * 0.8 + sub_boom(dur) * 0.9


def whoosh(dur=0.5, f0=300, f1=4000):
    nlen = int(dur * SR); x = rng.standard_normal(nlen)
    out = np.zeros(nlen); seg = 1024
    for k in range(0, nlen, seg):
        u = k / nlen; fc = f0 * (f1 / f0) ** u
        out[k:k + seg] = bandpass(x[k:k + seg + 0], max(40, fc * 0.6), min(SR / 2 - 100, fc * 1.6))[:len(out[k:k + seg])]
    shape = np.sin(np.linspace(0, np.pi, nlen)) ** 2
    return lowpass(out, 9000) * shape


def riser(dur=3.0, f0=110, f1=880, noise=0.5):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    f = f0 * (f1 / f0) ** (tt / dur)
    tone = (np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR))
    nz = highpass(rng.standard_normal(nlen), 1200) * noise
    shape = (tt / dur) ** 2.2
    return (tone * 0.35 + nz) * shape


def reverse_swell(dur=1.2):
    nlen = int(dur * SR)
    return highpass(rng.standard_normal(nlen), 2000) * (np.arange(nlen) / nlen) ** 3 * 0.6


def braam(dur=3.0, root=36):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    f = 440 * 2 ** ((root - 69) / 12)
    s = sum(np.sign(np.sin(2 * np.pi * f * h * tt + h)) / h for h in (1, 2, 3, 4)) * 0.25
    s = lowpass(s, 900) * (1 - np.exp(-tt * 30)) * env_exp(nlen, dur / 2.5)
    return s


# ── the three scores ─────────────────────────────────────────────────────
if OPT == 1:   # Heroic Fanfare (D major / B minor, strings ostinato, horn theme, brass climax)
    # Imagine: low strings swell on Bm, harp glissando, timpani on each flash
    note('strings', 0.0, chord('B2', 'F#3', 'B3', 'D4'), 3.7, 70); expr('strings', 0, 3.6, 30, 100)
    note('contrabass', 0.0, n('B1'), 3.7, 80)
    for i, t in enumerate(FL):
        note('timp', t, n('B1') if i % 2 == 0 else n('F#2'), 0.5, 70 + i * 8)
    for k, p in enumerate(['B3', 'D4', 'F#4', 'B4', 'D5', 'F#5', 'B5']):
        note('harp', 0.15 + k * 0.05, n(p), 1.2, 70)
    # Create: 8th-note string ostinato at 125 BPM, Bm G D A, low brass roots, timpani on cuts
    prog = [('B', ['B2', 'D3', 'F#3']), ('G', ['G2', 'B2', 'D3']), ('D', ['D3', 'F#3', 'A3']), ('A', ['A2', 'C#3', 'E3'])]
    e8 = 0.24
    for i in range(17):
        t = CR0 + i * e8
        name, tri = prog[(i // 4) % 4]
        note('strings2', t, [n(tri[0]) + 12, n(tri[2]) + 12], e8 * 0.7, 88 + (i % 2) * 10)
        if i % 4 == 0:
            note('trombone', t, n(tri[0]) - 12, e8 * 3.6, 85)
            note('contrabass', t, n(tri[0]) - 12, e8 * 3.8, 95)
    for t in CUT:
        note('timp', t, n('B1'), 0.3, 105); drum(t, 41, 95)
    note('trem', 5.49, chord('B3', 'D4', 'F#4'), 2.25, 60); expr('trem', 5.49, 7.7, 40, 120)
    drum(7.25, 49, 70)
    # into 3D: crash, orchestra hit, timpani roll; heroic horn theme over string tremolo
    drum(F3D, 49, 120); drum(F3D, 57, 110); note('ohit', F3D, chord('D3', 'A3', 'D4', 'F#4'), 0.6, 110)
    theme = [('A3', 0.0, 0.36), ('D4', 0.36, 0.36), ('E4', 0.72, 0.24), ('F#4', 0.96, 0.72), ('A4', 1.68, 0.48), ('G4', 2.16, 0.24),
             ('F#4', 2.40, 0.48), ('E4', 2.88, 0.24), ('F#4', 3.12, 0.24), ('D4', 3.36, 0.72)]
    for p, dt, d in theme:
        note('horn', F3D + 0.1 + dt, [n(p), n(p) - 12], d * 1.05, 105)
        note('trumpet', F3D + 0.1 + dt, n(p), d * 1.05, 70)
    for i, (r, c3) in enumerate([('D2', ['D3', 'F#3', 'A3']), ('G2', ['G3', 'B3', 'D4']), ('B1', ['B2', 'D3', 'F#3']), ('A1', ['A2', 'C#3', 'E3'])]):
        t = F3D + i * 0.96
        note('trem', t, [n(x) for x in c3] + [n(c3[0]) + 12], 0.96, 85)
        note('contrabass', t, n(r), 0.96, 95)
    # swoop: rising build, timpani roll crescendo, brass stabs, cymbal swell
    for k in range(int((HIT - REVEAL) / 0.06)):
        t = REVEAL + k * 0.06; u = k * 0.06 / (HIT - REVEAL)
        note('timp', t, n('A1'), 0.08, int(50 + 70 * u))
    for k, p in enumerate(['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4']):
        t = REVEAL + 0.2 + k * 0.3
        note('strings', t, [n(p), n(p) + 12], 0.32, 80 + k * 5)
    for t in (11.6, 12.32, 12.8):
        note('brass', t, chord('A3', 'C#4', 'E4'), 0.22, 110)
    expr('strings', REVEAL, HIT, 60, 127)
    # HIT: full orchestra D major, long tail
    big = chord('D2', 'D3', 'A3', 'D4', 'F#4', 'A4', 'D5')
    note('brass', HIT, big, 2.9, 127); note('horn', HIT, chord('D4', 'F#4', 'A4'), 2.9, 120)
    note('trumpet', HIT, chord('A4', 'D5'), 2.6, 115); note('strings', HIT, big, 3.0, 127)
    note('choir', HIT, chord('D4', 'F#4', 'A4', 'D5'), 3.0, 110); note('timp', HIT, n('D2'), 1.0, 127)
    note('contrabass', HIT, n('D1'), 3.0, 120); drum(HIT, 49, 127); drum(HIT, 57, 120)
    note('glock', WHITE + 0.1, chord('D6', 'F#6', 'A6'), 1.5, 70)
    for t in FL: place(whoosh(0.35, 400, 6000), t - 0.2, 0.25)
    place(reverse_swell(1.0), CR0 - 1.0, 0.5); place(impact(1.6), CR0, 0.5)
    place(reverse_swell(1.4), F3D - 1.4, 0.7); place(impact(2.0), F3D, 0.8)
    place(riser(HIT - REVEAL, 120, 960), REVEAL, 0.55)
    place(impact(3.0, 6000), HIT, 1.0); place(sub_boom(3.2), HIT, 0.9)

elif OPT == 2:   # Hybrid Trailer (D minor): image, then word, three times; montage; corridor; the hit
    # act 1: a low drone that grows; each photograph lands on a deep piano and
    # sub boom, each word slams in on taiko, a braam and a choir stab, with a
    # reverse swell sucking into it. The three words climb: D, F, A.
    note('pad', 0.0, chord('D2', 'A2', 'D3'), CR0, 60); expr('pad', 0, CR0, 35, 115)
    note('contrabass', 0.0, n('D1'), CR0, 70); expr('contrabass', 0, CR0, 40, 110)
    for i, t in enumerate(PHOTO):
        note('piano', t + 0.02, [n('D1'), n('D2'), n('A2')], 1.2, 95 + i * 10)
        place(sub_boom(1.6, 70, 32), t + 0.02, 0.5 + i * 0.12)
        for k in range(6):   # a ticking pizzicato pulse under each photograph, quickening
            note('pizz', t + 0.25 + k * (0.2 - i * 0.03), n('A4') + (k % 2) * 5, 0.12, 55 + k * 6)
    for i, (t, root) in enumerate(zip(WORD, ['D', 'F', 'A'])):
        place(reverse_swell(0.7), t - 0.7, 0.55)
        note('taiko', t, n('D2'), 0.5, 125); drum(t, 36, 127); drum(t, 49, 110 + i * 6)
        place(braam(1.1 + i * 0.1, n(root + '2')), t, 0.75 + i * 0.1)
        place(impact(1.2, 3500), t, 0.65)
        note('choir', t, chord(root + '4', ('A4' if root == 'D' else 'C5' if root == 'F' else 'E5')), 0.9, 105)
        note('brass', t, [n(root + '2'), n(root + '3')], 0.8, 115)
    place(riser(1.2, 200, 1800, 0.8), CR0 - 1.2, 0.5)
    # act 2: the montage, 16th-note pulse, taiko on every cut
    e16 = 0.12
    for i in range(int((F3D - CR0) / e16)):
        t = CR0 + i * e16
        note('synbass', t, n('D2') if (i // 8) % 2 == 0 else n('Bb1'), e16 * 0.8, 90 + (i % 4 == 0) * 25)
    for t in CUT:
        note('taiko', t, n('D2'), 0.4, 120); drum(t, 36, 120); place(impact(0.8, 2500), t, 0.35)
    place(braam(2.0, 38), CR0 + 1.92, 0.55)
    note('choir', CR0 + 2.4, chord('D4', 'F4', 'A4'), F3D - CR0 - 2.4, 80); expr('choir', CR0 + 2.4, F3D, 40, 120)
    place(riser(1.5, 200, 1600, 0.8), F3D - 1.5, 0.5)
    # act 3: into the corridor, driving drums and brass, the build, a beat of silence, the hit
    drum(F3D, 49, 127); place(braam(3.0, 38), F3D, 0.9); place(impact(2.2), F3D, 0.8)
    for i in range(int((HIT - 0.3 - F3D) / 0.24)):
        t = F3D + 0.24 * i
        drum(t, 36 if i % 2 == 0 else 38, 100 + (i % 4 == 0) * 20)
        note('synbass', t, n('D2') if (i // 4) % 2 == 0 else n('C2'), 0.2, 110)
        if i % 4 == 0: note('taiko', t, n('D2'), 0.4, 115)
    note('brass', F3D + 0.48, chord('D3', 'F3', 'A3'), 1.4, 100); note('brass', F3D + 1.92, chord('C3', 'E3', 'G3'), 1.4, 100)
    note('brass', F3D + 3.36, chord('Bb2', 'D3', 'F3'), 1.4, 105)
    note('choir', REVEAL, chord('D4', 'F4', 'A4', 'D5'), HIT - 0.3 - REVEAL, 100); expr('choir', REVEAL, HIT - 0.3, 60, 127)
    place(riser(HIT - 0.3 - REVEAL, 100, 1400, 0.7), REVEAL, 0.6)
    note('taiko', HIT, n('D2'), 1, 127); drum(HIT, 49, 127); note('brass', HIT, chord('D2', 'A2', 'D3', 'F3', 'A3'), 3.2, 127)
    note('choir', HIT, chord('D4', 'F4', 'A4', 'D5'), 3.2, 120); note('trem', HIT + 0.5, chord('D5', 'A5'), 2.4, 70)
    place(braam(3.6, 38), HIT, 1.0); place(impact(3.4), HIT, 1.0); place(sub_boom(3.4, 70, 26), HIT, 1.0)

else:   # Elegant Architectural (D major add9, piano and strings, bright resolve with bells)
    arp = ['D3', 'A3', 'E4', 'F#4', 'A4', 'E4']
    for i in range(int(CR0 / 0.3)):
        note('piano', i * 0.3, n(arp[i % 6]), 0.6, 60 + (i % 6 == 0) * 15)
    note('strings', 0.0, chord('D3', 'A3', 'F#4'), 3.7, 60); expr('strings', 0, 3.6, 30, 90)
    prog = [chord('D3', 'A3', 'E4', 'F#4'), chord('B2', 'F#3', 'D4', 'E4'), chord('G2', 'D3', 'B3', 'E4'), chord('A2', 'E3', 'C#4', 'E4')]
    for i in range(int((F3D - CR0) / 0.24)):
        t = CR0 + i * 0.24; c = prog[(i // 4) % 4]
        note('piano', t, c[1 + i % 3] + 12, 0.3, 75)
        if i % 4 == 0:
            note('strings', t, c, 0.96, 80); note('cello', t, c[0] - 12, 0.96, 85)
    for t in CUT: drum(t, 36, 70)
    note('choir', 6.45, chord('A4', 'D5'), 1.3, 60)
    drum(F3D, 49, 90); note('harp', F3D, chord('D4', 'F#4', 'A4', 'D5'), 1.0, 90)
    mel = [('F#5', 0, 0.48), ('E5', 0.48, 0.24), ('D5', 0.72, 0.24), ('A5', 0.96, 0.96), ('G5', 1.92, 0.48), ('F#5', 2.40, 0.48), ('E5', 2.88, 0.96)]
    for p, dt, d in mel: note('strings', F3D + 0.2 + dt, n(p), d * 1.05, 95)
    for i, c in enumerate(prog * 2):
        t = F3D + i * 0.66
        if t < HIT - 0.1: note('strings2', t, c, 0.7, 85); note('cello', t, c[0] - 12, 0.7, 90)
    for k, p in enumerate(['D5', 'E5', 'F#5', 'A5', 'B5', 'D6', 'E6', 'F#6']):
        note('harp', REVEAL + 0.4 + k * 0.28, n(p), 0.8, 70 + k * 4)
    expr('strings2', REVEAL, HIT, 70, 127)
    note('strings', HIT, chord('D3', 'A3', 'D4', 'F#4', 'A4', 'E5'), 2.9, 115); note('horn', HIT, chord('D4', 'A4'), 2.6, 100)
    note('choir', HIT, chord('D4', 'F#4', 'A4', 'D5'), 2.8, 95); note('celesta', HIT, chord('D6', 'F#6', 'A6', 'E6'), 1.8, 95)
    note('bell', HIT + 0.02, n('D6'), 2.0, 80); drum(HIT, 49, 95); note('timp', HIT, n('D2'), 0.8, 100)
    for t in FL: place(whoosh(0.3, 600, 7000), t - 0.18, 0.12)
    place(reverse_swell(1.2), F3D - 1.2, 0.35); place(riser(HIT - REVEAL, 300, 1200, 0.3), REVEAL, 0.3)
    place(impact(2.4, 3000), HIT, 0.45); place(sub_boom(2.8), HIT, 0.5)

# ── render, mix, master ──────────────────────────────────────────────────
mid = f'{WORK}/opt{OPT}.mid'; orch = f'{WORK}/opt{OPT}-orch.wav'
write_midi(mid)
subprocess.run(['fluidsynth', '-ni', '-g', '0.9', '-r', str(SR), '-R', '1', '-C', '0', '-F', orch, SF2, mid], check=True, capture_output=True)
sr, o = wavfile.read(orch)
o = o.astype(np.float32) / 32768.0
if o.ndim == 1: o = np.stack([o, o], 1)
o = o[:int(LEN * SR)]
if len(o) < int(LEN * SR): o = np.pad(o, ((0, int(LEN * SR) - len(o)), (0, 0)))
# convolution hall: decaying stereo noise
irl = int(2.8 * SR); tt = np.arange(irl) / SR
ir = np.stack([rng.standard_normal(irl), rng.standard_normal(irl)], 1) * np.exp(-tt * 2.4)[:, None]
ir[:, 0] = lowpass(ir[:, 0], 7000); ir[:, 1] = lowpass(ir[:, 1], 7000); ir /= np.abs(ir).sum(0) ** 0.5 * 4
wet = np.stack([fftconvolve(o[:, k], ir[:, k])[:len(o)] for k in range(2)], 1)
mix = o * 0.8 + wet * 0.35
f2 = np.stack([fx, fx], 1)
f2w = np.stack([fftconvolve(fx, ir[:, k])[:len(fx)] for k in range(2)], 1)
mix = mix + (f2 * 0.6 + f2w * 0.2) * 0.9
# fade the head in, the tail out at the film's end
fi = int(0.05 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]
fo0 = int((END - 0.6) * SR); fo1 = int(LEN * SR)
mix[fo0:fo1] *= np.linspace(1, 0, fo1 - fo0)[:, None] ** 1.5
mix /= max(1e-6, np.abs(mix).max()) / 0.9
tmp = f'{WORK}/opt{OPT}-raw.wav'
wavfile.write(tmp, SR, (mix * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af',
                'acompressor=threshold=-18dB:ratio=3:attack=10:release=200:makeup=2,loudnorm=I=-14:TP=-1.0:LRA=11,alimiter=limit=0.89',
                '-ar', str(SR), OUT], check=True)
print('wrote', OUT)
