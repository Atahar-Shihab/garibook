import React, { useState, useRef, useEffect } from 'react';
import { carsData, airportsData } from '../data/index.js';

/**
 * BookingWidget Component
 * 
 * This is the main booking form at the top of the homepage.
 * It lets users:
 * 1. Switch between "Car Rental" and "Airport Rental"
 * 2. Select trip types: One Way, Round Way, or Hourly
 * 3. Pick a vehicle with an interactive dropdown
 * 4. Choose pickup date & time using a custom interactive calendar picker
 * 5. Choose rental hours with a stepper when Hourly mode is active
 */
const BookingWidget = () => {
  // ─── State Management ───
  // Active tab: 'car' for Car Rental or 'airport' for Airport Rental
  const [activeTab, setActiveTab] = useState('car');
  
  // Trip type: 'One Way', 'Round Way', or 'Hourly'
  const [tripType, setTripType] = useState('Hourly');
  
  // Airport trip type: 'From Airport' or 'From Home'
  const [airportTripType, setAirportTripType] = useState('From Airport');
  
  // Currently selected car from the dropdown
  const [selectedCar, setSelectedCar] = useState(null);
  
  // Toggles the custom car selection dropdown list
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Rental duration in hours (minimum 2 hours, maximum 12 hours)
  const [hours, setHours] = useState(3);

  // Date and Time picker states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(23); // Default to 23rd matching screenshot
  const [selectedMonth] = useState('September 2026');
  const [selectedTime, setSelectedTime] = useState('08:00 PM');
  const [dateTimeString, setDateTimeString] = useState('');

  // DOM references to detect clicks outside popups and close them cleanly
  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);

  // Available time slots for the time picker list
  const timeSlots = [
    '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
    '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM'
  ];

  // Calendar days grid for September 2026 (starts on Tuesday)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Helper: Format and update the full date & time string
  const handleDateTimeSelect = (day, time) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedStr = `09/${formattedDay}/2026 ${time || selectedTime}`;
    setDateTimeString(formattedStr);
  };

  // Close open popups when user clicks anywhere outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Increase or decrease rental hours (enforces minimum 2 hours rule)
  const decreaseHours = () => {
    if (hours > 2) setHours(hours - 1);
  };

  const increaseHours = () => {
    if (hours < 12) setHours(hours + 1);
  };

  return (
    <div className="relative z-30 -mb-28 lg:-mb-32 max-w-7xl mx-auto px-4">
      {/* ─── Top Tabs Container (Attached seamlessly to the card) ─── */}
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

      {/* ─── Main Form Card ─── */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12)] p-6 sm:p-8 lg:p-10 -mt-2 relative z-20">
        {activeTab === 'car' ? (
          /* Car Rental Tab Content */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Field 1: Choose a Car */}
              <div className="relative lg:border-r lg:border-[#e9e9e9] lg:pr-6" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_9610434.svg" alt="Car Icon" className="w-4 h-4 object-contain" />
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

                {/* Car Selection Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                    {carsData.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => {
                          setSelectedCar(car);
                          setIsDropdownOpen(false);
                        }}
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

              {/* Field 3: Drop-off Location (hidden when Hourly trip type is selected) */}
              {tripType !== 'Hourly' && (
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
              )}

              {/* Field 4 / 3: Pickup Date & Time with Interactive Popup Picker */}
              <div 
                className={`relative ${tripType === 'Hourly' ? 'lg:border-r lg:border-[#e9e9e9] lg:pr-6' : ''}`}
                ref={datePickerRef}
              >
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
                  <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                </label>
                
                <div 
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className={`py-2 px-3 rounded-xl cursor-pointer transition ${
                    isDatePickerOpen ? 'border border-[#0e52ff] ring-2 ring-blue-100' : ''
                  }`}
                >
                  <input
                    type="text"
                    readOnly
                    value={dateTimeString}
                    placeholder="MM/DD/YYYY 00:00 PM"
                    className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
                  />
                </div>

                {/* ── Interactive Date & Time Picker Popup (Matches Image 1) ── */}
                {isDatePickerOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-4 w-[330px] sm:w-[360px] flex gap-3 animate-fadeIn">
                    {/* Calendar Side */}
                    <div className="flex-1">
                      {/* Month & Navigation Header */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                        <span className="font-bold text-sm text-gray-800">{selectedMonth}</span>
                        <div className="flex gap-1">
                          <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600 font-bold">&lt;</button>
                          <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600 font-bold">&gt;</button>
                        </div>
                      </div>

                      {/* Day Names Row */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 font-semibold mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                        {/* Empty padding days before Tuesday */}
                        <div />
                        <div />
                        {daysInMonth.map((day) => {
                          const isSelected = selectedDate === day;
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                setSelectedDate(day);
                                handleDateTimeSelect(day, selectedTime);
                              }}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                                isSelected
                                  ? 'bg-[#0e52ff] text-white font-bold shadow'
                                  : 'text-gray-700 hover:bg-blue-50'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selector Side (Scrollable) */}
                    <div className="w-24 border-l border-gray-100 pl-3">
                      <div className="font-bold text-xs text-gray-500 mb-2">Time</div>
                      <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
                        {timeSlots.map((time) => {
                          const isTimeSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => {
                                setSelectedTime(time);
                                handleDateTimeSelect(selectedDate, time);
                                setIsDatePickerOpen(false); // Auto close after choosing time
                              }}
                              className={`w-full text-left py-1 px-1.5 rounded transition ${
                                isTimeSelected
                                  ? 'bg-[#0e52ff] text-white font-bold'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* If Hourly Mode: Field 4 is the Select Hours Stepper */}
              {tripType === 'Hourly' && (
                <div>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/clock1.png" alt="Clock Icon" className="w-4 h-4 object-contain" />
                    <span>Select Hours <span className="text-red-500">*</span></span>
                  </label>
                  
                  {/* Stepper with minus/plus buttons matching Image 2 */}
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
                  <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
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

            {/* ─── Bottom Row: Radio Options & Continue Button ─── */}
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
                  }`} />
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
                  }`} />
                  <span className="text-sm sm:text-[15px] font-bold">Round Way</span>
                </button>

                {/* Hourly Radio (Active pill style matching Image 2) */}
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
                  }`} />
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
          /* Airport Rental Tab Content */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Field 1: Choose a Car */}
              <div className="relative lg:border-r lg:border-[#e9e9e9] lg:pr-6" ref={dropdownRef}>
                <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                  <img src="/assets/icon/fi_9610434.svg" alt="Car Icon" className="w-4 h-4 object-contain" />
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
                        onClick={() => {
                          setSelectedCar(car);
                          setIsDropdownOpen(false);
                        }}
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
                  <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
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
                  }`} />
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
                  }`} />
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
