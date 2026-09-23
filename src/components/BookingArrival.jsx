import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_DOWNLOAD_LINK } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const BookingArrival = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.ba-image', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-white text-3xl md:text-4xl font-bold max-w-lg">
            From Booking to Arrival — It's All in Your Hands
          </h2>
          <a 
            href={APP_DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0f2647] text-white rounded-lg px-6 py-3 font-semibold hover:bg-opacity-90 transition"
          >
            Download App
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="ba-image sm:col-span-2 rounded-xl overflow-hidden h-64">
              <img src="/assets/images/banner/explore.jpeg" alt="Explore" className="object-cover w-full h-full" />
            </div>
            <div className="ba-image sm:col-span-1 rounded-xl overflow-hidden h-64">
              <img src="/assets/images/banner/freedom.jpg" alt="Freedom" className="object-cover w-full h-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="ba-image rounded-xl overflow-hidden h-48">
              <img src="/assets/images/banner/safe_travel.svg" alt="Safe Travel" className="object-cover w-full h-full" />
            </div>
            <div className="ba-image rounded-xl overflow-hidden h-48">
              <img src="/assets/images/banner/prefarred_car.jpg" alt="Preferred Car" className="object-cover w-full h-full" />
            </div>
            <div className="ba-image rounded-xl overflow-hidden h-48">
              <img src="/assets/images/banner/smooth.jpg" alt="Smooth Journey" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingArrival;
