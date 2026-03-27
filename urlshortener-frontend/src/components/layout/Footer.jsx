import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent py-10 mt-auto font-sans">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand & Copy */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="text-gray-900 font-extrabold text-[15px] tracking-tight">ShortenFlow</span>
          <span className="text-[11px] text-gray-500 font-semibold tracking-wide mt-1 md:mt-0">
            © 2024 ShortenFlow Inc. Built for the fluid architect.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 md:gap-8 text-[11px] font-bold text-gray-400 tracking-wide mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">About</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">GitHub</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>
        
      </div>
    </footer>
  );
}
