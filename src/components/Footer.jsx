import React from 'react';
import { footerLinks, APP_DOWNLOAD_LINK } from '../data/index.js';

/**
 * Footer Component
 * 
 * Recreates the complete 4-tier footer from the Garibook live site:
 * 1. Top 4 columns: garibook, Services, Become Our Partner, Contacts
 * 2. Middle Row: App Download CTA on left + Product & Power partners on right
 * 3. Payment Gateway Strip: Full-width SSLCommerz partner banner
 * 4. Bottom Row: Brand logo, legal links, trade license, and copyright notice
 */
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ─── Tier 1: 4 Main Information Columns ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: garibook company links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">garibook</h3>
            <ul className="space-y-3">
              {footerLinks?.garibook?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition text-sm">
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
                  <a href={link.href} className="text-gray-400 hover:text-white transition text-sm">
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
                  <a href={link.href} className="text-gray-400 hover:text-white transition text-sm">
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

        {/* ─── Tier 2: Download CTA & Partner Accreditations (Matches Images 3 & 4) ─── */}
        <div className="py-8 border-t border-gray-900 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-6">
          {/* Download App CTA on the Left */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <h4 className="text-lg font-bold text-white">Download Our Garibook Mobile App</h4>
            <a
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-sm px-7 py-3 rounded-xl transition shadow active:scale-95"
            >
              <span>Download App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Product & Power partners on the Right */}
          <div className="flex flex-wrap items-center gap-10">
            {/* A Product By NRB Solution Ltd. */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/assets/images/nrb/nrb_no_background.svg" 
                  alt="NRB Solution Ltd." 
                  className="h-8 object-contain" 
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">A Product By</span>
                <span className="text-sm font-bold text-white block">NRB Solution Ltd.</span>
                <a 
                  href="https://nrbsolution.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#fdd300] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  Visit Website &rarr;
                </a>
              </div>
            </div>

            {/* Powered By Link 3 Technologies */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/assets/images/clients/link3-two.png" 
                  alt="Link 3 Technologies" 
                  className="h-8 object-contain" 
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Powered By</span>
                <span className="text-sm font-bold text-white block">Link 3 Technologies</span>
                <a 
                  href="https://link3.net" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#fdd300] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  Visit Website &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Tier 3: SSLCommerz Payment Gateway Strip (Matches Image 3 & 4) ─── */}
        <div className="w-full bg-white rounded-xl py-2.5 px-4 my-8 flex items-center justify-center overflow-x-auto shadow-sm">
          <img 
            src="/assets/images/clients/ssl.png" 
            alt="Payment Methods: Visa, MasterCard, Amex, bKash, Nagad, Rocket, Upay, SSLCommerz" 
            className="h-8 sm:h-9 w-auto object-contain max-w-none" 
          />
        </div>

        {/* ─── Tier 4: Bottom Copyright & Legal Links ─── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 text-xs text-gray-400">
          {/* Brand Logo */}
          <img src="/assets/images/Garibook_Logo.svg" alt="Garibook" className="h-8 object-contain" />
          
          {/* Legal Links & Trade License */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/terms" className="hover:text-white transition">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <span>Trade license number: TRAD/DNCC/013806/2024</span>
          </div>

          {/* Copyright Year */}
          <div>
            &copy; 2026 Garibook.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
