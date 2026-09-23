import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { peopleCards } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const PeopleTogether = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.people-card', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl text-[#121212]">
          More Than Miles —<br />We Bring People Together
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {peopleCards?.map((card, index) => (
            <div key={index} className="people-card relative rounded-2xl overflow-hidden aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10 h-1/3 pointer-events-none"></div>
              <h3 className="absolute top-0 left-0 p-6 text-white text-xl font-bold z-20">
                {card.title}
              </h3>
              <img 
                src={card.image} 
                alt={card.title} 
                className="object-cover w-full h-full relative z-0" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleTogether;
