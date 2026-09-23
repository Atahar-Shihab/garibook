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
 * Garibook Homepage – Endow Tech Frontend Intern Assessment
 *
 * Architecture mirrors the live https://garibook.com/ homepage with
 * the same section order, interactive features, and responsive layout.
 */
export default function App() {
  return (
    <div className="min-h-screen">
      {/* ── Fixed Navbar ── */}
      <Navbar />

      {/* ── Hero Section with Typewriter Effect ── */}
      <Hero />

      {/* ── Booking Widget (overlaps Hero ↔ Stats) ── */}
      <BookingWidget />

      {/* ── Animated Stats Counter ── */}
      <StatsCounter />

      {/* ── Our Services (Tabbed) ── */}
      <Services />

      {/* ── Freedom in Every Journey ── */}
      <FreedomSection />

      {/* ── More Than Miles – People Together ── */}
      <PeopleTogether />

      {/* ── From Booking to Arrival ── */}
      <BookingArrival />

      {/* ── 0% Commission Smart Driver Banner ── */}
      <SmartDriver />

      {/* ── Newsroom / Press Slider ── */}
      <NewsroomSlider />

      {/* ── Passenger Video Testimonials ── */}
      <PassengerReviews />

      {/* ── Beyond Destinations – Blog Preview ── */}
      <BlogSection />

      {/* ── Download Garibook App Banner ── */}
      <DownloadApp />

      {/* ── Full Footer ── */}
      <Footer />
    </div>
  );
}
