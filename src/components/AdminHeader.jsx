import { useState } from 'react';

const AdminHeader = ({ title }) => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header
        className="hidden md:flex justify-between items-center px-7 sticky top-0 z-40"
        style={{
          height: 'var(--header-h, 64px)',
          background: 'rgba(8,10,14,0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Title */}
        <h2 className="text-[15px] font-semibold text-white">{title}</h2>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Live badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.12)' }}
          >
            <span
              className="animate-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--green-500)' }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-500)', letterSpacing: '0.05em' }}>LIVE</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="btn-ghost relative"
              style={{ padding: '7px', borderRadius: '8px' }}
              onClick={() => setNotifOpen(o => !o)}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 19 }}>notifications</span>
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--error)' }}
              />
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 top-12 w-72 rounded-xl py-2 z-50 animate-fade-up"
                style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}
              >
                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Notifikasi</p>
                {[
                  { icon: 'warning', color: 'var(--warning)', text: 'Suhu Unit Cold Chain melebihi threshold' },
                  { icon: 'inventory_2', color: 'var(--info)', text: 'Stok Beras mendekati reorder point' },
                  { icon: 'task_alt', color: 'var(--success)', text: '3 kontrak baru siap dieksekusi' },
                ].map((n, i) => (
                  <button key={i} className="w-full flex items-start gap-3 px-4 py-3 text-left text-sm transition-colors" style={{ color: 'var(--text)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <span className="material-symbols-outlined mt-0.5" style={{ fontSize: 17, color: n.color, flexShrink: 0 }}>{n.icon}</span>
                    <span style={{ fontSize: 13 }}>{n.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          <button className="btn-primary text-xs py-2 px-3">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>picture_as_pdf</span>
            Export
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className="md:hidden flex justify-between items-center px-4 sticky top-0 z-50"
        style={{
          height: 56,
          background: 'rgba(13,17,23,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#16a34a,#065f46)' }}>
            <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>eco</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="animate-pulse-dot inline-block w-2 h-2 rounded-full" style={{ background: 'var(--green-500)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-500)' }}>LIVE</span>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
