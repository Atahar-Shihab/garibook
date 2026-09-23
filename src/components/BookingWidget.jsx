import React, { useState, useRef, useEffect } from 'react';
import { carsData, airportsData } from '../data/index.js';

/**
 * Reusable Calendar & Time Picker Modal
 * 
 * I created this popup component so both "Pickup Date & Time" and "Return Date & Time"
 * share the exact same interactive calendar grid and scrollable time list.
 */
const CalendarPopup = ({ selectedDay, onSelectDay, selectedTime, onSelectTime, onClose }) => {
  const [monthName, setMonthName] = useState('September 2026');

  // Available time slots matching the 30-minute intervals from Garibook
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

  // Days in September (30 days total)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const prevMonthDays = [30, 31];
  const nextMonthDays = [1, 2, 3];

  return (
    <div 
      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-4 w-[330px] sm:w-[360px] flex gap-3 animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Calendar Grid Side */}
      <div className="flex-1">
        {/* Month Header with Right Arrow Navigation */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
          <span className="font-bold text-sm text-gray-800">{monthName}</span>
          <button 
            type="button" 
            onClick={() => setMonthName(monthName === 'September 2026' ? 'October 2026' : 'September 2026')}
            className="p-1 hover:bg-gray-100 rounded text-gray-600 font-bold transition"
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 font-semibold mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          {/* Previous Month Inactive Days */}
          {prevMonthDays.map((d) => (
            <div key={`prev-${d}`} className="w-7 h-7 flex items-center justify-center text-gray-300">
              {d}
            </div>
          ))}

          {/* Current Month Active Days */}
          {daysInMonth.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => onSelectDay(day)}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition ${
                  isSelected
                    ? 'bg-[#0e52ff] text-white font-bold shadow'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {day}
              </button>
            );
          })}

          {/* Next Month Inactive Days */}
          {nextMonthDays.map((d) => (
            <div key={`next-${d}`} className="w-7 h-7 flex items-center justify-center text-gray-300">
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Time Column with Scrollbar */}
      <div className="w-24 border-l border-gray-100 pl-3">
        <div className="font-bold text-xs text-gray-800 mb-2">Time</div>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
          {timeSlots.map((time) => {
            const isTimeSelected = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => {
                  onSelectTime(time);
                  onClose(); // Automatically close picker once time is selected
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
  );
};

/**
 * BookingWidget Component
 * 
 * I created this component for Garibook's primary booking interface:
 * 1. Seamless tabs: "Car Rental" and "Airport Rental"
 * 2. Radio options: One Way, Round Way, Hourly
 * 3. In Hourly mode, shows duration stepper with 2-hour minimum warning
 * 4. In Round Way mode, displays Return Date & Time with full interactive calendar
 * 5. Full interactive calendar & time picker for both Pickup and Return fields
 */
const BookingWidget = () => {
  // Tabs: 'car' or 'airport'
  const [activeTab, setActiveTab] = useState('car');
  
  // Trip type: 'One Way', 'Round Way', or 'Hourly' (defaults to One Way)
  const [tripType, setTripType] = useState('One Way');
  
  // Airport trip direction
  const [airportTripType, setAirportTripType] = useState('From Airport');
  
  // Car selector
  const [selectedCar, setSelectedCar] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Hourly mode stepper (default 3 hours)
  const [hours, setHours] = useState(3);

  // ─── Pickup Date & Time State ───
  const [pickupDay, setPickupDay] = useState(11); // Defaults to Sept 11 matching screenshot
  const [pickupTime, setPickupTime] = useState('07:30 AM');
  const [pickupDateStr, setPickupDateStr] = useState('09/11/2026 07:30 AM');
  const [isPickupPickerOpen, setIsPickupPickerOpen] = useState(false);

  // ─── Return Date & Time State (for Round Way trips) ───
  const [returnDay, setReturnDay] = useState(23); // Defaults to Sept 23
  const [returnTime, setReturnTime] = useState('08:00 PM');
  const [returnDateStr, setReturnDateStr] = useState('MM/DD/YYYY 00:00 PM');
  const [isReturnPickerOpen, setIsReturnPickerOpen] = useState(false);

  // Text inputs
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedAirport, setSelectedAirport] = useState(airportsData[0].value);

  // Element refs to detect outside clicks
  const dropdownRef = useRef(null);
  const pickupPickerRef = useRef(null);
  const returnPickerRef = useRef(null);

  // Helper: update Pickup Date string
  const handleSelectPickupDay = (day) => {
    setPickupDay(day);
    const dayFmt = day < 10 ? `0${day}` : day;
    setPickupDateStr(`09/${dayFmt}/2026 ${pickupTime}`);
  };

  const handleSelectPickupTime = (time) => {
    setPickupTime(time);
    const dayFmt = pickupDay < 10 ? `0${pickupDay}` : pickupDay;
    setPickupDateStr(`09/${dayFmt}/2026 ${time}`);
  };

  // Helper: update Return Date string
  const handleSelectReturnDay = (day) => {
    setReturnDay(day);
    const dayFmt = day < 10 ? `0${day}` : day;
    setReturnDateStr(`09/${dayFmt}/2026 ${returnTime}`);
  };

  const handleSelectReturnTime = (time) => {
    setReturnTime(time);
    const dayFmt = returnDay < 10 ? `0${returnDay}` : returnDay;
    setReturnDateStr(`09/${dayFmt}/2026 ${time}`);
  };

  // Close open popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (pickupPickerRef.current && !pickupPickerRef.current.contains(event.target)) {
        setIsPickupPickerOpen(false);
      }
      if (returnPickerRef.current && !returnPickerRef.current.contains(event.target)) {
        setIsReturnPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const decreaseHours = () => {
    if (hours > 2) setHours(hours - 1);
  };

  const increaseHours = () => {
    if (hours < 12) setHours(hours + 1);
  };

  return (
    <div className="relative z-30 -mb-28 lg:-mb-32 max-w-7xl mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
      <div className="filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
        {/* ─── Top Tabs Container (Attached seamlessly to the card below) ─── */}
        <div className="inline-flex bg-white rounded-t-2xl px-3 pt-3 pb-2 gap-2 relative z-10">
          {/* Car Rental Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('car')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all ${
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

          {/* Airport Rental Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('airport')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all ${
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
        <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 sm:p-8 lg:p-10 relative z-20">
          {activeTab === 'car' ? (
            /* ══════ Car Rental Form ══════ */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
                {/* Field 1: Choose a Car */}
                <div className="relative lg:border-r lg:border-[#f0f0f0] lg:pr-6" ref={dropdownRef}>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/fi_9610434.svg" alt="Car Icon" className="w-4 h-4 object-contain" />
                    <span>Choose a Car <span className="text-red-500">*</span></span>
                  </label>
                  
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between py-1 cursor-pointer transition select-none min-h-[44px]"
                  >
                    {selectedCar ? (
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={selectedCar.image} alt={selectedCar.name} className="h-6 w-10 object-contain" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{selectedCar.name}</p>
                          <p className="text-xs text-gray-400">{selectedCar.seat}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm sm:text-base font-normal text-gray-400">Select Car Type</span>
                    )}
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                      {carsData.map((car) => (
                        <div
                          key={car.id}
                          onClick={() => {
                            setSelectedCar(car);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition"
                        >
                          <div className="flex items-center gap-3">
                            <img src={car.image} alt={car.name} className="h-7 w-12 object-contain" />
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
                <div className="lg:border-r lg:border-[#f0f0f0] lg:pr-6">
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#fdd300] inline-block shadow-sm"></span>
                    <span>Pickup Location <span className="text-red-500">*</span></span>
                  </label>
                  <div className="py-1 min-h-[44px] flex items-center">
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter Pickup Location"
                      className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Field 3: Drop-off Location (hidden in Hourly mode) */}
                {tripType !== 'Hourly' && (
                  <div className="lg:border-r lg:border-[#f0f0f0] lg:pr-6">
                    <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                      <span className="w-3 h-3 rounded-full bg-[#0e52ff] inline-block shadow-sm"></span>
                      <span>Drop-off Location <span className="text-red-500">*</span></span>
                    </label>
                    <div className="py-1 min-h-[44px] flex items-center">
                      <input
                        type="text"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        placeholder="Enter Drop-off Location"
                        className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Field 4 / 3: Pickup Date & Time with Interactive Popup Picker */}
                <div 
                  className={`relative ${tripType === 'Hourly' ? 'lg:border-r lg:border-[#f0f0f0] lg:pr-6' : ''}`}
                  ref={pickupPickerRef}
                >
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
                    <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                  </label>
                  
                  <div 
                    onClick={() => {
                      setIsPickupPickerOpen(!isPickupPickerOpen);
                      setIsReturnPickerOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition flex items-center ${
                      isPickupPickerOpen 
                        ? 'border border-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.15)] bg-white' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="text"
                      readOnly
                      value={pickupDateStr}
                      placeholder="MM/DD/YYYY 00:00 PM"
                      className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
                    />
                  </div>

                  {/* Interactive Calendar Popup for Pickup */}
                  {isPickupPickerOpen && (
                    <CalendarPopup
                      selectedDay={pickupDay}
                      onSelectDay={handleSelectPickupDay}
                      selectedTime={pickupTime}
                      onSelectTime={handleSelectPickupTime}
                      onClose={() => setIsPickupPickerOpen(false)}
                    />
                  )}
                </div>

                {/* Field 4 in Hourly Mode: Select Hours Stepper */}
                {tripType === 'Hourly' && (
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                      <img src="/assets/icon/clock1.png" alt="Clock Icon" className="w-4 h-4 object-contain" />
                      <span>Select Hours <span className="text-red-500">*</span></span>
                    </label>
                    
                    <div className="border border-gray-200 rounded-lg p-1.5 flex items-center justify-between h-[42px] max-w-[280px]">
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

              {/* ── Return Date & Time field (Active when Round Way is selected) ── */}
              {tripType === 'Round Way' && (
                <div className="mt-6 pt-6 border-t border-gray-100 max-w-sm relative" ref={returnPickerRef}>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
                    <span>Return Date & Time <span className="text-red-500">*</span></span>
                  </label>
                  
                  <div 
                    onClick={() => {
                      setIsReturnPickerOpen(!isReturnPickerOpen);
                      setIsPickupPickerOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition flex items-center ${
                      isReturnPickerOpen 
                        ? 'border border-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.15)] bg-white' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="text"
                      readOnly
                      value={returnDateStr}
                      placeholder="MM/DD/YYYY 00:00 PM"
                      className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
                    />
                  </div>

                  {/* Interactive Calendar Popup for Return Date */}
                  {isReturnPickerOpen && (
                    <CalendarPopup
                      selectedDay={returnDay}
                      onSelectDay={handleSelectReturnDay}
                      selectedTime={returnTime}
                      onSelectTime={handleSelectReturnTime}
                      onClose={() => setIsReturnPickerOpen(false)}
                    />
                  )}
                </div>
              )}

              {/* ─── Bottom Row: Radio Options & Continue Button ─── */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {/* One Way Radio */}
                  <button
                    type="button"
                    onClick={() => setTripType('One Way')}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-pointer transition select-none ${
                      tripType === 'One Way'
                        ? 'bg-[#f0f3ff] text-[#0e52ff]'
                        : 'text-[#121212] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      tripType === 'One Way' 
                        ? 'border-[#0e52ff]' 
                        : 'border-gray-300 bg-gray-200'
                    }`}>
                      {tripType === 'One Way' && <div className="w-2 h-2 rounded-full bg-[#0e52ff]" />}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold">One Way</span>
                  </button>

                  {/* Round Way Radio */}
                  <button
                    type="button"
                    onClick={() => setTripType('Round Way')}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-pointer transition select-none ${
                      tripType === 'Round Way'
                        ? 'bg-[#f0f3ff] text-[#0e52ff]'
                        : 'text-[#121212] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      tripType === 'Round Way' 
                        ? 'border-[#0e52ff]' 
                        : 'border-gray-300 bg-gray-200'
                    }`}>
                      {tripType === 'Round Way' && <div className="w-2 h-2 rounded-full bg-[#0e52ff]" />}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold">Round Way</span>
                  </button>

                  {/* Hourly Radio */}
                  <button
                    type="button"
                    onClick={() => setTripType('Hourly')}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-pointer transition select-none ${
                      tripType === 'Hourly'
                        ? 'bg-[#f0f3ff] text-[#0e52ff]'
                        : 'text-[#121212] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      tripType === 'Hourly' 
                        ? 'border-[#0e52ff]' 
                        : 'border-gray-300 bg-gray-200'
                    }`}>
                      {tripType === 'Hourly' && <div className="w-2 h-2 rounded-full bg-[#0e52ff]" />}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold">Hourly</span>
                  </button>
                </div>

                {/* Continue CTA Button */}
                <button 
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Continue</span>
                  <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* ══════ Airport Rental Form ══════ */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
                {/* Field 1: Choose a Car */}
                <div className="relative lg:border-r lg:border-[#f0f0f0] lg:pr-6" ref={dropdownRef}>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/fi_9610434.svg" alt="Car Icon" className="w-4 h-4 object-contain" />
                    <span>Choose a Car <span className="text-red-500">*</span></span>
                  </label>
                  
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between py-1 cursor-pointer transition select-none min-h-[44px]"
                  >
                    {selectedCar ? (
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={selectedCar.image} alt={selectedCar.name} className="h-6 w-10 object-contain" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{selectedCar.name}</p>
                          <p className="text-xs text-gray-400">{selectedCar.seat}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm sm:text-base font-normal text-gray-400">Select Car Type</span>
                    )}
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                      {carsData.map((car) => (
                        <div
                          key={car.id}
                          onClick={() => {
                            setSelectedCar(car);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition"
                        >
                          <div className="flex items-center gap-3">
                            <img src={car.image} alt={car.name} className="h-7 w-12 object-contain" />
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

                {/* Field 2: Select Airport */}
                <div className="lg:border-r lg:border-[#f0f0f0] lg:pr-6">
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#fdd300] inline-block shadow-sm"></span>
                    <span>Airport <span className="text-red-500">*</span></span>
                  </label>
                  <div className="py-1 min-h-[44px] flex items-center">
                    <select
                      value={selectedAirport}
                      onChange={(e) => setSelectedAirport(e.target.value)}
                      className="w-full text-sm font-medium text-gray-800 outline-none bg-transparent cursor-pointer"
                    >
                      {airportsData.map((airport, idx) => (
                        <option key={idx} value={airport.value}>
                          {airport.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 3: Address */}
                <div className="lg:border-r lg:border-[#f0f0f0] lg:pr-6">
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#0e52ff] inline-block shadow-sm"></span>
                    <span>{airportTripType === 'From Airport' ? 'Drop-off Address' : 'Pickup Address'} <span className="text-red-500">*</span></span>
                  </label>
                  <div className="py-1 min-h-[44px] flex items-center">
                    <input
                      type="text"
                      placeholder="Enter Destination Address"
                      className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Field 4: Pickup Date & Time for Airport */}
                <div className="relative" ref={pickupPickerRef}>
                  <label className="flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#121212] mb-3">
                    <img src="/assets/icon/fi_12516022.svg" alt="Calendar Icon" className="w-4 h-4 object-contain" />
                    <span>Pickup Date & Time <span className="text-red-500">*</span></span>
                  </label>
                  <div 
                    onClick={() => setIsPickupPickerOpen(!isPickupPickerOpen)}
                    className="py-1 min-h-[44px] flex items-center cursor-pointer"
                  >
                    <input
                      type="text"
                      readOnly
                      value={pickupDateStr}
                      className="w-full text-sm sm:text-base font-medium text-gray-800 outline-none bg-transparent cursor-pointer"
                    />
                  </div>

                  {isPickupPickerOpen && (
                    <CalendarPopup
                      selectedDay={pickupDay}
                      onSelectDay={handleSelectPickupDay}
                      selectedTime={pickupTime}
                      onSelectTime={handleSelectPickupTime}
                      onClose={() => setIsPickupPickerOpen(false)}
                    />
                  )}
                </div>
              </div>

              {/* Bottom Row for Airport Rental */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setAirportTripType('From Airport')}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-pointer transition select-none ${
                      airportTripType === 'From Airport'
                        ? 'bg-[#f0f3ff] text-[#0e52ff]'
                        : 'text-[#121212] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      airportTripType === 'From Airport' ? 'border-[#0e52ff]' : 'border-gray-300 bg-gray-200'
                    }`}>
                      {airportTripType === 'From Airport' && <div className="w-2 h-2 rounded-full bg-[#0e52ff]" />}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold">From Airport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAirportTripType('From Home')}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl cursor-pointer transition select-none ${
                      airportTripType === 'From Home'
                        ? 'bg-[#f0f3ff] text-[#0e52ff]'
                        : 'text-[#121212] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      airportTripType === 'From Home' ? 'border-[#0e52ff]' : 'border-gray-300 bg-gray-200'
                    }`}>
                      {airportTripType === 'From Home' && <div className="w-2 h-2 rounded-full bg-[#0e52ff]" />}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold">From Home / City</span>
                  </button>
                </div>

                <button 
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-10 py-3.5 rounded-xl transition shadow-md hover:shadow-lg active:scale-95"
                >
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
    </div>
  );
};

export default BookingWidget;
