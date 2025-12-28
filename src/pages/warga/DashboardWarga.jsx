import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { authService } from '../../utils/auth';
import { getSchedulesByWilayah } from '../../data/mockData';
import { 
  Wallet, 
  Award, 
  Calendar, 
  Package, 
  Truck, 
  Receipt, 
  Plus, 
  CheckCircle,
  Leaf,
  Trash2,
  AlertCircle
} from 'lucide-react';

const DashboardWarga = () => {
  const currentUser = authService.getCurrentUser();
  
  // State management
  const [saldoIuran, setSaldoIuran] = useState(() => {
    const saved = localStorage.getItem(`saldo_${currentUser?.id}`);
    return saved ? parseFloat(saved) : 50000; // Default saldo Rp 50.000
  });
  
  const [poin, setPoin] = useState(() => {
    const saved = localStorage.getItem(`poin_${currentUser?.id}`);
    return saved ? parseInt(saved) : 0; // Default poin 0
  });
  
  const [inputSampah, setInputSampah] = useState({
    jenis: 'organik',
    berat: ''
  });
  
  const [riwayatInput, setRiwayatInput] = useState(() => {
    const saved = localStorage.getItem(`riwayat_input_${currentUser?.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [trackingStatus, setTrackingStatus] = useState({
    aktif: true,
    status: 'Sedang menuju lokasi Anda',
    estimasi: '15 menit',
    lokasi: 'Jl. Sudirman, 2 km dari lokasi Anda'
  });
  
  const [tagihan, setTagihan] = useState(() => {
    const saved = localStorage.getItem(`tagihan_${currentUser?.id}`);
    return saved ? JSON.parse(saved) : {
      bulan: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      jumlah: 25000,
      status: 'belum_lunas',
      jatuh_tempo: '2025-01-25'
    };
  });
  
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      // Get schedule
      const userSchedule = getSchedulesByWilayah(currentUser.wilayah);
      setSchedule(userSchedule);
      
      // Simpan saldo dan poin ke localStorage saat berubah
      localStorage.setItem(`saldo_${currentUser.id}`, saldoIuran.toString());
      localStorage.setItem(`poin_${currentUser.id}`, poin.toString());
      localStorage.setItem(`riwayat_input_${currentUser.id}`, JSON.stringify(riwayatInput));
      localStorage.setItem(`tagihan_${currentUser.id}`, JSON.stringify(tagihan));
    }
  }, [saldoIuran, poin, riwayatInput, tagihan, currentUser]);

  // Get next schedule
  const getNextSchedule = () => {
    if (schedule.length === 0) return null;
    
    const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const today = new Date();
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const currentDay = today.getDay();
    const currentDayName = dayNames[currentDay];
    
    // Find next schedule
    const sortedSchedule = [...schedule].sort((a, b) => {
      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });
    
    const todayIndex = dayOrder.indexOf(currentDayName);
    const nextSchedule = sortedSchedule.find(s => {
      const sIndex = dayOrder.indexOf(s.day);
      return sIndex >= todayIndex;
    });
    
    return nextSchedule || sortedSchedule[0];
  };

  const nextSchedule = getNextSchedule();

  const handleInputSampah = (e) => {
    e.preventDefault();
    if (!inputSampah.berat || parseFloat(inputSampah.berat) <= 0) {
      alert('Masukkan berat sampah yang valid');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const berat = parseFloat(inputSampah.berat);
      const poinDiberikan = Math.floor(berat * 10); // 10 poin per kg
      
      const inputBaru = {
        id: Date.now(),
        jenis: inputSampah.jenis,
        berat: berat,
        poin: poinDiberikan,
        tanggal: new Date().toISOString(),
        status: 'terkumpul'
      };
      
      setRiwayatInput([inputBaru, ...riwayatInput]);
      setPoin(prev => prev + poinDiberikan);
      setSuccessMessage(`Berhasil! Anda mendapatkan ${poinDiberikan} poin`);
      
      // Reset form
      setInputSampah({ jenis: 'organik', berat: '' });
      setLoading(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  const handleBayarTagihan = () => {
    if (saldoIuran < tagihan.jumlah) {
      alert('Saldo tidak cukup!');
      return;
    }

    setSaldoIuran(prev => prev - tagihan.jumlah);
    setTagihan(prev => ({ ...prev, status: 'lunas' }));
    setSuccessMessage('Tagihan berhasil dibayar!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium">{successMessage}</p>
        </motion.div>
      )}

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Selamat Datang, {currentUser?.name}! 👋
            </h1>
            <p className="text-green-50">
              Mari bersama-sama menjaga kebersihan lingkungan kita
            </p>
          </div>
          <Link
            to="/dashboard/warga/report-problem"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition transform hover:scale-105 shadow-lg whitespace-nowrap"
          >
            <AlertCircle className="w-5 h-5" />
            Lapor Masalah
          </Link>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saldo Iuran Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Saldo Iuran</p>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {formatRupiah(saldoIuran)}
          </p>
          <p className="text-xs text-gray-500">Saldo tersedia</p>
        </motion.div>

        {/* Poin Terkumpul Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Poin Terkumpul</p>
          <p className="text-3xl font-bold text-gray-800 mb-1">{poin.toLocaleString('id-ID')}</p>
          <p className="text-xs text-gray-500">Total poin Anda</p>
        </motion.div>

        {/* Jadwal Angkut Berikutnya Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Jadwal Angkut Berikutnya</p>
          {nextSchedule ? (
            <>
              <p className="text-xl font-bold text-gray-800 mb-1">
                {nextSchedule.day}
              </p>
              <p className="text-sm text-gray-600">
                {nextSchedule.time} - {nextSchedule.type}
              </p>
            </>
          ) : (
            <p className="text-gray-500">Tidak ada jadwal</p>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Sampah Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Input Sampah</h2>
          </div>

          <form onSubmit={handleInputSampah} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Sampah
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInputSampah({ ...inputSampah, jenis: 'organik' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    inputSampah.jenis === 'organik'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Leaf className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-semibold">Organik</p>
                </button>
                <button
                  type="button"
                  onClick={() => setInputSampah({ ...inputSampah, jenis: 'anorganik' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    inputSampah.jenis === 'anorganik'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Trash2 className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-semibold">Anorganik</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perkiraan Berat (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={inputSampah.berat}
                onChange={(e) => setInputSampah({ ...inputSampah, berat: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Contoh: 2.5"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                * Setiap 1 kg = 10 poin
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Submit Sampah
                </>
              )}
            </button>
          </form>

          {/* Recent Input History */}
          {riwayatInput.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Input Terakhir</h3>
              <div className="space-y-2">
                {riwayatInput.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {item.jenis} - {item.berat} kg
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+{item.poin} poin</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Tracking Truk Sampah */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Tracking Truk Sampah</h2>
          </div>

          {trackingStatus.aktif ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <Truck className="w-12 h-12 text-blue-600" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      {trackingStatus.status}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      📍 {trackingStatus.lokasi}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                      ⏱️ Estimasi tiba: {trackingStatus.estimasi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Perjalanan</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Truck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Tidak ada truk yang sedang dalam perjalanan</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pembayaran Tagihan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Receipt className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Pembayaran Iuran</h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Tagihan Bulan</p>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {tagihan.bulan}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">
                  Jatuh Tempo: <span className="font-semibold">{new Date(tagihan.jatuh_tempo).toLocaleDateString('id-ID')}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tagihan.status === 'lunas'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {tagihan.status === 'lunas' ? 'Lunas' : 'Belum Lunas'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Total Tagihan</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatRupiah(tagihan.jumlah)}
                </p>
              </div>
              {tagihan.status !== 'lunas' && (
                <button
                  onClick={handleBayarTagihan}
                  disabled={saldoIuran < tagihan.jumlah}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Receipt className="w-5 h-5" />
                  Bayar Sekarang
                </button>
              )}
              {tagihan.status === 'lunas' && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Sudah Dibayar</span>
                </div>
              )}
            </div>
          </div>
          {saldoIuran < tagihan.jumlah && tagihan.status !== 'lunas' && (
            <p className="text-sm text-red-600 mt-4">
              ⚠️ Saldo Anda tidak cukup untuk membayar tagihan
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardWarga;
