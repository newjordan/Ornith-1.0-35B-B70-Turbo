# charts

Benchmark charts, rendered **server-side to static SVG** (no scripts) from the
[`newjordan/echarts`](https://github.com/newjordan/echarts) fork, themed to GitHub's dark Primer palette.

```bash
# needs the fork's prebuilt ESM dist (or any echarts >=5 with SSR)
ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node gen_charts.mjs
ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node gen_threeway.mjs
```

`_theme.mjs` holds the GitHub-dark theme + axis/line/render helpers; `gen_charts.mjs` holds charts
01–05 (R&D snapshot: concurrency, turbo-vs-stock, depth, accuracy, game quality); `gen_threeway.mjs`
holds 06–08, the honest config-vs-code decomposition (prefill/decode/fleet, 3 series each: upstream
defaults, upstream + Turbo flags, Turbo build). Data lives in `../data/`.
