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
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <img 
                  src="/logo.jpeg" 
                  alt="Jaga Lingkungan" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg"
                />
                <span className="text-base sm:text-xl md:text-2xl font-bold text-green-600 whitespace-nowrap">
                  Jaga Lingkungan
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
              <Link
                to="/edukasi"
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-700 hover:text-green-600 transition text-xs sm:text-sm md:text-base whitespace-nowrap"
              >
                Edukasi
              </Link>
              {currentUser ? (
                <>
                  <span className="text-gray-700 text-xs sm:text-sm md:text-base hidden md:inline whitespace-nowrap">
                    {currentUser.name}
                  </span>
                  <Link
                    to={currentUser.role === 'warga' ? '/dashboard/warga' : '/dashboard/dlh'}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-xs sm:text-sm md:text-base whitespace-nowrap"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-xs sm:text-sm md:text-base whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-xs sm:text-sm md:text-base whitespace-nowrap"
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

