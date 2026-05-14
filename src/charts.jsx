// All SVG charts use viewBox + width="100%" so they scale to their container

export const TrendLine = ({ values, h = 64, accent = '#1B4332', fill = 'rgba(82,183,136,0.18)' }) => {
  if (!values || values.length === 0) return null;
  const W = 280, H = h;
  const min = Math.min(...values), max = Math.max(...values);
  const pad = 4;
  const stepX = (W - pad * 2) / (values.length - 1);
  const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const pts = values.map((v, i) => [pad + i * stepX, y(v)]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const dArea = `${d} L${pts[pts.length - 1][0]},${H - pad} L${pts[0][0]},${H - pad} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height: H, display: 'block' }}
      className="overflow-visible"
    >
      <path d={dArea} fill={fill} />
      <path d={d} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="#fff" stroke={accent} strokeWidth="2" />
    </svg>
  );
};

export const Donut = ({ value, size = 56, stroke = 7, color = '#1B4332', track = '#EFE7D8', label }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold" style={{ color }}>
        {label !== undefined ? label : `${value}%`}
      </div>
    </div>
  );
};

// Responsive bar chart — SVG scales to container width
export const BarChart = ({ data, h = 120, accent = '#1B4332', accent2 = '#C9A84C' }) => {
  const W = 560; // internal coordinate space, not rendered px
  const H = h;
  const max = Math.max(...data.map(d => d.value));
  const barW = (W - 24) / data.length - 6;
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', minWidth: 280, height: 'auto', display: 'block' }}
      >
        {data.map((d, i) => {
          const bh = (d.value / max) * (H - 28);
          const x = 12 + i * (barW + 6);
          const y = H - 22 - bh;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={bh} rx="3"
                    fill={d.highlight ? accent2 : accent}
                    opacity={d.highlight ? 1 : 0.85} />
              <text x={x + barW/2} y={H - 6} textAnchor="middle" fontSize="9" fill="#6B7280">{d.label}</text>
              <text x={x + barW/2} y={y - 4} textAnchor="middle" fontSize="9"
                    fill={d.highlight ? accent2 : accent} fontWeight="700">{d.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const heatColor = (v, base = [27, 67, 50]) => {
  const alpha = 0.12 + v * 0.78;
  return `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${alpha})`;
};

export const HeatGrid = ({ rows, days, getValue, getLabel, baseRGB }) => (
  <div className="overflow-x-auto -mx-1">
    <table className="w-full text-[12px] border-separate" style={{ borderSpacing: 0, minWidth: 320 }}>
      <thead>
        <tr>
          <th className="w-24"></th>
          {days.map(d => <th key={d} className="font-semibold text-ink-muted pb-2 px-1 text-center">{d}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            <td className="pr-2 py-1 text-ink-soft text-[11px] whitespace-nowrap">{getLabel(row)}</td>
            {days.map((_, di) => {
              const v = getValue(row, di);
              return (
                <td key={di} className="p-0.5">
                  <div className="rounded-md flex items-center justify-center font-semibold text-[11px]"
                       style={{ background: heatColor(v, baseRGB), color: v > 0.55 ? '#fff' : '#143526', minWidth: 32, height: 28 }}>
                    {Math.round(v * 100)}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const PortionBar = ({ portions }) => {
  const total = Object.values(portions).reduce((a, b) => a + b, 0);
  const segs = [
    { k: 'plant', label: 'Plant-based', val: portions.plant, color: '#52B788' },
    { k: 'meat',  label: 'Meat',        val: portions.meat,  color: '#7E662A' },
    { k: 'fish',  label: 'Fish',        val: portions.fish,  color: '#457B9D' },
    { k: 'vegan', label: 'Vegan',       val: portions.vegan, color: '#1B4332' },
  ];
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-cream-200">
        {segs.map(s => (
          <div key={s.k} style={{ width: `${(s.val/total)*100}%`, background: s.color }} title={`${s.label}: ${s.val}`} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-3 text-[12px]">
        {segs.map(s => (
          <div key={s.k} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
            <span className="text-ink-soft">{s.label}</span>
            <span className="ml-auto font-semibold text-ink">{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
