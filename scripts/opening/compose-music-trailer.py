"""
Original music for the Approach Media opening in the style of a film
trailer: two options (D, E), each timed to the film's cuts. Orchestra and
choir from the General MIDI set, with the weight carried by synthesised
trailer sound design: layered braams, war drums, ticking pulses, a Shepard
riser, sub drops and a silence before the final hit. Original material; no
existing theme is quoted. Notes are placed at absolute times (seconds), written to MIDI,
rendered with the FluidR3 General MIDI orchestra, then mixed with synthesised
sound design (sub booms, impacts, risers, whooshes) and a convolution reverb.

usage: python3 compose-music-trailer.py <D|E> <out.wav>
"""
import sys, subprocess, os
import numpy as np
import mido
from scipy.signal import fftconvolve, butter, sosfilt
from scipy.io import wavfile

OPT, OUT = sys.argv[1].upper(), sys.argv[2]
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


# ── the scores ─────────────────────────────────────────────────────────

def snare_roll(t0, t1, v0, v1, rate=0.045, key=38):
    k = 0
    while t0 + k * rate < t1:
        u = k * rate / max(1e-3, t1 - t0)
        drum(t0 + k * rate, key, int(v0 + (v1 - v0) * u)); k += 1


def timp_roll(t0, t1, pitch, v0, v1, rate=0.06):
    k = 0
    while t0 + k * rate < t1:
        u = k * rate / max(1e-3, t1 - t0)
        note('timp', t0 + k * rate, pitch, rate * 1.4, int(v0 + (v1 - v0) * u)); k += 1


def brass_tutti(t, pitches, d, v):
    note('brass', t, pitches, d, v); note('trombone', t, [p for p in pitches if p < 62], d, v)
    note('horn', t, [p for p in pitches if 50 <= p <= 74], d, v); note('trumpet', t, [p for p in pitches if p >= 62], d, v)



# ── trailer sound design ─────────────────────────────────────────────────
def hz(m): return 440.0 * 2 ** ((m - 69) / 12)


def saw(f, nlen, phase=0.0):
    ph = (np.cumsum(np.full(nlen, f / SR)) + phase) % 1.0
    return 2 * ph - 1


def braam_big(dur, root, ivs=(0, 7, 12), bright=2600, drive=2.2):
    """Detuned saw stack through an opening-then-closing filter, driven, with a sub."""
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    s = np.zeros(nlen)
    for iv in ivs:
        for det in (-0.12, 0.0, 0.11):
            s += saw(hz(root + iv + det), nlen, rng.random())
    s /= len(ivs) * 3
    dark, lit = lowpass(s, 380, 2), lowpass(s, bright, 2)
    w = np.exp(-tt * 2.2)
    s = dark * (1 - w) + lit * w
    s = np.tanh(s * drive) / np.tanh(drive)
    sub = np.sin(2 * np.pi * hz(root - 12) * tt) * 0.8
    envl = (1 - np.exp(-tt * 40)) * np.exp(-tt / (dur / 2.6))
    return (s * 0.9 + sub) * envl


def war_drum(f0=58, dur=1.4, v=1.0):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    f = f0 * (1 + 1.4 * np.exp(-tt * 28))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3.2)
    skin = bandpass(rng.standard_normal(nlen), 90, 1400) * np.exp(-tt * 18) * 0.7
    slap = highpass(rng.standard_normal(nlen), 2500) * np.exp(-tt * 70) * 0.25
    return np.tanh((body + skin + slap) * 1.6) * v


def metal(dur=2.5):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    parts = [(317, 1.0), (523, 0.7), (911, 0.5), (1433, 0.35), (2207, 0.2), (3301, 0.12)]
    return sum(a * np.sin(2 * np.pi * f * tt + rng.random() * 6) * np.exp(-tt * (1.2 + f / 900)) for f, a in parts) * 0.35


def trailer_hit(dur=3.2, root=38, ivs=(0, 7, 12), scale=1.0):
    nlen = int(dur * SR)
    x = np.zeros(nlen)
    x += braam_big(dur, root, ivs) * 0.9
    x += np.pad(war_drum(52, min(dur, 1.8), 1.0), (0, max(0, nlen - int(min(dur, 1.8) * SR))))[:nlen]
    x += sub_boom(dur, 70, 24)[:nlen] * 0.9
    x += metal(dur)[:nlen] * 0.6
    nz = lowpass(rng.standard_normal(nlen), 5000) * env_exp(nlen, 0.25)
    x += np.tanh(nz * 3) * 0.35
    return x * scale


def tick(f=2600, dur=0.05):
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    return (np.sin(2 * np.pi * f * tt) * 0.6 + highpass(rng.standard_normal(nlen), 4000) * 0.5) * np.exp(-tt * 140)


