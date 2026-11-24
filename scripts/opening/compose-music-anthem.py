"""
Original music for the Approach Media opening in the style of a studio logo
fanfare: three heroic orchestral options (A, B, C), each timed to the film's
cuts. Original melodies and progressions; no existing theme is quoted. Notes are placed at absolute times (seconds), written to MIDI,
rendered with the FluidR3 General MIDI orchestra, then mixed with synthesised
sound design (sub booms, impacts, risers, whooshes) and a convolution reverb.

usage: python3 compose-music-anthem.py <A|B|C> <out.wav>
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


Q = 0.48   # a beat at the montage tempo (125 BPM)

if OPT == 'A':   # GRAND ANTHEM, D major: a rising horn call, the anthem in the corridor, a bVI-bVII-I landing
    # act 1: string pedal swelling from nothing; a horn call answers each photograph;
    # each word lands on a brass + choir chord, climbing Bb, C, D
    note('strings', 0.0, chord('D2', 'A2', 'D3', 'A3'), CR0, 70); expr('strings', 0, CR0, 25, 110)
    note('contrabass', 0.0, n('D1'), CR0, 80); expr('contrabass', 0, CR0, 30, 110)
    call = [('A3', 0.0, 0.3), ('D4', 0.3, 0.45), ('A4', 0.75, 0.6)]
    for i, t in enumerate(PHOTO):
        note('timp', t + 0.02, n('D2'), 0.6, 80 + i * 10)
        for p, dt, d in call: note('horn', t + 0.1 + dt, [n(p), n(p) - 12], d, 80 + i * 10)
    for i, (t, ch3) in enumerate(zip(WORD, [('Bb2', 'D3', 'F3', 'Bb3', 'D4', 'F4'), ('C3', 'E3', 'G3', 'C4', 'E4', 'G4'), ('D3', 'F#3', 'A3', 'D4', 'F#4', 'A4')])):
        snare_roll(t - 0.6, t, 40, 100)
        c = chord(*ch3)
        brass_tutti(t, c, 0.95, 110 + i * 6); note('choir', t, c[2:], 0.95, 100 + i * 8)
        note('timp', t, c[0] - 12, 0.5, 120); drum(t, 49, 105 + i * 8); drum(t, 36, 120)
        place(impact(1.2, 3500), t, 0.5 + i * 0.1)
    place(riser(1.2, 200, 1600, 0.5), CR0 - 1.2, 0.45)
    # act 2: spiccato 16ths, the first half of the anthem on horns, snare on every cut
    prog = ['D', 'B', 'G', 'A']
    roots = {'D': 'D2', 'B': 'B1', 'G': 'G1', 'A': 'A1'}
    tri = {'D': ['D4', 'F#4', 'A4'], 'B': ['D4', 'F#4', 'B4'], 'G': ['D4', 'G4', 'B4'], 'A': ['C#4', 'E4', 'A4']}
    for i in range(int((F3D - CR0) / (Q / 4))):
        t = CR0 + i * Q / 4; c = prog[min(3, int((t - CR0) / (2 * Q)) % 4)]
        note('strings2', t, n(tri[c][i % 3]) - 12, Q / 4 * 0.8, 80 + (i % 4 == 0) * 25)
        if i % 8 == 0: note('contrabass', t, n(roots[c]), Q * 2, 100); note('trombone', t, n(roots[c]) + 12, Q * 1.8, 90)
    for t in CUT: drum(t, 38, 105); note('timp', t, n('D2'), 0.25, 100)
    anthem_a = [('A3', 0, 1), ('D4', 1, 1.5), ('E4', 2.5, 0.5), ('F#4', 3, 2), ('E4', 5, 0.5), ('D4', 5.5, 0.5), ('B3', 6, 1), ('A3', 7, 1)]
    for p, b, d in anthem_a: note('horn', CR0 + b * Q, [n(p), n(p) - 12], d * Q * 1.02, 108)
    snare_roll(F3D - 0.9, F3D, 50, 115); place(reverse_swell(1.2), F3D - 1.2, 0.6)
    # act 3: the full anthem on trumpets and horns in octaves over tremolo strings
    drum(F3D, 49, 127); drum(F3D, 57, 120); note('timp', F3D, n('D2'), 0.8, 127); place(impact(2.0), F3D, 0.8)
    anthem = [('A4', 0, 0.75), ('D5', 0.75, 1.0), ('E5', 1.75, 0.25), ('F#5', 2, 1.5), ('A5', 3.5, 0.5), ('G5', 4, 0.75), ('F#5', 4.75, 0.25), ('E5', 5, 0.75), ('D5', 5.75, 0.25), ('E5', 6, 1.5)]
    B3 = 0.44
    for p, b, d in anthem:
        note('trumpet', F3D + 0.05 + b * B3, n(p), d * B3 * 1.02, 112); note('horn', F3D + 0.05 + b * B3, [n(p) - 12], d * B3 * 1.02, 112)
    for i, (r, c3) in enumerate([('D2', ['D3', 'F#3', 'A3', 'D4']), ('B1', ['B2', 'D3', 'F#3', 'B3']), ('G1', ['G2', 'B2', 'D3', 'G3']), ('A1', ['A2', 'C#3', 'E3', 'A3'])]):
        t = F3D + i * 2 * B3 * 0.85 if i < 3 else F3D + 2.0
        note('trem', t, chord(*c3), 0.9, 92); note('contrabass', t, n(r), 0.9, 100); note('timp', t, n(r) + 12, 0.3, 105)
    # the build: rising strings, a timpani and snare roll, then bVI and bVII stabs and the hit
    snare_roll(REVEAL, HIT - 0.05, 35, 120); timp_roll(REVEAL, HIT - 0.6, n('A1'), 45, 115)
    for k, p in enumerate(['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4']):
        note('strings', REVEAL + 0.1 + k * 0.27, [n(p), n(p) + 12], 0.3, 80 + k * 5)
    expr('strings', REVEAL, HIT, 60, 127)
    brass_tutti(HIT - 0.96, chord('Bb2', 'F3', 'Bb3', 'D4', 'F4'), 0.4, 120)
    brass_tutti(HIT - 0.48, chord('C3', 'G3', 'C4', 'E4', 'G4'), 0.4, 124)
    place(riser(HIT - REVEAL, 120, 1100, 0.6), REVEAL, 0.5)
    big = chord('D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4', 'D5')
    brass_tutti(HIT, big, 3.0, 127); note('strings', HIT, big, 3.1, 127); note('choir', HIT, chord('D4', 'F#4', 'A4', 'D5'), 3.0, 118)
    note('trumpet', HIT + 0.02, n('D5'), 2.8, 120); note('contrabass', HIT, n('D1'), 3.1, 120)
    note('timp', HIT, n('D2'), 1.0, 127); drum(HIT, 49, 127); drum(HIT, 57, 127); drum(HIT, 36, 127)
    note('glock', HIT + 0.4, chord('D6', 'F#6', 'A6'), 1.6, 70)
    place(impact(3.0, 6000), HIT, 1.0); place(sub_boom(3.2), HIT, 0.85)

elif OPT == 'B':   # DARK TO LIGHT, C minor turning to C major: choir, low brass, the major chord at the logo
    note('choir', 0.0, chord('C3', 'G3', 'C4'), CR0, 70); expr('choir', 0, CR0, 25, 105)
    note('contrabass', 0.0, n('C1'), CR0, 85); note('cello', 0.0, n('C2'), CR0, 75); expr('cello', 0, CR0, 30, 110)
    for i, t in enumerate(PHOTO):
        place(sub_boom(1.8, 66, 30), t + 0.02, 0.55 + i * 0.12); note('timp', t + 0.02, n('C2'), 0.8, 85 + i * 10)
        note('piano', t + 0.02, [n('C1'), n('C2'), n('G2')], 1.3, 90)
    for i, (t, ch3) in enumerate(zip(WORD, [('C2', 'G2', 'C3', 'Eb3', 'G3'), ('Ab1', 'Eb2', 'Ab2', 'C3', 'Eb3'), ('Bb1', 'F2', 'Bb2', 'D3', 'F3')])):
        place(reverse_swell(0.8), t - 0.8, 0.6)
        c = chord(*ch3)
        brass_tutti(t, c, 1.0, 118 + i * 4); note('choir', t, [p + 12 for p in c[2:]], 1.0, 110)
        note('taiko', t, n('C2'), 0.6, 125); drum(t, 36, 127); drum(t, 49, 100 + i * 10)
        place(braam(1.2, c[0]), t, 0.7 + i * 0.1); place(impact(1.3, 3000), t, 0.55)
    place(riser(1.3, 150, 1400, 0.7), CR0 - 1.3, 0.5)
    # act 2: 8th-note string ostinato in C minor, taiko on cuts, low horns sing a slow line
    osti = ['C4', 'G3', 'Eb4', 'G3', 'D4', 'G3', 'Eb4', 'G3']
    harm = ['C2', 'C2', 'Ab1', 'Ab1', 'Eb2', 'Eb2', 'Bb1', 'Bb1']
    for i in range(int((F3D - CR0) / (Q / 2))):
        t = CR0 + i * Q / 2
        note('strings2', t, n(osti[i % 8]), Q / 2 * 0.85, 85 + (i % 2 == 0) * 20)
        if i % 4 == 0: k = (i // 4) % 8; note('contrabass', t, n(harm[k]), Q * 2, 100)
    for t in CUT: note('taiko', t, n('C2'), 0.4, 118); drum(t, 36, 112)
    for p, b, d in [('G3', 0, 2), ('Ab3', 2, 2), ('G3', 4, 1), ('F3', 5, 1), ('Eb3', 6, 2)]:
        note('horn', CR0 + b * Q, [n(p), n(p) - 12], d * Q, 100)
    note('choir', CR0 + 4 * Q, chord('C4', 'Eb4', 'G4'), F3D - CR0 - 4 * Q, 80); expr('choir', CR0 + 4 * Q, F3D, 50, 120)
    place(riser(1.5, 150, 1500, 0.8), F3D - 1.5, 0.5); timp_roll(F3D - 1.2, F3D, n('C2'), 50, 115)
    # act 3: the broad brass theme, Cm Ab Eb Bb, over driving low strings
    drum(F3D, 49, 127); place(braam(2.6, 36), F3D, 0.85); place(impact(2.2), F3D, 0.8)
    theme = [('G4', 0, 1), ('C5', 1, 1.5), ('Bb4', 2.5, 0.5), ('Ab4', 3, 1), ('G4', 4, 1), ('Eb5', 5, 1.5), ('D5', 6.5, 0.5)]
    for p, b, d in theme:
        note('trumpet', F3D + b * 0.42, n(p), d * 0.43, 110); note('horn', F3D + b * 0.42, [n(p) - 12], d * 0.43, 112)
    for i, c3 in enumerate([('C2', 'G2', 'C3', 'Eb3'), ('Ab1', 'Eb2', 'Ab2', 'C3'), ('Eb2', 'Bb2', 'Eb3', 'G3'), ('Bb1', 'F2', 'Bb2', 'D3')]):
        t = F3D + i * 0.84
        note('trem', t, chord(*c3)[1:], 0.86, 95); note('contrabass', t, n(c3[0]), 0.86, 105); note('taiko', t, n('C2'), 0.4, 115)
    for k in range(int((REVEAL - F3D) / 0.21)):
        note('strings2', F3D + k * 0.21, n('C3') if k % 2 == 0 else n('G2'), 0.18, 95)
    # the build: choir rising, cymbal swell, a beat of air, then the major chord
    note('choir', REVEAL, chord('G3', 'C4', 'Eb4', 'G4'), HIT - 0.35 - REVEAL, 95); expr('choir', REVEAL, HIT - 0.35, 50, 127)
    timp_roll(REVEAL, HIT - 0.35, n('G1'), 40, 120); snare_roll(HIT - 1.4, HIT - 0.35, 50, 120)
    for k, p in enumerate(['G3', 'Ab3', 'Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4']):
        note('strings', REVEAL + 0.15 + k * 0.3, [n(p), n(p) + 12], 0.32, 85 + k * 4)
    place(riser(HIT - 0.35 - REVEAL, 100, 1300, 0.7), REVEAL, 0.6)
    big = chord('C2', 'G2', 'C3', 'E3', 'G3', 'C4', 'E4', 'G4', 'C5')
    brass_tutti(HIT, big, 3.1, 127); note('strings', HIT, big, 3.1, 127); note('choir', HIT, chord('C4', 'E4', 'G4', 'C5'), 3.1, 122)
    note('contrabass', HIT, n('C1'), 3.1, 125); note('timp', HIT, n('C2'), 1.0, 127); note('taiko', HIT, n('C2'), 1.0, 127)
    drum(HIT, 49, 127); drum(HIT, 57, 127); note('bell', HIT + 0.05, chord('C6', 'G6'), 2.2, 80)
    place(braam(3.4, 36), HIT, 0.8); place(impact(3.2, 6000), HIT, 1.0); place(sub_boom(3.4, 66, 26), HIT, 1.0)

else:   # FANFARE RUSH, E major: bright triplet trumpet calls, string runs, C-D-E landing
    def fanfare(t, root, v):
        r = n(root)
        for k, (dp, dt, d) in enumerate([(0, 0, 0.11), (0, 0.13, 0.11), (0, 0.26, 0.11), (7, 0.4, 0.3), (12, 0.72, 0.55)]):
            note('trumpet', t + dt, [r + dp, r + dp - 12], d, v)
    note('strings', 0.0, chord('E2', 'B2', 'E3'), CR0, 65); expr('strings', 0, CR0, 30, 105)
    for i, t in enumerate(PHOTO):
        note('timp', t, n('E2'), 0.5, 85 + i * 10); drum(t, 36, 100)
        fanfare(t + 0.15, 'E4', 90 + i * 8)
        for k, p in enumerate(['E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D#5', 'E5']):   # string run up into the word
            note('strings2', t + 1.1 + k * 0.045, n(p), 0.12, 80)
    for i, (t, ch3) in enumerate(zip(WORD, [('C3', 'G3', 'C4', 'E4', 'G4'), ('D3', 'A3', 'D4', 'F#4', 'A4'), ('E3', 'B3', 'E4', 'G#4', 'B4')])):
        snare_roll(t - 0.45, t, 50, 110, 0.04)
        c = chord(*ch3)
        brass_tutti(t, c, 0.8, 115 + i * 5); note('strings', t, c, 0.8, 110)
        note('timp', t, c[0] - 12, 0.4, 122); drum(t, 49, 110 + i * 6); drum(t, 36, 125)
        place(impact(1.0, 4500), t, 0.5)
    # act 2: galloping strings (8th + two 16ths), brass stabs on the off-beats, snare on cuts
    prog = [('E', ['E3', 'G#3', 'B3']), ('C#', ['C#3', 'E3', 'G#3']), ('A', ['A2', 'C#3', 'E3']), ('B', ['B2', 'D#3', 'F#3'])]
    i = 0; t = CR0
    while t < F3D - 0.1:
        name, tri = prog[int((t - CR0) / (2 * Q)) % 4]
        for dt, d in ((0, Q / 2), (Q / 2, Q / 4), (3 * Q / 4, Q / 4)):
            note('strings2', t + dt, [n(tri[0]) + 12, n(tri[2]) + 12], d * 0.8, 90 + (dt == 0) * 25)
        if i % 2 == 0: note('contrabass', t, n(tri[0]) - 12, Q * 2, 105)
        if i % 2 == 1: brass_tutti(t + Q / 2, chord(*tri), 0.18, 105)
        t += Q; i += 1
    for t in CUT: drum(t, 38, 112); drum(t, 36, 100)
    fanfare(CR0 + 4 * Q, 'B4', 100)
    snare_roll(F3D - 0.96, F3D, 50, 120, 0.04)
    # act 3: the fanfare theme, triplets and leaps, over tremolo and timpani
    drum(F3D, 49, 127); drum(F3D, 57, 120); place(impact(2.0, 5000), F3D, 0.8)
    theme = [('B4', 0, 0.33), ('B4', 0.33, 0.33), ('B4', 0.66, 0.34), ('E5', 1, 1), ('F#5', 2, 0.5), ('G#5', 2.5, 0.5), ('A5', 3, 1), ('G#5', 4, 0.33),
             ('F#5', 4.33, 0.33), ('E5', 4.66, 0.34), ('F#5', 5, 1), ('B4', 6, 1)]
    for p, b, d in theme:
        note('trumpet', F3D + 0.05 + b * 0.42, n(p), d * 0.43, 115); note('horn', F3D + 0.05 + b * 0.42, [n(p) - 12], d * 0.43, 110)
    for k, c3 in enumerate([('E2', 'E3', 'G#3', 'B3'), ('C#2', 'C#3', 'E3', 'G#3'), ('A1', 'A2', 'C#3', 'E3'), ('B1', 'B2', 'D#3', 'F#3')]):
        t = F3D + k * 0.67
        note('trem', t, chord(*c3)[1:], 0.7, 95); note('contrabass', t, n(c3[0]), 0.7, 105); note('timp', t, n(c3[0]) + 12, 0.25, 110)
    # the build, then C and D stabs, then E
    snare_roll(REVEAL, HIT - 0.05, 35, 122, 0.04); timp_roll(REVEAL, HIT - 1.0, n('B1'), 45, 110)
    for rep in range(3):
        for k, p in enumerate(['B3', 'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A4', 'B4']):
            note('strings2', REVEAL + 0.1 + rep * 0.62 + k * 0.07, n(p) + rep * 12 // 2, 0.12, 85 + rep * 10)
    expr('strings', REVEAL, HIT, 60, 127); note('strings', REVEAL, chord('B3', 'D#4', 'F#4'), HIT - 1.0 - REVEAL, 90)
    brass_tutti(HIT - 0.96, chord('C3', 'G3', 'C4', 'E4', 'G4'), 0.42, 122)
    brass_tutti(HIT - 0.48, chord('D3', 'A3', 'D4', 'F#4', 'A4'), 0.42, 125)
    place(riser(HIT - REVEAL, 150, 1300, 0.6), REVEAL, 0.5)
    big = chord('E2', 'B2', 'E3', 'G#3', 'B3', 'E4', 'G#4', 'B4', 'E5')
    brass_tutti(HIT, big, 3.0, 127); note('strings', HIT, big, 3.0, 127); note('choir', HIT, chord('E4', 'G#4', 'B4', 'E5'), 3.0, 112)
    fanfare(HIT + 0.05, 'E5', 115)
    note('contrabass', HIT, n('E1'), 3.0, 122); note('timp', HIT, n('E2'), 1.0, 127)
    drum(HIT, 49, 127); drum(HIT, 57, 127); drum(HIT, 36, 127); note('glock', HIT + 0.5, chord('E6', 'G#6', 'B6'), 1.5, 72)
    place(impact(3.0, 6500), HIT, 1.0); place(sub_boom(3.0), HIT, 0.85)

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
