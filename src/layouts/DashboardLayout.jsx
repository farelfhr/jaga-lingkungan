import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!currentUser) {
    return null;
  }

  const isWarga = currentUser.role === 'warga';
  const isAdmin = currentUser.role === 'dlh';

  const navItems = isWarga
    ? [
        { path: '/dashboard/warga', label: 'Dashboard', icon: '📊' },
        { path: '/dashboard/warga/waste', label: 'Riwayat Sampah', icon: '🗑️' },
        { path: '/dashboard/warga/report-problem', label: 'Lapor Masalah', icon: '🚨' },
        { path: '/dashboard/warga/reports', label: 'Laporan Saya', icon: '📝' },
        { path: '/dashboard/warga/schedule', label: 'Jadwal Pengangkutan', icon: '📅' },
        { path: '/edukasi', label: 'Edukasi', icon: '📚' }
      ]
    : [
        { path: '/dashboard/dlh', label: 'Dashboard', icon: '📊' },
        { path: '/dashboard/dlh/reports', label: 'Laporan Warga', icon: '📋' },
        { path: '/dashboard/dlh/schedule', label: 'Jadwal Pengangkutan', icon: '📅' },
        { path: '/dashboard/dlh/users', label: 'Data Warga', icon: '👥' }
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <Link to={isWarga ? '/dashboard/warga' : '/dashboard/dlh'} className="text-2xl font-bold">
              🌱 Jaga Lingkungan
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              {isWarga ? 'Dashboard Warga' : 'Dashboard DLH'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="mb-4">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{currentUser.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm sm:text-base text-gray-600">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

