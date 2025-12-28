import { useEffect, useState } from 'react';
import { reports } from '../../data/mockData';

const ReportsManagement = () => {
  const [allReports, setAllReports] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, verified

  useEffect(() => {
    setAllReports(reports);
  }, []);

  const filteredReports = filter === 'all'
    ? allReports
    : allReports.filter(r => r.status === filter);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryBadge = (category) => {
    const styles = {
      sampah: 'bg-red-100 text-red-800',
      'pembuangan-liar': 'bg-orange-100 text-orange-800',
      infrastruktur: 'bg-purple-100 text-purple-800',
      sungai: 'bg-cyan-100 text-cyan-800'
    };
    return styles[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Laporan Warga</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'verified'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Terverifikasi
            </button>
          </div>
        </div>

        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadge(report.category)}`}>
                        {report.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p className="font-medium">{report.userName}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{report.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">📍 {report.location}</p>
                  <div className="text-right text-sm text-gray-500">
                    <p>Dibuat: {new Date(report.createdAt).toLocaleDateString('id-ID')}</p>
                    {report.verifiedAt && (
                      <p>Terverifikasi: {new Date(report.verifiedAt).toLocaleDateString('id-ID')}</p>
                    )}
                  </div>
                </div>
                {report.status === 'pending' && (
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Verifikasi
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada laporan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsManagement;

