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
    ("t1_records", "en-GB-RyanNeural", "+8%", "+2Hz", "Sir! The parents' meeting starts in ten minutes — I need the records NOW!", 2.0),
    ("p1_fees", "en-GB-SoniaNeural", "+10%", "+0Hz", "I paid on M-Pesa on Monday — how can you not find the receipt?!", 4.3),
    ("a1_reports", "en-KE-AsiliaNeural", "+8%", "+0Hz", "Sir! The education office wants the returns by Friday!", 5.9),
    ("t2_where", "en-GB-RyanNeural", "+10%", "+2Hz", "Sir! Which file did you put in the drawer?!", 7.8),
    ("p2_answer", "en-GB-SoniaNeural", "+10%", "+0Hz", "Hello? HELLO? I can see you sitting there!", 11.6),
    ("h1_onetime", "en-KE-ChilembaNeural", "+12%", "-4Hz", "Yes—no—fees—records—ONE AT A TIME! PLEASE!", 13.7),
    ("h2_feellike", "en-KE-ChilembaNeural", "-5%", "-4Hz", "Is running a school... supposed to feel like this?", 17.2),
    ("c1_hardway", "en-US-AndrewNeural", "+0%", "+0Hz", "Sir... why are you doing all this the hard way?", 21.6),
    ("h3_whatmean", "en-KE-ChilembaNeural", "+5%", "-4Hz", "What do you mean?", 24.9),
    ("c2_tried", "en-US-AndrewNeural", "+0%", "+0Hz", "Have you tried... MwalimuEase?", 27.1),
    ("h4_mwaliwhat", "en-KE-ChilembaNeural", "+5%", "-4Hz", "Mwali... what?", 29.8),
    ("t3_wait", "en-GB-RyanNeural", "+5%", "+2Hz", "Wait — ALL of it? In one place?", 32.8),
    ("c3_idea", "en-US-AndrewNeural", "+0%", "+0Hz", "One dashboard. Marks, fees, timetables — everything's in there.", 37.2),
    ("h5_suffering", "en-KE-ChilembaNeural", "+8%", "-4Hz", "And I've been suffering all this time?", 44.1),
    ("c4_unfortunately", "en-US-AndrewNeural", "+5%", "+0Hz", "Unfortunately, yes!", 46.9),
    ("t4_problem", "en-GB-RyanNeural", "+10%", "+2Hz", "Sir! The printer has jammed — AGAIN!", 49.0),
    ("h6_tried", "en-KE-ChilembaNeural", "+0%", "-4Hz", "Have you tried MwalimuEase?", 52.6),
    ("p3_fees", "en-GB-SoniaNeural", "+8%", "+0Hz", "Headteacher! About my child's fees—", 55.6),
    ("h7_tried", "en-KE-ChilembaNeural", "-8%", "-4Hz", "Have you tried MwalimuEase?", 58.9),
]


async def gen(name, voice, rate, pitch, text):
    out = os.path.join(OUT, f"{name}.mp3")
    if os.path.exists(out):
        print("skip", name)
        return
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
