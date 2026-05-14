import { useState } from 'react';
import { EmployeeView } from './employee';
import { AdminView } from './admin';
import './index.css';

const ViewSwitcher = ({ view, setView }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
    <div className="bg-white/95 backdrop-blur-md border border-forest-700/15 rounded-full p-1 shadow-float flex items-center gap-1">
      {[
        { k: 'employee', label: '👤 Employee' },
        { k: 'admin',    label: '📊 Admin' },
      ].map(o => {
        const active = view === o.k;
        return (
          <button
            key={o.k}
            onClick={() => setView(o.k)}
            className={`text-[12.5px] font-semibold rounded-full px-4 py-1.5 transition-all ${active ? 'bg-forest-700 text-cream-50' : 'text-ink-soft hover:text-ink'}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const urlView = params.get('view');

  const [view, setView] = useState(() => {
    if (urlView === 'admin' || urlView === 'employee') return urlView;
    try { return localStorage.getItem('sella.view') || 'employee'; } catch { return 'employee'; }
  });

  const handleSetView = (v) => {
    setView(v);
    try { localStorage.setItem('sella.view', v); } catch {}
  };

  return (
    <div className="min-h-screen">
      <ViewSwitcher view={view} setView={handleSetView} />

      {view === 'employee' ? (
        <div className="min-h-screen flex flex-col items-center" style={{
          backgroundImage:
            'radial-gradient(80% 60% at 20% 0%, rgba(82,183,136,0.18), transparent 60%),' +
            'radial-gradient(80% 60% at 100% 100%, rgba(201,168,76,0.18), transparent 60%),' +
            'linear-gradient(180deg, #EDE6D6 0%, #E0D6B7 100%)'
        }}>
          <div className="h-20"/>
          <EmployeeView />
          <div className="mt-6 mb-10 flex flex-col items-center gap-2 text-[12px] text-ink-muted">
            <div className="flex items-center gap-1.5">
              <span>Live demo · </span>
              <span className="sella-wordmark text-forest-700">Sella</span>
              <span>· Tel Aviv HQ build</span>
            </div>
            <div>Tap the switcher above to see the Admin Dashboard.</div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen pt-16">
          <AdminView />
        </div>
      )}
    </div>
  );
}
