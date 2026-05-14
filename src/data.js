export const WEEK_MENU = {
  Mon: [
    { id: 'm1', name: 'Moroccan Lamb Tagine', desc: 'Slow-braised lamb, apricots, almonds, saffron couscous', emoji: '🍲', kcal: 540, allergens: ['gluten','nuts'], chef: false, recommended: true, rating: 4.7 },
    { id: 'm2', name: 'Charred Cauliflower Steak', desc: 'Tahini-yogurt, pomegranate, dukkah crumble', emoji: '🥦', kcal: 380, allergens: ['nuts','dairy'], chef: false, recommended: false, rating: 4.4 },
    { id: 'm3', name: 'Miso Glazed Salmon', desc: 'Soba noodles, shiitake broth, pickled ginger', emoji: '🐟', kcal: 460, allergens: ['fish','gluten'], chef: true, recommended: false, rating: 4.8 },
    { id: 'm4', name: 'Garden Buddha Bowl', desc: 'Black rice, roasted chickpeas, avocado, citrus dressing', emoji: '🥗', kcal: 410, allergens: ['vegan'], chef: false, recommended: false, rating: 4.3 },
  ],
  Tue: [
    { id: 't1', name: "Tagine Reprise — Chef's Encore", desc: 'Returning by request. Slow-braised, ras el hanout, citrus.', emoji: '🍲', kcal: 520, allergens: ['gluten'], chef: true, recommended: true, rating: 4.9, returning: true },
    { id: 't2', name: 'Wild Mushroom Risotto', desc: 'Arborio, porcini, truffle oil, aged parmesan', emoji: '🍚', kcal: 590, allergens: ['dairy'], chef: false, recommended: false, rating: 4.5 },
    { id: 't3', name: 'Sea Bass en Papillote', desc: 'Fennel, citrus, white wine, dill', emoji: '🐟', kcal: 430, allergens: ['fish'], chef: false, recommended: false, rating: 4.6 },
    { id: 't4', name: 'Beetroot & Lentil Tartare', desc: 'Roasted beetroot, beluga lentils, walnut, sourdough', emoji: '🌱', kcal: 350, allergens: ['vegan','nuts','gluten'], chef: false, recommended: true, rating: 4.4 },
    { id: 't5', name: 'Korean Bibimbap', desc: 'Sticky rice, gochujang, soft egg, kimchi, sesame', emoji: '🍳', kcal: 510, allergens: ['gluten'], chef: false, recommended: false, rating: 4.7 },
  ],
  Wed: [
    { id: 'w1', name: 'Thai Green Curry', desc: 'Coconut, lemongrass, Thai basil, jasmine rice', emoji: '🍛', kcal: 480, allergens: ['vegan'], chef: false, recommended: true, rating: 4.6 },
    { id: 'w2', name: 'Truffle Mac & Cheese', desc: 'Three-cheese blend, brioche crumb, black truffle', emoji: '🧀', kcal: 680, allergens: ['gluten','dairy'], chef: false, recommended: false, rating: 4.7 },
    { id: 'w3', name: 'Ahi Tuna Poke', desc: 'Sushi rice, edamame, mango, ponzu, crispy shallots', emoji: '🐟', kcal: 420, allergens: ['fish'], chef: true, recommended: false, rating: 4.8 },
    { id: 'w4', name: 'Roasted Squash Salad', desc: 'Butternut, ricotta salata, hazelnut, sage brown butter', emoji: '🥗', kcal: 390, allergens: ['nuts','dairy'], chef: false, recommended: false, rating: 4.3 },
  ],
  Thu: [
    { id: 'th1', name: 'Sichuan Dan Dan Noodles', desc: 'Hand-pulled noodles, peanut, chili crisp, scallion', emoji: '🍜', kcal: 550, allergens: ['gluten','nuts'], chef: false, recommended: false, rating: 4.5 },
    { id: 'th2', name: 'Herb-Crusted Lamb', desc: 'Rosemary, garlic, polenta, balsamic jus', emoji: '🥩', kcal: 620, allergens: [], chef: true, recommended: false, rating: 4.6 },
    { id: 'th3', name: 'Lentil Shakshuka', desc: 'Tomato, smoked paprika, soft egg, harissa, focaccia', emoji: '🍳', kcal: 440, allergens: ['gluten'], chef: false, recommended: true, rating: 4.6 },
    { id: 'th4', name: 'Crispy Tofu Banh Mi', desc: 'Pickled daikon, sriracha mayo, cilantro, baguette', emoji: '🥖', kcal: 480, allergens: ['vegan','gluten'], chef: false, recommended: false, rating: 4.4 },
  ],
  Fri: [
    { id: 'f1', name: 'Friday Feast — Whole Branzino', desc: 'Lemon, capers, olive oil, charred vegetables', emoji: '🐟', kcal: 510, allergens: ['fish'], chef: true, recommended: false, rating: 4.9 },
    { id: 'f2', name: 'Slow-Roasted Brisket', desc: '12-hour brisket, smoked paprika, root vegetables', emoji: '🍖', kcal: 640, allergens: [], chef: false, recommended: false, rating: 4.7 },
    { id: 'f3', name: 'Garden Mezze Plate', desc: 'Hummus, baba ganoush, labneh, warm pita, pickles', emoji: '🥙', kcal: 510, allergens: ['gluten','dairy'], chef: false, recommended: true, rating: 4.5 },
    { id: 'f4', name: 'Saffron Paella', desc: 'Bomba rice, mussels, chorizo, prawns, lemon', emoji: '🥘', kcal: 580, allergens: ['fish'], chef: false, recommended: false, rating: 4.8 },
  ],
};

