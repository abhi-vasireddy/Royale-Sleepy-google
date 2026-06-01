import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mattresses', path: '/mattresses' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
  }`;

  const linkColorClass = scrolled || !isHome ? 'text-gray-900 hover:text-brand-gold' : 'text-white hover:text-brand-cream/80';
  const logoColorClass = scrolled || !isHome ? 'text-gray-900' : 'text-white';

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
          <span className={logoColorClass}>Deamy Soft</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${linkColorClass} ${location.pathname === link.path ? 'opacity-100 font-semibold' : 'opacity-80'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1.5 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled || !isHome ? 'bg-brand-gold' : 'bg-white'}`}></span>
            </Link>
          ))}
          <a
            href="https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20your%20mattresses"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-medium ${scrolled || !isHome ? 'bg-brand-dark text-white hover:bg-gray-800 hover:shadow-lg' : 'bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-brand-dark'}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${logoColorClass}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-900 font-medium text-lg border-b border-gray-100 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20your%20mattresses"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-brand-dark text-white px-5 py-3 rounded-full hover:bg-gray-800 transition-colors mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
