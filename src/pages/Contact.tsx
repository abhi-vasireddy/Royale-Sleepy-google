import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, Mail } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        createdAt: new Date()
      });
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Visit Our Showroom</h1>
          <p className="text-gray-600 text-lg font-light">
            Experience the Deamy Soft comfort in person, or get in touch with our sleep experts online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-brand-dark text-white p-10 md:p-14 rounded-3xl lux-shadow"
          >
            <h3 className="font-serif text-3xl mb-8">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Our Location</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    123 Luxury Avenue,<br/>
                    Near City Center, Berhampur,<br/>
                    Odisha, India - 760001
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-gray-400 font-light">+91 99999 99999</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Store Hours</h4>
                  <p className="text-gray-400 font-light">Mon - Sun: 10:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-6 font-light">For immediate assistance, reach out to us on WhatsApp.</p>
              <a 
                href="https://wa.me/919999999999?text=Hi,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-medium text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 md:p-14 rounded-3xl lux-shadow"
          >
            <h3 className="font-serif text-3xl mb-2 text-brand-dark">Send an Inquiry</h3>
            <p className="text-gray-500 mb-8 font-light text-sm">Leave your details and we will callback.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-colors font-light text-sm"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-colors font-light text-sm"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 99999 99999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                <textarea 
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-colors font-light text-sm resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what you are looking for..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-brand-dark text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : (
                  <span>Request Callback</span>
                )}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm text-center font-medium bg-green-50 py-3 rounded-lg">
                  Thank you! We have received your inquiry.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-3 rounded-lg">
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
