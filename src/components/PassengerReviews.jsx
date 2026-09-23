import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { passengerReviews } from '../data/index.js';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract standard 11-character YouTube video ID
const getYoutubeVideoId = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

/**
 * PassengerReviews Component
 * 
 * Displays video testimonials from real Garibook passengers.
 * Features:
 * 1. Horizontal slider with review cards
 * 2. Click-to-play popup modal with embedded responsive YouTube iframe
 * 3. Smooth scroll reveal effect
 */
const PassengerReviews = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Smooth scroll reveal animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(sliderRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smoothly scrolls the reviews slider
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Open and close video popup modal
  const openVideo = (url) => {
    const videoId = getYoutubeVideoId(url);
    if (videoId) setSelectedVideo(videoId);
  };

  const closeVideo = () => setSelectedVideo(null);

  return (
    <section ref={sectionRef} className="bg-[#f8f9fa] py-16 lg:py-24">
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
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95 shadow-sm"
              aria-label="Previous Reviews"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 transition active:scale-95 shadow-sm"
              aria-label="Next Reviews"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video Cards Slider */}
        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {passengerReviews && passengerReviews.map((review) => {
              const videoId = getYoutubeVideoId(review.url);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              
              return (
                <div 
                  key={review.id}
                  onClick={() => openVideo(review.url)}
                  className="w-[300px] sm:w-[360px] shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  {/* Video Thumbnail with Red Play Button Overlay */}
                  <div className="relative h-52 w-full overflow-hidden bg-black">
                    <img 
                      src={thumbnailUrl} 
                      alt={`Review by ${review.name}`} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Name & Occupation */}
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium mt-1">{review.occupation}</p>
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
