import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsData } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * StatsCounter Component
 * 
 * I built this section with:
 * 1. An animated counter using GSAP that smoothly counts up to numbers like 300,000+
 * 2. An infinite scrolling city skyline background (moveCity keyframe animation)
 * 3. An animated sedan GIF driving across the lower city strip
 * 4. Scroll animations (AOS) for the title and stat counter items
 */
const StatsCounter = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  // I use GSAP ScrollTrigger to count the numbers up from 0 when this section scrolls into view
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
    <div
      ref={sectionRef}
      className="relative overflow-hidden pt-44 lg:pt-52 pb-36 lg:pb-44"
      style={{
        background: 'linear-gradient(270deg, #0e53ff, #0038c4)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <h2 
          className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl leading-tight"
          data-aos="fade-up"
        >
          From Everyday Rides to Meaningful Journeys
        </h2>

        {/* 4 Stats horizontal items with staggered zoom-in animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mt-16 lg:mt-24">
          {statsData.map((stat, index) => {
            const aosDelay = (index + 1) * 200; // 200ms, 400ms, 600ms, 800ms
            return (
              <div 
                key={index} 
                className="flex flex-col"
                data-aos="zoom-in"
                data-aos-delay={aosDelay}
              >
                <div className="flex items-baseline">
                  <span
                    ref={(el) => (numberRefs.current[index] = el)}
                    className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                  >
                    0
                  </span>
                  <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold ml-1">
                    +
                  </span>
                </div>
                <span className="text-white/90 text-sm sm:text-base font-semibold mt-2">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Animated City Skyline Background ── */}
      <div 
        className="absolute bottom-0 left-0 w-[400%] h-[78px] pointer-events-none z-10"
        style={{
          backgroundImage: 'url(/assets/images/frame_1.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          animation: 'moveCity 30s linear infinite',
        }}
      />

      {/* ── Animated Sedan GIF Driving on Road ── */}
      <div className="absolute left-6 md:left-14 bottom-[-10px] z-20 w-[180px] md:w-[234px] h-[85px] md:h-[109px] pointer-events-none">
        <img
          src="/assets/images/Sedan_GiF.gif"
          alt="Driving Car"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default StatsCounter;
