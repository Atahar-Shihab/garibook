import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rideServices } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [activeServiceTab, setActiveServiceTab] = useState('Rides');
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeServiceTab]);

  const tabs = ['Rides', 'Garibook Business', 'Garibook Club', 'VMS'];

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Services</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveServiceTab(tab)}
              className={`rounded-full px-6 py-2 transition-colors duration-200 ${
                activeServiceTab === tab 
                  ? 'bg-[#0f2647] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {activeServiceTab === 'Rides' && (
            <div>
              <h3 className="text-3xl font-bold mb-10">Every Ride<br/>One Platform</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rideServices?.map((service, index) => (
                  <div 
                    key={index} 
                    className={`service-card bg-white rounded-xl p-6 border hover:shadow-lg transition ${index === 0 ? 'border-l-4 border-[#fec200]' : ''}`}
                  >
                    <img src={service.icon} alt={service.title} className="h-[72px] object-contain" />
                    <h5 className="font-semibold mt-4">{service.title}</h5>
                    <p className="text-gray-500 text-sm mt-2">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeServiceTab === 'Garibook Business' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Modern Car Rentals for Business</h3>
                <p className="text-gray-600 mb-8">Simplify your corporate transportation, ensure on-time team mobility, and gain control with our VMS.</p>
                <button className="bg-[#0f2647] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">Learn More</button>
              </div>
              <div>
                <img src="/assets/images/services/busines.jpeg" alt="Garibook Business" className="rounded-2xl object-cover w-full h-auto shadow-md" />
              </div>
            </div>
          )}

          {activeServiceTab === 'Garibook Club' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Turn Your Car into Earnings with Garibook Club</h3>
                <p className="text-gray-600 mb-8">Join Garibook Club and monetize your vehicle. Enjoy flexible schedules and transparent earnings.</p>
                <button className="bg-[#0f2647] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">Learn More</button>
              </div>
              <div>
                <img src="/assets/images/services/garibook_club.jpg" alt="Garibook Club" className="rounded-2xl object-cover w-full h-auto shadow-md" />
              </div>
            </div>
          )}

          {activeServiceTab === 'VMS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Vehicle Management System - VMS</h3>
                <p className="text-gray-600 mb-8">Efficiently manage your fleet with our advanced Vehicle Management System. Track, optimize, and scale your operations.</p>
                <button className="bg-[#0f2647] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">Learn More</button>
              </div>
              <div>
                <img src="/assets/images/vms/Frame_1000001473.png" alt="VMS" className="rounded-2xl object-cover w-full h-auto shadow-md" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
