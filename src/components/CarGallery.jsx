import React from 'react';
import CarCard from './CarCard';
import { cars } from '../context/CarsData';

const CarGallery = () => {
  
  return (
    <section className="p-20 mt-12 mb-12">
      <h1 className="text-3xl text-center md:text-4xl font-semibold mb-12 text-gray-800">Tawaran Sewa Mobil Paling Populer</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </section>
  );
};

export default CarGallery;
