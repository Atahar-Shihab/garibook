import React, { useRef } from 'react';
import { newsroomData } from '../data/index.js';

/**
 * NewsroomSlider Component
 * 
 * I created this news slider to display Garibook's media coverage:
 * "We Featured by Top news Platforms" (Dhaka Tribune, Prothom Alo, Kaler Kantho, etc.)
 * Includes left/right navigation arrows, horizontal smooth scrolling, and scroll animations.
 */
const NewsroomSlider = () => {
  const sliderRef = useRef(null);

  // I use this function to smoothly scroll the articles left or right when clicking the arrows
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row with Navigation Arrows */}
        <div className="flex justify-between items-end mb-10" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] max-w-xl">
            We Featured by Top news Platforms
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition active:scale-95 shadow-sm"
              aria-label="Previous News"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition active:scale-95 shadow-sm"
              aria-label="Next News"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Slider List */}
        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {newsroomData && newsroomData.map((item, index) => {
              const aosDelay = 100 + (index % 4) * 100;
              return (
                <div 
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={aosDelay}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* News Article Cover Image */}
                  <div className="h-52 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Article Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>

                    <h3 className="text-base font-bold text-gray-900 mt-2 line-clamp-2 leading-snug min-h-[44px]">
                      {item.title}
                    </h3>

                    {/* Brand Logo & Read Article Link */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      {item.brandImage ? (
                        <img 
                          src={item.brandImage} 
                          alt="News Brand" 
                          className="h-7 max-w-[120px] object-contain object-left"
                        />
                      ) : <div />}

                      <a 
                        href={item.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0e52ff] hover:text-[#0038c4] text-sm font-bold inline-flex items-center gap-1.5 transition"
                      >
                        <span>Read Article</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsroomSlider;
