# MwalimuEase TikTok Skit — "The Headteacher Who Was Tired of Everything"

A ~63-second animated stickman comedy skit advertising
[MwalimuEase](https://mwalimuease.com), built with
[Remotion](https://remotion.dev).

- **Format:** 1080x1920 (9:16 vertical), 30 fps, ~63 s
- **Characters:** stressed headteacher, dramatic teacher, overwhelmed admin,
  impatient parent (video call), and the calm teacher who saves the day
- **Scene 4** shows the real MwalimuEase product UI (public marketing
  screenshots from mwalimuease.com)

## Structure

```
src/
  components/   Stickman, Office, Camera, UI (bubbles/captions/audio)
  scenes/       Scene1..Scene5
  timeline.ts   dialogue, SFX and scene timing (single source of truth)
public/
  audio/        TTS dialogue (edge-tts) + synthesized SFX/music
  img/          logo + real product screenshots
scripts/
  gen_voices.py regenerate TTS dialogue (needs `pip install edge-tts`)
  gen_sfx.py    regenerate SFX + music (pure python + ffmpeg)
```

## Render

Locally:

```bash
npm ci
npx remotion render Skit dist/mwalimuease-tiktok-skit.mp4
```

Or use GitHub Actions → **Render TikTok Skit** → *Run workflow*. The MP4 is
uploaded as a build artifact.
