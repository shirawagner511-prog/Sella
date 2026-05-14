import { useState, useMemo } from 'react';
import { Icon } from './icons';
import { AIBadge, Allergen, Card, ChipRow, DishIllustration, MobileFrame, Pill, SectionTitle, SellaLogo } from './ui';
import { COFFEES, BREAKFASTS, SHAKES, USUAL_ORDER, WEEK_MENU, EVENTS, WELLNESS_CLASSES } from './data';
import { MorningSheet } from './morning';
import { WellnessScreen } from './wellness';

// ─── Home ────────────────────────────────────────────────────────

const TimelineDot = ({ tone = 'forest', label }) => (
  <div className="flex flex-col items-center shrink-0" style={{ width: 38 }}>
    <div className={`w-2.5 h-2.5 rounded-full ${tone === 'gold' ? 'bg-gold-500' : tone === 'soft' ? 'bg-cream-300' : 'bg-forest-700'}`} />
    <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted font-semibold mt-1.5">{label}</div>
    <div className="flex-1 w-px bg-forest-700/10 mt-1.5" />
  </div>
);

const MorningRitualCard = ({ order, onOpen }) => {
  if (!order) {
    return (
      <button onClick={onOpen} className="w-full text-left bg-white rounded-2xl shadow-card p-4 border border-dashed border-gold-500/40 hover:border-gold-500">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gold-50 text-gold-700 flex items-center justify-center text-xl">☕</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10.5px] uppercase tracking-[0.16em] text-gold-700 font-semibold">Start your morning</div>
            <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5">Build your usual</div>
            <div className="text-[12px] text-ink-soft mt-0.5">Coffee, breakfast, shake — set it once.</div>
          </div>
          <Icon.ChevronRight size={16} className="text-ink-muted" />
        </div>
      </button>
    );
  }
  const coffee = COFFEES.find(c => c.id === order.coffee);
  const brk    = BREAKFASTS.find(b => b.id === order.breakfast);
  const shk    = order.shake ? SHAKES.find(s => s.id === order.shake) : null;
  return (
    <Card className="p-4 border border-forest-500/20 anim-fade-up">
      <div className="flex items-center justify-between">
        <div className="text-[10.5px] uppercase tracking-[0.16em] text-forest-700 font-semibold flex items-center gap-1"><Icon.Check size={11}/> Your morning is ready</div>
        <button onClick={onOpen} className="text-[11px] text-ink-muted underline-offset-2 hover:underline">Edit</button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <DishIllustration name={coffee.name} emoji={coffee.emoji} size="sm" />
        <DishIllustration name={brk.name} emoji={brk.emoji} size="sm" />
        {shk && <DishIllustration name={shk.name} emoji={shk.emoji} size="sm" />}
        <div className="flex-1 min-w-0 ml-1">
          <div className="font-display font-semibold text-[14px] text-ink leading-tight truncate">{coffee.name} + {brk.name.split(' ').slice(0,2).join(' ')}{shk ? ' + Shake' : ''}</div>
          <div className="text-[11.5px] text-ink-soft flex items-center gap-1 mt-0.5"><Icon.Clock size={11}/> {order.time} · {USUAL_ORDER.pickupLoc.split('·')[0].trim()}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-cream-200 overflow-hidden">
          <div className="h-full bg-forest-500 anim-fade-in" style={{ width: '45%' }}/>
        </div>
        <div className="text-[11px] text-ink-muted">Brewing</div>
      </div>
    </Card>
  );
};

