import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageCircle } from 'lucide-react';

export default function Mattresses() {
  const [filter, setFilter] = useState('All');

  const products = [
    { id: 1, name: "The Cloud Memory", price: "₹18,999", type: "Memory Foam", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Royale Ortho Care", price: "₹24,500", type: "Orthopedic", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Luxury Spring Hybrid", price: "₹32,000", type: "Hybrid Spring", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Latex Organic Bliss", price: "₹45,000", type: "Latex", img: "https://images.unsplash.com/photo-1522771731478-44fbcd4d1bf4?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Classic Coir Firm", price: "₹12,500", type: "Coir", img: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Dual Comfort Reversible", price: "₹15,000", type: "Dual Comfort", img: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=800" },
  ];

  const categories = ['All', 'Orthopedic', 'Memory Foam', 'Hybrid Spring', 'Latex', 'Coir'];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.type.includes(filter) || filter.includes(p.type));

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Collection</h1>
          <p className="text-gray-600 leading-relaxed text-lg">
            Experience the pinnacle of sleep luxury. Each mattress is meticulously crafted to provide the perfect balance of support, cooling, and plush comfort.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex overflow-x-auto w-full md:w-auto space-x-2 pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === cat ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search mattresses..."
              className="w-full bg-white border border-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden lux-shadow group"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 rounded-full text-brand-dark">
                  {product.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Elevate your sleep with our premium quality fabric and advanced support system.</p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">{product.price}</span>
                  <div className="text-xs space-x-1">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">King</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Queen</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-brand-dark text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                  <a 
                    href={`https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20${product.name}`}
                    className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded-full hover:bg-green-100 transition-colors shrink-0"
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
