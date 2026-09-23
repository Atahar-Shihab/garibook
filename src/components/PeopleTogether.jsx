import React from 'react';
import { peopleCards } from '../data/index.js';

/**
 * PeopleTogether Component
 * 
 * I created this section to highlight the human connection of travel:
 * "More Than Miles — We Bring People Together"
 * It displays 3 portrait cards featuring real passenger moments with dark top gradients for text legibility.
 * Uses staggered fade-up scroll animations matching the live site.
 */
const PeopleTogether = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading with scroll animation */}
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold max-w-2xl text-[#121212] leading-tight"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          More Than Miles —<br />We Bring People Together
        </h2>
        
        {/* 3 Photo Cards with staggered entrance delays (200ms, 300ms, 400ms) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {peopleCards?.map((card, index) => {
            const aosDelay = 200 + index * 100;
            return (
              <div 
                key={index} 
                className="people-card relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md group hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={aosDelay}
              >
                {/* Subtle dark gradient overlay so white headline text is easy to read */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10 h-1/2 pointer-events-none"></div>
                
                <h3 className="absolute top-0 left-0 p-6 text-white text-xl sm:text-2xl font-bold z-20">
                  {card.title}
                </h3>
                
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="object-cover w-full h-full relative z-0 transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PeopleTogether;
