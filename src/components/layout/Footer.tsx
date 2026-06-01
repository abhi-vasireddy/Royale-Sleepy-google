import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  // Your exact Google Maps location link
  const googleMapsUrl = "https://maps.app.goo.gl/FVhiW8tU1RpCmvHr6";

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight mb-6 block">
            Deamy Soft
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Premium mattresses designed for ultimate comfort. Elevating the sleep experience in Berhampur with luxury materials and orthopedic support.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
            <li><Link to="/mattresses" className="hover:text-brand-gold transition-colors">Collection</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">Our Story</Link></li>
            <li><Link to="/reviews" className="hover:text-brand-gold transition-colors">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Customer Care</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Warranty Info</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Visit Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {/* The address link now opens your exact location in a new tab smoothly */}
            <li>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-brand-gold transition-colors group"
              >
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
                <span>Gurudev furniture, <br/>Bhubaneswar, Odisha, India</span>
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-5 h-5 text-brand-gold shrink-0" />
              <span>+91 99999 99999</span>
            </li>
            <li className="flex gap-3 items-center">
              <MessageCircle className="w-5 h-5 text-brand-gold shrink-0" />
              <span>WhatsApp Inquiries</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-12 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Deamy Soft. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for luxury.</p>
      </div>
    </footer>
  );
}