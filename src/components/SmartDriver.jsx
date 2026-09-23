import React from 'react';
import { DRIVER_APP_LINK } from '../data/index.js';

const SmartDriver = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold">Be a Smart Driver</h2>
        
        <div className="bg-[#fec200] rounded-2xl overflow-hidden mt-8 flex flex-col md:flex-row items-center relative">
          <div className="p-8 md:p-12 md:w-1/2 w-full flex flex-col items-start z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              0% Commission<br />
              100% Freedom
            </h3>
            <a 
              href={DRIVER_APP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-[#0f2647] text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 hover:bg-[#0f2647]/90 transition"
            >
              Download Smart Driver App
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="md:w-1/2 w-full flex justify-center md:justify-end items-end pt-8 md:pt-0">
            <img 
              src="/assets/images/app-screen/no_commission_app_screen.png" 
              alt="Smart Driver App mockup" 
              className="max-w-[200px] md:max-w-sm h-auto translate-y-4 md:translate-y-8 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDriver;
