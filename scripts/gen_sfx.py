#!/usr/bin/env python3
"""Synthesize SFX and background music for the skit (pure python WAV -> mp3)."""
import math
import os
import struct
import subprocess
import wave
import random

OUT = "/home/collins/Documents/mwalimuease-tiktok/public/audio"
os.makedirs(OUT, exist_ok=True)
SR = 44100


def write_wav(name, samples):
    path = os.path.join(OUT, name + ".wav")
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        data = b"".join(
            struct.pack("<h", int(max(-1.0, min(1.0, s)) * 32767)) for s in samples
        )
        w.writeframes(data)
    subprocess.run(
        ["ffmpeg", "-y", "-i", path, "-codec:a", "libmp3lame", "-q:a", "4",
         os.path.join(OUT, name + ".mp3")],
        check=True, capture_output=True,
    )
    os.remove(path)


def env(t, dur, a=0.005, r=0.08):
    if t < a:
        return t / a
    if t > dur - r:
        return max(0.0, (dur - t) / r)
    return 1.0


def sine(f, dur, amp=0.5, a=0.005, r=0.06, f2=None):
    out = []
    n = int(dur * SR)
    for i in range(n):
        t = i / SR
        freq = f if f2 is None else f + (f2 - f) * t / dur
        out.append(amp * env(t, dur, a, r) * math.sin(2 * math.pi * freq * t))
    return out


def noise(dur, amp=0.3, lp=1.0):
    # simple filtered noise (one-pole lowpass)
    out = []
    n = int(dur * SR)
    last = 0.0
    for i in range(n):
        t = i / SR
        last += lp * (random.uniform(-1, 1) - last)
        out.append(amp * env(t, dur, 0.01, 0.1) * last)
    return out


def mix(*tracks):
    n = max(len(t) for t in tracks)
    out = [0.0] * n
    for t in tracks:
        for i, s in enumerate(t):
            out[i] += s
    return out


def delay(track, secs):
    return [0.0] * int(secs * SR) + track


# ---- phone ring (classic double ring: 440+480 pulsing) ----
def phone_ring(dur=2.4):
    out = [0.0] * int(dur * SR)
    n = int(dur * SR)
    ring_on = lambda t: (t % 2.0) < 1.0  # 1s on, 1s off
    for i in range(n):
        t = i / SR
        if ring_on(t):
            trill = 0.5 + 0.5 * math.sin(2 * math.pi * 20 * t)
            out[i] = 0.22 * trill * (
                math.sin(2 * math.pi * 440 * t) + math.sin(2 * math.pi * 480 * t)
            ) / 2
    return out


write_wav("sfx_ring", phone_ring(2.4))

# second phone - different pitch (mobile buzz ring)
def mobile_ring(dur=2.0):
    out = [0.0] * int(dur * SR)
    n = int(dur * SR)
    for i in range(n):
        t = i / SR
        gate = (t % 0.4) < 0.18
        if gate:
            out[i] = 0.25 * math.sin(2 * math.pi * (880 + 40 * math.sin(2 * math.pi * 15 * t)) * t)
    return out

write_wav("sfx_ring2", mobile_ring(2.0))

# ---- paper whoosh ----
write_wav("sfx_whoosh", noise(0.35, 0.45, 0.35))
write_wav("sfx_thump", sine(90, 0.25, 0.5, a=0.002, r=0.2, f2=45))
write_wav("sfx_pop", sine(500, 0.12, 0.4, a=0.002, r=0.1, f2=900))
write_wav("sfx_ding", mix(sine(1046.5, 0.6, 0.35), sine(1568, 0.6, 0.15)))
write_wav("sfx_riser", sine(220, 0.9, 0.3, a=0.05, r=0.15, f2=880))
write_wav("sfx_boing", sine(200, 0.5, 0.4, a=0.003, r=0.3, f2=120))

# record scratch (freeze)
def scratch(dur=0.5):
    out = []
    n = int(dur * SR)
    ph = 0.0
    for i in range(n):
        t = i / SR
        f = 400 * (1 - t / dur) + 60
        ph += 2 * math.pi * f / SR
        out.append(0.3 * (1 - t / dur) * (math.sin(ph) + 0.4 * random.uniform(-1, 1)))
    return out

write_wav("sfx_scratch", scratch(0.5))

