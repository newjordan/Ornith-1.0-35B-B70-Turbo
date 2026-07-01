// Renders the 3-way honest-decomposition charts (upstream / upstream+flags / Turbo build).
// Source: qworld_turbo/results/THREEWAY_F16_B70.md, Ornith-1.0-35B tables, B70, Q5_K_M, f16 KV.
// Usage: ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node charts/gen_threeway.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GH, base, catAxis, valAxis, logAxis, line, render } from './_theme.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT  = HERE;
const ECHARTS = process.env.ECHARTS_ESM || 'echarts';
const echarts = await import(ECHARTS);
const W = 860, H = 460;

const LEGEND = ['upstream defaults', 'upstream + Turbo flags', 'Turbo build (+fusion)'];

// ── 6. Prefill vs prompt tokens — 3-way ───────────────────────────────────────
// upflags ≈ turbo (config is the whole win); turbo dashed so it reads as riding
// under the same line rather than a 3rd distinct curve.
const pUpstream = [[805,1075],[3313,1074],[6963,1031],[14563,959],[29713,825],[61341,628],[129325,413]];
const pUpflags  = [[805,1378],[3313,1840],[6963,1741],[14563,1538],[29713,1208],[61341,828],[129325,489]];
const pTurbo    = [[805,1386],[3313,1846],[6963,1734],[14563,1531],[29713,1205],[61341,826],[129325,488]];
await render(echarts, {
  ...base('Ornith · prefill, 3-way',
          'prefill t/s vs prompt tokens · config win 1.18–1.71× · fusion adds ~nothing on top (1.00–1.01×)'),
  legend: { ...base('','').legend, data: LEGEND },
  xAxis: logAxis('prompt tokens'),
  yAxis: valAxis('prefill t/s', { max: 2000 }),
  series: [
    line(LEGEND[0], pUpstream, GH.dim,   { symbolSize: 6, z: 1 }),
    line(LEGEND[2], pTurbo,    GH.green, { symbolSize: 6, dashed: true, z: 2 }),
    line(LEGEND[1], pUpflags,  GH.blue,  { symbolSize: 7, z: 3,
      label: true, labelFmt: (p) => p.dataIndex === pUpflags.length - 1 ? p.value[1] : '' }),
  ],
}, W, H, path.join(OUT, '06_threeway_prefill.svg'), fs);

// ── 7. Decode vs context depth — 3-way ────────────────────────────────────────
// upstream ≈ upflags (config is a no-op here); turbo is the real, separating line.
const dUpstream = [[805,81.7],[3313,80.0],[6963,77.5],[14563,72.9],[29713,66.5],[61341,55.7],[129325,41.4]];
const dUpflags  = [[805,81.8],[3313,79.8],[6963,77.4],[14563,72.7],[29713,66.1],[61341,55.5],[129325,41.3]];
const dTurbo    = [[805,93.5],[3313,91.2],[6963,88.2],[14563,82.3],[29713,74.1],[61341,61.1],[129325,44.2]];
await render(echarts, {
  ...base('Ornith · decode, 3-way',
          'decode t/s vs context depth · config ≈1.00× (no-op) · fusion +7–14% at every depth — the fork-only win'),
  legend: { ...base('','').legend, data: LEGEND },
  xAxis: logAxis('context depth (tokens)'),
  yAxis: valAxis('decode t/s', { max: 100 }),
  series: [
    line(LEGEND[0], dUpstream, GH.dim,  { symbolSize: 6, dashed: true, z: 1 }),
    line(LEGEND[1], dUpflags,  GH.blue, { symbolSize: 6, z: 2 }),
    line(LEGEND[2], dTurbo,    GH.green,{ symbolSize: 8, z: 3,
      label: true, labelFmt: (p) => p.dataIndex === dTurbo.length - 1 ? p.value[1] : '' }),
  ],
}, W, H, path.join(OUT, '07_threeway_decode.svg'), fs);

// ── 8. Fleet aggregate decode vs agents — 3-way ───────────────────────────────
// upflags ≈ turbo (config is the whole win); turbo dashed, same reasoning as prefill.
const fAgents   = ['1','2','4','8','16','24','32','40','48','56'];
const fUpstream = [78.5,71.8,85.7,91.4,98.1,103.2,112.0,115.6,122.9,126.6];
const fUpflags  = [78.9,70.8,118.8,132.8,132.3,143.8,149.1,154.0,160.8,161.8];
const fTurbo    = [86.2,70.6,120.8,132.8,132.5,139.0,149.1,148.0,157.0,160.2];
await render(echarts, {
  ...base('Ornith · fleet decode, 3-way',
          'aggregate decode t/s vs concurrent agents · config win 1.28–1.45× · fusion 0.96–1.02× at concurrency'),
  legend: { ...base('','').legend, data: LEGEND },
  xAxis: catAxis('concurrent agents', fAgents),
  yAxis: valAxis('aggregate decode t/s', { max: 200 }),
  series: [
    line(LEGEND[0], fUpstream, GH.dim,   { symbolSize: 6, z: 1 }),
    line(LEGEND[2], fTurbo,    GH.green, { symbolSize: 6, dashed: true, z: 2 }),
    line(LEGEND[1], fUpflags,  GH.blue,  { symbolSize: 7, z: 3,
      label: true, labelFmt: (p) => p.dataIndex === fUpflags.length - 1 ? p.value : '' }),
  ],
}, W, H, path.join(OUT, '08_threeway_fleet.svg'), fs);

console.log('Ornith 3-way charts rendered ->', OUT);
