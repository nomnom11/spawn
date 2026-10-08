# spawn — chainless launchpad

Animated loading page built with Next.js (App Router) and plain CSS.
When loading reaches 100% a glowing **Start** button appears and links to https://spawn.eco/.

## Run locally

```bash
npm install
npm run dev
```

## Structure

```
app/
  layout.tsx          # root layout, Outfit font, viewport/metadata
  page.tsx            # renders <SpawnLoader />
  globals.css         # all styles and animations
components/
  spawn-loader.tsx    # loading logic, ring/bar/percent, Start button
  pixel-mascot.tsx    # pixel octopus SVG
  flow-lines.tsx      # animated pink light streams
```

## Notes

- Loading progress is simulated in `components/spawn-loader.tsx`. Call `setProgress(0–100)` from your own logic to use real progress.
- Change the destination by editing `START_URL` in the same file.
