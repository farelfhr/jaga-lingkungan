import { useEffect, useState } from 'react';
import { authService } from '../../utils/auth';
import { getReportsByUserId } from '../../data/mockData';

const MyReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userReports = getReportsByUserId(currentUser.id);
      setReports(userReports);
    }
  }, []);

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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Laporan Saya</h1>
        
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
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
                </div>
                <p className="text-gray-600 mb-3">{report.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <p className="font-medium">📍 {report.location}</p>
                  </div>
                  <div className="text-right">
                    <p>Dibuat: {new Date(report.createdAt).toLocaleDateString('id-ID')}</p>
                    {report.verifiedAt && (
                      <p>Terverifikasi: {new Date(report.verifiedAt).toLocaleDateString('id-ID')}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada laporan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;

