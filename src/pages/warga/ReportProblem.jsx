import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../context/ReportsContext';
import { authService } from '../../utils/auth';
import { AlertCircle, Upload, X, CheckCircle, Camera } from 'lucide-react';

const ReportProblem = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const { addReport } = useReports();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'sampah',
    location: ''
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB');
        return;
      }

      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.title.trim()) {
      setError('Judul laporan harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Deskripsi masalah harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.location.trim()) {
      setError('Lokasi harus diisi');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newReport = {
        userId: currentUser.id,
        userName: currentUser.name,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location || currentUser.address || 'Lokasi tidak ditentukan',
        photo: photoPreview, // Simulated photo URL
        status: 'pending'
      };

      addReport(newReport);
      
      setSuccess(true);
      setLoading(false);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: 'sampah',
          location: ''
        });
        setPhotoPreview(null);
        setPhotoFile(null);
        setSuccess(false);
        navigate('/dashboard/warga/reports');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Lapor Masalah Lingkungan</h1>
        </div>
        <p className="text-green-50">
          Laporkan masalah lingkungan di sekitar Anda untuk ditindaklanjuti
        </p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Laporan berhasil dikirim!</p>
            <p className="text-sm">Mengalihkan ke halaman laporan Anda...</p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        {/* Judul */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Laporan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="Contoh: Sampah Menumpuk di TPS"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          >
            <option value="sampah">Sampah Menumpuk</option>
            <option value="pembuangan-liar">Pembuangan Sampah Liar</option>
            <option value="infrastruktur">Infrastruktur Rusak</option>
            <option value="sungai">Pencemaran Sungai</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi Masalah <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
            placeholder="Jelaskan masalah yang Anda temui secara detail..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimal 10 karakter
          </p>
        </div>

        {/* Lokasi */}
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Lokasi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="Contoh: Jl. Merdeka No. 123, Kelurahan Sukajadi"
            required
          />
          {currentUser?.address && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, location: currentUser.address }))}
              className="text-xs text-green-600 hover:text-green-700 mt-1"
            >
              Gunakan alamat profil: {currentUser.address}
            </button>
          )}
        </div>

        {/* Upload Foto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Foto (Opsional)
          </label>
          {!photoPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
            >
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Klik untuk upload foto
              </p>
              <p className="text-xs text-gray-500">
                Format: JPG, PNG (Maks. 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || success}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                Kirim Laporan
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/warga')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ReportProblem;

