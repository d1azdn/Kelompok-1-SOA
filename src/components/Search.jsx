import React, { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';


const Search = () => {
  const { navigate } = useAppContext(); // Access navigate function from context
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [dates, setDates] = useState([null, null]); // startDate, endDate

  const handleSearch = (e) => {
    e.preventDefault();

    // Extract start and end date from the dates array
    const [pickupDate, returnDate] = dates;

    // Check if all fields are filled out
    if (!pickupLocation || !pickupDate || !pickupTime || !returnDate || !returnTime) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    // Navigate to available cars page with query parameters
    navigate(`/available-cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&pickupTime=${pickupTime}&returnDate=${returnDate}&returnTime=${returnTime}`);
  };

  return (
    <div className="p-20 mt-12 mb-12" id='car-list'>
      <h1 className="text-3xl text-center md:text-4xl font-semibold mb-12 text-gray-800">Temukan Mobil Yang Tersedia</h1>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">

        {/* Pickup Location */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="pickupLocation">Lokasi Pengambilan</label>
          <input
            type="text"
            id="pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            placeholder="Masukkan lokasi"
          />
        </div>

        {/* Date Range Picker (Pickup and Return Date) */}
        <div className="flex-wrap">
          <label className="block text-sm font-medium text-gray-700" htmlFor="dateRange">Tanggal Rental</label>
          {/* DatePicker integrated inside the input */}
          <DatePicker
            selected={dates[0]}
            onChange={(update) => setDates(update)} // update will be an array [startDate, endDate]
            startDate={dates[0]}
            endDate={dates[1]}
            selectsRange
            className="p-2 w-full border rounded-md mt-2"
            dateFormat="dd/MM/yyyy"
            placeholderText="Pilih tanggal"
          />
        </div>

        {/* Pickup Time */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="pickupTime">Waktu</label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
          />
        </div>

        {/* Return Time */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="returnTime">Waktu</label>
          <input
            type="time"
            id="returnTime"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center mt-12 w-full">
          <button type="submit" className="bg-primary text-white py-2 px-6 rounded-md shadow-md hover:bg-primary-dull transition-colors duration-200">
            Cari
          </button>
        </div>
      </form>
      <div>
    </div>
    </div>

  );
};

export default Search;
