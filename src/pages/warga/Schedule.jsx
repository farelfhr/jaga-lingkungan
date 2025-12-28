import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { authService } from '../../utils/auth';
import { getSchedulesByWilayah } from '../../data/mockData';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userSchedules = getSchedulesByWilayah(user.wilayah);
      setSchedules(userSchedules);
    }
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      organik: 'bg-green-100 text-green-800',
      anorganik: 'bg-blue-100 text-blue-800',
      B3: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const sortedSchedules = [...schedules].sort((a, b) => {
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Jadwal Pengangkutan Sampah</h1>
        {currentUser && (
          <p className="text-gray-600 mb-6">Wilayah: <span className="font-semibold">{currentUser.wilayah}</span></p>
        )}
        
        {schedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-800">{schedule.day}</span>
                  <span className="text-sm text-gray-500">{schedule.time}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(schedule.type)}`}>
                      {schedule.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Status: <span className="font-medium text-green-600">{schedule.status}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada jadwal pengangkutan untuk wilayah Anda</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-900">Informasi</h2>
        </div>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Pastikan sampah sudah dipilah sesuai jenisnya sebelum pengangkutan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Sampah harus diletakkan di tempat yang mudah dijangkau</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Hubungi DLH jika ada perubahan jadwal atau masalah</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Schedule;

