import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * BookingArrival Component
 * 
 * Bento-style grid section showcasing the convenience of booking through Garibook.
 * Uses GSAP ScrollTrigger to smoothly stagger the 5 cards into view when scrolling down.
 */
const BookingArrival = () => {
  const sectionRef = useRef(null);

  // Stagger animation: each card lifts up slightly as user scrolls down to this section
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.ba-image', {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
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
    <section ref={sectionRef} className="bg-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row: Title & Download App Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-xl leading-tight">
            From Booking to Arrival It’s All in Your Hands
          </h2>
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

        {/* 5-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Top Row: Explore Ride Services (7 cols) + Freedom Banner (5 cols) */}
          <div className="ba-image md:col-span-7 rounded-2xl overflow-hidden h-72 lg:h-80 shadow-lg bg-gray-900">
            <img 
              src="/assets/images/services/explore.jpeg" 
              alt="Explore Ride Services" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="ba-image md:col-span-5 rounded-2xl overflow-hidden h-72 lg:h-80 shadow-lg bg-gray-900">
            <img 
              src="/assets/images/services/freedom.jpg" 
              alt="Freedom" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Bottom Row: Safe Travel (4 cols) + Preferred Car (4 cols) + Smooth Experience (4 cols) */}
          <div className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900">
            <img 
              src="/assets/images/services/safe_travel.svg" 
              alt="Safe Travel" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900">
            <img 
              src="/assets/images/services/prefarred_car.jpg" 
              alt="Choose Preferred Car" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="ba-image md:col-span-4 rounded-2xl overflow-hidden h-64 lg:h-72 shadow-lg bg-gray-900">
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
