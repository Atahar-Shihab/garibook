import React, { useState } from 'react';
import { rideServices } from '../data/index.js';

/**
 * Services Component
 * 
 * I created this component to showcase all the transportation solutions Garibook provides.
 * Key behaviors:
 * 1. The first card ("Intercity Car Rental") is auto-selected by default on load.
 * 2. When hovering over another card, that card becomes active.
 * 3. As soon as the cursor leaves the cards container, it automatically reverts back to the first card!
 * 4. Filter tabs to switch between Rides, Garibook Business, Garibook Club, and VMS.
 */
const Services = () => {
  // Category tabs
  const [activeServiceTab, setActiveServiceTab] = useState('Rides');
  
  // I default to 0 so the first card is always selected initially
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const tabs = ['Rides', 'Garibook Business', 'Garibook Club', 'VMS'];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-10" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#121212]">
            Our Services
          </h2>
          
          {/* Tab Filter Pills */}
          <div className="flex flex-wrap gap-3 mt-6" data-aos="fade-up" data-aos-delay="200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveServiceTab(tab)}
                className={`px-7 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeServiceTab === tab
                    ? 'bg-[#0e52ff] text-white shadow-md'
                    : 'bg-[#eaedf2] text-[#121212] hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Rides */}
        {activeServiceTab === 'Rides' && (
          <div className="mt-12">
            <h3 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] mb-12 leading-tight"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Every Ride <br /> One Platform
            </h3>

            {/* 4 Service Cards Grid: On mouse leave, automatically reverts back to card 0 */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              onMouseLeave={() => setActiveCardIndex(0)}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {rideServices.map((service, index) => {
                const isActive = activeCardIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveCardIndex(index)}
                    onMouseEnter={() => setActiveCardIndex(index)}
                    className={`box-item-wrap-one ${isActive ? 'active' : ''}`}
                  >
                    {/* Vehicle illustration with sliding white tab backdrop */}
                    <div className="box-iwo-img">
                      <img src={service.icon} alt={service.title} className="h-16 w-auto object-contain" />
                    </div>
                    
                    <div className="box-iwo-text mt-2">
                      <h5 className="text-xl lg:text-2xl font-bold text-[#121212] mb-3">
                        {service.title}
                      </h5>
                      <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Garibook Business */}
        {activeServiceTab === 'Garibook Business' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Modern Car Rentals <br /> for Business
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Simplify your corporate transportation, ensure on-time team mobility, and gain control with our VMS.
              </p>
              <div className="mt-8">
                <a
                  href="/business"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/assets/images/services/busines.jpeg"
                alt="Garibook Business"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Garibook Club */}
        {activeServiceTab === 'Garibook Club' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Turn Your Car into Earnings with Garibook Club
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Garibook Club is more than just a community. Join a vibrant network of car enthusiasts, all fueled by the same passion: the open road and the thrill of making money doing what they love.
              </p>
              <div className="mt-8">
                <a
                  href="/club"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/assets/images/services/garibook_club.jpg"
                alt="Garibook Club"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 4: VMS */}
        {activeServiceTab === 'VMS' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Vehicle Management System - VMS
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Just like Garibook Business makes traveling easy for your team, our Vehicle Management System (VMS) helps you take care of your own cars. VMS is a great tool that works with Garibook Business to make sure your vehicles are used the best way possible.
              </p>
              <div className="mt-8">
                <a
                  href="/vehicle-management-system"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/assets/images/vms/Frame_1000001473.png"
                alt="Vehicle Management System"
                className="w-full h-auto object-contain rounded-3xl shadow-lg bg-gray-50 p-4"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