def shepard(dur, f_lo=60, octaves=7, speed=1.0, noise=0.3):
    """Endlessly rising tone: octave-spaced sines climbing under a bell window."""
    nlen = int(dur * SR); tt = np.arange(nlen) / SR
    out = np.zeros(nlen)
    for k in range(octaves):
        pos = (k + tt / dur * speed * 2) % octaves
        f = f_lo * 2 ** pos
        a = np.exp(-((pos - octaves / 2) ** 2) / 2.2)
        out += a * np.sin(2 * np.pi * np.cumsum(f) / SR)
    out /= octaves / 2
    out += highpass(rng.standard_normal(nlen), 1500) * noise * (tt / dur) ** 2
    return out * (tt / dur) ** 1.4


def pulse_synth(t0, t1, root, step, gain=0.35, pattern=(0, 0, 12, 0)):
    k = 0
    while t0 + k * step < t1:
        nlen = int(step * 0.9 * SR); tt = np.arange(nlen) / SR
        m = root + pattern[k % len(pattern)]
        s = lowpass(saw(hz(m), nlen) + saw(hz(m) * 1.004, nlen), 900 + 500 * (k % 4 == 0))
        place(np.tanh(s * 1.5) * np.exp(-tt * 9) * gain, t0 + k * step)
        k += 1


def snare_roll(t0, t1, v0, v1, rate=0.045, key=38):
    k = 0
    while t0 + k * rate < t1:
        u = k * rate / max(1e-3, t1 - t0)
        drum(t0 + k * rate, key, int(v0 + (v1 - v0) * u)); k += 1


def mute(t0, t1):
    """True silence in the sound design between t0 and t1 (the beat before a hit)."""
    i, j = int(t0 * SR), int(t1 * SR)
    fx[i:j] *= np.linspace(1, 0, j - i) ** 4


Q = 0.48   # a beat at the montage tempo (125 BPM)
SIL0 = HIT - 0.42   # the held breath before the logo

# ── the scores ─────────────────────────────────────────────────────────

