import React, { useState } from 'react';
import { Icon } from './icons';
import { AIBadge, Pill, SellaLogo, DishIllustration } from './ui';
import { TrendLine, Donut, BarChart, HeatGrid, PortionBar } from './charts';
import { SITES, SAT_HEATMAP, NPS_TREND, STAFFING_HEATMAP, FORECAST, INTEGRATIONS, DAILY_PROGRAM, SELLA_SCORE } from './data';

const AdminHeader = ({ site, setSite, all, setAll }) => {
  const [open, setOpen] = useState(false);
  const current = SITES.find(s => s.id === site) || SITES[0];
  return (
    <header className="sticky top-0 z-30 bg-cream-50/95 backdrop-blur-md border-b border-forest-700/10">
      <div className="max-w-[1480px] mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 lg:gap-6 flex-wrap">
        <SellaLogo size={22} sub />
        <div className="hidden md:block w-px h-8 bg-forest-700/10" />
        <nav className="hidden md:flex items-center gap-1 text-[13px] text-ink-soft">
          {[['Overview','overview'],['Forecast','forecast'],['Satisfaction','satisfaction'],['Waste','waste'],['Sites','sites'],['Staffing','staffing']].map(([n,id],i)=>(
            <button key={n} onClick={() => {
              const el = document.getElementById(id);
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
            }} className={`px-3 py-1.5 rounded-full font-medium cursor-pointer ${i===0?'bg-forest-700 text-cream-50':'hover:bg-forest-700/5'}`}>{n}</button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setAll(!all)}
            className={`flex items-center gap-2 text-[12.5px] rounded-full px-3 py-1.5 font-semibold border transition-all ${all ? 'bg-forest-700 text-cream-50 border-forest-700' : 'bg-white text-ink-soft border-forest-700/15'}`}
          >
            <Icon.Globe size={14}/> All sites
          </button>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-white border border-forest-700/15 rounded-full pl-2 pr-3 py-1.5 text-[12.5px] font-semibold text-ink hover:border-forest-700/40"
            >
              <span className="text-base leading-none">{current.country}</span>
              <span>{current.name}</span>
              <Icon.ChevronDown size={14} className="text-ink-muted"/>
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-2xl shadow-float border border-forest-700/10 p-1.5 z-40">
                {SITES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setSite(s.id); setOpen(false); setAll(false); }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[13px] text-left ${s.id===site?'bg-forest-50 text-forest-700 font-semibold':'hover:bg-cream-100 text-ink-soft'}`}
                  >
                    <span className="text-base">{s.country}</span>
                    <span className="flex-1">{s.name}</span>
                    <span className="text-[11px] text-ink-muted">{s.headcount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white border border-forest-700/15 rounded-full px-3 py-1.5 text-[12.5px] text-ink-soft font-medium">
            <Icon.Calendar size={14} /> May 8 – May 14, 2026
            <Icon.ChevronDown size={12} className="text-ink-muted"/>
          </div>
          <div className="w-9 h-9 rounded-full bg-forest-700 text-cream-50 font-bold flex items-center justify-center text-[13px]">YN</div>
        </div>
      </div>
    </header>
  );
};

const SectionHeader = ({ kicker, title, sub, right }) => (
  <div className="flex items-end justify-between mb-4">
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.2em] text-gold-700 font-semibold mb-1">{kicker}</div>
      <h2 className="font-display font-semibold text-[22px] text-ink">{title}</h2>
      {sub && <div className="text-[13px] text-ink-soft mt-1 max-w-xl">{sub}</div>}
    </div>
    {right}
  </div>
);

const SellaScoreBanner = () => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  return (
    <section id="overview" className="bg-forest-700 rounded-3xl shadow-float p-6 lg:p-8 text-cream-50 anim-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-cream-50/60 font-semibold">Sella Score · This week</div>
          <div className="flex items-baseline gap-3 mt-1">
            <div className="font-display text-[64px] font-semibold leading-none">{SELLA_SCORE.score}</div>
            <div>
              <Pill tone="gold"><Icon.Trend size={11}/> +{SELLA_SCORE.delta} pts this week</Pill>
              <div className="text-[12px] text-cream-50/60 mt-1">Composite hospitality performance</div>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-6 flex-wrap">
          {SELLA_SCORE.components.map(c => (
            <div key={c.label} className="text-center">
              <Donut value={c.value} size={52} stroke={5} color="#C9A84C" track="rgba(255,255,255,0.15)" label={`${c.value}`}/>
              <div className="text-[10px] text-cream-50/60 mt-1 max-w-[70px] leading-tight">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <TrendLine values={SELLA_SCORE.trend} h={48}/>
        </div>
        <button
          onClick={() => setShowBreakdown(v => !v)}
          className="text-[12px] font-semibold text-gold-400 hover:text-gold-300 transition-colors"
        >
          {showBreakdown ? 'Hide breakdown' : 'View breakdown →'}
        </button>
      </div>
      {showBreakdown && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {SELLA_SCORE.components.map(c => (
            <div key={c.label} className="bg-cream-50/10 rounded-2xl p-3">
              <div className="text-[10.5px] uppercase tracking-[0.16em] text-cream-50/60 font-semibold">{c.label}</div>
              <div className="font-display text-[28px] font-semibold text-gold-400 leading-none mt-1">{c.value}</div>
              <div className="text-[11px] text-cream-50/50 mt-0.5">/ 100</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const DailyProgramSection = ({ onToast }) => {
  const [slackSent, setSlackSent] = useState(false);
  const [showChannelPicker, setShowChannelPicker] = useState(false);
  const tiles = [
    { key: 'breakfast', label: 'Breakfast served', value: DAILY_PROGRAM.breakfast.served, target: DAILY_PROGRAM.breakfast.target, icon: '🥑', tone: 'gold',   sub: `of ${DAILY_PROGRAM.breakfast.target} forecast` },
    { key: 'shakes',    label: 'Wellness shakes',  value: DAILY_PROGRAM.shakes.served,    target: DAILY_PROGRAM.shakes.target,    icon: '🥤', tone: 'green',  sub: 'Free before 09:00' },
    { key: 'lunch',     label: 'Lunch (live)',      value: DAILY_PROGRAM.lunch.served,     target: DAILY_PROGRAM.lunch.target,     icon: '🍲', tone: 'forest', sub: `of ${DAILY_PROGRAM.lunch.target} forecast` },
    { key: 'classes',   label: 'Wellness classes', value: `${DAILY_PROGRAM.classes.booked}/${DAILY_PROGRAM.classes.capacity}`, icon: '🧘', tone: 'sky',    sub: `${DAILY_PROGRAM.classes.sessions} sessions today` },
    { key: 'events',    label: 'Friday brunch',    value: DAILY_PROGRAM.events.rsvps,     icon: '🌿', tone: 'gold',   sub: 'RSVPs · 33 days out' },
  ];
  const toneClasses = {
    gold:   'bg-gold-50 text-gold-700',
    green:  'bg-emerald-50 text-emerald-700',
    forest: 'bg-forest-50 text-forest-700',
    sky:    'bg-sky-50 text-sky-700',
  };
  return (
    <section className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
      <SectionHeader
        kicker="Today · Tel Aviv HQ"
        title="The full day, end-to-end"
        sub="Hospitality is more than lunch. Sella runs the morning ritual, the studios, and every event in one program."
        right={<Pill tone="green"><Icon.Bolt size={11}/> Live · updates every 90s</Pill>}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tiles.map(t => {
          const pct = typeof t.value === 'number' && t.target ? Math.round((t.value / t.target) * 100) : null;
          return (
            <div key={t.key} className="rounded-[20px] bg-cream-50 p-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${toneClasses[t.tone]} flex items-center justify-center text-lg`}>{t.icon}</div>
                {pct !== null && <Pill tone="outline">{pct}%</Pill>}
              </div>
              <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold mt-3">{t.label}</div>
              <div className="font-display text-[26px] font-semibold text-ink leading-none mt-1">{typeof t.value === 'number' ? t.value.toLocaleString() : t.value}</div>
              <div className="text-[11px] text-ink-soft mt-1">{t.sub}</div>
              {pct !== null && (
                <div className="mt-2 h-1 rounded-full bg-cream-200 overflow-hidden">
                  <div className="h-full bg-forest-500" style={{ width: `${Math.min(100, pct)}%` }}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-start gap-3 text-[12.5px] text-ink-soft bg-forest-50 rounded-2xl px-4 py-3">
        <Icon.Sparkles size={14} className="text-gold-700 shrink-0 mt-0.5"/>
        <div className="flex-1 min-w-[180px]">
          <b className="text-forest-700">Sella insight:</b> employees who booked a wellness class this morning have a 38% higher lunch satisfaction. Consider promoting the 12:15 HIIT Reset on Slack to fill the room.
        </div>
        {slackSent ? (
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 shrink-0"><Icon.Check size={13}/> Sent to #hospitality</div>
        ) : showChannelPicker ? (
          <div className="flex items-center gap-2 shrink-0">
            {['#hospitality','#lunch-today','#all-tlv'].map(ch => (
              <button key={ch} onClick={() => { setSlackSent(true); setShowChannelPicker(false); onToast?.('Insight shared on Slack', '💬'); }}
                className="text-[11.5px] font-semibold bg-forest-700 text-cream-50 rounded-full px-2.5 py-1 hover:bg-forest-600">{ch}</button>
            ))}
          </div>
        ) : (
          <button onClick={() => setShowChannelPicker(true)} className="bg-forest-700 hover:bg-forest-600 text-cream-50 text-[12px] font-semibold rounded-full px-3 py-1.5 shrink-0">Send via Slack</button>
        )}
      </div>
    </section>
  );
};

const ForecastSection = ({ site, onToast }) => {
  const [staffApproved, setStaffApproved] = useState(false);
  const f = FORECAST.tlv;
  const currentSite = SITES.find(s => s.id === site) || SITES[0];
  return (
    <section id="forecast" className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
      <SectionHeader
        kicker="Tomorrow · Wed, May 15"
        title="Predicted attendance"
        sub={`Sella's demand model has fused calendar data, weather, prior attendance and team patterns at ${currentSite.name}.`}
        right={<AIBadge tone="cream">Auto-refreshed at 06:00</AIBadge>}
      />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative rounded-[20px] p-6 ambient-forest text-cream-50 h-full">
            <div className="text-[11px] uppercase tracking-[0.18em] text-cream-50/70 font-semibold">Predicted attendance</div>
            <div className="font-display text-[64px] leading-none font-semibold mt-2">
              {f.attendance.toLocaleString()}
              <span className="text-gold-500 text-[20px] font-medium ml-2">employees</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-[13px]">
              <Donut value={f.confidence} size={44} stroke={5} color="#C9A84C" track="rgba(255,255,255,0.18)" label={`${f.confidence}%`}/>
              <div>
                <div className="font-semibold">Model confidence</div>
                <div className="text-cream-50/70 text-[12px]">Based on 14 prior Wednesdays</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[13px]">
              <Pill tone="gold"><Icon.Trend size={11}/> +{f.vsLastWeek}% vs last Wed</Pill>
              <Pill tone="ghost" className="text-cream-50 border border-white/15">All-hands at 14:00</Pill>
            </div>
            <div className="absolute -bottom-3 -right-3 opacity-20"><Icon.Users size={120}/></div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-[20px] p-5 bg-cream-50 h-full">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Recommended portions</div>
            <div className="font-display font-semibold text-[20px] text-ink mt-1">{(f.portions.plant+f.portions.meat+f.portions.fish+f.portions.vegan).toLocaleString()} total</div>
            <div className="mt-4"><PortionBar portions={f.portions} /></div>
            <div className="mt-3 text-[11.5px] text-ink-muted">Procurement order will auto-draft in Monday.com at 16:00 unless you override.</div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="rounded-[20px] p-5 bg-forest-50 h-full flex flex-col">
            <div className="text-[11px] uppercase tracking-[0.18em] text-forest-700 font-semibold flex items-center gap-1.5"><Icon.Users size={12}/> Staffing</div>
            <div className="font-display text-[40px] font-semibold text-forest-700 leading-none mt-2">+{f.staffing.recommended - f.staffing.current}</div>
            <div className="text-[12px] text-ink-soft">additional servers recommended</div>
            <div className="mt-3 p-3 rounded-xl bg-white border border-forest-500/20">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Peak window</div>
              <div className="text-[14px] font-display font-semibold text-ink mt-0.5">{f.staffing.peak}</div>
              <div className="text-[11.5px] text-ink-muted mt-1">Currently scheduled: {f.staffing.current} · Recommended: {f.staffing.recommended}</div>
            </div>
            {staffApproved ? (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-emerald-700 bg-emerald-50 rounded-full py-2 px-3 border border-emerald-200">
                <Icon.Check size={13}/> Plan approved
              </div>
            ) : (
              <button onClick={() => { setStaffApproved(true); onToast?.('Staffing plan approved', '✓'); }} className="mt-3 bg-forest-700 hover:bg-forest-600 text-cream-50 text-[12.5px] font-semibold rounded-full py-2 px-3 flex items-center justify-center gap-1.5">
                Approve staffing plan <Icon.Check size={13}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SatisfactionSection = () => {
  const [showRework, setShowRework] = useState(false);
  const dishesPerf = [
    { label: 'Tagine',      value: 92, highlight: true },
    { label: 'Salmon',      value: 89 },
    { label: 'Risotto',     value: 84 },
    { label: 'Banh Mi',     value: 81 },
    { label: 'Bibimbap',    value: 79 },
    { label: 'Mac&Cheese',  value: 74 },
    { label: 'Caesar',      value: 58 },
  ];
  return (
    <section id="satisfaction" className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
      <SectionHeader
        kicker="This week"
        title="Satisfaction intelligence"
        sub="Aggregated from 2,847 ratings and mood signals across all sites."
        right={<Pill tone="gold"><Icon.Sparkles size={11}/> 3 insights</Pill>}
      />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-[20px] bg-cream-50 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Satisfaction · % positive</div>
                <div className="font-display font-semibold text-[16px] text-ink">By day × site</div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                <span>Low</span>
                <div className="w-24 h-2 rounded-full" style={{ background: 'linear-gradient(90deg,rgba(27,67,50,0.12),rgba(27,67,50,0.9))' }}/>
                <span>High</span>
              </div>
            </div>
            <HeatGrid
              rows={SAT_HEATMAP.rows}
              days={SAT_HEATMAP.days}
              baseRGB={[27,67,50]}
              getLabel={(r) => r.site}
              getValue={(r, i) => r.values[i]}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="rounded-[20px] p-5 bg-forest-50">
            <div className="flex items-start gap-3">
              <DishIllustration name="Moroccan Lamb Tagine" emoji="🍲" size="md" />
              <div className="min-w-0">
                <div className="text-[10.5px] uppercase tracking-[0.16em] text-forest-700 font-semibold flex items-center gap-1"><Icon.Crown size={11}/> Top performer · this week</div>
                <div className="font-display font-semibold text-[16px] text-ink mt-1">Moroccan Lamb Tagine</div>
                <div className="text-[12.5px] text-ink-soft mt-1 leading-snug">412 servings · 92% positive · "Best thing all month" – Eng team</div>
                <div className="mt-2 flex items-center gap-3 text-[12px]">
                  <span className="flex items-center gap-1 text-gold-700 font-semibold"><Icon.Star size={12} fill="#C9A84C"/>4.8</span>
                  <span className="text-ink-muted">+0.4 vs avg</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] p-5 bg-rose-50 border border-rose-100">
            <div className="flex items-start gap-3">
              <DishIllustration name="Caesar Salad Classic" emoji="🥗" size="md" />
              <div className="min-w-0">
                <div className="text-[10.5px] uppercase tracking-[0.16em] text-rose-700 font-semibold flex items-center gap-1"><Icon.AlertTriangle size={11}/> Underperforming · 3 weeks</div>
                <div className="font-display font-semibold text-[16px] text-ink mt-1">Caesar Salad Classic</div>
                <div className="mt-2 p-2.5 rounded-xl bg-white text-[12px] text-ink-soft leading-snug">
                  <span className="font-semibold text-gold-700">Sella suggests:</span> rework with a smoked anchovy dressing and rye croutons, or rotate out. Three consecutive low scores from Berlin and NYC.
                </div>
                <button onClick={() => setShowRework(v => !v)} className="mt-2 text-[12px] text-forest-700 font-semibold underline-offset-4 hover:underline">
                  {showRework ? '↑ Close brief' : 'Open rework brief →'}
                </button>
                {showRework && (
                  <div className="mt-2 rounded-xl bg-white border border-forest-700/10 p-3 text-[12px] text-ink-soft space-y-1.5">
                    <div className="font-semibold text-ink text-[12.5px]">Rework brief · Caesar Salad</div>
                    <div><b>Issue:</b> 3 consecutive weeks below 65% satisfaction. Berlin (-18%), NYC (-12%).</div>
                    <div><b>Proposed direction:</b> Smoked anchovy dressing + rye croutons + shaved parmesan.</div>
                    <div><b>Test window:</b> 2 weeks starting May 20.</div>
                    <div><b>Owner:</b> Chef Lena · deadline May 17.</div>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-forest-700 text-cream-50 text-[11px] font-semibold rounded-full px-2.5 py-1">Assign to Chef Lena</button>
                      <button className="text-[11px] font-semibold text-ink-soft border border-forest-700/15 rounded-full px-2.5 py-1">Rotate out instead</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-[20px] bg-cream-50 p-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold mb-1">Top dishes · % positive</div>
            <div className="font-display font-semibold text-[16px] text-ink mb-3">All sites · last 7 days</div>
            <BarChart data={dishesPerf} h={140}/>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-[20px] bg-cream-50 p-5 h-full">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">NPS</div>
                <div className="font-display font-semibold text-[28px] text-forest-700 mt-1">+{NPS_TREND[NPS_TREND.length-1]}</div>
              </div>
              <div className="text-right">
                <Pill tone="green"><Icon.Trend size={11}/> +13 vs 30d ago</Pill>
                <div className="text-[11.5px] text-ink-muted mt-1">Last 30 days</div>
              </div>
            </div>
            <div className="mt-3"><TrendLine values={NPS_TREND} h={84}/></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WasteSection = ({ onToast }) => {
  const [applied, setApplied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  return (
  <section id="waste" className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
    <SectionHeader kicker="This week" title="Waste &amp; cost intelligence" sub="Plate-level consumption signals feed back into procurement and recipe design." />
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-4">
        <div className="rounded-[20px] p-5 bg-cream-50 h-full">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Food waste · this week</div>
          <div className="font-display text-[36px] font-semibold text-forest-700 mt-1">87 <span className="text-[18px] text-ink-soft font-medium">kg</span></div>
          <div className="text-[12px] text-ink-soft">vs target of 110 kg</div>
          <div className="mt-3 h-2 rounded-full bg-white overflow-hidden border border-forest-700/5">
            <div className="h-full bg-forest-500" style={{ width: '79%' }}/>
          </div>
          <div className="flex items-center justify-between mt-1.5 text-[11px] text-ink-muted"><span>0 kg</span><span>110 kg</span></div>
          <Pill tone="green" className="mt-3"><Icon.TrendDown size={11}/> -21% vs last week</Pill>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="rounded-[20px] p-5 bg-cream-50 h-full">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Cost per portion</div>
          <div className="flex items-baseline gap-2 mt-1">
            <div className="font-display text-[36px] font-semibold text-ink">₪14.20</div>
            <div className="text-[12.5px] text-ink-soft">actual</div>
          </div>
          <div className="text-[12px] text-ink-soft">vs ₪15.00 planned</div>
          <div className="mt-3 space-y-1.5">
            {[['bg-forest-700','Actual','₪14.20'],['bg-cream-300','Planned','₪15.00'],['bg-gold-500','Industry avg','₪17.40']].map(([bg, label, val]) => (
              <div key={label} className="flex items-center gap-2 text-[12px]">
                <span className={`w-2.5 h-2.5 rounded-sm ${bg}`}/>
                <span className="text-ink-soft flex-1">{label}</span>
                <span className="font-semibold text-ink">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="rounded-[20px] p-5 bg-forest-50 h-full">
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-forest-700 font-semibold flex items-center gap-1.5"><Icon.Sparkles size={11}/> Sella insight</div>
          <div className="font-display text-[15px] text-ink leading-snug mt-2">
            Plant-based portions had <span className="font-semibold text-forest-700">94% consumption</span> this week.
          </div>
          <div className="text-[12.5px] text-ink-soft mt-2">Consider increasing plant-based allocation by <b>15%</b> next week. Expected ₪2,140 saved on protein and 18 kg less waste.</div>
          {!dismissed && (
            <div className="mt-3 flex gap-2">
              {applied ? (
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700"><Icon.Check size={13}/> Applied to next week</div>
              ) : (
                <>
                  <button onClick={() => { setApplied(true); onToast?.('Suggestion applied', '🌿'); }} className="bg-forest-700 hover:bg-forest-600 text-cream-50 text-[12px] font-semibold rounded-full px-3 py-1.5 flex items-center gap-1"><Icon.Check size={12}/> Apply</button>
                  <button onClick={() => { setDismissed(true); }} className="text-[12px] font-semibold text-ink-soft rounded-full px-3 py-1.5 hover:bg-white/60">Dismiss</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12">
        <div className="rounded-[20px] bg-cream-50 p-5 flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Icon.Leaf size={20}/></div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Sustainability score</div>
            <div className="font-display font-semibold text-[18px] text-ink">A+ · On target</div>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            {[['Waste reduction (mo.)','-23%'],['% plant-based meals','41%'],['CO₂ saved (mo.)','2.8 t']].map(([label, val]) => (
              <div key={label}><div className="text-[11px] text-ink-muted">{label}</div><div className="font-display font-semibold text-[18px] text-emerald-700">{val}</div></div>
            ))}
            <div className="w-48">
              <div className="text-[11px] text-ink-muted mb-1">Monthly goal</div>
              <div className="h-2 rounded-full bg-white overflow-hidden border border-forest-700/5">
                <div className="h-full bg-gradient-to-r from-forest-500 to-emerald-400" style={{ width: '82%' }}/>
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">82% to monthly target</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const BenchmarkSection = () => {
  const [expanded, setExpanded] = useState(null);
  return (
  <section id="sites" className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
    <SectionHeader kicker="Cross-site" title="Site benchmarking" sub="Same metrics, normalized for headcount and tenure. The crown shows this period's leader." />
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-[10.5px] uppercase tracking-[0.18em] text-ink-muted font-semibold">
            {['Site','Headcount','Satisfaction','Waste %','Forecast accuracy','NPS',''].map(h => (
              <th key={h} className="text-left px-2 pb-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SITES.map(s => (
            <React.Fragment key={s.id}>
            <tr className="border-t border-forest-700/5 hover:bg-cream-50">
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-2 font-display font-semibold text-ink">
                  <span className="text-base">{s.country}</span> {s.name}
                  {s.best && <Pill tone="gold"><Icon.Crown size={10}/> Best</Pill>}
                </div>
              </td>
              <td className="px-2 py-3.5 text-ink-soft">{s.headcount.toLocaleString()}</td>
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{s.sat}</span>
                  <div className="w-24 h-1.5 rounded-full bg-cream-200 overflow-hidden">
                    <div className="h-full bg-forest-500" style={{ width: `${(s.sat/5)*100}%` }}/>
                  </div>
                </div>
              </td>
              <td className="px-2 py-3.5">
                <span className={`font-semibold ${s.waste < 10 ? 'text-emerald-700' : s.waste < 12 ? 'text-gold-700' : 'text-rose-700'}`}>{s.waste}%</span>
              </td>
              <td className="px-2 py-3.5"><span className="font-semibold text-ink">{s.forecastAcc}%</span></td>
              <td className="px-2 py-3.5">
                <span className={`font-semibold ${s.nps >= 60 ? 'text-emerald-700' : s.nps >= 50 ? 'text-gold-700' : 'text-rose-700'}`}>+{s.nps}</span>
              </td>
              <td className="px-2 py-3.5 text-right">
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="text-[12px] font-semibold text-forest-700 underline-offset-4 hover:underline">
                  {expanded === s.id ? 'Close ↑' : 'Open →'}
                </button>
              </td>
            </tr>
            {expanded === s.id && (
              <tr key={s.id + '-detail'} className="bg-forest-50">
                <td colSpan={7} className="px-4 py-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px]">
                    <div><div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Weekly satisfaction</div><div className="font-display text-[22px] font-semibold text-forest-700 mt-0.5">{s.sat} / 5</div></div>
                    <div><div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">NPS</div><div className="font-display text-[22px] font-semibold text-forest-700 mt-0.5">+{s.nps}</div></div>
                    <div><div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Forecast accuracy</div><div className="font-display text-[22px] font-semibold text-forest-700 mt-0.5">{s.forecastAcc}%</div></div>
                    <div><div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Waste rate</div><div className={`font-display text-[22px] font-semibold mt-0.5 ${s.waste < 10 ? 'text-emerald-700' : s.waste < 12 ? 'text-gold-700' : 'text-rose-700'}`}>{s.waste}%</div></div>
                  </div>
                </td>
              </tr>
            )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  );
};

const StaffingSection = ({ onToast }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [resolvedOption, setResolvedOption] = useState(null);
  return (
  <section id="staffing" className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
    <SectionHeader kicker="This week · Tel Aviv HQ" title="Staffing optimizer" sub="Predicted load by half-hour. Plan adjusts automatically; you keep the final say." />
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8">
        <div className="rounded-[20px] bg-cream-50 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">Peak hours heatmap</div>
              <div className="font-display font-semibold text-[16px] text-ink">Load index · time × day</div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-muted">
              <span>Quiet</span>
              <div className="w-24 h-2 rounded-full" style={{ background: 'linear-gradient(90deg,rgba(201,168,76,0.18),rgba(201,168,76,0.95))' }}/>
              <span>Hot</span>
            </div>
          </div>
          <HeatGrid
            rows={STAFFING_HEATMAP.matrix.map((row, i) => ({ hour: STAFFING_HEATMAP.hours[i], row }))}
            days={STAFFING_HEATMAP.days}
            baseRGB={[201,168,76]}
            getLabel={(r) => r.hour}
            getValue={(r, i) => r.row[i]}
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <div className="rounded-[20px] p-5 bg-rose-50 border border-rose-100">
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-rose-700 font-semibold flex items-center gap-1.5"><Icon.AlertTriangle size={11}/> Capacity alert</div>
          <div className="font-display font-semibold text-[15px] text-ink leading-snug mt-2">
            Thursday 12:30 — projected <span className="text-rose-700">40% over capacity</span> at Tel Aviv HQ.
          </div>
          <div className="text-[12px] text-ink-soft mt-2">Move 2 servers from Herzliya, or push the all-hands by 30 min. Both options drafted.</div>
          {resolvedOption ? (
            <div className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700"><Icon.Check size={13}/> {resolvedOption}</div>
          ) : showOptions ? (
            <div className="mt-2 space-y-2">
              {[
                { key: 'servers', label: 'Move 2 servers from Herzliya', sub: 'Approved by Herzliya ops · 08:30' },
                { key: 'allhands', label: 'Push all-hands to 14:30', sub: 'Calendar invite queued · notify 2h before' },
              ].map(opt => (
                <button key={opt.key} onClick={() => { setResolvedOption(opt.label); onToast?.('Option applied', '✓'); }}
                  className="w-full text-left rounded-xl bg-white border border-forest-700/15 p-3 hover:border-forest-700/40 transition-colors">
                  <div className="text-[12.5px] font-semibold text-ink">{opt.label}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => setShowOptions(true)} className="mt-2 bg-forest-700 hover:bg-forest-600 text-cream-50 text-[12.5px] font-semibold rounded-full px-3 py-1.5">Review options</button>
          )}
        </div>
        <div className="rounded-[20px] p-5 bg-cream-50">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold mb-2">This week&apos;s staffing</div>
          <div className="space-y-2.5">
            {[{d:'Mon',planned:12,actual:12},{d:'Tue',planned:12,actual:11},{d:'Wed',planned:14,actual:14},{d:'Thu',planned:14,actual:12},{d:'Fri',planned:16,actual:16}].map(r => {
              const ok = r.planned === r.actual;
              return (
                <div key={r.d} className="flex items-center gap-3 text-[12.5px]">
                  <span className="w-8 font-semibold text-ink">{r.d}</span>
                  <div className="flex-1 flex gap-1 items-center">
                    <div className="h-2 rounded-full bg-forest-500/30 flex-1 overflow-hidden">
                      <div className="h-full bg-forest-500" style={{ width: `${(r.actual/16)*100}%` }}/>
                    </div>
                  </div>
                  <span className={`font-semibold ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>{r.actual}/{r.planned}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const SustainabilitySection = () => (
  <section className="bg-white rounded-3xl shadow-card p-6 lg:p-8 anim-fade-up">
    <SectionHeader kicker="May" title="Sustainability tracker" sub="The numbers your CSR team reports — calculated from real plate-level consumption, not estimates." right={<Pill tone="green"><Icon.Leaf size={11}/> On target</Pill>} />
    <div className="grid grid-cols-12 gap-5">
      {[
        { label: 'Waste reduction vs baseline', value: '-23%', sub: 'Goal: -20% by Q3',        trend: '+4 pts' },
        { label: '% plant-based meals sold',    value: '41%',  sub: 'Goal: 45% by year-end',   trend: '+3 pts' },
        { label: 'CO₂ saved this month',        value: '2.8 t',sub: 'Eq. 14,000 km driven',   trend: '+0.6 t' },
        { label: 'Local-sourced ingredients',   value: '67%',  sub: 'Goal: 75% by Q4',         trend: '+5 pts' },
      ].map((k, i) => (
        <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="rounded-[20px] bg-cream-50 p-5 h-full">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">{k.label}</div>
            <div className="font-display text-[32px] font-semibold text-forest-700 leading-none mt-2">{k.value}</div>
            <div className="text-[12px] text-ink-soft mt-1">{k.sub}</div>
            <div className="mt-2"><Pill tone="green"><Icon.Trend size={10}/> {k.trend} vs last mo.</Pill></div>
          </div>
        </div>
      ))}
      <div className="col-span-12">
        <div className="rounded-[20px] bg-forest-700 text-cream-50 p-5 flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-full bg-cream-50/10 flex items-center justify-center"><Icon.Leaf size={22}/></div>
          <div className="flex-1 min-w-[240px]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-cream-50/70 font-semibold">Monthly sustainability goal</div>
            <div className="font-display font-semibold text-[16px] mt-1">82% of the way there · 9 days left in May</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="h-2.5 rounded-full bg-cream-50/15 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-gold-500" style={{ width: '82%' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ConnectedSystems = () => (
  <section className="rounded-3xl bg-cream-50 border border-forest-700/10 p-6 lg:p-8 anim-fade-up">
    <SectionHeader kicker="Integrations" title="Connected systems" sub="Sella doesn't replace your operating stack — it sits on top as the intelligence layer." />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {INTEGRATIONS.map((it, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-forest-700/5">
          <div className="flex items-center justify-between">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-ink-muted font-semibold">{it.live ? 'Live' : 'Syncing'}</div>
            <span className="text-base">{it.icon}</span>
          </div>
          <div className="font-display font-semibold text-[15px] text-ink mt-1">{it.name}</div>
          <div className="text-[12px] text-ink-soft mt-0.5">{it.desc}</div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${it.live ? 'bg-emerald-500' : 'bg-gold-500 animate-pulse'}`}/>
            <span className="text-[11.5px] text-ink-muted">{it.live ? 'Synced 2 min ago' : 'Initial sync in progress'}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const AdminView = () => {
  const [site, setSite] = useState('tlv');
  const [all, setAll] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (message, icon = '✓') => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 2800);
  };
  return (
    <div className="min-h-screen bg-[#EDE6D6]">
      <AdminHeader site={site} setSite={setSite} all={all} setAll={setAll} />
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
          <div className="bg-forest-700 text-cream-50 px-5 py-3 rounded-2xl shadow-float flex items-center gap-2.5 text-[13px] font-semibold whitespace-nowrap" style={{animation:'fadeIn 0.2s ease'}}>
            <span className="text-base">{toast.icon}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <main className="max-w-[1480px] mx-auto px-4 lg:px-6 py-6 lg:py-8 space-y-5 lg:space-y-6 grain">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[11.5px] uppercase tracking-[0.2em] text-ink-muted font-semibold">Tuesday, May 14, 2026</div>
            <h1 className="font-display font-semibold text-[28px] lg:text-[32px] text-ink mt-1">Good morning, Yarden.</h1>
            <div className="text-[13px] text-ink-soft mt-1">3 things need your attention before lunch.</div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone="gold"><Icon.Sparkles size={11}/> 3 new insights</Pill>
            <Pill tone="green"><Icon.Check size={11}/> Tomorrow&apos;s plan ready</Pill>
            <Pill tone="red"><Icon.AlertTriangle size={11}/> 1 capacity alert</Pill>
          </div>
        </div>
        <SellaScoreBanner />
        <DailyProgramSection onToast={showToast} />
        <ForecastSection site={site} onToast={showToast} />
        <SatisfactionSection />
        <WasteSection onToast={showToast} />
        <BenchmarkSection />
        <StaffingSection onToast={showToast} />
        <SustainabilitySection />
        <ConnectedSystems />
        <footer className="text-center py-6 text-[11.5px] text-ink-muted">
          <SellaLogo size={18} />
          <div className="mt-2">Hospitality intelligence for the workplace · v2030.1 · © Sella</div>
        </footer>
      </main>
    </div>
  );
};
