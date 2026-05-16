import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const NAV_ITEMS = [
  { to: '/admin',        page: 'home',        icon: 'dashboard',       label: 'Dashboard'   },
  { to: '/operations',   page: 'operations',  icon: 'conveyor_belt',   label: 'Operations'  },
  { to: '/supply-chain', page: 'supply',      icon: 'inventory_2',     label: 'Supply Chain' },
  { to: '/financials',   page: 'financials',  icon: 'payments',        label: 'Financials'  },
  { to: '/audit',        page: 'audit',       icon: 'receipt_long',    label: 'Audit Ledger' },
  { to: '/scanner',      page: 'scanner',     icon: 'qr_code_scanner', label: 'Scanner'     },
  { to: '/prosumer',     page: 'prosumer',    icon: 'groups',          label: 'Prosumer'    },
  { to: '/dapur',        page: 'dapur',       icon: 'restaurant',      label: 'Dapur Umum'  },
];

const AdminSidebar = ({ activePage }) => (
  <div className="hidden md:flex h-screen fixed left-0 top-0 z-50">
    <Sidebar
      width="260px"
      backgroundColor="transparent"
      rootStyles={{
        background: 'linear-gradient(180deg, #0d1117 0%, #111827 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        height: '100%',
        color: '#fff',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #16a34a, #065f46)' }}
            >
              <span className="material-symbols-outlined text-white" style={{ fontSize: 18 }}>eco</span>
            </div>
            <div>
              <h1 className="font-display text-[15px] font-extrabold text-white tracking-tight">KopdesLogis</h1>
              <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-grow py-4 px-3 overflow-y-auto">
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => ({
                backgroundColor: active ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                color: active ? '#22c55e' : 'var(--muted)',
                borderRadius: '8px',
                marginBottom: '4px',
                padding: '10px 12px',
                height: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                },
              }),
              icon: ({ active }) => ({
                color: active ? '#22c55e' : 'inherit',
              })
            }}
          >
            {NAV_ITEMS.map(({ to, page, icon, label }) => {
              const isActive = page === activePage;
              return (
                <MenuItem
                  key={page}
                  active={isActive}
                  component={<Link to={to} />}
                  icon={
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 20,
                        fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {icon}
                    </span>
                  }
                >
                  <span className="text-sm font-medium">{label}</span>
                </MenuItem>
              );
            })}
          </Menu>
        </div>

        {/* Footer */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <button className="btn-ghost w-full justify-center mb-3">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>settings</span>
            Settings
          </button>
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#16a34a,#0d9488)', color: '#fff' }}
            >
              AU
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">Admin User</p>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>Koperasi Desa</p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  </div>
);

export default AdminSidebar;
