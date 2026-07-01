// GitHub-dark ECharts theme + SSR helpers.
// Colors are GitHub's Primer dark palette so charts sit natively in a dark README.
export const GH = {
  bg:   '#0d1117', // canvas.default
  panel:'#161b22', // canvas.subtle
  fg:   '#e6edf3', // fg.default
  muted:'#7d8590', // fg.muted
  dim:  '#8b949e',
  grid: '#21262d',
  axis: '#30363d', // border.default
  // accent series palette (Primer data-viz-ish)
  blue:'#58a6ff', green:'#3fb950', purple:'#bc8cff', orange:'#f0883e',
  red:'#f85149', yellow:'#d29922', cyan:'#39c5cf', pink:'#f778ba',
  palette: ['#58a6ff','#3fb950','#bc8cff','#f0883e','#f85149','#d29922','#39c5cf'],
};
// No space-containing family names → valid XML in strict SVG renderers (GitHub is lenient, but keep it clean).
export const FONT = '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif';

export function base(title, subtext) {
  return {
    backgroundColor: GH.bg,
    color: GH.palette,
    animation: false,
    textStyle: { fontFamily: FONT, color: GH.fg },
    title: {
      text: title, subtext: subtext || '', left: 26, top: 18,
      textStyle:    { color: GH.fg,    fontSize: 18, fontWeight: 600, fontFamily: FONT },
      subtextStyle: { color: GH.muted, fontSize: 12, fontFamily: FONT, lineHeight: 16 },
    },
    legend: {
      top: 22, right: 26, itemGap: 18, icon: 'roundRect',
      itemWidth: 14, itemHeight: 8,
      textStyle: { color: GH.dim, fontFamily: FONT, fontSize: 12 },
    },
    grid: { left: 58, right: 34, top: subtext ? 96 : 78, bottom: 58, containLabel: true },
  };
}

export function catAxis(name, data) {
  return {
    type: 'category', data, name, boundaryGap: true,
    nameLocation: 'middle', nameGap: 34,
    nameTextStyle: { color: GH.muted, fontFamily: FONT, fontSize: 12 },
    axisLine:  { lineStyle: { color: GH.axis } },
    axisTick:  { show: false },
    axisLabel: { color: GH.dim, fontFamily: FONT, fontSize: 12 },
    splitLine: { show: false },
  };
}

export function valAxis(name, extra = {}) {
  return {
    type: 'value', name, nameGap: 14,
    nameTextStyle: { color: GH.muted, fontFamily: FONT, fontSize: 12 },
    axisLine:  { show: false },
    axisTick:  { show: false },
    axisLabel: { color: GH.dim, fontFamily: FONT, fontSize: 12 },
    splitLine: { lineStyle: { color: GH.grid, type: 'dashed' } },
    ...extra,
  };
}

export function logAxis(name, extra = {}) {
  return {
    type: 'log', name, nameLocation: 'middle', nameGap: 34, logBase: 10,
    nameTextStyle: { color: GH.muted, fontFamily: FONT, fontSize: 12 },
    axisLine:  { lineStyle: { color: GH.axis } },
    axisTick:  { show: false },
    axisLabel: { color: GH.dim, fontFamily: FONT, fontSize: 12,
                 formatter: (v) => v >= 1000 ? (v/1000) + 'k' : String(v) },
    splitLine: { lineStyle: { color: GH.grid, type: 'dashed' } },
    ...extra,
  };
}

// solid line series with soft glow markers
export function line(name, data, color, opts = {}) {
  return {
    name, type: 'line', data, connectNulls: true,
    smooth: opts.smooth ?? false, symbol: 'circle', symbolSize: opts.symbolSize ?? 7,
    lineStyle: { color, width: opts.width ?? 2.6, type: opts.dashed ? 'dashed' : 'solid' },
    itemStyle: { color, borderColor: GH.bg, borderWidth: 1.5 },
    yAxisIndex: opts.yAxisIndex ?? 0,
    z: opts.z ?? 2,
    ...(opts.area ? { areaStyle: { color, opacity: 0.10 } } : {}),
    ...(opts.label ? { label: { show: true, color: GH.dim, fontFamily: FONT,
                                fontSize: 11, position: 'top',
                                formatter: opts.labelFmt || '{c}' } } : {}),
    ...(opts.markLine ? { markLine: opts.markLine } : {}),
    ...(opts.markPoint ? { markPoint: opts.markPoint } : {}),
  };
}

export async function render(echarts, option, w, h, outFile, fs) {
  const chart = echarts.init(null, null, { renderer: 'svg', ssr: true, width: w, height: h });
  chart.setOption(option);
  const svg = chart.renderToSVGString();
  chart.dispose();
  fs.writeFileSync(outFile, svg);
  return svg.length;
}