export const EVENTS = [
  { id: 'e1', title: 'Rooftop Friday Brunch', date: 'Fri · May 16', time: '11:00 – 14:00', loc: 'Tel Aviv HQ · Rooftop',
    desc: 'A long-table brunch with live acoustic set, garden-fresh mezze, and signature mimosas. Bring a colleague you have not met yet.',
    icon: 'Sun', tone: 'gold', going: 47, capacity: 80 },
  { id: 'e2', title: 'Thai Pop-Up Kitchen', date: 'Tue · May 20', time: '12:00 – 14:00', loc: 'Tel Aviv HQ · Main Hall',
    desc: 'Chef Anan flies in from Chiang Mai. Live wok station, hand-rolled spring rolls, Thai iced tea bar.',
    icon: 'Flame', tone: 'red', going: 112, capacity: 200 },
  { id: 'e3', title: 'Wellness Week: Smoothie Bar', date: 'Mon · May 26 – Fri · May 30', time: 'All day', loc: 'Every site',
    desc: 'A daily build-your-own smoothie bar. Adaptogens, seasonal fruit, and a different superfood spotlight each day.',
    icon: 'Sprout', tone: 'green', going: 230, capacity: 500 },
  { id: 'e4', title: 'Cooking Masterclass with Chef Noa', date: 'Tue · Jun 3', time: '17:30 – 19:30', loc: 'Tel Aviv HQ · Test Kitchen',
    desc: 'Hands-on session: mastering the perfect risotto. Twelve seats, apron included, you take home what you make.',
    icon: 'Salad', tone: 'forest', going: 9, capacity: 12 },
];

export const SITES = [
  { id: 'tlv',  name: 'Tel Aviv HQ',   country: '🇮🇱', headcount: 1240, sat: 4.6, waste: 8.2,  forecastAcc: 96, nps: 64, best: true },
  { id: 'hrz',  name: 'Herzliya',      country: '🇮🇱', headcount: 480,  sat: 4.4, waste: 11.5, forecastAcc: 91, nps: 52 },
  { id: 'lon',  name: 'London',        country: '🇬🇧', headcount: 320,  sat: 4.5, waste: 9.8,  forecastAcc: 93, nps: 58 },
  { id: 'ber',  name: 'Berlin',        country: '🇩🇪', headcount: 210,  sat: 4.3, waste: 12.1, forecastAcc: 89, nps: 47 },
  { id: 'nyc',  name: 'New York',      country: '🇺🇸', headcount: 410,  sat: 4.2, waste: 13.4, forecastAcc: 87, nps: 41 },
];

