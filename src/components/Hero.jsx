import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { heroTypingWords, APP_DOWNLOAD_LINK } from '../data/index.js';

/* Strip <span> tags to get plain text for character-by-character typing */
const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

/* Build partial HTML: type out the plain text but preserve <span> styling */
const getPartialHtml = (fullHtml, charCount) => {
  const plain = stripHtml(fullHtml);
  const visiblePlain = plain.substring(0, charCount);

  // Re-insert <span class="text-gb-yellow"> around the originally-wrapped word
  const spanMatch = fullHtml.match(/<span>(.*?)<\/span>/);
  if (!spanMatch) return visiblePlain;

  const spanStart = fullHtml.indexOf('<span>');
  const preSpanPlain = stripHtml(fullHtml.substring(0, spanStart));
  const spanText = spanMatch[1];
  const afterSpanPlain = stripHtml(fullHtml.substring(fullHtml.indexOf('</span>') + 7));

  if (charCount <= preSpanPlain.length) {
    return visiblePlain;
  } else if (charCount <= preSpanPlain.length + spanText.length) {
    const insideLen = charCount - preSpanPlain.length;
    return `${preSpanPlain}<span class="text-gb-yellow">${spanText.substring(0, insideLen)}</span>`;
  } else {
    const afterLen = charCount - preSpanPlain.length - spanText.length;
    return `${preSpanPlain}<span class="text-gb-yellow">${spanText}</span>${afterSpanPlain.substring(0, afterLen)}`;
  }
};

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const fullHtml = heroTypingWords[wordIdx] || '';
  const plainLen = stripHtml(fullHtml).length;

  useEffect(() => {
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charCount === plainLen) speed = 2000;    // pause at end
    if (isDeleting && charCount === 0) speed = 400;              // pause before next

    const timer = setTimeout(() => {
      if (!isDeleting && charCount === plainLen) {
        setIsDeleting(true);
      } else if (isDeleting && charCount === 0) {
        setIsDeleting(false);
        setWordIdx((i) => (i + 1) % heroTypingWords.length);
      } else {
        setCharCount((c) => c + (isDeleting ? -1 : 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, plainLen, wordIdx]);

  /* GSAP entrance animation */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-cover bg-center pt-36 lg:pt-44 pb-72 lg:pb-80"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url('/assets/images/banner/hero-bg.jpg')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4" ref={contentRef}>
        <div className="lg:flex lg:items-start lg:justify-between gap-12">
          {/* Left – Typewriter Headline */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight hero-typing-text">
              <span dangerouslySetInnerHTML={{ __html: getPartialHtml(fullHtml, charCount) }} />
              <span className="typewriter-cursor" />
            </h1>
          </div>

          {/* Right – Description + CTA */}
          <div className="lg:w-1/2 flex flex-col items-start lg:items-start">
            <p className="text-white/80 text-base md:text-lg lg:text-xl mb-8 max-w-md leading-relaxed">
              Choose your city, pick your car and enjoy the journey with Garibook's best drivers.
            </p>
            <a
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arrow inline-flex items-center gap-3 bg-gb-yellow text-gb-dark font-semibold px-7 py-3.5 rounded-full hover:bg-yellow-400 transition-colors text-base"
            >
              Download App
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
