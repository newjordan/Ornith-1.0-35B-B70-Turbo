# charts

Benchmark charts, rendered **server-side to static SVG** (no scripts) from the
[`newjordan/echarts`](https://github.com/newjordan/echarts) fork, themed to GitHub's dark Primer palette.

```bash
# needs the fork's prebuilt ESM dist (or any echarts >=5 with SSR)
ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node gen_charts.mjs
```

`_theme.mjs` holds the GitHub-dark theme + axis/line/render helpers; `gen_charts.mjs` holds the
per-chart data + specs. Data lives in `../data/`.
