import React from 'react';
import { FaDollarSign, FaCar, FaHeadset } from 'react-icons/fa'; // Importing icons

const Reasons = () => {
  return (
    <section className="p-20 bg-gray-100">
      <h2 className="text-3xl text-center md:text-4xl font-semibold mb-12 text-gray-800">Kenapa Kami</h2>
      
      <div className="flex flex-wrap gap-12 justify-center">
        {/* Reason 1: Harga Transparan */}
        <div className="bg-white p-8 w-full sm:w-80 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex justify-center mb-4">
            <FaDollarSign className="text-primary text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Harga Transparan</h3>
          <p className="text-gray-600">
            Tidak ada biaya tersembunyi! Kami menawarkan harga yang jelas dan tanpa kejutan.
          </p>
        </div>

        {/* Reason 2: Mobil Terawat */}
        <div className="bg-white p-8 w-full sm:w-80 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex justify-center mb-4">
            <FaCar className="text-primary text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobil Terawat</h3>
          <p className="text-gray-600">
            Semua mobil kami dalam kondisi prima, siap mengantar perjalanan Anda dengan aman dan nyaman.
          </p>
        </div>

        {/* Reason 3: Customer Service 24/7 */}
        <div className="bg-white p-8 w-full sm:w-80 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex justify-center mb-4">
            <FaHeadset className="text-primary text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Service 24/7</h3>
          <p className="text-gray-600">
            Tim customer service kami siap membantu Anda kapan saja, 24 jam sehari, 7 hari seminggu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reasons;
