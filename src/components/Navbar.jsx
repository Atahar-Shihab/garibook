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

  // I determine the active navigation link based on the current URL path.
  // On the homepage ('/'), activeLink is empty so "About Us" isn't incorrectly highlighted!
  const [activeLink, setActiveLink] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/' || path === '') return '';
      const found = navLinks.find(link => link.href === path);
      return found ? found.label : '';
    }
    return '';
  });

  // Keep activeLink in sync if the URL changes
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setActiveLink('');
      } else {
        const found = navLinks.find(link => link.href === path);
        if (found) setActiveLink(found.label);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'বাংলা' : 'English'));
  };

  return (
    <>
      {/* ─── Sticky Desktop Header ─── */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          {/* Garibook Brand Logo */}
          <a 
            href="/" 
            onClick={() => setActiveLink('')}
            className="flex items-center"
          >
            <img
              src="/assets/images/gaibook-logo.svg"
              alt="Garibook Logo"
              className="h-9 md:h-11 object-contain"
            />
          </a>

          {/* Desktop Navigation Links with animated hover & active underline */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks?.map((link, index) => {
              const isActive = activeLink === link.label;
              return (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    // Update active state when user clicks on a page
                    setActiveLink(link.label);
                  }}
                  className={`nav-theme-link font-semibold text-[15px] cursor-pointer ${
                    isActive ? 'active-menu' : 'text-[#121212]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons: Language Selector & Login */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{language}</span>
            </button>

            <a
              href="/login"
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-6 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              login
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 text-gray-800 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─── Mobile Offcanvas Drawer (Slides in from the Left with Royal Blue background) ─── */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0e52ff] text-white shadow-2xl p-6 transition-transform duration-300 transform flex flex-col justify-between overflow-hidden ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header inside Drawer: Language Switcher and Close Button */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-white/20 mb-8">
              {/* Language Switcher */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-white font-semibold text-base hover:text-white/80 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{language}</span>
              </button>

              {/* Close (X) Button */}
              <button 
                onClick={() => setDrawerOpen(false)} 
                className="p-1 rounded-full text-white hover:text-white/80 transition focus:outline-none"
                aria-label="Close Menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-5">
              {navLinks?.map((link, index) => {
                const isActive = activeLink === link.label;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-lg sm:text-xl font-bold transition py-1 ${
                      isActive ? 'text-white border-b-2 border-white inline-block w-fit' : 'text-white/90 hover:text-white'
                    }`}
                    onClick={() => {
                      setActiveLink(link.label);
                      setDrawerOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Illustration Vector */}
          <div className="pt-6 relative pointer-events-none flex justify-center">
            <img 
              src="/assets/images/logo-vector.png" 
              alt="Garibook Road Illustration" 
              className="w-full max-w-[260px] object-contain opacity-95" 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
