import React from 'react';

const Testimonials = () => {
  return (
    <section className="p-20 pb-32 bg-gray-100">
      <h2 className="text-3xl text-center md:text-4xl font-semibold mb-12 text-gray-800">Kata Mereka</h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {/* Testimonial 1 */}
        <div className="bg-white p-6 w-full sm:w-80 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h4 className="text-lg font-semibold text-gray-800">Mulyoyes</h4>
          <p className="text-sm text-gray-500">Pelayanan Terbaik & Mobil Sangat Terawat!</p>
          <p className="text-gray-600 mt-2 mb-4">Pengalaman menyewa mobil di sini sangat memuaskan! Mobil yang saya sewa dalam kondisi bersih dan nyaman.</p>
          <div className="flex items-center justify-center space-x-1 text-yellow-500">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-6 w-full sm:w-80 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h4 className="text-lg font-semibold text-gray-800">Waim Bong</h4>
          <p className="text-sm text-gray-500">Harga Terjangkau, Kualitas Terjamin!</p>
          <p className="text-gray-600 mt-2 mb-4">Harga yang ditawarkan sangat kompetitif dan kualitas mobilnya luar biasa. Proses pemesanan juga cepat!</p>
          <div className="flex items-center justify-center space-x-1 text-yellow-500">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white p-6 w-full sm:w-80 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h4 className="text-lg font-semibold text-gray-800">Ujang Kedu</h4>
          <p className="text-sm text-gray-500">Pelayanan Baik, Tapi Bisa Lebih Cepat</p>
          <p className="text-gray-600 mt-2 mb-4">Mobil yang saya sewa dalam kondisi prima dan bersih. Hanya saja, proses pengambilan mobil sedikit lambat.</p>
          <div className="flex items-center justify-center space-x-1 text-yellow-500">
            <span>⭐⭐⭐⭐</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