# sad trombone "wah wah"
def trombone():
    notes = [(233, 0.35), (220, 0.35), (208, 0.35), (196, 0.8)]
    out = []
    for f, d in notes:
        out += [
            0.28 * env(i / SR, d, 0.02, 0.06)
            * (math.sin(2 * math.pi * f * i / SR) + 0.5 * math.sin(2 * math.pi * 2 * f * i / SR))
            for i in range(int(d * SR))
        ]
    return out

write_wav("sfx_wahwah", trombone())

# laughter-ish short chirps for end laugh
def laugh():
    out = []
    for k in range(5):
        f = 300 + 60 * (k % 2)
        seg = sine(f, 0.12, 0.18, a=0.01, r=0.06, f2=f * 0.85)
        out += seg + [0.0] * int(0.02 * SR)
    return out

write_wav("sfx_laugh", laugh())

# whoosh into brand screen
write_wav("sfx_swoosh", noise(0.7, 0.35, 0.6))
write_wav("sfx_ta_da", mix(
    sine(523, 0.9, 0.25), sine(659, 0.9, 0.25), delay(sine(784, 0.7, 0.25), 0.12),
    delay(sine(1047, 0.9, 0.2), 0.24)))

# ---------- background music: quirky plucky loop ----------
BPM = 112
BEAT = 60.0 / BPM
random.seed(7)


def pluck(freq, dur, amp=0.32):
    n = int(dur * SR)
    out = []
    for i in range(n):
        t = i / SR
        e = math.exp(-7 * t / dur)
        s = (math.sin(2 * math.pi * freq * t) + 0.35 * math.sin(2 * math.pi * freq * 2.01 * t))
        out.append(amp * e * s)
    return out


def hat(dur, amp=0.08):
    return noise(dur, amp, 0.9)


def kick(dur=0.12, amp=0.35):
    return sine(150, dur, amp, a=0.002, r=dur - 0.02, f2=55)


def bass(freq, dur, amp=0.22):
    n = int(dur * SR)
    out = []
    for i in range(n):
        t = i / SR
        out.append(amp * env(t, dur, 0.01, 0.05) * math.tanh(1.4 * math.sin(2 * math.pi * freq * t)))
    return out


def build_music(loop_bars=8):
    # A minor-ish playful progression: C - G - Am - F
    roots = [261.63, 196.0, 220.0, 174.61]
    penta = [523.25, 587.33, 659.25, 783.99, 880.0]
    bar = 4 * BEAT
    total = bar * loop_bars
    n = int(total * SR)
    out = [0.0] * n

    def add_at(time_s, samples):
        start = int(time_s * SR)
        for i, s in enumerate(samples):
            if start + i < n:
                out[start + i] += s

    for bar_i in range(loop_bars):
        root = roots[bar_i % 4]
        add_at(bar_i * bar, bass(root / 2, 2 * BEAT))
        add_at(bar_i * bar + 2 * BEAT, bass(root / 2 * 1.5, 2 * BEAT))
        for b in range(4):
            t = bar_i * bar + b * BEAT
            if b % 2 == 0:
                add_at(t, kick())
            add_at(t + BEAT / 2, hat(0.06))
            # plucky melody on off-beats
            if random.random() < 0.85:
                f = random.choice(penta)
                add_at(t + BEAT / 2, pluck(f, 0.35, 0.16))
            if random.random() < 0.4:
                add_at(t, pluck(root * 2, 0.25, 0.10))
    return out


write_wav("music_bed", build_music(12))  # ~25.7s, looped in composition

# tense chaos sting for scene 2 (faster, higher)
def build_tension():
    bar = 4 * (60.0 / 140)
    n = int(8 * bar * SR)
    out = [0.0] * n

    def add_at(time_s, samples):
        start = int(time_s * SR)
        for i, s in enumerate(samples):
            if start + i < n:
                out[start + i] += s

    for bar_i in range(8):
        for b in range(4):
            t = bar_i * bar + b * (60.0 / 140)
            add_at(t, kick(0.1, 0.3))
            add_at(t + 0.5 * (60.0 / 140), hat(0.05, 0.07))
            add_at(t, pluck([440, 466, 415, 523][b], 0.18, 0.12))
    return out


write_wav("music_tension", build_tension())
print("done", os.listdir(OUT))
