import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, AlertCircle, Gift, Leaf, Target, Eye, ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth scroll function
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background Layers */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/yogyaplx.png)'
            }}
          />
          
          {/* Overlay untuk readability dan efek hijau */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/75 via-emerald-600/70 to-teal-600/75">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </motion.div>


        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block mb-4"
            >
              <img 
                src="/logo.jpeg" 
                alt="Jaga Lingkungan" 
                className="w-24 h-24 object-cover rounded-full mx-auto drop-shadow-lg border-4 border-white/30"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Jaga Lingkungan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-green-50 mb-10 font-medium drop-shadow-lg"
          >
            Angkut Sampahnya, Jemput Berkahnya
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/login"
              className="group px-8 py-4 bg-white text-green-600 rounded-full font-semibold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              Masuk ke Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 bg-green-700/80 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-green-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-white/30"
            >
              Pelajari Lebih Lanjut
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Visi Misi Section */}
      <section id="visi-misi" className="py-20 bg-gradient-to-b from-white to-green-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Visi & Misi
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Visi Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-green-100 rounded-xl">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Visi</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Menjadi platform terdepan dalam mengelola dan mempermudah proses pengangkutan sampah,
                menciptakan lingkungan yang bersih dan sehat untuk semua masyarakat, serta mendorong
                partisipasi aktif warga dalam menjaga kebersihan lingkungan melalui teknologi yang inovatif.
              </p>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-100 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Misi</h3>
              </div>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Menyediakan sistem jadwal pengangkutan sampah yang terintegrasi dan mudah diakses oleh semua warga</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Memfasilitasi pelaporan masalah lingkungan secara real-time dengan proses verifikasi yang transparan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Mengembangkan sistem reward poin untuk meningkatkan partisipasi aktif warga dalam pengelolaan sampah</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Meningkatkan efisiensi pengelolaan sampah melalui kolaborasi antara warga dan Dinas Lingkungan Hidup</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fitur Utama Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-green-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Fitur Utama
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform yang memudahkan pengelolaan sampah dengan fitur-fitur terbaik
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Jadwal Angkut */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block p-4 bg-green-100 rounded-2xl mb-6"
              >
                <Calendar className="w-12 h-12 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Jadwal Angkut</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pantau jadwal pengangkutan sampah di wilayah Anda dengan mudah. Dapatkan notifikasi
                sebelum hari pengangkutan agar tidak terlewat.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>Jadwal terintegrasi per wilayah</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>Notifikasi pengingat</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>Informasi jenis sampah</span>
                </li>
              </ul>
            </motion.div>

            {/* Lapor Masalah */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block p-4 bg-blue-100 rounded-2xl mb-6"
              >
                <AlertCircle className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Lapor Masalah</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Laporkan masalah lingkungan di sekitar Anda dengan cepat dan mudah. Laporan akan
                langsung diteruskan ke Dinas Lingkungan Hidup untuk ditindaklanjuti.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Laporan real-time</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Upload foto bukti</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Tracking status laporan</span>
                </li>
              </ul>
            </motion.div>

            {/* Tukar Poin */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block p-4 bg-yellow-100 rounded-2xl mb-6"
              >
                <Gift className="w-12 h-12 text-yellow-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tukar Poin</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kumpulkan poin dari setiap partisipasi menjaga lingkungan dan tukarkan dengan
                berbagai reward menarik. Semakin aktif, semakin banyak poin yang didapat.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Sistem poin reward</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Katalog hadiah menarik</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Leaderboard partisipasi</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Sparkles className="absolute top-10 left-10 w-20 h-20 text-white animate-pulse" />
          <Sparkles className="absolute bottom-10 right-10 w-16 h-16 text-white animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mari Bergabung Menjaga Lingkungan
          </h2>
          <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Daftar sekarang dan mulai berkontribusi dalam menjaga kebersihan lingkungan bersama-sama
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-full font-semibold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo.jpeg" 
                  alt="Jaga Lingkungan" 
                  className="w-8 h-8 object-cover rounded"
                />
                <h3 className="text-xl font-bold text-white">Jaga Lingkungan</h3>
              </div>
              <p className="text-gray-400">
                Platform pengelolaan sampah yang terintegrasi untuk lingkungan yang lebih bersih dan sehat.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="hover:text-green-400 transition"
                  >
                    Fitur
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('visi-misi')}
                    className="hover:text-green-400 transition"
                  >
                    Visi & Misi
                  </button>
                </li>
                <li>
                  <Link to="/login" className="hover:text-green-400 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/edukasi" className="hover:text-green-400 transition">
                    Edukasi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@jagalingkungan.id</li>
                <li>Phone: (0274) 123456</li>
                <li>Alamat: Jl. Ringroad Selatan, Yogyakarta</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Jaga Lingkungan. Hak Cipta Dilindungi.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Universitas Muhammadiyah Yogyakarta
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
