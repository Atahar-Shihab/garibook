import React, { useState, useEffect } from 'react';
import { newsroomData } from '../data/index.js';

/**
 * NewsroomSlider Component
 * 
 * I created this component to display Garibook's media coverage with an infinite looping slider:
 * "We Featured by Top news Platforms" (Dhaka Tribune, Prothom Alo, Kaler Kantho, Tech In Asia, Ittefaq)
 * 
 * Features:
 * 1. Infinite looping carousel: clicking next or prev cycles through all articles infinitely
 * 2. Responsive display: 3 cards on desktop, 2 on tablet, 1 on mobile
 * 3. Exact typography, dates, descriptions, brand logos, and Read Article links
 * 4. Active arrow states with dark background on click/hover matching the real site
 */
const NewsroomSlider = () => {
  const total = newsroomData.length;
  // I duplicate the data array 3 times to create a truly seamless infinite loop
  const extendedData = [...newsroomData, ...newsroomData, ...newsroomData];
  
  // Start in the middle set of cards so user can scroll left or right immediately
  const [currentIndex, setCurrentIndex] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeBtn, setActiveBtn] = useState('next'); // track which button was clicked

  // Responsive cards per view (3 on desktop, 2 on tablet, 1 on mobile)
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When transition ends, seamlessly jump back to the center set if we reached either boundary
  const handleTransitionEnd = () => {
    if (currentIndex >= total * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - total);
    } else if (currentIndex < total) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + total);
    }
  };

  // Re-enable CSS transition after instantaneous boundary jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    setActiveBtn('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveBtn('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Calculate slide offset percentage
  const slideWidthPercent = 100 / cardsPerView;
  const translateX = -(currentIndex * slideWidthPercent);

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row with Title & Arrow Buttons */}
        <div className="flex justify-between items-end mb-10" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] max-w-xl leading-tight">
            We Featured by Top news <br className="hidden sm:inline" /> Platforms
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={handlePrev}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
                activeBtn === 'prev' 
                  ? 'bg-[#121212] text-white border-[#121212]' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              aria-label="Previous News"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={handleNext}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
                activeBtn === 'next' 
                  ? 'bg-[#121212] text-white border-[#121212]' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              aria-label="Next News"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Looping Slider Container ─── */}
        <div className="overflow-hidden -mx-3">
          <div 
            className="flex"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isTransitioning ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedData.map((item, index) => {
              return (
                <div 
                  key={`${item.id}-${index}`}
                  style={{
                    flex: `0 0 ${slideWidthPercent}%`,
                    maxWidth: `${slideWidthPercent}%`,
                    padding: '0 12px',
                    boxSizing: 'border-box'
                  }}
                  className="shrink-0 flex flex-col"
                >
                  <div className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    {/* News Article Cover Image */}
                    <div className="h-52 w-full overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Article Details */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Publication Date */}
                        <span className="text-xs text-gray-400 font-medium">
                          {item.date}
                        </span>

                        {/* Article Title */}
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2 line-clamp-2 leading-snug min-h-[50px]">
                          {item.title}
                        </h3>

                        {/* Article Summary Description */}
                        <p className="text-xs sm:text-[13px] text-gray-500 mt-2 line-clamp-2 leading-relaxed min-h-[38px]">
                          {item.desc}
                        </p>
                      </div>

                      {/* Brand Logo & Read Article Link */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
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
                          className="text-[#0e52ff] hover:text-[#0038c4] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition"
                        >
                          <span>Read Article</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
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