if OPT == 'D':   # EPIC TRAILER, D minor all the way: weight, dread, and a colossal minor landing
    # act 1: a low drone and a clock that speeds up; each photograph a deep boom,
    # each word a braam, growing D, F, then a gap of silence and the biggest on A
    note('pad', 0.0, chord('D2', 'A2'), CR0, 55); expr('pad', 0, CR0, 30, 100)
    note('cello', 0.0, n('D2'), CR0, 70); expr('cello', 0, CR0, 25, 105)
    t, gap = 0.3, 0.5
    while t < CR0 - 0.2:
        place(tick(2600 + 400 * (t > 4)), t, 0.35); t += gap; gap = max(0.12, gap * 0.94)
    for i, tp in enumerate(PHOTO):
        place(war_drum(46, 1.6, 0.9), tp + 0.02, 0.9); place(sub_boom(1.8, 60, 28), tp + 0.02, 0.6)
        note('piano', tp + 0.02, [n('D1'), n('D2')], 1.2, 100)
    for i, (tw, r) in enumerate(zip(WORD, [38, 41, 45])):
        place(reverse_swell(0.9), tw - 0.9, 0.7)
        if i == 2: mute(tw - 0.3, tw)
        place(trailer_hit(1.5 + 0.3 * i, r, (0, 7, 12) if i < 2 else (0, 3, 7, 12)), tw, 0.8 + 0.12 * i)
        note('choir', tw, [r + 24, r + 27 if i == 1 else r + 28 if False else r + 27, r + 31], 1.1, 112)
        note('brass', tw, [r, r + 12], 1.0, 120); drum(tw, 49, 100 + i * 10)
    place(shepard(1.3, 80, 6, 0.8, 0.5), CR0 - 1.3, 0.35)
    # act 2: the machine starts: 16th string ostinato, synth pulse, war drums on every cut
    e16 = Q / 4
    osti = ['D3', 'D3', 'F3', 'D3', 'A3', 'D3', 'F3', 'E3']
    for i in range(int((F3D - CR0) / e16)):
        tt0 = CR0 + i * e16
        note('strings2', tt0, n(osti[i % 8]), e16 * 0.8, 90 + (i % 4 == 0) * 25)
    pulse_synth(CR0, F3D, 26, Q / 4, 0.22, (0, 0, 12, 0, 0, 12, 3, 0))
    for k, tc in enumerate(CUT):
        place(war_drum(50 + 6 * (k % 2), 1.0, 0.9), tc, 0.8)
        if k % 2 == 0: place(war_drum(80, 0.6, 0.6), tc + Q / 2, 0.5)
    note('choir', CR0, chord('D4', 'F4', 'A4'), F3D - CR0, 75); expr('choir', CR0, F3D, 40, 125)
    note('trombone', CR0, [n('D2'), n('D3')], 4 * Q, 100); note('trombone', CR0 + 4 * Q, [n('Bb1'), n('Bb2')], 4 * Q, 105)
    place(shepard(F3D - CR0, 70, 7, 1.2, 0.4), CR0, 0.3)
    snare_roll(F3D - 0.96, F3D - 0.12, 50, 120); mute(F3D - 0.12, F3D)
    # act 3: the corridor: a braam, then a full war-drum pattern and the low brass theme
    place(trailer_hit(2.6, 38), F3D, 1.0); drum(F3D, 49, 127)
    pat = [1, 0, 0, 1, 0, 1, 0, 0]
    for i in range(int((REVEAL - F3D) / (Q / 2))):
        tt0 = F3D + i * Q / 2
        if pat[i % 8]: place(war_drum(48, 1.0, 0.9), tt0, 0.75)
        else: place(war_drum(95, 0.4, 0.5), tt0, 0.35)
    for p, b, d in [('D3', 0, 1.5), ('F3', 1.5, 0.5), ('E3', 2, 1), ('A2', 3, 2.5)]:
        note('trombone', F3D + b * Q, [n(p), n(p) - 12], d * Q, 118); note('horn', F3D + b * Q, n(p) + 12, d * Q, 105)
    for i in range(int((HIT - F3D) / (Q / 4))):
        tt0 = F3D + i * Q / 4
        if tt0 < SIL0: note('strings2', tt0, n(osti[i % 8]) + 12 * (tt0 > REVEAL), Q / 4 * 0.8, 95 + (i % 4 == 0) * 25)
    note('choir', F3D, chord('D4', 'F4', 'A4', 'D5'), SIL0 - F3D, 95); expr('choir', F3D, SIL0, 70, 127)
    # the rise, the held breath, the hit
    place(shepard(SIL0 - REVEAL, 60, 7, 1.6, 0.6), REVEAL, 0.55)
    snare_roll(REVEAL, SIL0, 35, 125, 0.04)
    for k in range(int((SIL0 - REVEAL) / 0.12)):
        place(tick(3000), REVEAL + k * 0.12 * (1 - k * 0.004), 0.3)
    place(reverse_swell(0.4), HIT - 0.4, 0.8); mute(SIL0, HIT - 0.4)
    place(trailer_hit(3.2, 38, (0, 7, 12, 15)), HIT, 1.25); place(sub_boom(3.4, 64, 22), HIT, 1.0)
    brass_big = chord('D2', 'A2', 'D3', 'F3', 'A3', 'D4')
    note('brass', HIT, brass_big, 3.0, 127); note('trombone', HIT, brass_big[:4], 3.0, 127)
    note('choir', HIT, chord('D4', 'F4', 'A4', 'D5'), 3.0, 125); note('strings', HIT, brass_big, 3.0, 127)
    note('timp', HIT, n('D2'), 1.0, 127); drum(HIT, 49, 127); drum(HIT, 57, 127)
    note('trem', HIT + 0.8, chord('D5', 'A5'), 2.2, 60)

