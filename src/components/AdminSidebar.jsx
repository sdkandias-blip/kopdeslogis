import { Link, useNavigate } from 'react-router-dom';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/admin',        page: 'home',        icon: 'dashboard',       label: 'Dashboard'   },
    ]
  },
  {
    label: 'Operations',
    items: [
      { to: '/operations',   page: 'operations',  icon: 'conveyor_belt',   label: 'Operations'  },
      { to: '/supply-chain', page: 'supply',      icon: 'local_shipping',  label: 'Supply Chain' },
      { to: '/scanner',      page: 'scanner',     icon: 'qr_code_scanner', label: 'Scanner'     },
    ]
  },
  {
    label: 'Finance & Audit',
    items: [
      { to: '/financials',   page: 'financials',  icon: 'payments',        label: 'Financials'  },
      { to: '/audit',        page: 'audit',       icon: 'receipt_long',    label: 'Audit Ledger' },
    ]
  },
  {
    label: 'Stakeholders',
    items: [
      { to: '/prosumer',     page: 'prosumer',    icon: 'groups',          label: 'Prosumer'    },
      { to: '/dapur',        page: 'dapur',       icon: 'restaurant',      label: 'Dapur Umum'  },
    ]
  },
];

const AdminSidebar = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 w-[240px]"
      style={{ background: '#0a0c10', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #16a34a, #0d9488)' }}>
          <span className="material-symbols-outlined text-white" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>hub</span>
        </div>
        <div>
          <p className="text-[14px] font-bold text-white tracking-tight leading-none">KopdesLogis</p>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'rgba(125,133,144,0.6)' }}>
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ to, page, icon, label }) => {
                const isActive = page === activePage;
                return (
                  <li key={page}>
                    <Link
                      to={to}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group"
                      style={{
                        backgroundColor: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
                        color: isActive ? '#22c55e' : 'var(--muted)',
                        fontWeight: isActive ? 600 : 500,
                      }}
                      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#e6edf3'; } }}
                      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; } }}
                    >
                      <span className="material-symbols-outlined flex-shrink-0"
                        style={{ fontSize: 18, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                        {icon}
                      </span>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,81,73,0.08)'; e.currentTarget.style.color = '#f85149'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          <span className="font-medium">Keluar</span>
        </button>
        <div className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#16a34a,#0d9488)', color: '#fff' }}>
            AU
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate">Admin User</p>
            <p style={{ fontSize: 10, color: 'var(--muted)' }}>Koperasi Desa</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
