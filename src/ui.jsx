import { Icon } from './icons';

export const SellaLogo = ({ size = 22, tone = 'forest', sub = false }) => {
  const colors = {
    forest: { wm: '#1B4332', dot: '#C9A84C', sub: '#3B3F4A' },
    cream:  { wm: '#F8F4EE', dot: '#C9A84C', sub: 'rgba(248,244,238,0.7)' },
  }[tone];
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="none" stroke={colors.wm} strokeWidth="1.2" />
          <path d="M11 19c2 1.5 8 1.5 10 -2c-2 0.5 -6 0.5 -8 -1.5c-1.5 -1.5 -.5 -4 2 -4.5c2.5 -.5 5 1 6 2.5"
                fill="none" stroke={colors.wm} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="22" cy="11" r="1.6" fill={colors.dot} />
        </svg>
      </div>
      <div className="leading-none">
        <div className="sella-wordmark" style={{ color: colors.wm, fontSize: size + 4 }}>Sella</div>
        {sub && <div className="text-[9px] tracking-[0.18em] uppercase mt-0.5" style={{ color: colors.sub }}>Hospitality Intelligence</div>}
      </div>
    </div>
  );
};

export const Pill = ({ children, tone = 'cream', className = '' }) => {
  const tones = {
    cream:   'bg-cream-200 text-forest-700',
    forest:  'bg-forest-700 text-cream-50',
    gold:    'bg-gold-50 text-gold-700 border border-gold-100',
    green:   'bg-forest-50 text-forest-700 border border-forest-50',
    red:     'bg-rose-50 text-rose-700 border border-rose-100',
    ghost:   'bg-white/70 text-ink',
    outline: 'bg-transparent border border-forest-700/15 text-forest-700',
  }[tone] || tone;
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${tones} ${className}`}>{children}</span>;
};

export const Card = ({ children, className = '', as: As = 'div', ...rest }) => (
  <As className={`bg-white rounded-2xl shadow-card ${className}`} {...rest}>{children}</As>
);

export const SectionTitle = ({ kicker, title, right, children }) => (
  <div className="flex items-end justify-between mb-3">
    <div>
      {kicker && <div className="text-[10px] uppercase tracking-[0.18em] text-ink-muted font-semibold mb-1">{kicker}</div>}
      <h3 className="font-display font-semibold text-[17px] text-ink">{title}</h3>
      {children && <div className="text-[12.5px] text-ink-soft mt-0.5">{children}</div>}
    </div>
    {right}
  </div>
);

export const KPI = ({ label, value, sub, trend, accent = 'forest' }) => {
  const accents = {
    forest: 'text-forest-700',
    gold:   'text-gold-700',
    ink:    'text-ink',
  };
  const trendUp = trend && trend.startsWith('+');
  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-card flex flex-col gap-1">
      <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">{label}</div>
      <div className={`font-display text-[22px] font-semibold leading-tight ${accents[accent]}`}>{value}</div>
      <div className="flex items-center gap-2 text-[11px] text-ink-soft">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 font-semibold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendUp ? <Icon.Trend size={11} /> : <Icon.TrendDown size={11} />}
            {trend}
          </span>
        )}
        {sub && <span>{sub}</span>}
      </div>
    </div>
  );
};

export const Allergen = ({ kind }) => {
  const map = {
    gluten:    { emoji: '🌾', label: 'Gluten',    tone: 'bg-amber-50 text-amber-800' },
    nuts:      { emoji: '🥜', label: 'Nuts',      tone: 'bg-orange-50 text-orange-800' },
    dairy:     { emoji: '🥛', label: 'Dairy',     tone: 'bg-sky-50 text-sky-800' },
    vegan:     { emoji: '🌱', label: 'Vegan',     tone: 'bg-emerald-50 text-emerald-800' },
    fish:      { emoji: '🐟', label: 'Fish',      tone: 'bg-blue-50 text-blue-800' },
    glutenfree:{ emoji: '🌾', label: 'GF',        tone: 'bg-emerald-50 text-emerald-800' },
  }[kind];
  if (!map) return null;
  return <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium ${map.tone}`}><span>{map.emoji}</span>{map.label}</span>;
};

