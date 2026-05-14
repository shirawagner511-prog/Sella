import { Icon } from './icons';
import { AIBadge, Card, DishIllustration, Pill, SectionTitle } from './ui';
import { SHAKES, WELLNESS_CLASSES, WELLNESS_WEEK, WELLNESS_STREAK, PERKS } from './data';

const WellnessHero = () => {
  const next = WELLNESS_CLASSES.find(c => c.recommended) || WELLNESS_CLASSES[2];
  return (
    <div className="px-5">
      <div className="relative rounded-[20px] p-5 text-cream-50 ambient-forest overflow-hidden shadow-float">
        <div className="flex items-center justify-between">
          <AIBadge tone="ghost">Today's wellness</AIBadge>
          <div className="text-[11px] text-cream-50/70">Tue · May 14</div>
        </div>
        <div className="mt-3 font-display text-[19px] leading-snug">
          You're 1 class away from <span className="text-gold-500 font-semibold">a 5-week streak</span>.
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {WELLNESS_STREAK.weekDone.map((d, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                d ? 'bg-gold-500 text-forest-900' : 'bg-white/10 text-cream-50/60 border border-white/15'
              }`}>{d ? '✓' : WELLNESS_WEEK[i]}</div>
              <div className="text-[9px] text-cream-50/60 mt-0.5">{WELLNESS_WEEK[i]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/15">
          <div className="text-[10.5px] uppercase tracking-[0.16em] text-cream-50/70 font-semibold">Next class · today</div>
          <div className="font-display font-semibold text-[15px] mt-0.5">{next.name} · {next.time}</div>
          <div className="text-[11.5px] text-cream-50/70 mt-0.5">{next.instructor} · {next.loc} · {next.spots} of {next.total} spots</div>
        </div>
      </div>
    </div>
  );
};

const ShakeBar = () => (
  <div className="px-5 mt-5">
    <SectionTitle kicker="Free before 09:00" title="Wellness shake bar" />
    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1 stagger">
      {SHAKES.map(s => (
        <div key={s.id} className="shrink-0 w-[150px] bg-white rounded-2xl p-3 shadow-card">
          <DishIllustration name={s.name} emoji={s.emoji} size="md" className="!w-full !h-20 !rounded-xl" />
          <div className="mt-2 flex items-center justify-between gap-1">
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-gold-700 font-semibold truncate">{s.tag}</div>
            {s.usual && <Pill tone="gold">Usual</Pill>}
          </div>
          <div className="font-display font-semibold text-[13.5px] text-ink mt-0.5 leading-tight">{s.name}</div>
          <div className="text-[11px] text-ink-soft leading-snug" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{s.desc}</div>
          <div className="mt-2 text-[11px] text-ink-muted flex items-center gap-1">
            <Icon.Flame size={11} className="text-orange-500"/> {s.kcal} kcal
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClassRow = ({ cls, joined, toggleJoin }) => {
  const tones = {
    Yoga:        'bg-emerald-50 text-emerald-700',
    Pilates:     'bg-rose-50 text-rose-700',
    HIIT:        'bg-orange-50 text-orange-700',
    Cardio:      'bg-orange-50 text-orange-700',
    Mindfulness: 'bg-sky-50 text-sky-700',
    Recovery:    'bg-purple-50 text-purple-700',
    Vinyasa:     'bg-emerald-50 text-emerald-700',
  };
  const pctFull = Math.round(((cls.total - cls.spots) / cls.total) * 100);
  const filling = cls.spots <= 4;
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="text-center shrink-0">
          <div className="font-display font-semibold text-[19px] text-ink leading-none">{cls.time}</div>
          <div className="text-[10px] text-ink-muted mt-1">{cls.dur} min</div>
        </div>
        <div className="w-px self-stretch bg-forest-700/8" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-semibold text-[14.5px] text-ink leading-tight">{cls.name}</h4>
            {cls.recommended && <Pill tone="gold"><Icon.Sparkles size={10}/> For you</Pill>}
          </div>
          <div className="text-[12px] text-ink-soft mt-0.5">{cls.instructor} · {cls.level}</div>
          <div className="text-[11.5px] text-ink-muted mt-0.5 flex items-center gap-1"><Icon.MapPin size={11}/>{cls.loc}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {cls.tags.map(t => <span key={t} className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${tones[t] || 'bg-cream-200 text-ink-soft'}`}>{t}</span>)}
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-cream-200 overflow-hidden">
              <div className={`h-full ${filling ? 'bg-rose-500' : 'bg-forest-500'}`} style={{ width: `${pctFull}%` }}/>
            </div>
            <span className={`text-[11px] font-semibold ${filling ? 'text-rose-600' : 'text-ink-muted'}`}>
              {cls.spots} {filling ? '· filling' : 'spots'}
            </span>
            <button
              onClick={() => toggleJoin(cls.id)}
              className={`text-[12px] font-semibold rounded-full px-3 py-1.5 transition-all ${joined ? 'bg-forest-50 text-forest-700 border border-forest-500/30' : 'bg-forest-700 hover:bg-forest-600 text-cream-50'}`}
            >
              {joined ? '✓ Booked' : 'Book'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PerksRow = () => (
  <div className="px-5 mt-5">
    <SectionTitle kicker="On-site this week" title="Perks &amp; partners" />
    <div className="grid grid-cols-2 gap-2.5 stagger">
      {PERKS.map(p => (
        <Card key={p.id} className="p-3.5">
          <div className="text-2xl">{p.icon}</div>
          <div className="font-display font-semibold text-[13.5px] text-ink mt-1 leading-tight">{p.name}</div>
          <div className="text-[11.5px] text-ink-soft leading-snug mt-0.5">{p.desc}</div>
          <div className="text-[11px] text-gold-700 font-semibold mt-1.5">{p.avail}</div>
        </Card>
      ))}
    </div>
  </div>
);

export const WellnessScreen = ({ bookings, toggleJoin }) => {
  const isBooked = (id) => bookings.includes(id);
  return (
    <div className="pb-28 pt-24">
      <div className="px-5 pt-3 pb-3">
        <div className="text-[12px] text-ink-muted">Tel Aviv HQ · Studio Floor 7</div>
        <h1 className="font-display font-semibold text-[24px] text-ink">Wellness</h1>
      </div>
      <WellnessHero />
      <ShakeBar />
      <div className="px-5 mt-5">
        <SectionTitle kicker="Today" title="Classes" right={<button className="text-[12px] font-semibold text-forest-700">Week ›</button>}/>
        <div className="space-y-2.5 stagger">
          {WELLNESS_CLASSES.map(c => (
            <ClassRow key={c.id} cls={c} joined={isBooked(c.id)} toggleJoin={toggleJoin}/>
          ))}
        </div>
      </div>
      <PerksRow />
      <div className="px-5 mt-6 flex justify-center">
        <AIBadge>Sella tunes your week from your patterns</AIBadge>
      </div>
    </div>
  );
};
