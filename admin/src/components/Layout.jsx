import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../lib/auth.js';

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/inquiries', label: 'Inquiries' },
  { to: '/faq', label: 'FAQ' },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-lg font-bold">Van Conversion</h1>
          <p className="text-sm text-white/60 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 truncate mb-2">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-sm text-white/70 hover:text-white transition-colors text-left px-4 py-2"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
