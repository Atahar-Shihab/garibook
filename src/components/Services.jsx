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
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
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
    <section ref={sectionRef} className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#121212]">
            Our Services
          </h2>
          
          {/* Tab Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveServiceTab(tab)}
                className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all ${
                  activeServiceTab === tab
                    ? 'bg-[#121212] text-white shadow-md'
                    : 'bg-[#f3f4f6] text-[#4b5563] hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Rides */}
        {activeServiceTab === 'Rides' && (
          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] mb-10">
              Every Ride <br className="hidden sm:inline" /> One Platform
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rideServices.map((service, index) => (
                <div
                  key={index}
                  className={`service-card bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl ${
                    index === 0 ? 'border-l-4 border-l-[#fdd300] border-gray-100 shadow-sm' : 'border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="h-16 flex items-center">
                    <img src={service.icon} alt={service.title} className="h-12 w-auto object-contain" />
                  </div>
                  <h4 className="text-lg font-bold text-[#121212] mt-6">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2.5">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Garibook Business */}
        {activeServiceTab === 'Garibook Business' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Modern Car Rentals <br /> for Business
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Simplify your corporate transportation, ensure on-time team mobility, and gain control with our VMS.
              </p>
              <div className="mt-8">
                <a
                  href="/business"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <img
                src="/assets/images/services/busines.jpeg"
                alt="Garibook Business"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Garibook Club */}
        {activeServiceTab === 'Garibook Club' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Turn Your Car into Earnings with Garibook Club
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Garibook Club is more than just a community. Join a vibrant network of car enthusiasts, all fueled by the same passion: the open road and the thrill of making money doing what they love.
              </p>
              <div className="mt-8">
                <a
                  href="/club"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <img
                src="/assets/images/services/garibook_club.jpg"
                alt="Garibook Club"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 4: VMS */}
        {activeServiceTab === 'VMS' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] leading-tight">
                Vehicle Management System - VMS
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-5 leading-relaxed">
                Just like Garibook Business makes traveling easy for your team, our Vehicle Management System (VMS) helps you take care of your own cars. VMS is a great tool that works with Garibook Business to make sure your vehicles are used the best way possible.
              </p>
              <div className="mt-8">
                <a
                  href="/vehicle-management-system"
                  className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-base px-8 py-3.5 rounded-xl transition shadow"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <img
                src="/assets/images/vms/Frame_1000001473.png"
                alt="Vehicle Management System"
                className="w-full h-auto object-contain rounded-3xl shadow-lg bg-gray-50 p-4"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
