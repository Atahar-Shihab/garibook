import React from 'react';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

const DownloadApp = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="rounded-3xl relative overflow-hidden flex flex-col md:flex-row min-h-[380px] shadow-xl"
          style={{
            background: 'linear-gradient(270deg, #0e53ff, #0038c4)',
          }}
        >
          {/* Left Text Content */}
          <div className="p-8 sm:p-12 lg:p-16 md:w-1/2 lg:w-3/5 w-full flex flex-col justify-center relative z-10">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Download <br /> Garibook Mobile App
            </h2>
            <p className="text-white/85 mt-4 text-base sm:text-lg font-medium max-w-md">
              Download our Customer, Smart Driver and Enterprise App
            </p>
            
            <div className="mt-8">
              <a 
                href={APP_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#fdd300] hover:bg-[#e6c003] text-[#121212] font-bold text-base px-8 py-4 rounded-xl transition shadow-md hover:scale-[1.02]"
              >
                <span>Download App</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="absolute right-0 bottom-0 hidden md:block w-1/2 lg:w-2/5 h-full pointer-events-none">
            <div className="relative w-full h-full flex justify-end items-end pr-8 lg:pr-14">
              <img 
                src="/assets/images/app-screen/app-with-logo.png" 
                alt="Garibook App on Mobile" 
                className="max-w-xs lg:max-w-sm h-auto object-contain translate-y-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
