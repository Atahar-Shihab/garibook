import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { freedomFeatures } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const FreedomSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.freedom-card', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Freedom in Every Journey
          </h2>
        </div>
        
        {/* Large Panorama Image */}
        <div className="w-full overflow-hidden rounded-3xl shadow-2xl">
          <img 
            src="/assets/images/banner/garibook_freedom.webp" 
            alt="Freedom in Every Journey" 
            className="w-full object-cover max-h-[520px] transition-transform duration-700 hover:scale-105" 
          />
        </div>

        {/* 3 Feature Columns */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {freedomFeatures?.map((feature, index) => (
            <div key={index} className="freedom-card flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center p-3 mb-4">
                <img src={feature.icon} alt={feature.title} className="h-10 w-10 object-contain" />
              </div>
              <h4 className="text-white font-bold text-xl lg:text-2xl mt-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm lg:text-base mt-2 max-w-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;
