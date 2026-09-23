import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/index.js';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <>
      {/* ── Top Bar / Language Selector (matches video top right) ── */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-end items-center gap-2 text-xs font-semibold text-gray-700">
          <button 
            onClick={() => setLanguage(language === 'English' ? 'বাংলা' : 'English')}
            className="flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-full transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>{language}</span>
          </button>
        </div>
      </div>

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

          {/* Right Action: Login Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/login"
              className="bg-[#0e52ff] hover:bg-[#0038c4] text-white font-semibold text-sm px-7 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
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
            
            <div className="pt-4 border-t border-gray-100">
              <a
                href="/login"
                className="block text-center bg-[#0e52ff] text-white font-semibold rounded-xl py-3 shadow"
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
