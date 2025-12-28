import { useEffect, useState } from 'react';
import { schedules } from '../../data/mockData';

const ScheduleManagement = () => {
  const [allSchedules, setAllSchedules] = useState([]);

  useEffect(() => {
    setAllSchedules(schedules);
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
  const sortedSchedules = [...allSchedules].sort((a, b) => {
    if (a.wilayah !== b.wilayah) {
      return a.wilayah.localeCompare(b.wilayah);
    }
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
  });

  // Group by wilayah
  const groupedByWilayah = sortedSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.wilayah]) {
      acc[schedule.wilayah] = [];
    }
    acc[schedule.wilayah].push(schedule);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Jadwal Pengangkutan</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Tambah Jadwal
          </button>
        </div>

        {Object.keys(groupedByWilayah).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedByWilayah).map(([wilayah, wilayahSchedules]) => (
              <div key={wilayah} className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{wilayah}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wilayahSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-gray-800">{schedule.day}</span>
                        <span className="text-sm text-gray-600">{schedule.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(schedule.type)}`}>
                          {schedule.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          schedule.status === 'aktif'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {schedule.status}
                        </span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition">
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada jadwal pengangkutan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManagement;

