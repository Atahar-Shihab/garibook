import React from 'react';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

/**
 * DownloadApp Component
 * 
 * I created this banner to invite users to install the mobile apps:
 * "Download Garibook Mobile App - Download our Customer, Smart Driver and Enterprise App"
 * Includes the yellow CTA button, the 3D phone held in hand that floats out over the top border,
 * and AOS flip-right entrance animation matching the live site.
 */
const DownloadApp = () => {
  return (
    <section className="bg-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        {/* Blue Gradient Banner Card */}
        <div 
          className="rounded-3xl relative overflow-visible flex flex-col md:flex-row min-h-[380px] shadow-xl"
          style={{
            background: 'linear-gradient(270deg, #0e53ff, #0038c4)',
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Left Text & CTA Button */}
          <div className="p-8 sm:p-12 lg:p-16 md:w-3/5 w-full flex flex-col justify-center relative z-10">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Download <br /> Garibook Mobile App
            </h2>
            <p className="text-white/90 mt-4 text-base sm:text-lg font-medium max-w-md">
              Download our Customer, Smart Driver and Enterprise App
            </p>
            
            <div className="mt-8">
              <a 
                href={APP_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#fdd300] hover:bg-[#e6c003] text-[#121212] font-bold text-base px-8 py-4 rounded-xl transition shadow-md hover:scale-[1.02] active:scale-95"
              >
                <span>Download App</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Floating Smartphone Mockup with flip-right animation */}
          <div 
            className="hidden md:block absolute right-4 lg:right-12 -top-12 lg:-top-16 bottom-0 w-2/5 pointer-events-none z-20"
            data-aos="flip-right"
            data-aos-delay="400"
          >
            <div className="relative w-full h-full flex justify-end items-end">
              <img 
                src="/assets/images/app-screen/app-with-logo.png" 
                alt="Garibook App on Mobile" 
                className="max-w-xs lg:max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
