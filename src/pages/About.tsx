import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">Our Heritage</span>
              <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                Crafting the<br/> Perfect Sleep Since 2010.
              </h1>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Founded in Berhampur, Odisha, Royale Sleepy was born from a simple yet powerful ideal: that a luxurious, restorative sleep is the foundation of a life well-lived. 
            </p>
            
            <p className="text-gray-600 leading-relaxed font-light">
              We don't just sell mattresses; we curate sleep environments. By combining traditional craftsmanship with modern orthopedic science, we create mattresses that adapt perfectly to your body, ensuring you wake up refreshed, every single day.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              <div>
                <h4 className="text-3xl font-serif text-brand-gold-dark mb-2">10k+</h4>
                <p className="text-sm text-gray-500">Happy Sleepers</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-brand-gold-dark mb-2">10 Yrs</h4>
                <p className="text-sm text-gray-500">Warranty Given</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden lux-shadow">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200" 
                alt="Crafting Mattress" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl lux-shadow hidden md:block">
              <p className="font-serif text-xl italic text-gray-800 max-w-xs">
                "Quality is never an accident; it is always the result of high intention."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
