import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/index.js';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md text-gb-dark py-3' : 'bg-transparent text-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/">
            <img
              src="/assets/images/gaibook-logo.svg"
              alt="Garibook Logo"
              className="h-12"
              style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-medium hover:text-gb-yellow transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className={`border-2 rounded-full px-6 py-2 font-medium transition-colors ${
                scrolled
                  ? 'border-gb-dark hover:bg-gb-dark hover:text-white'
                  : 'border-white hover:bg-white hover:text-gb-dark'
              }`}
            >
              Login
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden block"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-64 bg-white text-gb-dark shadow-xl p-6 transition-transform duration-300 transform ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={() => setDrawerOpen(false)} aria-label="Close Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-medium hover:text-gb-yellow"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className="border-2 border-gb-dark text-center rounded-full px-6 py-2 font-medium hover:bg-gb-dark hover:text-white mt-4"
              onClick={() => setDrawerOpen(false)}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
