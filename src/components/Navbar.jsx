import React, { useState } from 'react';
import { navLinks } from '../data/index.js';

/**
 * Navbar Component
 * 
 * Sticky top navigation bar with:
 * 1. Brand logo
 * 2. Desktop navigation links
 * 3. Language toggle (English / বাংলা)
 * 4. Login button
 * 5. Responsive mobile offcanvas drawer with blue background and bottom illustration
 */
const Navbar = () => {
  // Controls opening and closing of the mobile navigation drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Controls the current language display (English or Bangla)
  const [language, setLanguage] = useState('English');

  // Toggle between English and Bangla
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'বাংলা' : 'English'));
  };

  return (
    <>
      {/* ─── Sticky Desktop & Tablet Header ─── */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          {/* Garibook Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/assets/images/gaibook-logo.svg"
              alt="Garibook"
              className="h-9 md:h-11 object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#121212] font-semibold text-[15px] hover:text-[#0e52ff] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons: Language Selector & Login */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector Button */}
            <button 
              onClick={toggleLanguage}
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{language}</span>
            </button>

            {/* Login Button */}
            <a
              href="/login"
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-6 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              login
            </a>
          </div>

          {/* Mobile Hamburger Menu Button */}
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

      {/* ─── Mobile Offcanvas Drawer (Matches Image 5 from live site) ─── */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        {/* Blue Offcanvas Drawer Content */}
        <div
          className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0e52ff] text-white shadow-2xl p-6 transition-transform duration-300 transform flex flex-col justify-between overflow-hidden ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header inside Drawer: Language Toggle and Close Button */}
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

              {/* Close Button */}
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

            {/* Mobile Navigation Links List */}
            <div className="flex flex-col space-y-5">
              {navLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-lg sm:text-xl font-bold text-white hover:text-white/80 transition py-1"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Vector Illustration (Matches Image 5 from DevTools inspection) */}
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
