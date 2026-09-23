import React, { useState, useEffect } from 'react';
import { passengerReviews } from '../data/index.js';

// I wrote this helper to extract standard 11-character YouTube video IDs from links
const getYoutubeVideoId = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

/**
 * PassengerReviews Component
 * 
 * I created this component to show video testimonials from real passengers with an infinite looping carousel:
 * "Our Passengers Speak For Us"
 * 
 * Features:
 * 1. Infinite looping slider on Next/Prev clicks
 * 2. Click-to-play popup modal with responsive 16:9 YouTube iframe
 * 3. Responsive card count (3 on desktop, 2 on tablet, 1 on mobile)
 * 4. Staggered fade-up scroll animations
 */
const PassengerReviews = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeBtn, setActiveBtn] = useState('next');

  const total = passengerReviews.length;
  // I duplicate the items 3 times to allow seamless, infinite looping in both directions
  const extendedData = [...passengerReviews, ...passengerReviews, ...passengerReviews];

  const [currentIndex, setCurrentIndex] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(true);

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

  // When transition ends, seamlessly jump back to the center set if we reached either edge
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

  const openVideo = (url) => {
    const videoId = getYoutubeVideoId(url);
    if (videoId) setSelectedVideo(videoId);
  };

  const closeVideo = () => setSelectedVideo(null);

  // Calculate slide offset percentage
  const slideWidthPercent = 100 / cardsPerView;
  const translateX = -(currentIndex * slideWidthPercent);

  return (
    <section className="bg-[#f8f9fa] py-16 lg:py-24 overflow-hidden" data-aos="fade-up" data-aos-delay="50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] max-w-xl">
              Our Passengers Speak For Us
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
              Our journey was seamless and enjoyable from start to finish. The booking process was straightforward, and the staff were incredibly attentive, ensuring we felt comfortable throughout the trip.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={handlePrev}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
                activeBtn === 'prev' 
                  ? 'bg-[#121212] text-white border-[#121212]' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              aria-label="Previous Reviews"
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
              aria-label="Next Reviews"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Video Cards Looping Slider Track ─── */}
        <div className="overflow-hidden -mx-3">
          <div 
            className="flex"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isTransitioning ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedData.map((review, index) => {
              const videoId = getYoutubeVideoId(review.url);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              
              return (
                <div 
                  key={`${review.id}-${index}`}
                  style={{
                    flex: `0 0 ${slideWidthPercent}%`,
                    maxWidth: `${slideWidthPercent}%`,
                    padding: '0 12px',
                    boxSizing: 'border-box'
                  }}
                  className="shrink-0 flex flex-col"
                >
                  <div 
                    onClick={() => openVideo(review.url)}
                    className="h-full rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col border border-gray-100"
                  >
                    {/* Video Thumbnail with Play Badge */}
                    <div className="relative h-52 w-full overflow-hidden bg-black">
                      <img 
                        src={thumbnailUrl} 
                        alt={`Review by ${review.name}`} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Passenger Name & Occupation */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#0e52ff] transition">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── YouTube Video Modal Overlay ─── */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[150] bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={closeVideo}
        >
          {/* Close Modal Button */}
          <button 
            onClick={closeVideo}
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 rounded-full focus:outline-none"
            aria-label="Close video player"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Responsive 16:9 Iframe Wrapper */}
          <div 
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PassengerReviews;
