import React, { useRef } from 'react';
import { newsroomData } from '../data/index.js';

const NewsroomSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-bold max-w-lg leading-tight text-[#0f2647]">
            We Featured by Top news Platforms
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition focus:outline-none"
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition focus:outline-none"
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden relative">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-snap-x-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>{`
              .scroll-snap-x-mandatory::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {newsroomData && newsroomData.map((item, index) => (
              <div 
                key={index}
                className="min-w-[300px] md:min-w-[350px] scroll-snap-start rounded-xl overflow-hidden border bg-white hover:shadow-lg transition flex flex-col"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  {item.logo && (
                    <img 
                      src={item.logo} 
                      alt="Brand Logo" 
                      className="h-8 object-contain object-left mb-2"
                    />
                  )}
                  <h3 className="text-sm font-medium text-gray-700 mt-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <a 
                    href={item.link || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-4 text-[#0f2647] text-sm font-semibold inline-flex items-center"
                  >
                    Read More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsroomSlider;
