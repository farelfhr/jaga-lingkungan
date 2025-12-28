import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/auth';

const PublicLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`${isLandingPage ? 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600">
                🌱 Jaga Lingkungan
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/edukasi"
                className="px-3 py-2 text-gray-700 hover:text-green-600 transition text-sm sm:text-base"
              >
                Edukasi
              </Link>
              {currentUser ? (
                <>
                  <span className="text-gray-700 text-sm sm:text-base hidden sm:inline">
                    Selamat datang, {currentUser.name}
                  </span>
                  <Link
                    to={currentUser.role === 'warga' ? '/dashboard/warga' : '/dashboard/dlh'}
                    className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={isLandingPage ? '' : ''}>
        <Outlet />
      </main>

      {/* Footer - Only show if not on landing page */}
      {!isLandingPage && (
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2025 Jaga Lingkungan. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;

