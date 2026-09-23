import React, { useState, useRef, useEffect } from 'react';
import { carsData, airportsData } from '../data/index.js';

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState('car'); // 'car' | 'airport'
  const [tripType, setTripType] = useState('Hourly'); // 'One Way' | 'Round Way' | 'Hourly'
  const [airportTripType, setAirportTripType] = useState('From Airport'); // 'From Airport' | 'From Home'
  const [selectedCar, setSelectedCar] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hours, setHours] = useState(3);
  
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

  const decreaseHours = () => {
    if (hours > 2) setHours(hours - 1);
  };

  const increaseHours = () => {
    if (hours < 12) setHours(hours + 1);
  };

  return (
    <div className="relative z-30 -mb-28 lg:-mb-32 max-w-7xl mx-auto px-4 pointer-events-auto">
      {/* ── Top Tabs Box (Matches Image 2 exactly) ── */}
      <div className="inline-flex bg-white rounded-t-2xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] px-4 pt-3.5 pb-5 gap-2 relative z-10">
        <button
          onClick={() => setActiveTab('car')}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all ${
            activeTab === 'car'
              ? 'bg-[#121212] text-white shadow-sm'
              : 'bg-transparent text-[#121212] hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16a2 2 0 100-4 2 2 0 000 4zM16 16a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M3 13h18M3 13v4a2 2 0 002 2h1M21 13v4a2 2 0 01-2 2h-1" />
          </svg>
          <span>Car Rental</span>
        </button>

        <button
          onClick={() => setActiveTab('airport')}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all ${
            activeTab === 'airport'
              ? 'bg-[#121212] text-white shadow-sm'
              : 'bg-transparent text-[#121212] hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Airport Rental</span>
        </button>
      </div>

      {/* ── Main Form Card (Matches Image 2 exactly) ── */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12)] p-6 sm:p-8 lg:p-10 -mt-2 relative z-20">
        {activeTab === 'car' ? (
          /* Car Rental Form */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Field 1: Choose a Car */}
              <div className="relative lg:border-r lg:border-[#e9e9e9] lg:pr-6" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_9610434.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Choose a Car <span className="text-red-500">*</span></span>
                </label>
                
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between py-2 cursor-pointer transition select-none"
                >
                  {selectedCar ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={selectedCar.image} alt={selectedCar.name} className="h-6 object-contain" />
                      <span className="text-sm font-semibold text-gray-800 truncate">{selectedCar.name} ({selectedCar.seat})</span>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base font-normal text-gray-400">Select Car Type</span>
                  )}
                  <svg className={`w-5 h-5 text-gray-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
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
              <div className="lg:border-r lg:border-[#e9e9e9] lg:pr-6">
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#fdd300] inline-block shadow-sm"></span>
                  <span>Pickup Location <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Enter Pickup Location"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 3: Depends on Trip Type */}
              {tripType !== 'Hourly' ? (
                /* Drop-off Location for One Way & Round Way */
                <div className="lg:border-r lg:border-[#e9e9e9] lg:pr-6">
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#0e52ff] inline-block shadow-sm"></span>
                    <span>Drop-off Location <span className="text-red-500">*</span></span>
                  </label>
                  <div className="py-2">
                    <input
                      type="text"
                      placeholder="Enter Drop-off Location"
                      className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>
              ) : null}

              {/* Pickup Date & Time */}
              <div className={`${tripType === 'Hourly' ? 'lg:border-r lg:border-[#e9e9e9] lg:pr-6' : ''}`}>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* If Hourly: Field 4 is Select Hours Stepper */}
              {tripType === 'Hourly' && (
                <div>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/clock1.png" alt="" className="w-4 h-4 object-contain" />
                    <span>Select Hours <span className="text-red-500">*</span></span>
                  </label>
                  
                  {/* Stepper with border matching Image 2 */}
                  <div className="border border-gray-300 rounded-lg p-1.5 flex items-center justify-between h-[42px] max-w-[280px]">
                    <button
                      type="button"
                      onClick={decreaseHours}
                      className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center transition active:scale-95"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-gray-800 select-none">
                      {hours} hours
                    </span>
                    <button
                      type="button"
                      onClick={increaseHours}
                      className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center transition active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-red-500 mt-2 font-medium">
                    Minimum 2 hours is required for an hourly trip.
                  </p>
                </div>
              )}
            </div>

            {/* Dynamic Return Date & Time field if Round Way is selected */}
            {tripType === 'Round Way' && (
              <div className="mt-6 pt-6 border-t border-gray-100 max-w-sm">
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Return Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* Bottom Row: Radios & Continue Button (Matches Image 2 exactly) */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-4">
                {/* One Way Radio */}
                <button
                  type="button"
                  onClick={() => setTripType('One Way')}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition select-none ${
                    tripType === 'One Way'
                      ? 'bg-[#f0f3ff] text-[#0e52ff]'
                      : 'text-[#121212] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    tripType === 'One Way' 
                      ? 'border-[3px] border-[#0e52ff] bg-white' 
                      : 'bg-gray-200'
                  }`}>
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold">One Way</span>
                </button>

                {/* Round Way Radio */}
                <button
                  type="button"
                  onClick={() => setTripType('Round Way')}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition select-none ${
                    tripType === 'Round Way'
                      ? 'bg-[#f0f3ff] text-[#0e52ff]'
                      : 'text-[#121212] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    tripType === 'Round Way' 
                      ? 'border-[3px] border-[#0e52ff] bg-white' 
                      : 'bg-gray-200'
                  }`}>
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold">Round Way</span>
                </button>

                {/* Hourly Radio (Active Pill Style in Image 2) */}
                <button
                  type="button"
                  onClick={() => setTripType('Hourly')}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-lg cursor-pointer transition select-none ${
                    tripType === 'Hourly'
                      ? 'bg-[#f0f3ff] text-[#0e52ff]'
                      : 'text-[#121212] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    tripType === 'Hourly' 
                      ? 'border-[3px] border-[#0e52ff] bg-white' 
                      : 'bg-gray-200'
                  }`}>
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold">Hourly</span>
                </button>
              </div>

              {/* Continue CTA Button */}
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg active:scale-95">
                <span>Continue</span>
                <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Airport Rental Form */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Field 1: Choose a Car */}
              <div className="relative lg:border-r lg:border-[#e9e9e9] lg:pr-6" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_9610434.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Choose a Car <span className="text-red-500">*</span></span>
                </label>
                
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between py-2 cursor-pointer transition select-none"
                >
                  {selectedCar ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={selectedCar.image} alt={selectedCar.name} className="h-6 object-contain" />
                      <span className="text-sm font-semibold text-gray-800 truncate">{selectedCar.name} ({selectedCar.seat})</span>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base font-normal text-gray-400">Select Car Type</span>
                  )}
                  <svg className={`w-5 h-5 text-gray-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
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
              <div className="lg:border-r lg:border-[#e9e9e9] lg:pr-6">
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#fdd300] inline-block shadow-sm"></span>
                  <span>Pickup Airport <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <select className="w-full text-sm sm:text-base font-medium text-gray-800 outline-none bg-transparent cursor-pointer">
                    <option value="">Select Airport</option>
                    {airportsData.map((a, i) => (
                      <option key={i} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 3: Drop-off Location */}
              <div className="lg:border-r lg:border-[#e9e9e9] lg:pr-6">
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#0e52ff] inline-block shadow-sm"></span>
                  <span>Drop-off Location <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="Enter Drop-off Location"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 4: Pickup Date & Time */}
              <div>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_12516022.svg" alt="" className="w-4 h-4 object-contain" />
                  <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                </label>
                <div className="py-2">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Airport Radios & Continue Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAirportTripType('From Airport')}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition select-none ${
                    airportTripType === 'From Airport'
                      ? 'bg-[#f0f3ff] text-[#0e52ff]'
                      : 'text-[#121212] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    airportTripType === 'From Airport' 
                      ? 'border-[3px] border-[#0e52ff] bg-white' 
                      : 'bg-gray-200'
                  }`}>
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold">From Airport</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAirportTripType('From Home')}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition select-none ${
                    airportTripType === 'From Home'
                      ? 'bg-[#f0f3ff] text-[#0e52ff]'
                      : 'text-[#121212] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    airportTripType === 'From Home' 
                      ? 'border-[3px] border-[#0e52ff] bg-white' 
                      : 'bg-gray-200'
                  }`}>
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold">From Home</span>
                </button>
              </div>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg active:scale-95">
                <span>Continue</span>
                <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
