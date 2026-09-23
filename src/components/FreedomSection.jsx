import React from 'react';
import { freedomFeatures } from '../data/index.js';

/**
 * FreedomSection Component
 * 
 * I created this high-contrast dark section to present Garibook's core values:
 * 1. Choosing the Car
 * 2. Choosing the Driver
 * 3. Choosing the Fare
 * Includes scroll entrance animations with zoom-in for the panorama photo and fade-up for feature boxes.
 */
const FreedomSection = () => {
  return (
    <section className="bg-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered Section Heading */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Freedom in Every Journey
          </h2>
        </div>
        
        {/* Large Panorama Image with zoom-in scroll effect */}
        <div 
          className="w-full overflow-hidden rounded-3xl shadow-2xl" 
          data-aos="zoom-in" 
          data-aos-delay="200"
        >
          <img 
            src="/assets/images/banner/garibook_freedom.webp" 
            alt="Freedom in Every Journey" 
            className="w-full object-cover max-h-[520px] transition-transform duration-700 hover:scale-105" 
          />
        </div>

        {/* 3 Feature Columns with staggered fade-up effects */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {freedomFeatures?.map((feature, index) => {
            const aosDelay = (index + 1) * 200; // 200ms, 400ms, 600ms
            return (
              <div 
                key={index} 
                className="freedom-card flex flex-col items-center text-center px-4"
                data-aos="fade-up"
                data-aos-delay={aosDelay}
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center p-3 mb-4">
                  <img src={feature.icon} alt={feature.title} className="h-10 w-10 object-contain" />
                </div>
                <h4 className="text-white font-bold text-xl lg:text-2xl mt-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm lg:text-base mt-2 max-w-xs">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;
