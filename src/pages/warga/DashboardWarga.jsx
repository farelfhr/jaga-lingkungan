import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../utils/auth';
import { getWasteDataByUserId, getReportsByUserId, getSchedulesByWilayah } from '../../data/mockData';

const DashboardWarga = () => {
  const [wasteData, setWasteData] = useState([]);
  const [reports, setReports] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState({
    totalWaste: 0,
    totalReports: 0,
    pendingReports: 0
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      // Get waste data
      const waste = getWasteDataByUserId(currentUser.id);
      setWasteData(waste.slice(0, 5)); // Latest 5

      // Get reports
      const userReports = getReportsByUserId(currentUser.id);
      setReports(userReports.slice(0, 3)); // Latest 3

      // Get schedule
      const userSchedule = getSchedulesByWilayah(currentUser.wilayah);
      setSchedule(userSchedule);

      // Calculate stats
      const totalWaste = waste.reduce((sum, w) => sum + w.weight, 0);
      const pendingReports = userReports.filter(r => r.status === 'pending').length;

      setStats({
        totalWaste: totalWaste.toFixed(1),
        totalReports: userReports.length,
        pendingReports
      });
    }
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800',
      'terkumpul': 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          Selamat Datang, {authService.getCurrentUser()?.name}!
        </h1>
        <p className="text-green-100">
          Mari bersama-sama menjaga kebersihan lingkungan kita
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sampah (kg)</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalWaste}</p>
            </div>
            <div className="text-4xl">🗑️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Laporan</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalReports}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Laporan Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingReports}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Waste Data */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Riwayat Sampah Terbaru</h2>
            <Link
              to="/dashboard/warga/waste"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-3">
            {wasteData.length > 0 ? (
              wasteData.map((waste) => (
                <div
                  key={waste.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {new Date(waste.date).toLocaleDateString('id-ID', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">Tipe: {waste.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{waste.weight} kg</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(waste.status)}`}>
                      {waste.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Belum ada data sampah</p>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Laporan Terbaru</h2>
            <Link
              to="/dashboard/warga/reports"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{report.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(report.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Belum ada laporan</p>
            )}
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Jadwal Pengangkutan Sampah</h2>
          <Link
            to="/dashboard/warga/schedule"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Lihat Detail →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schedule.length > 0 ? (
            schedule.map((sched) => (
              <div
                key={sched.id}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">{sched.day}</span>
                  <span className="text-sm text-gray-600">{sched.time}</span>
                </div>
                <p className="text-sm text-gray-700">Tipe: {sched.type}</p>
                <p className="text-xs text-gray-500 mt-1">{sched.wilayah}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada jadwal</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardWarga;

