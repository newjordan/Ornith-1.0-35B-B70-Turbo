// Renders all Ornith-1.0-35B B70 Turbo benchmark charts to SVG (GitHub-dark).
// Usage: ECHARTS_ESM=/path/to/newjordan-echarts/dist/echarts.esm.min.mjs node charts/gen_charts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GH, base, catAxis, valAxis, logAxis, line, render } from './_theme.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT  = HERE;
const ECHARTS = process.env.ECHARTS_ESM || 'echarts';
const echarts = await import(ECHARTS);
const W = 860, H = 460;

// ── 1. Concurrency Pareto (offline llama-batched-bench, 2048p+256g) ──────────
const cAgents = ['1','2','4','8','16','24','32','40','48','56'];
const cAgg  = [75.91,68.17,89.66,106.75,126.30,144.45,157.85,167.42,175.53,null]; // 56 = timeout/thrash
const cPer  = [75.91,34.09,22.41,13.34,7.89,6.02,4.93,4.19,3.66,null];
await render(echarts, {
  ...base('Ornith · concurrency Pareto',
          'aggregate vs per-agent decode · 2048-tok prompt + 256 gen · knee @ 32 · np 56 thrashes (timeout)'),
  legend: { ...base('','').legend, data: ['aggregate t/s','per-agent t/s'] },
  xAxis: catAxis('concurrent agents (-np)', cAgents),
  yAxis: [ valAxis('aggregate decode t/s', { max: 200 }),
           valAxis('per-agent t/s', { position: 'right', splitLine: { show: false }, max: 80 }) ],
  series: [
    line('aggregate t/s', cAgg, GH.blue, { area: true, symbolSize: 8,
      markLine: { silent: true, symbol: 'none',
        lineStyle: { color: GH.green, type: 'dashed', width: 1.4 },
        label: { color: GH.green, fontFamily: '-apple-system', formatter: 'knee', position: 'insideEndTop' },
        data: [{ xAxis: '32' }] } }),
    line('per-agent t/s', cPer, GH.orange, { yAxisIndex: 1, dashed: true, symbolSize: 6 }),
  ],
}, W, H, path.join(OUT, '01_concurrency_pareto.svg'), fs);

// ── 2. Turbo vs Stock — fleet throughput (live server, tool class) ───────────
const fAgents = ['1','2','4','8','16','24','32'];
const fStock  = [62.54,70.84,99.34,118.30,137.27,173.97,183.17];
const fTurbo  = [60.87,null,null,140.58,161.26,null,221.73];
await render(echarts, {
  ...base('Ornith · Turbo vs Stock — fleet decode',
          'live server · aggregate decode t/s vs concurrent agents · same weights, same GPU · 1.2× @ 32'),
  legend: { ...base('','').legend, data: ['Stock','Turbo'] },
  xAxis: catAxis('concurrent agents', fAgents),
  yAxis: valAxis('aggregate decode t/s'),
  series: [
    line('Stock', fStock, GH.dim, { symbolSize: 6, width: 2.2 }),
    line('Turbo', fTurbo, GH.blue, { area: true, symbolSize: 8,
      label: true, labelFmt: (p) => p.value != null ? p.value : '' }),
  ],
}, W, H, path.join(OUT, '02_turbo_vs_stock_fleet.svg'), fs);

// ── 3. Single-agent depth — decode + prefill vs context ──────────────────────
const dCtx     = [512, 8192, 65536];
const dDecode  = [[512,79.33],[8192,55.67],[65536,17.86]];
const dPrefill = [[512,873.29],[8192,1649.48],[65536,788.57]];
await render(echarts, {
  ...base('Ornith · single-agent depth',
          'one stream · decode + prefill t/s vs context · gated-delta-net holds to 262144 ctx'),
  legend: { ...base('','').legend, data: ['decode t/s','prefill t/s'] },
  xAxis: logAxis('context tokens'),
  yAxis: [ valAxis('decode t/s', { max: 100 }),
           valAxis('prefill t/s', { position: 'right', splitLine: { show: false }, max: 2000 }) ],
  series: [
    line('decode t/s', dDecode, GH.blue, { area: true, symbolSize: 9, label: true,
      labelFmt: (p) => p.value[1] + '' }),
    line('prefill t/s', dPrefill, GH.green, { yAxisIndex: 1, dashed: true, symbolSize: 7 }),
  ],
}, W, H, path.join(OUT, '03_depth_sweep.svg'), fs);

// ── 4. Accuracy (lm-eval, Q5_K_M) ────────────────────────────────────────────
const accPairs = [['GSM8K',97.0],['HellaSwag',82.1],['Winogrande',71.6],
                  ['ARC-Challenge',49.2],['MMLU',41.1],['TruthfulQA-MC1',35.7]]
                  .sort((a,b)=>a[1]-b[1]);
await render(echarts, {
  ...base('Ornith · accuracy (Q5_K_M)',
          'lm-eval harness · Wikitext-2 PPL 6.36 (lower better) · % accuracy'),
  grid: { left: 130, right: 60, top: 84, bottom: 44 },
  xAxis: valAxis('accuracy %', { max: 100 }),
  yAxis: catAxis('', accPairs.map(p=>p[0])),
  series: [{
    type: 'bar', barWidth: 16,
    data: accPairs.map((p,i)=>({ value: p[1],
      itemStyle: { color: GH.palette[i % GH.palette.length], borderRadius: [0,3,3,0] } })),
    label: { show: true, position: 'right', color: GH.fg, fontFamily: '-apple-system',
             fontSize: 12, formatter: '{c}%' },
  }],
}, W, H, path.join(OUT, '04_accuracy.svg'), fs);

// ── 5. Teamwork game-quality (source-review /50, 2026-06-30 build) ────────────
await render(echarts, {
  ...base('Ornith · teamwork game-quality (source-review /50)',
          'agentic-arcade whole-game workers + merge · both builds playable/winnable · quality is stochastic per build'),
  xAxis: catAxis('', ['Frogger','Maze']),
  yAxis: valAxis('score / 50', { max: 50 }),
  series: [{
    type: 'bar', barWidth: 64,
    data: [ { value: 38, itemStyle: { color: GH.green,  borderRadius:[4,4,0,0] } },
            { value: 39, itemStyle: { color: GH.blue,   borderRadius:[4,4,0,0] } } ],
    label: { show: true, position: 'top', color: GH.fg, fontFamily: '-apple-system', fontSize: 13 },
  }],
}, W, H, path.join(OUT, '05_game_quality.svg'), fs);

console.log('Ornith charts rendered ->', OUT);
