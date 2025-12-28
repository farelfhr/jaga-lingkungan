import { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { authService } from '../../utils/auth';
import { useReports } from '../../context/ReportsContext';

const MyReports = () => {
  const currentUser = authService.getCurrentUser();
  const { reports: allReports } = useReports();
  
  const reports = useMemo(() => {
    if (!currentUser) return [];
    return allReports.filter(r => r.userId === currentUser.id);
  }, [allReports, currentUser]);

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
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Laporan Saya</h1>
        
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition"
              >
                <div className="mb-3">
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
                <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">{report.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200">
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

