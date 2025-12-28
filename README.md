# Jaga Lingkungan - Platform Pengelolaan Sampah

Platform web untuk pengelolaan sampah yang terintegrasi dengan fitur untuk warga dan Dinas Lingkungan Hidup (DLH).

## 🚀 Fitur Utama

### Untuk Warga
- ✅ Dashboard dengan statistik saldo, poin, dan jadwal
- ✅ Input sampah dengan sistem poin reward
- ✅ Tracking truk sampah real-time
- ✅ Lapor masalah lingkungan dengan upload foto
- ✅ Pembayaran iuran online
- ✅ Riwayat pembuangan sampah
- ✅ Jadwal pengangkutan sampah per wilayah

### Untuk DLH (Admin)
- ✅ Dashboard dengan statistik lengkap
- ✅ Grafik tren volume sampah
- ✅ Manajemen laporan dari warga
- ✅ Peta wilayah dengan status TPS
- ✅ Kelola jadwal pengangkutan
- ✅ Data warga

## 📋 Prasyarat

Sebelum menjalankan project ini, pastikan Anda telah menginstall:

- **Node.js** (versi 18.0 atau lebih tinggi)
- **npm** atau **yarn** (package manager)

Cek versi Node.js Anda:
```bash
node --version
npm --version
```

## 🛠️ Instalasi

1. **Clone atau download project ini**

2. **Buka terminal/command prompt di folder project**
   ```bash
   cd jaga-lingkungan
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   
   Proses ini mungkin memakan waktu beberapa menit untuk menginstall semua package yang dibutuhkan.

## ▶️ Menjalankan Project

### Development Mode

Untuk menjalankan project dalam mode development:

```bash
npm run dev
```

Project akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

Browser akan otomatis terbuka, jika tidak, buka manual di browser Anda.

### Build untuk Production

Untuk membuat build production:

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`.

### Preview Production Build

Untuk preview hasil build:

```bash
npm run preview
```

## 🔐 Akun Demo

### Akun Warga
- **Username:** `warga` atau `user`
- **Password:** `123`

### Akun DLH (Admin)
- **Username:** `admin`
- **Password:** `admin`

## 📁 Struktur Project

```
jaga-lingkungan/
├── public/                 # File statis (logo, dll)
│   └── logo.jpeg          # Logo aplikasi
├── src/
│   ├── components/        # Komponen reusable
│   │   └── ProtectedRoute.jsx
│   ├── context/          # Context API untuk state management
│   │   └── ReportsContext.jsx
│   ├── data/             # Data mockup
│   │   └── mockData.js
│   ├── layouts/          # Layout templates
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/            # Halaman aplikasi
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── EdukasiPage.jsx
│   │   ├── warga/        # Halaman untuk warga
│   │   │   ├── DashboardWarga.jsx
│   │   │   ├── ReportProblem.jsx
│   │   │   ├── MyReports.jsx
│   │   │   ├── WasteHistory.jsx
│   │   │   └── Schedule.jsx
│   │   └── dlh/          # Halaman untuk admin
│   │       ├── DashboardDLH.jsx
│   │       ├── ReportsManagement.jsx
│   │       ├── ScheduleManagement.jsx
│   │       └── UsersManagement.jsx
│   ├── utils/            # Utility functions
│   │   └── auth.js
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies & scripts
└── README.md            # Dokumentasi
```

## 🎨 Teknologi yang Digunakan

- **React 19** - Framework UI
- **Vite** - Build tool & dev server
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasi
- **Recharts** - Charts & grafik
- **Lucide React** - Icons
- **Context API** - State management

## 📱 Fitur Responsif

Website ini sudah fully responsive untuk:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🔧 Scripts Available

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Menjalankan ESLint

## 📝 Catatan Penting

1. **Data Storage**: Data disimpan di `localStorage` browser (simulasi database)
2. **Logo**: Logo aplikasi ada di `public/logo.jpeg`
3. **Mock Data**: Data dummy ada di `src/data/mockData.js`

## 🐛 Troubleshooting

### Port sudah digunakan
Jika port 5173 sudah digunakan, Vite akan otomatis menggunakan port lain. Cek terminal untuk melihat port yang digunakan.

### Dependencies error
Hapus folder `node_modules` dan file `package-lock.json`, lalu install ulang:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build error
Pastikan semua dependencies terinstall dengan benar:
```bash
npm install
```

## 📄 Lisensi

© 2025 Jaga Lingkungan - Universitas Muhammadiyah Yogyakarta

## 👥 Kontak & Support

Untuk pertanyaan atau support, silakan hubungi:
- Email: info@jagalingkungan.id
- Phone: (0274) 123456

---

**Selamat menggunakan Jaga Lingkungan! 🌱**
