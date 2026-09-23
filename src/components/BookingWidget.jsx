import React, { useState, useRef, useEffect } from 'react';
import { carsData, airportsData } from '../data/index.js';

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState('car'); // 'car' | 'airport'
  const [tripType, setTripType] = useState('One Way'); // 'One Way' | 'Round Way' | 'Hourly'
  const [airportTripType, setAirportTripType] = useState('From Airport'); // 'From Airport' | 'From Home'
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-20 -mt-24 lg:-mt-28 max-w-7xl mx-auto px-4">
      {/* ── Top Tabs ── */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('car')}
          className={`flex items-center gap-2.5 px-7 py-3.5 rounded-t-2xl font-bold text-base transition-all ${
            activeTab === 'car'
              ? 'bg-[#121212] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#121212]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16a2 2 0 100-4 2 2 0 000 4zM16 16a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M3 13h18M3 13v4a2 2 0 002 2h1M21 13v4a2 2 0 01-2 2h-1" />
          </svg>
          <span>Car Rental</span>
        </button>

        <button
          onClick={() => setActiveTab('airport')}
          className={`flex items-center gap-2.5 px-7 py-3.5 rounded-t-2xl font-bold text-base transition-all ${
            activeTab === 'airport'
              ? 'bg-[#121212] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#121212]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Airport Rental</span>
        </button>
      </div>

      {/* ── Main Form Card ── */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-6 lg:p-8">
        {activeTab === 'car' ? (
          /* Car Rental Form */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Field 1: Choose a Car */}
              <div className="relative" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_9610434.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Choose a Car <span className="text-red-500">*</span></span>
                </label>
                
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-gray-400 transition bg-white"
                >
                  {selectedCar ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={selectedCar.image} alt={selectedCar.name} className="h-6 object-contain" />
                      <span className="text-sm font-medium text-gray-800 truncate">{selectedCar.name} ({selectedCar.seat})</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Select Car Type</span>
                  )}
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                    {carsData.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => handleCarSelect(car)}
                        className="flex items-center justify-between p-3.5 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition"
                      >
                        <div className="flex items-center gap-3">
                          <img src={car.image} alt={car.name} className="h-8 w-14 object-contain" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{car.name}</p>
                            <p className="text-xs text-gray-500">{car.seat}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 2: Pickup Location */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/Frame76.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Location <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="Enter Pickup Location"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 3: Drop-off Location */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_14910621.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Drop-off Location <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="Enter Drop-off Location"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 4: Pickup Date & Time */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Return Date & Time field if Round Way is selected */}
            {tripType === 'Round Way' && (
              <div className="mt-6 pt-6 border-t border-gray-100 max-w-sm">
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Return Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* Trip Type Radios & Continue Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div className="flex items-center gap-6">
                {['One Way', 'Round Way', 'Hourly'].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="tripType"
                      value={type}
                      checked={tripType === type}
                      onChange={() => setTripType(type)}
                      className="w-4 h-4 text-[#0e52ff] focus:ring-[#0e52ff] accent-[#0e52ff]"
                    />
                    <span className="text-sm lg:text-[15px] font-semibold text-gray-800">{type}</span>
                  </label>
                ))}
              </div>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg">
                <span>Continue</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Airport Rental Form */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Field 1: Choose a Car */}
              <div className="relative" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_9610434.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Choose a Car <span className="text-red-500">*</span></span>
                </label>
                
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-gray-400 transition bg-white"
                >
                  {selectedCar ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={selectedCar.image} alt={selectedCar.name} className="h-6 object-contain" />
                      <span className="text-sm font-medium text-gray-800 truncate">{selectedCar.name} ({selectedCar.seat})</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Select Car Type</span>
                  )}
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                    {carsData.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => handleCarSelect(car)}
                        className="flex items-center justify-between p-3.5 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition"
                      >
                        <div className="flex items-center gap-3">
                          <img src={car.image} alt={car.name} className="h-8 w-14 object-contain" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{car.name}</p>
                            <p className="text-xs text-gray-500">{car.seat}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 2: Pickup Airport */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/Frame76.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Airport <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <select className="w-full text-sm font-medium text-gray-800 outline-none bg-transparent cursor-pointer">
                    <option value="">Select Airport</option>
                    {airportsData.map((a, i) => (
                      <option key={i} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 3: Drop-off Location */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_14910621.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Drop-off Location <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="Enter Drop-off Location"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 4: Pickup Date & Time */}
              <div>
                <label className="flex items-center gap-2 text-sm lg:text-[15px] font-semibold text-[#121212] mb-2">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#0e52ff] transition">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Airport Radios & Continue Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div className="flex items-center gap-6">
                {['From Airport', 'From Home'].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="airportTripType"
                      value={type}
                      checked={airportTripType === type}
                      onChange={() => setAirportTripType(type)}
                      className="w-4 h-4 text-[#0e52ff] focus:ring-[#0e52ff] accent-[#0e52ff]"
                    />
                    <span className="text-sm lg:text-[15px] font-semibold text-gray-800">{type}</span>
                  </label>
                ))}
              </div>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg">
                <span>Continue</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
