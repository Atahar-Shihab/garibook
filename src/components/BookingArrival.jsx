import React from 'react';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

/**
 * BookingArrival Component
 * 
 * I created this bento-grid section to show users how seamless Garibook is:
 * "From Booking to Arrival It’s All in Your Hands"
 * Features 5 bento-grid feature preview cards with interactive hover zooms and AOS scroll effects.
 */
const BookingArrival = () => {
  return (
    <section className="bg-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row: Title & Download App Button with scroll entrance */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <h2 
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-xl leading-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            From Booking to Arrival It’s All in Your Hands
          </h2>
          <div data-aos="fade-up" data-aos-delay="200">
            <a 
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow active:scale-95"
            >
              <span>Download App</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* 5-Card Bento Grid with scroll animations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Top Row: Explore Ride Services (7 cols) + Freedom Banner (5 cols) */}
          <div 
            className="ba-image md:col-span-7 rounded-2xl overflow-hidden h-72 lg:h-80 shadow-lg bg-gray-900"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img 
              src="/assets/images/services/explore.jpeg" 
              alt="Explore Ride Services" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div 
            className="ba-image md:col-span-5 rounded-2xl overflow-hidden h-72 lg:h-80 shadow-lg bg-gray-900"
            data-aos="flip-right"
            data-aos-delay="400"
          >
            <img 
              src="/assets/images/services/freedom.jpg" 
              alt="Freedom" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Bottom Row: Safe Travel (4 cols) + Preferred Car (4 cols) + Smooth Experience (4 cols) */}
          <div 
            className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img 
              src="/assets/images/services/safe_travel.svg" 
              alt="Safe Travel" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div 
            className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img 
              src="/assets/images/services/prefarred_car.jpg" 
              alt="Choose Preferred Car" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div 
            className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img 
              src="/assets/images/services/smooth.jpg" 
              alt="Smooth Experience" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingArrival;
