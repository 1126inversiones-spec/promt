# Category hover previews

Drop a short looping clip here named after the effect's `id` in `lib/categories.ts`,
and the category card will play it on hover automatically. No code changes needed —
just add the file.

## Naming

`public/previews/<effect-id>.mp4`

Effect ids today: `wok`, `steam`, `dust-savory`, `cheese-pull`, `bbq`, `seafood-sear`,
`cold-drink`, `hot-drink`, `cocktail`, `blend-mix`, `choc`, `caramel`, `dust-sweet`, `berry`.

Example: an approved wok-toss clip goes at `public/previews/wok.mp4`.

## Recommended clip specs

- **Format:** `.mp4` (H.264) — plays natively in every browser without extra setup.
- **Length:** 2\u20133 seconds, trimmed to the most representative moment of the effect.
- **Size:** keep it under ~500KB so the site stays fast. Re-export at a lower bitrate
  or shrink the resolution (720p or even 480p is plenty for a small hover preview)
  if the exported clip from Flow is larger.
- **Audio:** strip it out — the preview always plays muted, so audio only adds file size.

A quick way to compress with `ffmpeg` (installed on most machines):

```bash
ffmpeg -i input.mp4 -t 3 -vf scale=480:-1 -an -c:v libx264 -crf 28 wok.mp4
```

## Wiring it up

Once a file exists at the right path, open `lib/categories.ts` and add one line to
that effect's object:

```ts
{
  id: "wok",
  ...
  previewSrc: "/previews/wok.mp4",
  ...
}
```

That's the only code change needed per clip \u2014 add clips one at a time as they're
approved, no rush to fill all 14 at once.
