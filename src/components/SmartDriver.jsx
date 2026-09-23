import React from 'react';
import { DRIVER_APP_LINK } from '../data/index.js';

/**
 * SmartDriver Component
 * 
 * I created this bright banner to recruit drivers:
 * "Be a Smart Driver" - "0% Commission, 100% Freedom"
 * Includes the download CTA button for the Smart Driver App, the driver illustration,
 * and scroll animations matching the live site.
 */
const SmartDriver = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 
          className="text-3xl md:text-5xl font-extrabold text-[#121212] mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Be a Smart Driver
        </h2>
        
        {/* Yellow Promo Banner Card */}
        <div 
          className="bg-[#fdd300] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center relative shadow-md"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Left Text & CTA Button */}
          <div className="p-8 sm:p-12 lg:p-16 md:w-1/2 w-full flex flex-col items-start z-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] leading-[1.15]">
              0% Commission<br />
              100% Freedom
            </h3>
            
            <a 
              href={DRIVER_APP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-4 rounded-xl transition shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Download Smart Driver App</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Right Image: Driver Holding Mobile Phone with zoom-in entrance */}
          <div 
            className="md:w-1/2 w-full flex justify-center md:justify-end items-end pr-0 md:pr-12 pt-6 md:pt-10"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img 
              src="/assets/images/app-screen/no_commission_app_screen.png" 
              alt="Garibook Smart Driver" 
              className="max-h-[380px] lg:max-h-[440px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDriver;
