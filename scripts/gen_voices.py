#!/usr/bin/env python3
"""Generate all TTS dialogue clips for the MwalimuEase TikTok skit."""
import asyncio
import json
import os
import subprocess

import edge_tts

OUT = "/home/collins/Documents/mwalimuease-tiktok/public/audio"
os.makedirs(OUT, exist_ok=True)

# id, voice, rate, pitch, text, planned_start_seconds (guidance)
LINES = [
    ("t1_records", "en-GB-RyanNeural", "+8%", "+2Hz", "Sir! I need the student records!", 2.3),
    ("p1_fees", "en-GB-SoniaNeural", "+10%", "+0Hz", "Headteacher! I've been trying to get an update about my child's fees!", 3.9),
    ("a1_reports", "en-KE-AsiliaNeural", "+8%", "+0Hz", "Sir, we also need the school reports!", 5.6),
    ("t2_where", "en-GB-RyanNeural", "+10%", "+2Hz", "Sir, where is the information?", 7.6),
    ("a2_which", "en-KE-AsiliaNeural", "+10%", "+0Hz", "Which file has the latest records?", 9.4),
    ("p2_answer", "en-GB-SoniaNeural", "+10%", "+0Hz", "So... are you going to answer me?", 11.2),
    ("h1_onetime", "en-KE-ChilembaNeural", "+12%", "-4Hz", "ONE AT A TIME! PLEASE!", 13.4),
    ("h2_feellike", "en-KE-ChilembaNeural", "-5%", "-4Hz", "Is running a school... supposed to feel like this?", 16.4),
    ("c1_hardway", "en-US-AndrewNeural", "+0%", "+0Hz", "Sir... why are you doing all this the hard way?", 21.2),
    ("h3_whatmean", "en-KE-ChilembaNeural", "+5%", "-4Hz", "What do you mean?", 24.6),
    ("c2_tried", "en-US-AndrewNeural", "+0%", "+0Hz", "Have you tried... MwalimuEase?", 25.8),
    ("h4_mwaliwhat", "en-KE-ChilembaNeural", "+5%", "-4Hz", "Mwali... what?", 28.4),
    ("t3_wait", "en-GB-RyanNeural", "+5%", "+2Hz", "Wait... you're telling me we can manage the whole school from one place?", 33.2),
    ("c3_idea", "en-US-AndrewNeural", "+0%", "+0Hz", "That's the idea! MwalimuEase puts your marks, fees, timetables and reports in one dashboard.", 37.0),
    ("h5_suffering", "en-KE-ChilembaNeural", "+8%", "-4Hz", "And I've been suffering all this time?", 42.6),
    ("c4_unfortunately", "en-US-AndrewNeural", "+5%", "+0Hz", "Unfortunately, yes!", 44.4),
    ("t4_problem", "en-GB-RyanNeural", "+10%", "+2Hz", "Sir! I have another problem!", 48.2),
    ("h6_tried", "en-KE-ChilembaNeural", "+0%", "-4Hz", "Have you tried MwalimuEase?", 50.6),
    ("h7_stop", "en-KE-ChilembaNeural", "-5%", "-4Hz", "Stop making school management harder than it needs to be!", 54.6),
]


async def gen(name, voice, rate, pitch, text):
    out = os.path.join(OUT, f"{name}.mp3")
    for attempt in range(4):
        try:
            c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
            await c.save(out)
            print("ok", name)
            return
        except Exception as e:
            print("retry", name, type(e).__name__)
            await asyncio.sleep(2 + attempt * 2)
    raise RuntimeError(f"failed {name}")


async def main():
    for n, v, r, p, t, _ in LINES:
        await gen(n, v, r, p, t)
        await asyncio.sleep(0.5)

    timing = {}
    for name, _, _, _, text, planned in LINES:
        path = os.path.join(OUT, f"{name}.mp3")
        dur = float(
            subprocess.check_output(
                [
                    "ffprobe", "-v", "error", "-show_entries",
                    "format=duration", "-of", "csv=p=0", path,
                ]
            ).strip()
        )
        timing[name] = {"text": text, "planned": planned, "duration": round(dur, 3)}

    with open(os.path.join(OUT, "timing.json"), "w") as f:
        json.dump(timing, f, indent=2)
    print(json.dumps(timing, indent=2))


asyncio.run(main())
