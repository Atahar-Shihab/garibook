import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DRIVER_APP_LINK } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmartDriver Component
 * 
 * Promotional section inviting drivers to join Garibook.
 * Uses GSAP ScrollTrigger to smoothly slide up when scrolled into view.
 */
const SmartDriver = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Smooth scroll-reveal effect when this section enters the screen
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#121212] mb-10">
          Be a Smart Driver
        </h2>
        
        {/* Yellow Promo Banner Card */}
        <div 
          ref={cardRef}
          className="bg-[#fdd300] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center relative shadow-md"
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
          
          {/* Right Image: Driver Holding Mobile Phone */}
          <div className="md:w-1/2 w-full flex justify-center md:justify-end items-end pr-0 md:pr-12 pt-6 md:pt-10">
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