const HomeScreen = ({ onGoto, favorites, morningOrder, openMorning, lunchRated, wellnessBookings }) => {
  const recommended = WEEK_MENU.Tue.find(d => d.recommended) || WEEK_MENU.Tue[0];
  const nextClass = WELLNESS_CLASSES.find(c => wellnessBookings.includes(c.id)) || WELLNESS_CLASSES.find(c => c.recommended) || WELLNESS_CLASSES[2];
  const classBooked = wellnessBookings.includes(nextClass.id);

  return (
    <div className="pb-28 pt-24 stagger">
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <div className="text-[12px] text-ink-muted">Tuesday, May 14</div>
          <h1 className="font-display font-semibold text-[26px] leading-tight text-ink mt-0.5">Good morning, Dana ☀️</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center relative" aria-label="Notifications">
          <Icon.Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-500" />
        </button>
      </div>

      <div className="px-5 mt-1">
        <div className="flex gap-3">
          <TimelineDot label="AM"/>
          <div className="flex-1">
            <MorningRitualCard order={morningOrder} onOpen={openMorning} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-2">
        <div className="flex gap-3">
          <TimelineDot tone="soft" label={nextClass.time}/>
          <div className="flex-1">
            <button onClick={() => onGoto('wellness')} className="w-full text-left bg-white rounded-2xl shadow-card p-4 hover:shadow-float transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center"><Icon.Sprout size={20}/></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.16em] text-emerald-700 font-semibold flex items-center gap-1">
                    {classBooked ? <><Icon.Check size={11}/> Booked · today</> : 'Recommended · today'}
                  </div>
                  <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5 truncate">{nextClass.name}</div>
                  <div className="text-[11.5px] text-ink-soft flex items-center gap-1.5"><Icon.Clock size={11}/>{nextClass.time} · {nextClass.dur} min · {nextClass.instructor}</div>
                </div>
                <Icon.ChevronRight size={16} className="text-ink-muted"/>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-2">
        <div className="flex gap-3">
          <TimelineDot tone="gold" label="12:30"/>
          <div className="flex-1">
            <div className="relative rounded-[20px] p-5 text-cream-50 ambient-forest overflow-hidden shadow-float">
              <AIBadge tone="ghost">Sella sees your day</AIBadge>
              <div className="mt-3 font-display text-[19px] leading-snug">
                73% of your team is in today —<br/>
                <span className="text-gold-500">we saved you a table for 6 at lunch.</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#E9C46A','#A8DADC','#F1BBA0','#BFD8B8','#F4A261','#CDD4C2'].map((c,i)=>(
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-forest-700 flex items-center justify-center text-[10px] font-bold text-forest-700" style={{ background: c }}>
                      {['DR','AM','YK','LP','TS','MK'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-cream-50/80">6 of your team in today</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={()=>onGoto('menu')} className="bg-gold-500 hover:bg-gold-600 text-forest-900 font-semibold text-[13px] rounded-full px-4 py-2 flex items-center gap-1.5">
                  See today's menu <Icon.ChevronRight size={14} />
                </button>
                <button className="bg-white/10 border border-white/20 text-cream-50 font-medium text-[13px] rounded-full px-4 py-2">
                  Hold my table
                </button>
              </div>
              <div className="absolute -right-4 -top-4 opacity-30 text-cream-50">
                <Icon.Leaf size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <Card className="p-4 border border-gold-100/60 anim-fade-up">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-700 shrink-0">
              <Icon.Sparkles size={18} />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-gold-700 font-semibold">Sella remembered</div>
              <div className="text-[14px] text-ink leading-snug mt-1">
                The chef made the <b>Moroccan tagine</b> you requested last month — it&apos;s on the menu today.
              </div>
              <button onClick={()=>onGoto('menu')} className="mt-2 text-[12.5px] font-semibold text-forest-700 flex items-center gap-1">
                Open menu <Icon.ChevronRight size={13} />
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-5">
        <SectionTitle kicker="Based on your recent meals" title="Today's chef recommendation" />
        <Card className="overflow-hidden">
          <div className="flex gap-4 p-4">
            <DishIllustration name={recommended.name} emoji={recommended.emoji} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display font-semibold text-[15.5px] text-ink leading-tight">{recommended.name}</h4>
                <Pill tone="gold"><Icon.Sparkles size={10} /> For you</Pill>
              </div>
              <div className="text-[12.5px] text-ink-soft mt-1 leading-snug" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{recommended.desc}</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {recommended.allergens.map(a => <Allergen key={a} kind={a} />)}
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex items-center gap-3 text-[11.5px] text-ink-muted">
                  <span className="flex items-center gap-1"><Icon.Flame size={12} className="text-orange-500"/>{recommended.kcal} kcal</span>
                  <span className="flex items-center gap-1"><Icon.Star size={12} className="text-gold-500" fill="#C9A84C"/>{recommended.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-3">
        <div className="flex gap-3">
          <TimelineDot tone="soft" label="13:45"/>
          <div className="flex-1">
            <button onClick={() => onGoto('rate')} className="w-full text-left bg-cream-50 rounded-2xl p-4 border border-forest-700/10 hover:border-forest-700/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gold-50 text-gold-500 flex items-center justify-center"><Icon.Star size={20} fill="#C9A84C"/></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">{lunchRated ? 'Thanks — feedback sent' : 'When you finish lunch'}</div>
                  <div className="font-display font-semibold text-[14.5px] text-ink leading-tight mt-0.5">{lunchRated ? "The chef saw your note ✨" : 'Rate in 10 seconds'}</div>
                  <div className="text-[11.5px] text-ink-soft">{lunchRated ? "Tomorrow's menu just shifted slightly." : 'Mood + one tap. The chef reads every note.'}</div>
                </div>
                <Icon.ChevronRight size={16} className="text-ink-muted"/>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-3">
        <div className="flex gap-3">
          <TimelineDot tone="soft" label="FRI"/>
          <div className="flex-1">
            <Card className="p-4 flex gap-3 items-center">
              <div className="w-11 h-11 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-700">
                <Icon.Sun size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-muted font-semibold">This Friday</div>
                <div className="font-display font-semibold text-[14.5px] text-ink leading-tight">Rooftop Brunch 🌿</div>
                <div className="text-[11.5px] text-ink-muted">May 16 · 47 going</div>
              </div>
              <button onClick={()=>onGoto('events')} className="bg-forest-700 hover:bg-forest-600 text-cream-50 text-[12px] font-semibold rounded-full px-3 py-1.5">RSVP</button>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 flex justify-center">
        <AIBadge>Powered by Sella AI · breakfast, lunch, wellness, events</AIBadge>
      </div>
    </div>
  );
};

// ─── Menu ────────────────────────────────────────────────────────

const MenuScreen = ({ favorites, toggleFavorite }) => {
  const [day, setDay] = useState('Tue');
  const [filter, setFilter] = useState('all');

  const days = [
    { key: 'Mon', label: 'Mon · 13' },
    { key: 'Tue', label: 'Tue · 14' },
    { key: 'Wed', label: 'Wed · 15' },
    { key: 'Thu', label: 'Thu · 16' },
    { key: 'Fri', label: 'Fri · 17' },
  ];
  const filters = [
    { key: 'all',   label: 'All' },
    { key: 'vegan', label: '🌱 Vegan' },
    { key: 'gf',    label: 'Gluten-Free' },
    { key: 'fav',   label: '❤ My Favorites' },
  ];

  const dishes = useMemo(() => {
    let d = WEEK_MENU[day] || [];
    if (filter === 'vegan') d = d.filter(x => x.allergens.includes('vegan'));
    if (filter === 'gf')    d = d.filter(x => !x.allergens.includes('gluten'));
    if (filter === 'fav')   d = d.filter(x => favorites.includes(x.id));
    return d;
  }, [day, filter, favorites]);

  return (
    <div className="pb-28 pt-24">
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <div className="text-[12px] text-ink-muted">This week</div>
          <h1 className="font-display font-semibold text-[24px] text-ink">Menu</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center" aria-label="Search">
          <Icon.Search size={17} />
        </button>
      </div>

      <ChipRow items={days} value={day} onChange={setDay} />
      <div className="mt-3">
        <ChipRow items={filters} value={filter} onChange={setFilter} size="sm" />
      </div>

      <div className="px-5 mt-4 space-y-3 stagger">
        {dishes.length === 0 && (
          <div className="text-center text-ink-muted text-[13px] py-12">
            Nothing matches that filter yet — try another.
          </div>
        )}
        {dishes.map(d => {
          const isFav = favorites.includes(d.id);
          return (
            <Card key={d.id} className="p-4">
              <div className="flex gap-3">
                <DishIllustration name={d.name} emoji={d.emoji} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-display font-semibold text-[14.5px] text-ink leading-tight">{d.name}</h4>
                      <div className="text-[12px] text-ink-soft mt-1 leading-snug" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{d.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(d.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${isFav ? 'bg-rose-50 text-rose-600' : 'bg-cream-100 text-ink-muted'}`}
                      aria-label="Favorite"
                    >
                      <Icon.Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {d.allergens.map(a => <Allergen key={a} kind={a} />)}
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-3 text-[11.5px] text-ink-muted">
                      <span className="flex items-center gap-1"><Icon.Flame size={12} className="text-orange-500"/>{d.kcal} kcal</span>
                      <span className="flex items-center gap-1"><Icon.Star size={12} className="text-gold-500" fill="#C9A84C"/>{d.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {d.chef && <Pill tone="forest"><Icon.Crown size={10} /> Chef's pick</Pill>}
                      {d.recommended && <Pill tone="gold"><Icon.Sparkles size={10}/> For you</Pill>}
                      {d.returning && <Pill tone="green"><Icon.Repeat size={10}/> Encore</Pill>}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── Rate ────────────────────────────────────────────────────────

const RateScreen = ({ onSubmitted }) => {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [mood, setMood] = useState(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const moods = ['😞','😕','😐','🙂','😍'];
  const moodLabels = ['Disappointed','Meh','Fine','Good','Loved it'];
  const dish = { name: 'Miso Glazed Salmon', desc: 'Soba noodles, shiitake broth, pickled ginger', emoji: '🐟' };
  const reset = () => { setStars(0); setMood(null); setText(''); setSubmitted(false); setSuggestion(null); };

  return (
    <div className="pb-28 pt-24 px-5">
      <div className="pt-3 pb-2">
        <div className="text-[12px] text-ink-muted">Today · Lunch</div>
        <h1 className="font-display font-semibold text-[24px] text-ink">How was lunch today?</h1>
      </div>

      {!submitted ? (
        <>
          <Card className="p-4 mt-2 flex gap-3 items-center anim-fade-up">
            <DishIllustration name={dish.name} emoji={dish.emoji} size="md" />
            <div className="min-w-0">
              <div className="font-display font-semibold text-[15px] text-ink">{dish.name}</div>
              <div className="text-[12px] text-ink-soft leading-snug mt-0.5">{dish.desc}</div>
            </div>
          </Card>

          <Card className="p-5 mt-3 text-center anim-fade-up">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Rate the dish</div>
            <div className="mt-3 flex justify-center gap-2" onMouseLeave={() => setHoverStars(0)}>
              {[1,2,3,4,5].map(i => {
                const active = (hoverStars || stars) >= i;
                return (
                  <button key={i} onClick={() => setStars(i)} onMouseEnter={() => setHoverStars(i)}
                          className="transition-transform active:scale-90" aria-label={`${i} stars`}>
                    <Icon.Star size={36} fill={active ? '#C9A84C' : 'none'} stroke={1.5} className={active ? 'text-gold-500' : 'text-ink-muted'} />
                  </button>
                );
              })}
            </div>
            {stars > 0 && (
              <div className="text-[12.5px] text-forest-700 font-semibold mt-2 anim-fade-in">{['—','Not for me','Could be better','Solid','Really good','Outstanding'][stars]}</div>
            )}
          </Card>

          <Card className="p-5 mt-3 anim-fade-up">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold text-center">Pick a mood</div>
            <div className="mt-3 flex justify-between">
              {moods.map((m, i) => {
                const active = mood === i;
                return (
                  <button key={i} onClick={() => setMood(i)}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all ${active ? 'bg-forest-700 scale-110 shadow-card' : 'bg-cream-100 hover:bg-cream-200'}`}
                          aria-label={moodLabels[i]}>
                    {m}
                  </button>
                );
              })}
            </div>
            {mood !== null && <div className="text-center mt-2 text-[12.5px] text-forest-700 font-semibold anim-fade-in">{moodLabels[mood]}</div>}
          </Card>

          <Card className="p-4 mt-3 anim-fade-up">
            <label className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">Tell the chef something…</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Optional. The chef reads every note."
              rows={3}
              className="mt-2 w-full text-[13.5px] bg-cream-50 border border-cream-200 rounded-xl p-3 outline-none focus:border-forest-500 resize-none"
            />
          </Card>

          <button
            onClick={() => { setSubmitted(true); onSubmitted && onSubmitted(); }}
            disabled={!stars && mood === null}
            className="mt-4 w-full bg-forest-700 hover:bg-forest-600 disabled:opacity-40 disabled:cursor-not-allowed text-cream-50 font-display font-semibold text-[15px] rounded-2xl py-4 shadow-card flex items-center justify-center gap-2"
          >
            Send feedback <Icon.Send size={16} />
          </button>
          <div className="text-[11px] text-ink-muted text-center mt-3">10 seconds. Anonymous to your team — visible to the chef.</div>
        </>
      ) : (
        <div className="mt-4 anim-pop">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto text-forest-700">
              <Icon.Check size={32} />
            </div>
            <div className="font-display font-semibold text-[18px] text-ink mt-3">Thanks, Dana!</div>
            <div className="text-[13px] text-ink-soft mt-1 leading-snug">Your feedback helps the chef plan tomorrow&apos;s menu.</div>
          </Card>
          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold mb-2">What would you like to see next week?</div>
            <div className="flex flex-wrap gap-2">
              {['More plant-based','Asian cuisine','Comfort food','Mediterranean','Lighter dishes','High-protein'].map(s => {
                const active = suggestion === s;
                return (
                  <button key={s} onClick={() => setSuggestion(s)}
                          className={`text-[12.5px] rounded-full px-3.5 py-2 font-medium transition-all ${active ? 'bg-gold-500 text-forest-900 shadow-card' : 'bg-white border border-forest-700/10 text-ink-soft'}`}>
                    {active && '✓ '}{s}
                  </button>
                );
              })}
            </div>
            {suggestion && (
              <div className="mt-3 text-[12.5px] text-forest-700 anim-fade-in">
                ✨ Sella will share &quot;{suggestion}&quot; with the chef&apos;s planning AI.
              </div>
            )}
          </div>
          <button onClick={reset} className="mt-6 w-full text-[13px] font-semibold text-ink-soft underline-offset-4 hover:underline">
            Rate another dish
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Events ──────────────────────────────────────────────────────

const EventsScreen = ({ rsvps, toggleRSVP }) => (
  <div className="pb-28 pt-24">
    <div className="px-5 pt-3 pb-3">
      <div className="text-[12px] text-ink-muted">Coming up at Tel Aviv HQ</div>
      <h1 className="font-display font-semibold text-[24px] text-ink">Events</h1>
    </div>
    <div className="px-5 space-y-3 stagger">
      {EVENTS.map(ev => {
        const going = rsvps[ev.id];
        const IconC = Icon[ev.icon] || Icon.Calendar;
        const tones = {
          gold:   'bg-gold-50 text-gold-700',
          red:    'bg-rose-50 text-rose-700',
          green:  'bg-emerald-50 text-emerald-700',
          forest: 'bg-forest-50 text-forest-700',
        }[ev.tone];
        const pct = Math.min(100, Math.round((ev.going / ev.capacity) * 100));
        return (
          <Card key={ev.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex gap-3 items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tones}`}>
                  <IconC size={26} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-[15.5px] text-ink leading-tight">{ev.title}</h4>
                  <div className="text-[12px] text-ink-muted mt-1 flex items-center gap-2">
                    <Icon.Calendar size={11} /> {ev.date}
                    <span>·</span>
                    <Icon.Clock size={11} /> {ev.time}
                  </div>
                  <div className="text-[11.5px] text-ink-muted mt-0.5 flex items-center gap-1">
                    <Icon.MapPin size={11} /> {ev.loc}
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-ink-soft mt-3 leading-snug">{ev.desc}</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-cream-200 overflow-hidden">
                  <div className="h-full bg-forest-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[11.5px] text-ink-muted">
                  <b className="text-ink">{ev.going + (going ? 1 : 0)}</b> / {ev.capacity}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                {going ? (
                  <div className="text-[12px] text-forest-700 font-semibold anim-fade-in">
                    🎉 You&apos;re in. 12 of your colleagues are joining.
                  </div>
                ) : (
                  <div className="text-[12px] text-ink-muted">Open to all employees</div>
                )}
                <button
                  onClick={() => toggleRSVP(ev.id)}
                  className={`text-[12.5px] font-semibold rounded-full px-4 py-2 transition-all ${going
                    ? 'bg-forest-50 text-forest-700 border border-forest-500/30'
                    : 'bg-forest-700 hover:bg-forest-600 text-cream-50'}`}
                >
                  {going ? '✓ Going' : "I'm in"}
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

// ─── Bottom nav ──────────────────────────────────────────────────

const BottomNav = ({ tab, setTab }) => {
  const items = [
    { key: 'home',     label: 'Home',     Ic: Icon.Home },
    { key: 'menu',     label: 'Menu',     Ic: Icon.Menu },
    { key: 'wellness', label: 'Wellness', Ic: Icon.Sprout },
    { key: 'events',   label: 'Events',   Ic: Icon.Calendar },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 z-20">
      <div className="bg-white/95 backdrop-blur-md border-t border-forest-700/10 px-2 pt-2 pb-4">
        <div className="flex items-stretch justify-around">
          {items.map(it => {
            const active = tab === it.key;
            return (
              <button key={it.key} onClick={() => setTab(it.key)} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 relative">
                <div className={`relative w-12 h-7 rounded-full flex items-center justify-center transition-all ${active ? 'bg-forest-700 text-cream-50' : 'text-ink-soft'}`}>
                  <it.Ic size={18} />
                </div>
                <span className={`text-[10.5px] font-semibold ${active ? 'text-forest-700' : 'text-ink-muted'}`}>{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── EmployeeView ────────────────────────────────────────────────

export const EmployeeView = () => {
  const [tab, setTab] = useState('home');
  const [favorites, setFavorites] = useState(['t1','w3']);
  const [rsvps, setRsvps] = useState({ e1: true });
  const [bookings, setBookings] = useState(['wc3']);
  const [morningOrder, setMorningOrder] = useState(null);
  const [showMorning, setShowMorning] = useState(true);
  const [lunchRated, setLunchRated] = useState(false);

  const toggleFavorite = (id) => setFavorites((f) => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const toggleRSVP    = (id) => setRsvps((r) => ({ ...r, [id]: !r[id] }));
  const toggleBooking = (id) => setBookings((b) => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);
  const confirmMorning = (order) => { setMorningOrder(order); setShowMorning(false); };

  return (
    <MobileFrame>
      <div className="relative h-full overflow-hidden">
        <div className="absolute top-10 inset-x-0 z-10 px-5 pt-2 pb-1 flex items-center justify-between bg-cream-100/60 backdrop-blur-md">
          <SellaLogo size={18} />
          <button className="flex items-center gap-1.5 bg-white/80 rounded-full px-2.5 py-1 text-[11px] text-ink-soft border border-forest-700/10">
            <span className="w-5 h-5 rounded-full bg-forest-700 text-cream-50 text-[10px] font-bold flex items-center justify-center">D</span>
            Dana R.
          </button>
        </div>
        <div className="h-full overflow-y-auto no-scrollbar">
          {tab === 'home'     && <HomeScreen onGoto={setTab} favorites={favorites} morningOrder={morningOrder} openMorning={() => setShowMorning(true)} lunchRated={lunchRated} wellnessBookings={bookings}/>}
          {tab === 'menu'     && <MenuScreen favorites={favorites} toggleFavorite={toggleFavorite} />}
          {tab === 'wellness' && <WellnessScreen bookings={bookings} toggleJoin={toggleBooking} />}
          {tab === 'rate'     && <RateScreen onSubmitted={() => setLunchRated(true)} />}
          {tab === 'events'   && <EventsScreen rsvps={rsvps} toggleRSVP={toggleRSVP} />}
        </div>
        <BottomNav tab={tab} setTab={setTab} />
        <MorningSheet open={showMorning} onClose={() => setShowMorning(false)} onConfirm={confirmMorning} />
      </div>
    </MobileFrame>
  );
};
