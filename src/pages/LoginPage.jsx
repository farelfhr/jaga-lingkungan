import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../utils/auth';
import { users } from '../data/mockData';
import { Leaf, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize mock users in localStorage on first load
  useEffect(() => {
    if (!localStorage.getItem('mockUsers')) {
      localStorage.setItem('mockUsers', JSON.stringify(users));
    }
    
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      if (currentUser.role === 'warga') {
        navigate('/dashboard/warga', { replace: true });
      } else if (currentUser.role === 'dlh') {
        navigate('/dashboard/dlh', { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const result = authService.login(username, password);

      if (result.success) {
        // Redirect based on role
        // Username 'warga' or 'user' -> redirect to '/dashboard/warga'
        // Username 'admin' -> redirect to '/dashboard/dlh'
        if (result.user.role === 'warga') {
          navigate('/dashboard/warga', { replace: true });
        } else if (result.user.role === 'dlh') {
          navigate('/dashboard/dlh', { replace: true });
        }
      } else {
        setError(result.error || 'Username atau password salah');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-block mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <Leaf className="w-16 h-16 text-green-600 mx-auto" />
                  </motion.div>
                </Link>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Selamat Datang Kembali
                </h1>
                <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 placeholder-gray-400"
                      placeholder="Masukkan username"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 placeholder-gray-400"
                      placeholder="Masukkan password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    'Masuk'
                  )}
                </motion.button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  Akun Demo:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <div>
                      <span className="font-medium text-blue-900">Warga:</span>
                      <span className="text-blue-700 ml-2">warga / 123</span>
                      <span className="text-xs text-gray-500 ml-1">(atau user)</span>
                    </div>
                    <button
                      onClick={() => {
                        setUsername('warga');
                        setPassword('123');
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Isi Otomatis
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <div>
                      <span className="font-medium text-blue-900">DLH:</span>
                      <span className="text-blue-700 ml-2">admin / admin</span>
                    </div>
                    <button
                      onClick={() => {
                        setUsername('admin');
                        setPassword('admin');
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Isi Otomatis
                    </button>
                  </div>
                </div>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-green-600 transition font-medium"
                >
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-10 text-6xl opacity-80"
              >
                🌿
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-32 right-10 text-5xl opacity-80"
              >
                🌱
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-32 left-5 text-4xl opacity-80"
              >
                🍃
              </motion.div>

              {/* Main SVG Illustration */}
              <div className="relative z-10">
                <svg
                  viewBox="0 0 600 600"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Circle */}
                  <circle cx="300" cy="300" r="280" fill="url(#gradient1)" opacity="0.1" />
                  
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Tree/Plant Illustration */}
                  <g transform="translate(300, 400)">
                    {/* Tree Trunk */}
                    <rect x="-15" y="0" width="30" height="120" fill="#8b4513" rx="5" />
                    
                    {/* Leaves/Branches */}
                    <circle cx="0" cy="-20" r="60" fill="url(#gradient2)" opacity="0.8" />
                    <circle cx="-40" cy="-40" r="50" fill="url(#gradient2)" opacity="0.7" />
                    <circle cx="40" cy="-40" r="50" fill="url(#gradient2)" opacity="0.7" />
                    <circle cx="0" cy="-60" r="45" fill="url(#gradient2)" opacity="0.6" />
                    
                    {/* Small decorative elements */}
                    <circle cx="-30" cy="-30" r="8" fill="#10b981" />
                    <circle cx="30" cy="-30" r="8" fill="#10b981" />
                    <circle cx="0" cy="-70" r="6" fill="#34d399" />
                  </g>

                  {/* Recycling Symbol */}
                  <g transform="translate(150, 200)">
                    <circle cx="0" cy="0" r="50" fill="none" stroke="#10b981" strokeWidth="4" />
                    <path
                      d="M 0,-40 Q 20,-20 0,0 Q -20,-20 0,-40"
                      fill="#34d399"
                      opacity="0.6"
                    />
                    <path
                      d="M 0,0 Q 20,20 0,40 Q -20,20 0,0"
                      fill="#10b981"
                      opacity="0.6"
                    />
                  </g>

                  {/* Waste Bin */}
                  <g transform="translate(450, 250)">
                    <rect x="-30" y="0" width="60" height="80" fill="#4b5563" rx="5" />
                    <rect x="-35" y="-10" width="70" height="15" fill="#6b7280" rx="3" />
                    <circle cx="0" cy="85" r="35" fill="#374151" opacity="0.5" />
                    {/* Recycling label */}
                    <path
                      d="M -20,10 Q 0,20 20,10"
                      stroke="#10b981"
                      strokeWidth="3"
                      fill="none"
                    />
                  </g>

                  {/* Nature Elements */}
                  <g transform="translate(100, 350)">
                    <circle cx="0" cy="0" r="25" fill="#34d399" opacity="0.4" />
                    <circle cx="15" cy="-10" r="15" fill="#10b981" opacity="0.5" />
                    <circle cx="-15" cy="-10" r="15" fill="#059669" opacity="0.5" />
                  </g>

                  {/* Clouds */}
                  <g transform="translate(450, 150)">
                    <ellipse cx="0" cy="0" rx="40" ry="20" fill="#e5e7eb" opacity="0.6" />
                    <ellipse cx="-25" cy="0" rx="30" ry="18" fill="#e5e7eb" opacity="0.6" />
                    <ellipse cx="25" cy="0" rx="30" ry="18" fill="#e5e7eb" opacity="0.6" />
                  </g>

                  {/* Sun */}
                  <circle cx="150" cy="150" r="30" fill="#fbbf24" opacity="0.6" />
                  <g transform="translate(150, 150)">
                    <line x1="0" y1="-45" x2="0" y2="-35" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="45" y1="0" x2="35" y2="0" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="0" y1="45" x2="0" y2="35" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="-45" y1="0" x2="-35" y2="0" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="32" y1="-32" x2="28" y2="-28" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="32" y1="32" x2="28" y2="28" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="-32" y1="32" x2="-28" y2="28" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="-32" y1="-32" x2="-28" y2="-28" stroke="#f59e0b" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Decorative Text */}
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg font-semibold text-gray-700"
                >
                  Bersama Menjaga Lingkungan
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-gray-500 mt-1"
                >
                  Platform Pengelolaan Sampah Terintegrasi
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
