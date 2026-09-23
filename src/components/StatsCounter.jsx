import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsData } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const StatsCounter = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      statsData.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (el) {
          const target = stat.value;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
            onUpdate: () => {
              const val = Math.floor(obj.val);
              el.innerText = val >= 1000 ? val.toLocaleString() : val.toString();
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-gb-primary to-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
          From Everyday Rides to Meaningful Journeys
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {statsData.map((stat, index) => (
            <div key={stat.id || index} className="flex flex-col">
              <div className="flex items-baseline">
                <span 
                  ref={el => numberRefs.current[index] = el}
                  className="text-gb-yellow text-3xl md:text-4xl font-bold"
                >
                  0
                </span>
                <span className="text-gb-yellow text-3xl md:text-4xl font-bold ml-1">+</span>
              </div>
              <span className="text-white text-sm md:text-base mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
