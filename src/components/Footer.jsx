import React from 'react';
import { footerLinks, APP_DOWNLOAD_LINK } from '../data/index.js';

/**
 * Footer Component
 * 
 * I created this 4-tier footer to 100% match the live Garibook site:
 * 1. Top 4 columns: garibook, Services, Become Our Partner, Contacts
 * 2. Middle Row: "Download Our Garibook Mobile App" on left,
 *    and "A Product By" (NRB Solution Ltd.) & "Powered By" (Link 3 Technologies) on right
 * 3. Bottom Row: Garibook logo, Terms & Conditions, Privacy Policy, Trade License (single line), Copyright
 * 4. Full-Width Payment Banner: Full viewport edge-to-edge SSLCommerz payment options strip at the very bottom
 */
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4">
        {/* ─── Tier 1: 4 Main Information Columns ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: garibook company links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">garibook</h3>
            <ul className="space-y-3">
              {footerLinks?.garibook?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover-style-link text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Available services */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Services</h3>
            <ul className="space-y-3">
              {footerLinks?.services?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover-style-link text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partner programs */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Become Our Partner</h3>
            <ul className="space-y-3">
              {footerLinks?.partners?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover-style-link text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Contacts</h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-3">
              <p>support@garibook.com</p>
              <p>Police Plaza Concord Tower -01, 13th Floor, Plot-02, Road-144, Gulshan, Dhaka-1212</p>
              <p className="font-semibold text-white">+88 09 678 11 22 33</p>
            </div>
          </div>
        </div>

        {/* ─── Tier 2: Middle Section (Download App on Left + Partners on Right) ─── */}
        <div className="py-10 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Download Our Garibook Mobile App (Title stacked, button below) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Download Our <br /> Garibook Mobile App
            </h2>
            <div className="mt-5">
              <a
                href={APP_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition shadow active:scale-95"
              >
                <span>Download App</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: A Product By & Powered By Partners */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row justify-start lg:justify-end gap-10 lg:gap-14 items-start">
            {/* A Product By NRB Solution Ltd. */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">A Product By</h2>
              <div className="flex items-center gap-3 mt-3">
                <img 
                  src="/assets/images/nrb/nrb_no_background.svg" 
                  alt="NRB Solution Ltd." 
                  className="h-12 w-auto object-contain" 
                />
                <div>
                  <h5 className="text-sm sm:text-base font-bold text-white">NRB Solution Ltd.</h5>
                  <a 
                    href="https://nrb-solutions.net/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs sm:text-sm text-[#fdd300] hover:underline font-bold inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Visit Website</span> &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Powered By Link 3 Technologies */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Powered By</h2>
              <div className="flex items-center gap-3 mt-3">
                <img 
                  src="/assets/images/clients/link3-two.png" 
                  alt="Link 3 Technologies" 
                  className="h-12 w-auto object-contain" 
                />
                <div>
                  <h5 className="text-sm sm:text-base font-bold text-white">Link 3 Technologies</h5>
                  <a 
                    href="https://link3.net" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs sm:text-sm text-[#fdd300] hover:underline font-bold inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Visit Website</span> &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle separator line */}
        <div className="border-t border-[#222] my-8" />

        {/* ─── Tier 3: Brand Logo, Legal Links & Trade License ─── */}
        <div className="pb-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center lg:justify-start">
            <img src="/assets/images/Garibook_Logo.svg" alt="Garibook" className="h-8 object-contain" />
            <a href="/terms-and-conditions" className="hover-style-link text-gray-400 hover:text-white transition">Terms &amp; Conditions</a>
            <a href="/privacy-policy" className="hover-style-link text-gray-400 hover:text-white transition">Privacy Policy</a>
          </div>

          <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center lg:justify-end text-sm">
            <div className="text-center lg:text-left leading-tight">
              <span>Trade license number: <br /> TRAD/DNCC/013806/2024</span>
            </div>
            <div className="text-center lg:text-left">
              <span>&copy; 2026 Garibook.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tier 4: Edge-to-Edge Full-Width SSLCommerz Payment Gateway Strip ─── */}
      <div className="w-full bg-white py-1.5 px-2 flex items-center justify-center overflow-hidden">
        <img 
          src="/assets/images/clients/ssl.png" 
          alt="Payment Methods: Visa, Mastercard, Amex, bKash, Nagad, Rocket, Upay, SSLCommerz" 
          className="w-full h-auto object-cover max-h-[46px]" 
        />
      </div>
    </footer>
  );
};

export default Footer;
