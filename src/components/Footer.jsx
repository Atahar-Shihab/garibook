import React from 'react';
import { footerLinks, APP_DOWNLOAD_LINK } from '../data/index.js';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: garibook */}
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

          {/* Column 2: Services */}
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

          {/* Column 3: Become Our Partner */}
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

          {/* Column 4: Contacts */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Contacts</h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-3">
              <p>support@garibook.com</p>
              <p>Police Plaza Concord Tower-01, 13th Floor, Plot-02, Road-144, Gulshan, Dhaka-1212</p>
              <p className="font-semibold text-white">+88 09 678 11 22 33</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Download banner + Partners */}
        <div className="py-8 border-t border-b border-gray-900 flex flex-col lg:flex-row justify-between items-center gap-8 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Download Our Garibook Mobile App</h4>
            <a
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0e52ff] hover:bg-[#0038c4] text-white font-bold text-sm px-7 py-3 rounded-xl transition shadow"
            >
              <span>Download App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">A Product By</span>
              <a href="https://nrbsolution.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src="/assets/images/nrb/nrb_no_background.svg" alt="NRB Solution Ltd." className="h-7 object-contain brightness-0 invert" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Powered By</span>
              <a href="https://link3.net" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src="/assets/images/clients/link3-two.png" alt="Link3 Technologies" className="h-7 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment SSL Banner */}
        <div className="mb-8 flex justify-center overflow-x-auto py-2">
          <img src="/assets/images/clients/ssl.png" alt="SSL Commerz Payment Methods" className="max-h-12 w-auto object-contain" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 text-xs text-gray-500">
          <img src="/assets/images/Garibook_Logo.svg" alt="Garibook" className="h-8 object-contain" />
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/terms" className="hover:text-gray-300 transition">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</a>
            <span>Trade license number: TRAD/DNCC/013806/2024</span>
          </div>

          <div>
            &copy; 2026 Garibook.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
