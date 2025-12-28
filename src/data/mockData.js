// Mock Users Data
export const users = [
  {
    id: 1,
    username: 'user',
    password: '123',
    role: 'warga',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 123, RT 05/RW 02',
    wilayah: 'Kelurahan Sukajadi'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    role: 'dlh',
    name: 'Admin DLH',
    email: 'admin@dlh.go.id',
    phone: '02112345678',
    position: 'Kepala Dinas Lingkungan Hidup'
  }
];

// Mock Waste Data (Riwayat Pembuangan Sampah)
export const wasteData = [
  {
    id: 1,
    userId: 1,
    date: '2025-01-15',
    type: 'organik',
    weight: 2.5, // kg
    status: 'terkumpul',
    wilayah: 'Kelurahan Sukajadi'
  },
  {
    id: 2,
    userId: 1,
    date: '2025-01-14',
    type: 'anorganik',
    weight: 1.8,
    status: 'terkumpul',
    wilayah: 'Kelurahan Sukajadi'
  },
  {
    id: 3,
    userId: 1,
    date: '2025-01-13',
    type: 'organik',
    weight: 3.2,
    status: 'terkumpul',
    wilayah: 'Kelurahan Sukajadi'
  },
  {
    id: 4,
    userId: 1,
    date: '2025-01-12',
    type: 'B3',
    weight: 0.5,
    status: 'terkumpul',
    wilayah: 'Kelurahan Sukajadi'
  },
  {
    id: 5,
    userId: 1,
    date: '2025-01-10',
    type: 'organik',
    weight: 2.1,
    status: 'terkumpul',
    wilayah: 'Kelurahan Sukajadi'
  }
];

// Mock Reports Data (Laporan Masalah Lingkungan)
export const reports = [
  {
    id: 1,
    userId: 1,
    userName: 'Budi Santoso',
    title: 'Sampah Menumpuk di TPS',
    description: 'Sampah menumpuk di TPS Jl. Merdeka sejak 2 hari yang lalu dan belum diangkut. Mulai menimbulkan bau tidak sedap.',
    category: 'sampah',
    location: 'Jl. Merdeka No. 123, Kelurahan Sukajadi',
    status: 'pending',
    createdAt: '2025-01-15T08:30:00',
    photo: null
  },
  {
    id: 2,
    userId: 1,
    userName: 'Budi Santoso',
    title: 'Pembuangan Sampah Liar',
    description: 'Ada pembuangan sampah liar di pinggir jalan dekat taman. Sampah plastik dan kardus berserakan.',
    category: 'pembuangan-liar',
    location: 'Jl. Sudirman, dekat Taman Kota',
    status: 'verified',
    createdAt: '2025-01-10T14:20:00',
    verifiedAt: '2025-01-11T09:15:00',
    photo: null
  },
  {
    id: 3,
    userId: 1,
    userName: 'Budi Santoso',
    title: 'Saluran Air Tersumbat Sampah',
    description: 'Saluran air di depan rumah tersumbat oleh sampah plastik. Saat hujan air menggenang.',
    category: 'infrastruktur',
    location: 'Jl. Merdeka No. 100-150',
    status: 'pending',
    createdAt: '2025-01-13T16:45:00',
    photo: null
  },
  {
    id: 4,
    userId: 1,
    userName: 'Budi Santoso',
    title: 'Tumpukan Sampah di Sungai',
    description: 'Banyak sampah mengambang di sungai dekat jembatan. Perlu pembersihan segera.',
    category: 'sungai',
    location: 'Sungai Ciliwung, Jembatan Jl. Gatot Subroto',
    status: 'verified',
    createdAt: '2025-01-08T10:00:00',
    verifiedAt: '2025-01-09T08:30:00',
    photo: null
  }
];

// Mock Schedule Data (Jadwal Pengangkutan Sampah)
export const schedules = [
  {
    id: 1,
    wilayah: 'Kelurahan Sukajadi',
    day: 'Senin',
    time: '07:00',
    type: 'organik',
    status: 'aktif'
  },
  {
    id: 2,
    wilayah: 'Kelurahan Sukajadi',
    day: 'Rabu',
    time: '07:00',
    type: 'anorganik',
    status: 'aktif'
  },
  {
    id: 3,
    wilayah: 'Kelurahan Sukajadi',
    day: 'Jumat',
    time: '07:00',
    type: 'organik',
    status: 'aktif'
  },
  {
    id: 4,
    wilayah: 'Kelurahan Cibadak',
    day: 'Selasa',
    time: '08:00',
    type: 'organik',
    status: 'aktif'
  },
  {
    id: 5,
    wilayah: 'Kelurahan Cibadak',
    day: 'Kamis',
    time: '08:00',
    type: 'anorganik',
    status: 'aktif'
  },
  {
    id: 6,
    wilayah: 'Kelurahan Menteng',
    day: 'Senin',
    time: '06:30',
    type: 'organik',
    status: 'aktif'
  },
  {
    id: 7,
    wilayah: 'Kelurahan Menteng',
    day: 'Rabu',
    time: '06:30',
    type: 'anorganik',
    status: 'aktif'
  },
  {
    id: 8,
    wilayah: 'Kelurahan Menteng',
    day: 'Sabtu',
    time: '06:30',
    type: 'B3',
    status: 'aktif'
  }
];

// Helper function to get user by credentials
export const getUserByCredentials = (username, password) => {
  return users.find(
    user => user.username === username && user.password === password
  );
};

// Helper function to get waste data by userId
export const getWasteDataByUserId = (userId) => {
  return wasteData.filter(waste => waste.userId === userId);
};

// Helper function to get reports by userId
export const getReportsByUserId = (userId) => {
  return reports.filter(report => report.userId === userId);
};

// Helper function to get schedules by wilayah
export const getSchedulesByWilayah = (wilayah) => {
  return schedules.filter(schedule => schedule.wilayah === wilayah);
};
