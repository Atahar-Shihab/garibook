import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import StatsCounter from './components/StatsCounter';
import Services from './components/Services';
import FreedomSection from './components/FreedomSection';
import PeopleTogether from './components/PeopleTogether';
import BookingArrival from './components/BookingArrival';
import SmartDriver from './components/SmartDriver';
import NewsroomSlider from './components/NewsroomSlider';
import PassengerReviews from './components/PassengerReviews';
import BlogSection from './components/BlogSection';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';

/**
 * Garibook Homepage — Main Application Component
 * 
 * I structured this application into modular, readable components matching the live Garibook site.
 * Here I initialize AOS (Animate On Scroll) so that every card and banner slides up smoothly
 * as the user scrolls down the page!
 */
export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // I initialize AOS when the page mounts to enable the smooth scroll animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: false,
      offset: 60,
    });
  }, []);

  // I track scrolling to toggle the "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative bg-white">
      {/* ── Fixed Sticky Navbar ── */}
      <Navbar />

      {/* ── Hero Section with Animated Typewriter ── */}
      <Hero />

      {/* ── Interactive Booking Widget ── */}
      <BookingWidget />

      {/* ── Animated Stats Counter with Moving City & Car ── */}
      <StatsCounter />

      {/* ── Tabbed Services Section ── */}
      <Services />

      {/* ── Freedom in Every Journey Dark Section ── */}
      <FreedomSection />

      {/* ── More Than Miles – People Together ── */}
      <PeopleTogether />

      {/* ── From Booking to Arrival Bento Grid ── */}
      <BookingArrival />

      {/* ── 0% Commission Smart Driver Banner ── */}
      <SmartDriver />

      {/* ── Newsroom Press Coverage Slider ── */}
      <NewsroomSlider />

      {/* ── Passenger Video Testimonials ── */}
      <PassengerReviews />

      {/* ── Travel Blogs & Guides Preview ── */}
      <BlogSection />

      {/* ── Download Garibook Mobile App Banner ── */}
      <DownloadApp />

      {/* ── Full 4-Tier Footer ── */}
      <Footer />

      {/* ── Floating Action Buttons (Scroll to Top & Support Chat) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-lg bg-[#0e52ff] hover:bg-[#0038c4] text-white flex items-center justify-center shadow-lg transition active:scale-95"
            aria-label="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
        
        <button
          className="w-12 h-12 rounded-full bg-[#0e52ff] hover:bg-[#0038c4] text-white flex items-center justify-center shadow-xl transition active:scale-95"
          aria-label="Support Chat"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