export const AIBadge = ({ children = 'Powered by Sella AI', tone = 'cream', size = 'sm' }) => {
  const sizes = { sm: 'text-[10px] px-2 py-1', md: 'text-[11px] px-2.5 py-1' };
  const tones = {
    cream:  'bg-gold-50 text-gold-700 border-gold-100',
    forest: 'bg-forest-700 text-cream-50 border-forest-700',
    ghost:  'bg-white/15 text-cream-50 border-white/20',
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full font-medium ${tones} ${sizes[size]}`}>
      <Icon.Sparkles size={11} />
      {children}
    </span>
  );
};

export const ChipRow = ({ items, value, onChange, size = 'md' }) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-[12px]',
    md: 'px-3.5 py-2 text-[13px]',
  };
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
      {items.map((it) => {
        const k = typeof it === 'string' ? it : it.key;
        const label = typeof it === 'string' ? it : it.label;
        const active = value === k;
        return (
          <button
            key={k}
            onClick={() => onChange && onChange(k)}
            className={`shrink-0 rounded-full font-medium whitespace-nowrap transition-all ${sizes[size]} ${
              active
                ? 'bg-forest-700 text-cream-50 shadow-card'
                : 'bg-white text-ink-soft border border-forest-700/10 hover:border-forest-700/30'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const dishPalettes = [
  ['#E9C46A', '#F4A261', '#264653'],
  ['#A8DADC', '#457B9D', '#1D3557'],
  ['#F4A261', '#E76F51', '#264653'],
  ['#BFD8B8', '#52B788', '#1B4332'],
  ['#F2D7A1', '#D9A05B', '#7E3F2E'],
  ['#F1BBA0', '#E76F51', '#3D2C2A'],
  ['#CDD4C2', '#7C9473', '#2D4739'],
  ['#FAE1B0', '#E0A458', '#7E5A29'],
];
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

export const DishIllustration = ({ name, emoji, size = 'md', className = '' }) => {
  const pal = dishPalettes[hashStr(name) % dishPalettes.length];
  const sz = { sm: 'w-14 h-14 text-2xl', md: 'w-20 h-20 text-3xl', lg: 'w-28 h-28 text-5xl' }[size];
  return (
    <div className={`relative rounded-2xl overflow-hidden flex items-center justify-center shrink-0 ${sz} ${className}`}
         style={{ background: `radial-gradient(circle at 30% 30%, ${pal[0]} 0%, ${pal[1]} 60%, ${pal[2]} 100%)` }}>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
           style={{ background: 'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6), transparent 50%)' }} />
      <span className="relative drop-shadow-sm">{emoji}</span>
    </div>
  );
};

export const MobileFrame = ({ children }) => (
  <div className="mx-auto" style={{ width: 390 }}>
    <div className="relative rounded-[44px] bg-[#1a1a2e] p-2.5 shadow-float">
      <div className="relative rounded-[36px] overflow-hidden bg-cream-100" style={{ height: 800 }}>
        {/* status bar */}
        <div className="absolute top-0 inset-x-0 z-30 h-10 flex items-center justify-between px-7 text-[12px] font-semibold text-ink pointer-events-none">
          <div>9:41</div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-24 h-6 rounded-full bg-[#1a1a2e]" />
          <div className="flex items-center gap-1.5">
            <svg width="16" height="10" viewBox="0 0 16 10"><g fill="#1a1a2e"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></g></svg>
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M7 9.5 1 4a8 8 0 0 1 12 0z" fill="#1a1a2e"/></svg>
            <svg width="24" height="10" viewBox="0 0 24 10"><rect x="0.5" y="0.5" width="20" height="9" rx="2" fill="none" stroke="#1a1a2e"/><rect x="22" y="3" width="1.5" height="4" rx="0.5" fill="#1a1a2e"/><rect x="2" y="2" width="17" height="6" rx="1" fill="#1a1a2e"/></svg>
          </div>
        </div>
        <div className="h-full">{children}</div>
      </div>
    </div>
  </div>
);
