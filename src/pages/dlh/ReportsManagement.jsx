import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useReports } from '../../context/ReportsContext';

const ReportsManagement = () => {
  const { reports: allReports, updateReport } = useReports();
  const [filter, setFilter] = useState('all'); // all, pending, verified

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
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Kelola Laporan Warga</h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
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
                className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition"
              >
                {/* Title & User Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getCategoryBadge(report.category)}`}>
                        {report.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusBadge(report.status)}`}>
                        {report.status === 'pending' ? 'Pending' : 'Terverifikasi'}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right text-sm text-gray-600">
                    <p className="font-medium">{report.userName}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">{report.description}</p>

                {/* Location & Date Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{report.location}</span>
                  </div>
                  <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500 space-y-1">
                    <p>Dibuat: {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric'
                    })}</p>
                    {report.verifiedAt && (
                      <p>Terverifikasi: {new Date(report.verifiedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                      })}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {report.status === 'pending' && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => updateReport(report.id, {
                        status: 'verified',
                        verifiedAt: new Date().toISOString()
                      })}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                    >
                      Verifikasi
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Tugaskan petugas untuk laporan ini?')) {
                          updateReport(report.id, {
                            status: 'verified',
                            assigned: true,
                            assignedAt: new Date().toISOString()
                          });
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      Tugaskan Petugas
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

