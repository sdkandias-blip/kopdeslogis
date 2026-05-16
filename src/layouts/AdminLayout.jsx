import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminMobileNav from '../components/AdminMobileNav';

const AdminLayout = ({ children, activePage, title }) => (
  <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
    <AdminSidebar activePage={activePage} />
    <div className="flex flex-col flex-1 min-h-screen md:ml-[260px]">
      <AdminHeader title={title} />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-x-hidden">
        {children}
      </main>
    </div>
    <AdminMobileNav activePage={activePage} />
  </div>
);

export default AdminLayout;
