import React, { useState, useEffect, useRef } from 'react';
import { heroTypingWords, APP_DOWNLOAD_LINK } from '../data/index.js';

/**
 * Hero Component
 * 
 * I created this hero section at the top of the homepage.
 * It features:
 * 1. A dynamic typing and deleting effect cycling through phrases like "Your Journey, Our Priority"
 * 2. An animated blue cursor (|)
 * 3. Clear call-to-action button linking to the Garibook mobile app download
 * 4. Fade-up entrance effects matching the live site
 */
const Hero = () => {
  // I track which phrase in the list is currently being typed
  const [wordIdx, setWordIdx] = useState(0);
  
  // I track how many characters of the current phrase are currently visible
  const [charCount, setCharCount] = useState(0);
  
  // I track whether the typewriter is in typing mode or backspacing mode
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = heroTypingWords[wordIdx] || '';

  // Typewriter effect logic: types character by character, pauses, deletes, and switches to next phrase
  useEffect(() => {
    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charCount === currentPhrase.length) {
      speed = 2200; // Pause when full sentence is displayed
    } else if (isDeleting && charCount === 0) {
      speed = 400; // Brief pause before typing next sentence
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charCount === currentPhrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charCount === 0) {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % heroTypingWords.length);
      } else {
        setCharCount((prev) => prev + (isDeleting ? -1 : 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, currentPhrase, wordIdx]);

  const visibleText = currentPhrase.substring(0, charCount);

  return (
    <section className="w-full bg-white pt-10 pb-32 lg:pt-14 lg:pb-44">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dynamic Animated Typing Headline */}
          <div className="lg:col-span-6" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#121212] tracking-tight leading-[1.12] min-h-[140px] lg:min-h-[160px]">
              <span>{visibleText}</span>
              <span className="inline-block w-1.5 h-[0.9em] bg-[#0e52ff] ml-1.5 align-middle animate-pulse"></span>
            </h1>
          </div>

          {/* Right Column: Subtitle + Download App Button */}
          <div className="lg:col-span-6 lg:pl-10" data-aos="fade-up" data-aos-delay="200">
            <p className="text-[#9d9d9d] text-lg sm:text-xl lg:text-[22px] font-medium leading-relaxed max-w-xl">
              Choose your city, pick your car and enjoy the journey with Garibook’s best drivers.
            </p>

            <div className="mt-8">
              <a
                href={APP_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#fdd300] hover:bg-[#e6c003] text-[#121212] font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow"
              >
                <span>Download App</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
