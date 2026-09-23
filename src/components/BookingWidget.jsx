import React, { useState, useRef, useEffect } from 'react';
import { carsData, airportsData, BASE_IMAGE_URL } from '../data/index.js';

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState('car');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-10 -mt-52 lg:-mt-40 max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'car' ? 'bg-gb-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('car')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16a2 2 0 100-4 2 2 0 000 4zM16 16a2 2 0 100-4 2 2 0 000 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16h1m10 0h1m-10-4h10M3 12h18m-2-8a2 2 0 00-2-2H7a2 2 0 00-2 2M5 4v8m14-8v8" />
            </svg>
            Car Rental
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'airport' ? 'bg-gb-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('airport')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Airport Rental
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Field 1: Choose a Car */}
            <div className="flex flex-col relative" ref={dropdownRef}>
              <label className="text-sm font-medium text-gray-700 mb-1">Choose a Car <span className="text-red-500">*</span></label>
              <div 
                className="flex items-center border border-gray-300 rounded-lg p-2 cursor-pointer h-[50px]"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src="/assets/icon/fi_9610434.svg" alt="Car" className="w-5 h-5 mr-2" />
                <div className="flex-1 overflow-hidden">
                  {selectedCar ? (
                    <div className="flex items-center">
                      <img src={`${selectedCar.image}`} alt={selectedCar.name} className="h-6 object-contain mr-2" />
                      <span className="text-sm truncate">{selectedCar.name} ({selectedCar.seat})</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Select Car Type</span>
                  )}
                </div>
              </div>
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-[70px] left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                  {carsData.map(car => (
                    <div 
                      key={car.id} 
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleCarSelect(car)}
                    >
                      <img src={`${car.image}`} alt={car.name} className="h-8 object-contain mr-3 w-12" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{car.name}</span>
                        <span className="text-xs text-gray-500">{car.seat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Depending on Active Tab */}
            {activeTab === 'car' ? (
              <>
                {/* Field 2: Pickup Location */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Pickup Location <span className="text-red-500">*</span></label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2 h-[50px]">
                    <img src="/assets/icon/Frame76.svg" alt="Location" className="w-5 h-5 mr-2" />
                    <input type="text" placeholder="Enter Pickup Location" className="w-full outline-none text-sm bg-transparent" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Field 2: Pickup Airport */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Pickup Airport <span className="text-red-500">*</span></label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2 h-[50px]">
                    <img src="/assets/icon/Frame76.svg" alt="Location" className="w-5 h-5 mr-2" />
                    <select className="w-full outline-none text-sm bg-transparent text-gray-700 cursor-pointer">
                      <option value="">Select Airport</option>
                      {airportsData.map((airport, i) => (
                        <option key={i} value={airport.value}>{airport.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Field 3: Drop-off Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Drop-off Location <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 h-[50px]">
                <img src="/assets/icon/fi_14910621.svg" alt="Location" className="w-5 h-5 mr-2" />
                <input type="text" placeholder="Enter Drop-off Location" className="w-full outline-none text-sm bg-transparent" />
              </div>
            </div>

            {/* Field 4: Pickup Date & Time */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Pickup Date & Time <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 h-[50px]">
                <img src="/assets/icon/fi_12516022.svg" alt="Date" className="w-5 h-5 mr-2" />
                <input type="text" placeholder="MM/DD/YYYY 00:00 PM" className="w-full outline-none text-sm bg-transparent" />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {activeTab === 'car' ? (
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="tripType" value="One Way" defaultChecked className="w-4 h-4 text-gb-primary focus:ring-gb-primary" />
                  <span className="ml-2 text-sm text-gray-700">One Way</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="tripType" value="Round Way" className="w-4 h-4 text-gb-primary focus:ring-gb-primary" />
                  <span className="ml-2 text-sm text-gray-700">Round Way</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="tripType" value="Hourly" className="w-4 h-4 text-gb-primary focus:ring-gb-primary" />
                  <span className="ml-2 text-sm text-gray-700">Hourly</span>
                </label>
              </div>
            ) : (
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="airportTripType" value="From Airport" defaultChecked className="w-4 h-4 text-gb-primary focus:ring-gb-primary" />
                  <span className="ml-2 text-sm text-gray-700">From Airport</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="airportTripType" value="From Home" className="w-4 h-4 text-gb-primary focus:ring-gb-primary" />
                  <span className="ml-2 text-sm text-gray-700">From Home</span>
                </label>
              </div>
            )}
            
            <button className="bg-gb-primary hover:bg-[#0c1e3a] text-white px-8 py-3 rounded-lg font-semibold flex items-center transition-colors">
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