export const SAT_HEATMAP = {
  days: ['Mon','Tue','Wed','Thu','Fri'],
  rows: [
    { site: 'Tel Aviv HQ', values: [0.86, 0.92, 0.78, 0.84, 0.95] },
    { site: 'Herzliya',    values: [0.74, 0.81, 0.80, 0.82, 0.88] },
    { site: 'London',      values: [0.80, 0.85, 0.78, 0.86, 0.91] },
    { site: 'Berlin',      values: [0.72, 0.78, 0.76, 0.74, 0.83] },
    { site: 'New York',    values: [0.68, 0.74, 0.72, 0.78, 0.80] },
  ],
};

export const NPS_TREND = [54,52,55,56,53,57,58,56,55,57,59,60,58,60,61,59,62,60,63,62,64,63,65,63,64,66,65,64,66,67];

export const STAFFING_HEATMAP = {
  hours: ['11:30','12:00','12:30','13:00','13:30','14:00'],
  days:  ['Mon','Tue','Wed','Thu','Fri'],
  matrix: [
    [0.35, 0.45, 0.40, 0.50, 0.55],
    [0.62, 0.78, 0.70, 0.84, 0.88],
    [0.85, 0.92, 0.88, 0.98, 0.94],
    [0.78, 0.86, 0.82, 0.92, 0.90],
    [0.45, 0.58, 0.52, 0.66, 0.72],
    [0.22, 0.30, 0.26, 0.38, 0.44],
  ],
};

export const FORECAST = {
  tlv: {
    attendance: 847, confidence: 94, vsLastWeek: 12,
    portions: { plant: 312, meat: 268, fish: 142, vegan: 125 },
    staffing: { current: 12, recommended: 14, peak: '12:00–13:30' },
  },
};

export const INTEGRATIONS = [
  { name: 'Monday.com',       desc: 'Staffing & procurement sync',     live: true,  icon: '✅' },
  { name: 'Zest',             desc: 'Internal ops & comms',            live: true,  icon: '✅' },
  { name: 'Slack',            desc: 'Order via DM · daily digest',     live: true,  icon: '✅' },
  { name: 'Google Calendar',  desc: 'Attendance + class booking feed', live: false, icon: '🔄' },
  { name: 'Microsoft Teams',  desc: 'Notifications & RSVP cards',      live: false, icon: '🔄' },
  { name: 'Workday HR',       desc: 'Employee preference profiles',    live: false, icon: '🔄' },
  { name: 'Badge access',     desc: 'Live in-office headcount',        live: true,  icon: '✅' },
  { name: 'Mindbody',         desc: 'Class schedule sync',             live: true,  icon: '✅' },
];

export const COFFEES = [
  { id: 'c-flat',   name: 'Oat Flat White',  desc: 'Double ristretto · oat',         emoji: '☕', kcal: 130, usual: true },
  { id: 'c-cort',   name: 'Cortado',         desc: 'Equal parts espresso & milk',    emoji: '☕', kcal: 90 },
  { id: 'c-espr',   name: 'Espresso',        desc: 'House blend · single origin',    emoji: '☕', kcal: 5 },
  { id: 'c-cold',   name: 'Cold Brew',       desc: '18h brew · slow drip',           emoji: '🧊', kcal: 10 },
  { id: 'c-matcha', name: 'Iced Matcha',     desc: 'Ceremonial grade · oat',         emoji: '🍵', kcal: 80 },
  { id: 'c-cap',    name: 'Cappuccino',      desc: 'Foamed whole milk',              emoji: '☕', kcal: 110 },
];

export const BREAKFASTS = [
  { id: 'b-avo',     name: 'Avocado Sourdough',    desc: 'Chili oil, lime, smoked salt',         emoji: '🥑', kcal: 380, usual: true },
  { id: 'b-granola', name: 'Greek Yogurt Bowl',    desc: 'House granola, berries, honey',        emoji: '🥣', kcal: 320 },
  { id: 'b-shak',    name: 'Mini Shakshuka',       desc: 'Two eggs, tomato, harissa, focaccia',  emoji: '🍳', kcal: 480 },
  { id: 'b-acai',    name: 'Açaí Bowl',            desc: 'Banana, coconut, cacao nibs',          emoji: '🍇', kcal: 360 },
  { id: 'b-toast',   name: 'Brioche French Toast', desc: 'Cinnamon, maple, mascarpone',          emoji: '🥞', kcal: 540 },
  { id: 'b-burrito', name: 'Breakfast Burrito',    desc: 'Black bean, scrambled egg, salsa',     emoji: '🌯', kcal: 510 },
];

