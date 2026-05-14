const Ic = ({ d, size = 20, stroke = 1.75, fill = 'none', className = '', children }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round" className={className}
    aria-hidden="true"
  >
    {children ? children : <path d={d} />}
  </svg>
);

export const Icon = {
  Home:          (p) => <Ic {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9.5A.5.5 0 0 0 5.5 20H9v-5h6v5h3.5a.5.5 0 0 0 .5-.5V10"/></Ic>,
  Menu:          (p) => <Ic {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></Ic>,
  Sparkles:      (p) => <Ic {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></Ic>,
  Star:          (p) => <Ic {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3 9.5l6.1-.9z"/></Ic>,
  Heart:         (p) => <Ic {...p}><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.65-7 10-7 10z"/></Ic>,
  Calendar:      (p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></Ic>,
  Bell:          (p) => <Ic {...p}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/></Ic>,
  ChevronRight:  (p) => <Ic {...p}><path d="m9 6 6 6-6 6"/></Ic>,
  ChevronDown:   (p) => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>,
  Check:         (p) => <Ic {...p}><path d="M4 12.5 9 17 20 6.5"/></Ic>,
  Users:         (p) => <Ic {...p}><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M21.5 19a4.5 4.5 0 0 0-7-3.7"/></Ic>,
  Leaf:          (p) => <Ic {...p}><path d="M20 4s-9-1-14 4-3 12-3 12 7 1 12-4 5-12 5-12z"/><path d="M3 21 14 10"/></Ic>,
  Flame:         (p) => <Ic {...p}><path d="M12 2s5 4.5 5 10a5 5 0 1 1-10 0c0-2 1-3 1-3s.5 2 2 2c1.5 0 1.5-2 1.5-4S12 2 12 2z"/></Ic>,
  Trend:         (p) => <Ic {...p}><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></Ic>,
  TrendDown:     (p) => <Ic {...p}><path d="M3 7 9 13l4-4 8 8"/><path d="M14 17h7v-7"/></Ic>,
  Clock:         (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>,
  MapPin:        (p) => <Ic {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></Ic>,
  Filter:        (p) => <Ic {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Ic>,
  Search:        (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Ic>,
  Plus:          (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  Settings:      (p) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 19.4 9c.4.4 1 .9 1.6 1H21a2 2 0 1 1 0 4h-.1c-.6 0-1.2.4-1.5 1z"/></Ic>,
  Building:      (p) => <Ic {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2"/></Ic>,
  Coffee:        (p) => <Ic {...p}><path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2"/><path d="M7 4v2M11 4v2M15 4v2"/></Ic>,
  Salad:         (p) => <Ic {...p}><path d="M3 11h18"/><path d="M5 11a7 7 0 0 1 14 0"/><path d="M5 11c0 4 3 8 7 8s7-4 7-8"/></Ic>,
  Fish:          (p) => <Ic {...p}><path d="M2 12s4-6 10-6 8 4 9 6c-1 2-3 6-9 6S2 12 2 12z"/><circle cx="16" cy="11" r="1"/><path d="M22 12c-2-1-4-1-6 0"/></Ic>,
  Sun:           (p) => <Ic {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></Ic>,
  Sprout:        (p) => <Ic {...p}><path d="M7 20h10"/><path d="M12 20v-7"/><path d="M12 13c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 13c0-3-2-5-5-5 0 3 2 5 5 5z"/></Ic>,
  Arrow:         (p) => <Ic {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Ic>,
  Bolt:          (p) => <Ic {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></Ic>,
  Globe:         (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>,
  AlertTriangle: (p) => <Ic {...p}><path d="m12 3 10 18H2z"/><path d="M12 10v5"/><circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none"/></Ic>,
  Crown:         (p) => <Ic {...p}><path d="m3 18 2-10 5 5 2-7 2 7 5-5 2 10z"/><path d="M3 21h18"/></Ic>,
  Repeat:        (p) => <Ic {...p}><path d="M17 2v4h-4"/><path d="M21 8a8 8 0 0 0-14-3"/><path d="M7 22v-4h4"/><path d="M3 16a8 8 0 0 0 14 3"/></Ic>,
  Send:          (p) => <Ic {...p}><path d="m22 2-11 11"/><path d="M22 2 15 22l-4-9-9-4z"/></Ic>,
};
