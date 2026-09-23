import React, { useState } from 'react';
import { navLinks } from '../data/index.js';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <>
      {/* ── Main Sticky Navbar ── */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          {/* Logo */}
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

          {/* Right Action: Language Button + Login Button (matching live site) */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setLanguage(language === 'English' ? 'বাংলা' : 'English')}
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{language}</span>
            </button>

            <a
              href="/login"
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-6 py-2 rounded-xl transition-all shadow-sm"
            >
              login
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 text-gray-800 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-72 bg-white text-gray-900 shadow-2xl p-6 transition-transform duration-300 transform ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
            <img src="/assets/images/gaibook-logo.svg" alt="Garibook" className="h-8" />
            <button 
              onClick={() => setDrawerOpen(false)} 
              className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100"
              aria-label="Close Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-base font-semibold text-gray-800 hover:text-[#0e52ff] py-1"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button 
                onClick={() => setLanguage(language === 'English' ? 'বাংলা' : 'English')}
                className="w-full bg-[#0e52ff] text-white font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2"
              >
                <span>{language}</span>
              </button>

              <a
                href="/login"
                className="block text-center bg-[#0e52ff] text-white font-semibold rounded-xl py-2.5 shadow"
                onClick={() => setDrawerOpen(false)}
              >
                login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
