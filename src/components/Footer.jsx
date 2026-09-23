import React from 'react';
import { footerLinks, APP_DOWNLOAD_LINK } from '../data/index.js';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-4">GARIBOOK</h3>
            <ul className="space-y-3">
              {footerLinks?.garibook?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-gb-yellow transition text-sm leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks?.services?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-gb-yellow transition text-sm leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-4">Become Our Partner</h3>
            <ul className="space-y-3">
              {footerLinks?.partners?.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-gb-yellow transition text-sm leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contacts */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-4">Contacts</h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-3">
              <p>Email: support@garibook.com</p>
              <p>Address: Police Plaza Concord Tower-01, 13th Floor, Plot-02, Road-144, Gulshan, Dhaka-1212</p>
              <p>Phone: +88 09 678 11 22 33</p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <h3 className="text-lg font-semibold">Download Our Garibook Mobile App</h3>
            <a
              href={APP_DOWNLOAD_LINK}
              className="bg-gb-yellow text-gb-dark font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
            >
              Download App
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">A Product By</span>
              <img src="/assets/images/nrb/nrb_no_background.svg" alt="NRB Solution Ltd." className="h-8 bg-white p-1 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Powered By</span>
              <img src="/assets/images/clients/link3-two.png" alt="Link3 Technologies" className="h-8 bg-white p-1 rounded" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/assets/images/Garibook_Logo.svg" alt="Garibook" className="h-10" />
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>Trade license number: TRAD/DNCC/013806/2024</span>
          </div>
          <div className="text-sm text-gray-400">
            &copy; 2026 Garibook.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
