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

  // I initialize AOS and also use an IntersectionObserver to make sure
  // every element slides up smoothly from bottom to top as the user scrolls down!
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: false,
      mirror: false,
      offset: 50,
    });

    // Refresh AOS once all images and elements finish rendering
    const handleLoad = () => AOS.refresh();
    window.addEventListener('load', handleLoad);

    // Custom IntersectionObserver ensuring slide-up effects trigger 100% reliably
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          } else {
            // When scrolling back up above the element, reset so it re-slides on the next scroll down
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove('aos-animate');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('load', handleLoad);
      observer.disconnect();
    };
  }, []);

  // I track scrolling to toggle the "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
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

      {/* ── Floating Action Buttons (Positioned to match Garibook live site) ── */}
      {/* 1. Scroll to Top (Blue Square Button with White Up Arrow) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[97px] right-6 sm:right-9 z-50 w-11 h-11 rounded-lg bg-[#0e52ff] hover:bg-[#0038c4] text-white flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      
      {/* 2. Floating Support Chat (Blue Circular Button with Chat Bubble Icon) */}
      <button
        onClick={() => window.open('https://garibook.com', '_blank')}
        className="fixed bottom-[32px] right-6 sm:right-9 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0e52ff] hover:bg-[#0038c4] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Support Chat"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  );
}
