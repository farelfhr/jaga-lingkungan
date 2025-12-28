import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  AlertCircle, 
  TrendingUp, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Activity,
  Package,
  FileText,
  Users,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useReports } from '../../context/ReportsContext';
import { wasteData } from '../../data/mockData';

const DashboardDLH = () => {
  const { reports: allReports, updateReport } = useReports();
  
  const [stats, setStats] = useState({
    volumeSampahHarian: 0,
    laporanMasuk: 0,
    tpsPenuh: 0,
    tpsAman: 0
  });

  const [weeklyWasteData, setWeeklyWasteData] = useState([]);
  const [tpsStatus, setTpsStatus] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);

  useEffect(() => {
    // Calculate daily waste volume (today's date)
    const today = new Date().toISOString().split('T')[0];
    const todayWaste = wasteData.filter(w => w.date === today);
    const volumeHarian = todayWaste.reduce((sum, w) => sum + w.weight, 0);

    // Calculate pending reports
    const laporanPending = allReports.filter(r => r.status === 'pending').length;

    // Mock TPS Status
    const tpsData = [
      { id: 1, nama: 'TPS Jl. Merdeka', status: 'penuh', kapasitas: 95, lokasi: { lat: -7.7956, lng: 110.3695 } },
      { id: 2, nama: 'TPS Jl. Sudirman', status: 'aman', kapasitas: 45, lokasi: { lat: -7.8000, lng: 110.3700 } },
      { id: 3, nama: 'TPS Jl. Gatot Subroto', status: 'penuh', kapasitas: 88, lokasi: { lat: -7.7900, lng: 110.3750 } },
      { id: 4, nama: 'TPS Kelurahan Sukajadi', status: 'aman', kapasitas: 32, lokasi: { lat: -7.7850, lng: 110.3650 } },
      { id: 5, nama: 'TPS Kelurahan Cibadak', status: 'aman', kapasitas: 28, lokasi: { lat: -7.8100, lng: 110.3800 } },
    ];

    const tpsPenuh = tpsData.filter(t => t.status === 'penuh').length;
    const tpsAman = tpsData.filter(t => t.status === 'aman').length;

    // Weekly waste data for chart (last 7 days)
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
      
      const dayWaste = wasteData.filter(w => w.date === dateStr);
      const totalWeight = dayWaste.reduce((sum, w) => sum + w.weight, 0);
      
      weekDays.push({
        hari: dayName,
        date: dateStr,
        volume: totalWeight || Math.random() * 50 + 20 // Fallback to random data
      });
    }

    // Map points (combine reports and TPS)
    const mapPointsData = [
      ...allReports
        .filter(r => r.status === 'pending')
        .map((r, idx) => ({
          id: `report-${r.id}`,
          type: 'report',
          status: 'masalah',
          location: r.location,
          title: r.title,
          lat: -7.7956 + (idx % 3) * 0.01 - 0.01,
          lng: 110.3695 + (Math.floor(idx / 3)) * 0.01 - 0.01
        })),
      ...tpsData.map(tps => ({
        id: `tps-${tps.id}`,
        type: 'tps',
        status: tps.status === 'penuh' ? 'masalah' : 'aman',
        location: tps.nama,
        title: tps.nama,
        lat: tps.lokasi.lat,
        lng: tps.lokasi.lng,
        kapasitas: tps.kapasitas
      }))
    ];

    setStats({
      volumeSampahHarian: volumeHarian || 125.5, // Fallback
      laporanMasuk: laporanPending,
      tpsPenuh,
      tpsAman
    });

    setWeeklyWasteData(weekDays);
    setTpsStatus(tpsData);
    setMapPoints(mapPointsData);
  }, [allReports]);

  const handleValidasi = (reportId) => {
    updateReport(reportId, {
      status: 'verified',
      verifiedAt: new Date().toISOString()
    });
  };

  const handleTugaskanPetugas = (reportId) => {
    const report = allReports.find(r => r.id === reportId);
    if (report && confirm(`Tugaskan petugas untuk laporan: ${report.title}?`)) {
      updateReport(reportId, {
        status: 'verified',
        assigned: true,
        assignedAt: new Date().toISOString()
      });
      alert('Petugas telah ditugaskan!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard DLH</h1>
        <p className="text-blue-100">Monitor dan kelola pengelolaan sampah secara real-time</p>
      </motion.div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Volume Sampah Harian</p>
          <p className="text-3xl font-bold text-gray-800">{stats.volumeSampahHarian.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">kg (hari ini)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Laporan Masuk</p>
          <p className="text-3xl font-bold text-gray-800">{stats.laporanMasuk}</p>
          <p className="text-xs text-gray-500 mt-1">menunggu validasi</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">TPS Penuh</p>
          <p className="text-3xl font-bold text-gray-800">{stats.tpsPenuh}</p>
          <p className="text-xs text-gray-500 mt-1">perlu penanganan</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">TPS Aman</p>
          <p className="text-3xl font-bold text-gray-800">{stats.tpsAman}</p>
          <p className="text-xs text-gray-500 mt-1">operasional normal</p>
        </motion.div>
      </div>

      {/* Grafik & Peta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Tren Volume Sampah */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tren Volume Sampah</h2>
            </div>
            <span className="text-sm text-gray-500">7 hari terakhir</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyWasteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="hari" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                label={{ value: 'Volume (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
                labelFormatter={(label) => `Hari: ${label}`}
                formatter={(value) => [`${value} kg`, 'Volume']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Volume Sampah"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Peta Wilayah */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Peta Wilayah</h2>
            </div>
          </div>
          
          {/* Dummy Map */}
          <div className="relative bg-gradient-to-br from-green-100 via-blue-50 to-green-100 rounded-lg overflow-hidden" style={{ height: '300px' }}>
            {/* Map Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Map Points */}
            {mapPoints.map((point, index) => {
              // Calculate position based on index for better distribution
              const positions = [
                { left: '25%', top: '25%' },
                { left: '60%', top: '20%' },
                { left: '45%', top: '45%' },
                { left: '20%', top: '60%' },
                { left: '70%', top: '55%' },
                { left: '50%', top: '75%' },
                { left: '35%', top: '30%' },
                { left: '75%', top: '35%' }
              ];
              const pos = positions[index % positions.length] || { left: '50%', top: '50%' };
              
              return (
                <motion.div
                  key={point.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    point.status === 'masalah' ? 'text-red-500' : 'text-green-500'
                  }`}
                  style={{
                    left: pos.left,
                    top: pos.top,
                  }}
                  title={point.title}
                >
                  <div className="relative cursor-pointer group">
                    <MapPin className="w-8 h-8 drop-shadow-lg" fill="currentColor" />
                    {point.status === 'masalah' && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500 rounded-full opacity-30 -z-10"
                      />
                    )}
                    {point.type === 'tps' && point.kapasitas && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {point.kapasitas}%
                      </div>
                    )}
                    {point.type === 'report' && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity max-w-[150px] truncate">
                        {point.title}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <p className="text-xs font-semibold text-gray-700 mb-2">Legenda:</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" fill="currentColor" />
                  <span className="text-xs text-gray-600">Aman</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" fill="currentColor" />
                  <span className="text-xs text-gray-600">Masalah</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Manajemen Laporan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Manajemen Laporan</h2>
          </div>
          <span className="text-sm text-gray-500">
            Total: {allReports.length} laporan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Laporan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelapor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allReports.map((report) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{report.userName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="text-sm text-gray-900 max-w-xs truncate">{report.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status === 'pending' ? 'Pending' : 'Terverifikasi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {report.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleValidasi(report.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs font-medium"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Validasi
                          </button>
                          <button
                            onClick={() => handleTugaskanPetugas(report.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
                          >
                            <Users className="w-3 h-3" />
                            Tugaskan Petugas
                          </button>
                        </>
                      )}
                      {report.status === 'verified' && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Terverifikasi
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardDLH;