export const SHAKES = [
  { id: 's-green',  name: 'Sella Green',       desc: 'Kale, spinach, banana, ginger, lemon',   emoji: '🥤', kcal: 220, usual: true, tag: 'Energy' },
  { id: 's-berry',  name: 'Berry Boost',       desc: 'Blueberry, açaí, beetroot, maca',        emoji: '🫐', kcal: 250, tag: 'Antioxidant' },
  { id: 's-tropic', name: 'Tropical Recovery', desc: 'Pineapple, coconut, turmeric, ginger',   emoji: '🥥', kcal: 280, tag: 'Recovery' },
  { id: 's-cocoa',  name: 'Cocoa Protein',     desc: 'Cacao, almond butter, whey, banana',     emoji: '🍫', kcal: 320, tag: 'Protein' },
];

export const USUAL_ORDER = {
  coffee:    'c-flat',
  breakfast: 'b-avo',
  shake:     's-green',
  defaultTime: '09:15',
  pickupLoc: 'Floor 4 · Espresso bar',
  shakeNote: "You've had this 11 times. Free before 09:00 for early arrivals.",
  arrivalNote: 'Sella sees you usually arrive 08:40–09:00.',
};

export const WELLNESS_CLASSES = [
  { id: 'wc1', name: 'Sunrise Yoga Flow',      time: '07:30', dur: 45, instructor: 'Maya R.',  loc: 'Studio · Floor 7', tags: ['Yoga','Vinyasa'],      spots: 12, total: 18, level: 'All levels' },
  { id: 'wc2', name: 'Pilates Reformer',       time: '08:30', dur: 50, instructor: 'Tomer L.', loc: 'Studio · Floor 7', tags: ['Pilates'],             spots: 4,  total: 8,  level: 'Intermediate' },
  { id: 'wc3', name: '20-min HIIT Reset',      time: '12:15', dur: 20, instructor: 'Alon B.',  loc: 'Gym · Floor B1',   tags: ['HIIT','Cardio'],       spots: 9,  total: 14, level: 'Open', joined: true, recommended: true },
  { id: 'wc4', name: 'Meditation & Breath',    time: '13:30', dur: 25, instructor: 'Noa K.',   loc: 'Quiet room · Floor 5', tags: ['Mindfulness'],    spots: 6,  total: 10, level: 'All levels' },
  { id: 'wc5', name: 'Pilates Mat',            time: '17:00', dur: 45, instructor: 'Tomer L.', loc: 'Studio · Floor 7', tags: ['Pilates'],             spots: 11, total: 18, level: 'All levels' },
  { id: 'wc6', name: 'Sound Bath & Wind-down', time: '18:00', dur: 40, instructor: 'Yael M.',  loc: 'Studio · Floor 7', tags: ['Mindfulness','Recovery'], spots: 14, total: 22, level: 'All levels' },
];

export const WELLNESS_WEEK  = ['M','T','W','T','F','S','S'];
export const WELLNESS_STREAK = { current: 4, weekDone: [true, true, false, true, false, false, false], total: 23 };

export const PERKS = [
  { id: 'p1', name: 'Chair massage',  desc: '15 min · 2nd Thursday',      icon: '💆', avail: 'Today · 3 slots open' },
  { id: 'p2', name: 'Skin consult',   desc: 'Boutique partner · 30 min',  icon: '🧴', avail: 'Next: Mon · May 20' },
  { id: 'p3', name: 'On-site barber', desc: 'Drop-in · 20 min',           icon: '✂️', avail: 'Today · 11:00–17:00' },
  { id: 'p4', name: 'Bike tune-up',   desc: 'Cycle-to-work partner',      icon: '🚲', avail: 'Thursday morning' },
];

export const DAILY_PROGRAM = {
  breakfast: { served: 312, target: 340 },
  shakes:    { served: 87,  target: 120 },
  lunch:     { served: 781, target: 847 },
  classes:   { sessions: 6, booked: 56, capacity: 90 },
  events:    { rsvps: 47 },
};
