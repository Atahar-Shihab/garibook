import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { heroTypingWords, APP_DOWNLOAD_LINK } from '../data/index.js';

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const currentPhrase = heroTypingWords[wordIdx] || '';

  useEffect(() => {
    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charCount === currentPhrase.length) {
      speed = 2200; // Pause when complete phrase is shown
    } else if (isDeleting && charCount === 0) {
      speed = 400; // Pause before typing next phrase
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const visibleText = currentPhrase.substring(0, charCount);

  return (
    <section ref={heroRef} className="w-full bg-white pt-12 pb-36 lg:pt-16 lg:pb-48">
      <div className="max-w-7xl mx-auto px-4" ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dynamic Headline */}
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#121212] tracking-tight leading-[1.15] min-h-[140px] lg:min-h-[160px]">
              <span>{visibleText}</span>
              <span className="inline-block w-1 h-[1em] bg-black ml-1.5 align-middle animate-pulse"></span>
            </h1>
          </div>

          {/* Right Column: Subtitle + Download App CTA */}
          <div className="lg:col-span-6 lg:pl-10">
            <p className="text-[#9d9d9d] text-lg sm:text-xl lg:text-[22px] font-medium leading-relaxed max-w-xl">
              Choose your city, pick your car and enjoy the journey with Garibook’s best drivers.
            </p>

            <div className="mt-8">
              <a
                href={APP_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#fdd300] hover:bg-[#e6c003] text-[#121212] font-bold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow"
              >
                <span>Download App</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
