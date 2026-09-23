import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * DownloadApp Component
 * 
 * Promotional banner for the Garibook Mobile App.
 * Matches Image 4 with:
 * 1. Royal blue gradient background
 * 2. Floating 3D smartphone mockup that extends above the card
 * 3. GSAP scroll-triggered entrance effect
 */
const DownloadApp = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Smooth fade & slide effect when user scrolls to this section
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
    <section ref={sectionRef} className="bg-white pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        {/* Blue Gradient Banner Card */}
        <div 
          ref={cardRef}
          className="rounded-3xl relative overflow-visible flex flex-col md:flex-row min-h-[380px] shadow-xl"
          style={{
            background: 'linear-gradient(270deg, #0e53ff, #0038c4)',
          }}
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

          {/* Right Floating Smartphone Mockup (Overlaps top border matching Image 4) */}
          <div className="hidden md:block absolute right-4 lg:right-12 -top-12 lg:-top-16 bottom-0 w-2/5 pointer-events-none z-20">
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
