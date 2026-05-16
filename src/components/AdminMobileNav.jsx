import { Link } from 'react-router-dom';

const NAV = [
  { to: '/admin',        page: 'home',       icon: 'dashboard',     label: 'Home'    },
  { to: '/operations',   page: 'operations', icon: 'conveyor_belt', label: 'Ops'     },
  { to: '/supply-chain', page: 'supply',     icon: 'inventory_2',   label: 'Supply'  },
  { to: '/financials',   page: 'financials', icon: 'payments',      label: 'Finance' },
  { to: '/scanner',      page: 'scanner',    icon: 'qr_code_scanner',label: 'Scan'   },
];

const AdminMobileNav = ({ activePage }) => (
  <nav
    className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe"
    style={{
      height: 64,
      background: 'rgba(13,17,23,0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}
    aria-label="Mobile navigation"
  >
    {NAV.map(({ to, page, icon, label }) => {
      const active = page === activePage;
      return (
        <Link
          key={page}
          to={to}
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-150 active:scale-90"
          style={{
            minWidth: 52,
            background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
            color: active ? 'var(--green-500)' : 'var(--muted)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 22, fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
          >
            {icon}
          </span>
          <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
        </Link>
      );
    })}
  </nav>
);

export default AdminMobileNav;
