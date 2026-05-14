import { useState } from 'react';
import { Icon } from './icons';
import { AIBadge, DishIllustration, Pill } from './ui';
import { COFFEES, BREAKFASTS, SHAKES, USUAL_ORDER } from './data';

const MR_TIMES = ['08:45','09:00','09:15','09:30','09:45'];

const Toggle = ({ on, onChange, label }) => (
  <button
    onClick={() => onChange(!on)}
    className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? 'bg-forest-700' : 'bg-cream-300'}`}
    aria-pressed={on}
    aria-label={label}
  >
    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const UsualMode = ({ coffee, brk, shk, time, setTime, addShake, setShake, onChoose, onConfirm }) => (
  <div className="mt-3 anim-fade-up">
    <h2 className="font-display font-semibold text-[22px] text-ink leading-tight">Good morning, Dana ☀️</h2>
    <p className="text-[13.5px] text-ink-soft mt-1 leading-snug">{USUAL_ORDER.arrivalNote} Want your usual ready when you walk in?</p>

    <div className="mt-4 bg-white rounded-[20px] p-3 shadow-card flex items-center gap-3">
      <DishIllustration name={coffee.name} emoji={coffee.emoji} size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Your usual</div>
        <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5">{coffee.name}</div>
        <div className="text-[12px] text-ink-soft truncate">{coffee.desc}</div>
      </div>
    </div>
    <div className="mt-2 bg-white rounded-[20px] p-3 shadow-card flex items-center gap-3">
      <DishIllustration name={brk.name} emoji={brk.emoji} size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Pair</div>
        <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5">{brk.name}</div>
        <div className="text-[12px] text-ink-soft truncate">{brk.desc}</div>
      </div>
    </div>

    <div className="mt-3 bg-forest-50 rounded-[20px] p-3 flex items-center gap-3 border border-forest-500/15">
      <DishIllustration name={shk.name} emoji={shk.emoji} size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[10.5px] uppercase tracking-[0.16em] text-forest-700 font-semibold flex items-center gap-1">
          <Icon.Sprout size={11}/> Add to your morning
        </div>
        <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5">{shk.name}</div>
        <div className="text-[11.5px] text-ink-soft leading-snug">{USUAL_ORDER.shakeNote}</div>
      </div>
      <Toggle on={addShake} onChange={setShake} label="Add shake" />
    </div>

    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Ready by</div>
        <div className="text-[11.5px] text-ink-muted flex items-center gap-1"><Icon.MapPin size={11}/> {USUAL_ORDER.pickupLoc}</div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {MR_TIMES.map(t => {
          const active = time === t;
          return (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`rounded-xl py-2 text-[12.5px] font-semibold transition-all ${active ? 'bg-forest-700 text-cream-50 shadow-card' : 'bg-white text-ink border border-forest-700/10'}`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>

    <button
      onClick={onConfirm}
      className="mt-4 w-full bg-forest-700 hover:bg-forest-600 text-cream-50 font-display font-semibold text-[15px] rounded-2xl py-3.5 shadow-card flex items-center justify-center gap-2"
    >
      Yes — my usual at {time} <Icon.Check size={16} />
    </button>
    <button
      onClick={onChoose}
      className="mt-2 w-full text-center text-[13px] font-semibold text-forest-700 py-2 flex items-center justify-center gap-1"
    >
      Mix it up today <Icon.Arrow size={13}/>
    </button>
    <div className="text-[11px] text-ink-muted text-center mt-1">Anything booked here syncs to your calendar.</div>
  </div>
);

const ChooseMode = ({ coffeeId, setCoffee, breakId, setBreak, shakeId, setShakeId, addShake, setShake, time, setTime, onBack, onConfirm }) => {
  const [tab, setTab] = useState('coffee');
  const tabs = [
    { k: 'coffee', label: '☕ Coffee' },
    { k: 'break',  label: '🍳 Breakfast' },
    { k: 'shake',  label: '🥤 Shake' },
  ];
  const items = tab === 'coffee' ? COFFEES : tab === 'break' ? BREAKFASTS : SHAKES;
  const selected = tab === 'coffee' ? coffeeId : tab === 'break' ? breakId : shakeId;
  const setSelected = tab === 'coffee' ? setCoffee : tab === 'break' ? setBreak : setShakeId;

  const summaryCoffee = COFFEES.find(c => c.id === coffeeId);
  const summaryBreak  = BREAKFASTS.find(b => b.id === breakId);
  const summaryShake  = SHAKES.find(s => s.id === shakeId);

  return (
    <div className="mt-3 anim-fade-up">
      <button onClick={onBack} className="text-[12px] text-ink-soft flex items-center gap-1 mb-1 hover:text-ink">
        <span className="rotate-180 inline-flex"><Icon.ChevronRight size={14}/></span> Back to usual
      </button>
      <h2 className="font-display font-semibold text-[20px] text-ink leading-tight">Build your morning</h2>
      <p className="text-[12.5px] text-ink-soft mt-0.5">Mix and match — your usuals are pre-selected.</p>

      <div className="mt-3 bg-white rounded-full p-1 border border-forest-700/10 flex">
        {tabs.map(t => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex-1 text-[12.5px] font-semibold rounded-full py-1.5 transition-all ${active ? 'bg-forest-700 text-cream-50 shadow-card' : 'text-ink-soft'}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map(it => {
          const active = selected === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setSelected(it.id)}
              className={`relative text-left rounded-2xl p-2.5 transition-all ${active ? 'bg-white shadow-card ring-2 ring-forest-700' : 'bg-white/70 hover:bg-white shadow-card'}`}
            >
              <div className="flex gap-2">
                <DishIllustration name={it.name} emoji={it.emoji} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-[12.5px] text-ink leading-tight">{it.name}</div>
                  <div className="text-[10.5px] text-ink-soft leading-snug" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{it.desc}</div>
                  <div className="text-[10px] text-ink-muted mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><Icon.Flame size={9} className="text-orange-500"/>{it.kcal}</span>
                    {it.usual && <span className="text-gold-700 font-semibold">Your usual</span>}
                    {it.tag && <span>· {it.tag}</span>}
                  </div>
                </div>
              </div>
              {active && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-forest-700 text-cream-50 flex items-center justify-center">
                  <Icon.Check size={12}/>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {tab !== 'shake' && (
        <div className="mt-3 bg-forest-50 rounded-2xl p-3 flex items-center gap-3 border border-forest-500/15">
          <span className="text-2xl">🥤</span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-semibold text-[13px] text-ink leading-tight">Add a wellness shake</div>
            <div className="text-[11px] text-ink-soft">{summaryShake.name} — currently selected</div>
          </div>
          <Toggle on={addShake} onChange={setShake} label="Add shake" />
        </div>
      )}

      <div className="mt-3">
        <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold mb-1.5">Ready by</div>
        <div className="grid grid-cols-5 gap-1.5">
          {MR_TIMES.map(t => {
            const active = time === t;
            return (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`rounded-xl py-2 text-[12.5px] font-semibold transition-all ${active ? 'bg-forest-700 text-cream-50' : 'bg-white text-ink border border-forest-700/10'}`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-3 border border-forest-700/10 text-[12px] text-ink-soft">
        <span className="font-semibold text-ink">{summaryCoffee.name}</span> + <span className="font-semibold text-ink">{summaryBreak.name}</span>{addShake && <> + <span className="font-semibold text-ink">{summaryShake.name}</span></>} · <span className="text-forest-700 font-semibold">{time}</span>
      </div>
      <button
        onClick={onConfirm}
        className="mt-3 w-full bg-forest-700 hover:bg-forest-600 text-cream-50 font-display font-semibold text-[14.5px] rounded-2xl py-3 shadow-card flex items-center justify-center gap-2"
      >
        Confirm pickup at {time} <Icon.Check size={15}/>
      </button>
    </div>
  );
};

export const MorningSheet = ({ open, onClose, onConfirm }) => {
  const [mode, setMode]       = useState('usual');
  const [time, setTime]       = useState(USUAL_ORDER.defaultTime);
  const [addShake, setShake]  = useState(true);
  const [coffeeId, setCoffee] = useState(USUAL_ORDER.coffee);
  const [breakId, setBreak]   = useState(USUAL_ORDER.breakfast);
  const [shakeId, setShakeId] = useState(USUAL_ORDER.shake);

  if (!open) return null;
  const coffee = COFFEES.find(c => c.id === coffeeId);
  const brk    = BREAKFASTS.find(b => b.id === breakId);
  const shk    = SHAKES.find(s => s.id === shakeId);

  const confirm = () => {
    onConfirm({ coffee: coffeeId, breakfast: breakId, shake: addShake ? shakeId : null, time, mode });
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div
        className="absolute inset-0 bg-forest-900/40 backdrop-blur-[2px] anim-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-cream-100 rounded-t-[28px] w-full max-h-[88%] overflow-y-auto no-scrollbar shadow-float anim-fade-up">
        <div className="pt-2 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-ink/20" />
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <AIBadge tone="cream">Your Sella morning</AIBadge>
            <button onClick={onClose} className="text-[12px] text-ink-muted underline-offset-2 hover:underline">Not today</button>
          </div>
          {mode === 'usual' && (
            <UsualMode
              coffee={coffee} brk={brk} shk={shk}
              time={time} setTime={setTime}
              addShake={addShake} setShake={setShake}
              onChoose={() => setMode('choose')}
              onConfirm={confirm}
            />
          )}
          {mode === 'choose' && (
            <ChooseMode
              coffeeId={coffeeId} setCoffee={setCoffee}
              breakId={breakId} setBreak={setBreak}
              shakeId={shakeId} setShakeId={setShakeId}
              addShake={addShake} setShake={setShake}
              time={time} setTime={setTime}
              onBack={() => setMode('usual')}
              onConfirm={confirm}
            />
          )}
        </div>
      </div>
    </div>
  );
};
