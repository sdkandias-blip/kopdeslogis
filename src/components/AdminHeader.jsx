import { useState } from 'react';

const AdminHeader = ({ title }) => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header
        className="hidden md:flex justify-between items-center px-6 sticky top-0 z-40"
        style={{
          height: 'var(--header-h, 64px)',
          background: 'rgba(13,17,23,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>KopdesLogis</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--muted)' }}>chevron_right</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Live badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}
          >
            <span
              className="animate-pulse-dot inline-block w-2 h-2 rounded-full"
              style={{ background: 'var(--green-500)' }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-500)' }}>LIVE</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="btn-ghost relative"
              style={{ padding: '8px', borderRadius: '8px' }}
              onClick={() => setNotifOpen(o => !o)}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: 'var(--error)', border: '1.5px solid var(--bg)' }}
              />
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 top-12 w-72 rounded-xl py-2 z-50 animate-fade-up"
                style={{ background: 'var(--surface2)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
              >
                <p className="px-4 py-2 text-xs font-bold" style={{ color: 'var(--muted)' }}>NOTIFIKASI</p>
                {[
                  { icon: 'warning', color: 'var(--warning)', text: 'Suhu Unit Cold Chain melebihi threshold' },
                  { icon: 'inventory_2', color: 'var(--info)', text: 'Stok Beras mendekati reorder point' },
                  { icon: 'task_alt', color: 'var(--success)', text: '3 kontrak baru siap dieksekusi' },
                ].map((n, i) => (
                  <button key={i} className="w-full flex items-start gap-3 px-4 py-3 text-left text-sm transition-colors" style={{ color: 'var(--text)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <span className="material-symbols-outlined mt-0.5" style={{ fontSize: 18, color: n.color, flexShrink: 0 }}>{n.icon}</span>
                    <span style={{ fontSize: 13 }}>{n.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PDF Export */}
          <button className="btn-primary">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>picture_as_pdf</span>
            Export PDF
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
