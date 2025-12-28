import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reports, schedules, wasteData } from '../../data/mockData';

const DashboardDLH = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    verifiedReports: 0,
    totalWaste: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);

  useEffect(() => {
    // Calculate stats
    const totalReports = reports.length;
    const pendingReports = reports.filter(r => r.status === 'pending').length;
    const verifiedReports = reports.filter(r => r.status === 'verified').length;
    const totalWaste = wasteData.reduce((sum, w) => sum + w.weight, 0);

    setStats({
      totalReports,
      pendingReports,
      verifiedReports,
      totalWaste: totalWaste.toFixed(1)
    });

    // Get recent reports
    setRecentReports(reports.slice(0, 5));

    // Get all schedules
    setAllSchedules(schedules);
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          Dashboard DLH
        </h1>
        <p className="text-blue-100">
          Kelola laporan dan pengelolaan sampah dengan mudah
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Laporan</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalReports}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingReports}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Terverifikasi</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.verifiedReports}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sampah (kg)</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalWaste}</p>
            </div>
            <div className="text-4xl">🗑️</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Laporan Terbaru</h2>
            <Link
              to="/dashboard/dlh/reports"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-3">
            {recentReports.length > 0 ? (
              recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{report.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.userName}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{report.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{report.location}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Belum ada laporan</p>
            )}
          </div>
        </div>

        {/* Schedules Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Jadwal Pengangkutan</h2>
            <Link
              to="/dashboard/dlh/schedule"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Kelola Jadwal →
            </Link>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {allSchedules.length > 0 ? (
              allSchedules.map((sched) => (
                <div
                  key={sched.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{sched.wilayah}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {sched.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{sched.day} - {sched.time}</span>
                    <span>{sched.type}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Belum ada jadwal</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDLH;

