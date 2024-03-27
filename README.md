# Dynamic Imports impact on Cold Starts (using Workers with Wrangler, `--no-build`)

Install the dependencies with:
```sh
npm i
```

Serve the page locally with:
```sh
npm run dev
```

Deploy with:

```sh
npm run deploy
```

# Compare TTFB when including/not including `medium.js`, `large.js` or `titanic.js`

Move one file at a time inside `./lazy`, deploy again and benchmark TTFB when opening `/` (which would only dynamically import `small.js`)

Raw / gzip sizes for reference (from the Workers with Wrangler version):

```
Attaching additional modules:
┌────────────────┬──────┬─────────────┐
│ Name           │ Type │ Size        │
├────────────────┼──────┼─────────────┤
│ lazy/medium.js │ esm  │ 2507.86 KiB │
├────────────────┼──────┼─────────────┤
│ lazy/small.js  │ esm  │ 0.03 KiB    │
└────────────────┴──────┴─────────────┘
Total Upload: 2509.07 KiB / gzip: 714.12 KiB

---

Attaching additional modules:
┌────────────────────┬──────┬─────────────┐
│ Name               │ Type │ Size        │
├────────────────────┼──────┼─────────────┤
│ lazy/small.js      │ esm  │ 0.03 KiB    │
├────────────────────┼──────┼─────────────┤
│ lazy/large.js      │ esm  │ 5015.54 KiB │
└────────────────────┴──────┴─────────────┘
Total Upload: 5016.76 KiB / gzip: 1427.04 KiB

---

Attaching additional modules:
┌─────────────────┬──────┬──────────────┐
│ Name            │ Type │ Size         │
├─────────────────┼──────┼──────────────┤
│ lazy/small.js   │ esm  │ 0.03 KiB     │
├─────────────────┼──────┼──────────────┤
│ lazy/titanic.js │ esm  │ 10030.89 KiB │
└─────────────────┴──────┴──────────────┘
Total Upload: 10032.11 KiB / gzip: 2852.86 KiB

```