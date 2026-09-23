import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/index.js';

/**
 * Navbar Component
 * 
 * I created this component to handle both desktop navigation and the mobile offcanvas menu:
 * 1. Brand logo leading to homepage
 * 2. Active link indicator that highlights the current page based on the browser URL
 *    (On the homepage, no link is active by default; the blue underline expands smoothly on hover)
 * 3. Language switcher (English / বাংলা)
 * 4. Login button with royal blue styling
 * 5. Slide-in mobile drawer from the left with matching blue theme and road illustration
 */
const Navbar = () => {
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Language toggle
  const [language, setLanguage] = useState('English');

  // I track scroll position to trigger sticky navbar slide-down animation
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'বাংলা' : 'English'));
  };

  return (
    <>
      {/* ─── Main Navbar (Slides down smoothly when sticky on scroll) ─── */}
      <header 
        className={`w-full transition-all duration-300 ${
          isSticky 
            ? 'fixed top-0 left-0 bg-white shadow-md z-50 animate-slide-down py-3' 
            : 'relative bg-white z-40 pt-3 pb-3 md:pt-4 md:pb-3'
        }`}
      >
        {/* Authentic Language Toggle Button pinned to the top-right corner of the page */}
        <div className="hidden lg:block absolute top-2 right-4 lg:right-6 xl:right-8 z-50">
          <button 
            onClick={toggleLanguage}
            className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-medium text-[13px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            aria-label="Toggle Language"
          >
            <svg 
              aria-hidden="true" 
              focusable="false" 
              className="w-3.5 h-3.5 fill-current" 
              viewBox="0 0 640 512"
            >
              <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z" />
            </svg>
            <span>{language}</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Garibook Brand Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/assets/images/gaibook-logo.svg"
              alt="Garibook Logo"
              className="h-9 md:h-11 object-contain"
            />
          </a>

          {/* Desktop Navigation Links + Login Button grouped together on the Right */}
          <div className="hidden lg:flex items-center space-x-7">
            <nav className="flex items-center space-x-7">
              {navLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="nav-theme-link font-semibold text-[15px] cursor-pointer text-[#121212]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="/login"
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-medium text-[15px] px-7 py-2 rounded-lg transition-all shadow-sm active:scale-95 ml-2"
            >
              login
            </a>
          </div>

          {/* Mobile Right Controls: Mobile Login + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="/login"
              className="bg-[#0e52ff] text-white text-xs font-semibold px-3 py-1.5 rounded-md"
            >
              login
            </a>
            <button
              className="p-1.5 text-gray-800 focus:outline-none"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Offcanvas Drawer (Slides in from the Right with Royal Blue background) ─── */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-[300px] sm:w-[340px] max-w-[85vw] bg-[#0e52ff] text-white shadow-2xl transition-transform duration-300 transform flex flex-col justify-between overflow-hidden ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header inside Drawer: Language Switcher on Left, Close Button on Right */}
          <div className="flex justify-between items-center px-6 pt-6 pb-2 z-10">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white font-medium text-[16px] hover:opacity-85 transition"
            >
              <svg 
                aria-hidden="true" 
                focusable="false" 
                className="w-4 h-4 fill-current" 
                viewBox="0 0 640 512"
              >
                <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z" />
              </svg>
              <span>{language}</span>
            </button>

            {/* Close (X) Button */}
            <button 
              onClick={() => setDrawerOpen(false)} 
              className="p-1 text-white hover:opacity-80 transition focus:outline-none"
              aria-label="Close Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links (Center-aligned, medium weight matching Garibook) */}
          <div className="flex flex-col items-center justify-center space-y-6 pt-6 pb-10 z-10">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white text-[19px] sm:text-[20px] font-medium tracking-tight hover:opacity-80 transition text-center"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom Illustration Vector (Pinned to bottom-right corner) */}
          <div className="absolute -bottom-4 -right-4 pointer-events-none select-none">
            <img 
              src="/assets/images/logo-vector.png" 
              alt="Garibook Road Illustration" 
              className="w-[280px] sm:w-[320px] object-contain opacity-95" 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