else:   # RISE, D minor turning to D major: the trailer build, then the heroic landing
    note('pad', 0.0, chord('D2', 'A2'), CR0, 50); expr('pad', 0, CR0, 25, 95)
    t, gap = 0.4, 0.48
    while t < CR0 - 0.2:
        place(tick(2200), t, 0.28); t += gap
    for i, tp in enumerate(PHOTO):
        place(war_drum(48, 1.5, 0.85), tp + 0.02, 0.85); note('piano', tp + 0.02, [n('D1'), n('D2'), n('A2')], 1.2, 95)
        for k, p in enumerate(['A4', 'D5', 'E5', 'F5']):   # a lonely piano motif under each photograph
            note('piano', tp + 0.3 + k * 0.28, n(p) - 12 * (i == 0), 0.5, 70 + i * 8)
    for i, (tw, ch3) in enumerate(zip(WORD, [(38, (0, 7, 12)), (34, (0, 7, 16)), (36, (0, 7, 16))])):
        r, ivs = ch3
        place(reverse_swell(0.9), tw - 0.9, 0.7)
        if i == 2: mute(tw - 0.28, tw)
        place(trailer_hit(1.6 + 0.3 * i, r, ivs), tw, 0.85 + 0.12 * i)
        note('choir', tw, [r + 24 + x for x in ivs], 1.1, 110); note('brass', tw, [r + 12 + x for x in ivs], 1.0, 118)
        drum(tw, 49, 100 + i * 10)
    place(shepard(1.3, 80, 6, 0.8, 0.5), CR0 - 1.3, 0.35)
    # act 2: pulse and ostinato, war drums, choir climbing Dm Bb C
    e16 = Q / 4
    osti = ['D4', 'A3', 'F3', 'A3']
    for i in range(int((F3D - CR0) / e16)):
        tt0 = CR0 + i * e16
        note('strings2', tt0, n(osti[i % 4]), e16 * 0.8, 88 + (i % 4 == 0) * 25)
    pulse_synth(CR0, F3D, 26, Q / 4, 0.2, (0, 12, 0, 12))
    for k, tc in enumerate(CUT):
        place(war_drum(50, 1.0, 0.85), tc, 0.75)
    for k, c in enumerate([chord('D4', 'F4', 'A4'), chord('D4', 'F4', 'Bb4'), chord('E4', 'G4', 'C5')]):
        note('choir', CR0 + k * 1.44, c, 1.44, 90 + k * 12)
    place(shepard(F3D - CR0, 70, 7, 1.2, 0.4), CR0, 0.3)
    snare_roll(F3D - 0.96, F3D - 0.12, 50, 120); mute(F3D - 0.12, F3D)
    # act 3: the theme in full on horns, drums at full stride, the key turning bright
    place(trailer_hit(2.4, 38), F3D, 1.0); drum(F3D, 49, 127)
    pat = [1, 0, 1, 0, 1, 0, 1, 1]
    for i in range(int((SIL0 - F3D) / (Q / 2))):
        tt0 = F3D + i * Q / 2
        place(war_drum(48 if pat[i % 8] else 92, 0.9 if pat[i % 8] else 0.4, 0.9 if pat[i % 8] else 0.5), tt0, 0.7 if pat[i % 8] else 0.35)
    theme = [('A3', 0, 1), ('D4', 1, 1), ('E4', 2, 0.5), ('F4', 2.5, 1.5), ('E4', 4, 0.5), ('D4', 4.5, 0.5), ('C4', 5, 1), ('D4', 6, 2)]
    for p, b, d in theme:
        note('horn', F3D + 0.05 + b * 0.38, [n(p), n(p) - 12], d * 0.39, 118); note('trumpet', F3D + 0.05 + b * 0.38, n(p), d * 0.39, 85)
    for k, c in enumerate([('D2', 'D3', 'F3', 'A3'), ('Bb1', 'Bb2', 'D3', 'F3'), ('C2', 'C3', 'E3', 'G3'), ('D2', 'D3', 'F3', 'A3')]):
        note('trem', F3D + k * 0.76, chord(*c)[1:], 0.78, 95); note('contrabass', F3D + k * 0.76, n(c[0]), 0.78, 110)
    for i in range(int((SIL0 - REVEAL) / (Q / 4))):
        note('strings2', REVEAL + i * Q / 4, n(['A4', 'D5', 'E5', 'F5'][i % 4]), Q / 4 * 0.8, 95 + (i % 4 == 0) * 25)
    note('choir', REVEAL, chord('Bb3', 'D4', 'F4', 'Bb4'), 1.3, 105); note('choir', REVEAL + 1.3, chord('C4', 'E4', 'G4', 'C5'), SIL0 - REVEAL - 1.3, 115)
    expr('choir', REVEAL, SIL0, 80, 127)
    place(shepard(SIL0 - REVEAL, 60, 7, 1.6, 0.6), REVEAL, 0.55); snare_roll(REVEAL, SIL0, 35, 125, 0.04)
    place(reverse_swell(0.4), HIT - 0.4, 0.8); mute(SIL0, HIT - 0.4)
    # D major: the light comes on
    place(trailer_hit(3.2, 38, (0, 7, 12, 16)), HIT, 1.25); place(sub_boom(3.4, 64, 22), HIT, 1.0)
    big = chord('D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4')
    note('brass', HIT, big, 3.0, 127); note('trombone', HIT, big[:4], 3.0, 127); note('horn', HIT, chord('D4', 'F#4', 'A4'), 3.0, 125)
    note('trumpet', HIT, chord('A4', 'D5'), 2.8, 120); note('choir', HIT, chord('D4', 'F#4', 'A4', 'D5'), 3.0, 125)
    note('strings', HIT, big, 3.0, 127); note('timp', HIT, n('D2'), 1.0, 127); drum(HIT, 49, 127); drum(HIT, 57, 127)
    note('glock', HIT + 0.5, chord('D6', 'F#6', 'A6'), 1.5, 70)

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
mix = mix + (f2 * 0.75 + f2w * 0.22) * 1.15
# the held breath: the whole orchestra drops out before the logo hit, and the
# reverse swell (already in the sound design) draws it back in
def duck(a, b, floor, ramp=0.06):
    i, j, r = int(a * SR), int(b * SR), int(ramp * SR)
    g = np.ones(len(mix)); g[i:j] = floor
    g[i - r:i] = np.linspace(1, floor, r); g[j:j + r] = np.linspace(floor, 1, r)
    mix[:] = mix * g[:, None]
duck(SIL0, HIT - 0.06, 0.04, 0.05)
duck(WORD[2] - 0.3, WORD[2] - 0.04, 0.12, 0.04)
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
