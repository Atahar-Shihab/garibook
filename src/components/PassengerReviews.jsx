import React, { useRef, useState } from 'react';
import { passengerReviews } from '../data/index.js';

const getYoutubeVideoId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PassengerReviews = () => {
  const sliderRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openVideo = (url) => {
    const videoId = getYoutubeVideoId(url);
    if (videoId) setSelectedVideo(videoId);
  };

  const closeVideo = () => setSelectedVideo(null);

  return (
    <section className="bg-[#f8f9fa] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold max-w-lg text-[#0f2647]">
              Our Passengers Speak For Us
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl">
              Our journey was seamless and enjoyable. Hear from our satisfied customers who have experienced the difference with Garibook.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition focus:outline-none"
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition focus:outline-none"
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
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
            
            {passengerReviews && passengerReviews.map((review, index) => {
              const videoId = getYoutubeVideoId(review.url);
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/assets/images/default-thumbnail.jpg';
              
              return (
                <div 
                  key={index}
                  onClick={() => openVideo(review.url)}
                  className="min-w-[300px] md:min-w-[350px] scroll-snap-start rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer hover:shadow-md transition"
                >
                  <div className="relative h-48 w-full group">
                    <img 
                      src={thumbnailUrl} 
                      alt={`Review by ${review.name}`} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{review.occupation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <button 
            onClick={closeVideo}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div 
            className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black"
            onClick={e => e.stopPropagation()}
          >
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default PassengerReviews;
