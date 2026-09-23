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
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold max-w-lg">
          Freedom in Every Journey
        </h2>
        
        <div className="mt-12">
          <img 
            src="/assets/images/banner/garibook_freedom.webp" 
            alt="Garibook Freedom" 
            className="w-full rounded-2xl object-cover max-h-[500px]" 
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 justify-end">
          {freedomFeatures?.map((feature, index) => (
            <div key={index} className="freedom-card flex flex-col items-start md:items-end md:text-right">
              <img src={feature.icon} alt={feature.title} className="h-12 w-12 object-contain" />
              <h4 className="text-white font-semibold text-lg mt-4">{feature.title}</h4>
              <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;
