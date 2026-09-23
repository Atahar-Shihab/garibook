import React from 'react';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

const DownloadApp = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#0f2647] rounded-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[300px]">
          
          <div className="p-8 md:p-12 md:w-1/2 lg:w-3/5 w-full flex flex-col justify-center relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              Download<br />
              Garibook Mobile App
            </h2>
            <p className="text-white/70 mt-4 text-lg">
              Download our Customer, Smart Driver and Enterprise App
            </p>
            
            <a 
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-[#fec200] text-black font-semibold rounded-lg px-6 py-3 w-max flex items-center gap-2 hover:bg-[#fec200]/90 transition"
            >
              Get the App
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </div>

          <div className="absolute right-0 bottom-0 hidden md:block w-1/2 lg:w-2/5 h-full">
            <div className="relative w-full h-full flex justify-end items-end pr-8 lg:pr-16">
              <img 
                src="/assets/images/app-screen/app-with-logo.png" 
                alt="Garibook App on Mobile" 
                className="max-w-xs lg:max-w-md h-auto object-contain translate-y-8"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
