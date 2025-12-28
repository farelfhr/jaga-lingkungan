import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useEffect, useState } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Trash2, 
  AlertCircle, 
  FileText, 
  Calendar, 
  BookOpen,
  Users,
  ClipboardList,
  LogOut,
  Home
} from 'lucide-react';

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
        { path: '/dashboard/warga', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/warga/waste', label: 'Riwayat Sampah', icon: Trash2 },
        { path: '/dashboard/warga/report-problem', label: 'Lapor Masalah', icon: AlertCircle },
        { path: '/dashboard/warga/reports', label: 'Laporan Saya', icon: FileText },
        { path: '/dashboard/warga/schedule', label: 'Jadwal Pengangkutan', icon: Calendar },
        { path: '/edukasi', label: 'Edukasi', icon: BookOpen }
      ]
    : [
        { path: '/dashboard/dlh', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/dlh/reports', label: 'Laporan Warga', icon: ClipboardList },
        { path: '/dashboard/dlh/schedule', label: 'Jadwal Pengangkutan', icon: Calendar },
        { path: '/dashboard/dlh/users', label: 'Data Warga', icon: Users }
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
            <Link to={isWarga ? '/dashboard/warga' : '/dashboard/dlh'} className="flex items-center gap-3">
              <img 
                src="/logo.jpeg" 
                alt="Jaga Lingkungan" 
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div>
                <div className="text-xl font-bold">Jaga Lingkungan</div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isWarga ? 'Dashboard Warga' : 'Dashboard DLH'}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Home Button */}
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition text-gray-300 hover:bg-gray-700 border-b border-gray-700 mb-2 pb-4"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
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
                  <IconComponent className="w-5 h-5" />
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
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <div className="flex items-center">
                <span className="text-xs sm:text-sm md:text-base text-gray-600 whitespace-nowrap">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
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

