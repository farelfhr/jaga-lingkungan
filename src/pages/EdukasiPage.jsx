import { motion } from 'framer-motion';
import { Leaf, Recycle, Trash2, AlertTriangle, CheckCircle, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const EdukasiPage = () => {
  const articles = [
    {
      id: 1,
      title: 'Pemilahan Sampah Organik dan Anorganik',
      icon: <Leaf className="w-8 h-8" />,
      color: 'green',
      content: {
        organik: {
          title: 'Sampah Organik',
          description: 'Sampah yang berasal dari sisa makhluk hidup dan dapat terurai secara alami',
          examples: [
            'Sisa makanan (nasi, sayuran, buah-buahan)',
            'Dedaunan dan ranting pohon',
            'Kulit buah dan sayuran',
            'Kotoran hewan',
            'Sisa minuman'
          ],
          tips: [
            'Pisahkan dari sampah anorganik',
            'Dapat dijadikan kompos',
            'Jangan dicampur dengan plastik',
            'Buang di tempat sampah organik'
          ]
        },
        anorganik: {
          title: 'Sampah Anorganik',
          description: 'Sampah yang tidak dapat terurai secara alami dan membutuhkan waktu lama untuk terurai',
          examples: [
            'Plastik (botol, kantong, kemasan)',
            'Kaca dan botol kaca',
            'Logam (kaleng, besi)',
            'Kertas dan karton',
            'Elektronik'
          ],
          tips: [
            'Cuci bersih sebelum dibuang',
            'Pisahkan berdasarkan jenis',
            'Dapat didaur ulang',
            'Bawa ke bank sampah atau TPS'
          ]
        }
      }
    },
    {
      id: 2,
      title: 'Manfaat Pemilahan Sampah yang Benar',
      icon: <Recycle className="w-8 h-8" />,
      color: 'blue',
      benefits: [
        {
          title: 'Mengurangi Volume Sampah',
          description: 'Dengan memilah sampah, kita dapat mengurangi jumlah sampah yang dibuang ke TPA'
        },
        {
          title: 'Meningkatkan Daur Ulang',
          description: 'Sampah anorganik yang sudah dipilah dapat lebih mudah didaur ulang'
        },
        {
          title: 'Membuat Kompos',
          description: 'Sampah organik dapat diolah menjadi kompos untuk menyuburkan tanah'
        },
        {
          title: 'Menjaga Lingkungan',
          description: 'Mengurangi pencemaran tanah, air, dan udara dari sampah yang tidak terkelola'
        }
      ]
    },
    {
      id: 3,
      title: 'Cara Mengelola Sampah di Rumah',
      icon: <Trash2 className="w-8 h-8" />,
      color: 'purple',
      steps: [
        {
          step: 1,
          title: 'Siapkan Tempat Sampah Terpisah',
          description: 'Sediakan minimal 2 tempat sampah: organik dan anorganik'
        },
        {
          step: 2,
          title: 'Pilah Sampah Sejak Awal',
          description: 'Pisahkan sampah langsung saat membuang, jangan mencampurnya'
        },
        {
          step: 3,
          title: 'Cuci Sampah Anorganik',
          description: 'Bersihkan kemasan plastik dan kaleng sebelum dibuang'
        },
        {
          step: 4,
          title: 'Manfaatkan Sampah Organik',
          description: 'Buat kompos dari sampah organik atau berikan ke peternak'
        },
        {
          step: 5,
          title: 'Bawa ke TPS atau Bank Sampah',
          description: 'Sampah anorganik dapat dibawa ke bank sampah untuk didaur ulang'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block mb-4">
              <Book className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Edukasi Pemilahan Sampah
            </h1>
            <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
              Mari belajar cara memilah dan mengelola sampah dengan benar untuk lingkungan yang lebih baik
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Article Header */}
            <div className={`bg-gradient-to-r from-${article.color}-500 to-${article.color}-600 text-white p-6 md:p-8`}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  {article.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{article.title}</h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {article.id === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Organik */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Leaf className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-green-800">
                        {article.content.organik.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {article.content.organik.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-green-700 mb-2">Contoh:</h4>
                      <ul className="space-y-1">
                        {article.content.organik.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {article.content.organik.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Anorganik */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Recycle className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-blue-800">
                        {article.content.anorganik.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {article.content.anorganik.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-blue-700 mb-2">Contoh:</h4>
                      <ul className="space-y-1">
                        {article.content.anorganik.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {article.content.anorganik.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {article.id === 2 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {article.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {article.id === 3 && (
                <div className="space-y-6">
                  {article.steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-6 bg-purple-50 border border-purple-200 rounded-xl hover:shadow-md transition"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Mari Mulai Memilah Sampah dari Rumah!
          </h2>
          <p className="text-green-50 mb-6 text-lg">
            Setiap tindakan kecil Anda dapat membuat perubahan besar untuk lingkungan
          </p>
          <Link
            to="/dashboard/warga"
            className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition transform hover:scale-105"
          >
            Mulai dari Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EdukasiPage;

