import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Feather, ThumbsUp, ArrowRight } from 'lucide-react';
import ReviewsMarquee from '../components/ui/ReviewsMarquee';

export default function Home() {
  const featuredProducts = [
    {
      id: "1",
      name: "The Cloud Memory",
      price: "₹18,999",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      type: "Memory Foam",
    },
    {
      id: "2",
      name: "Royale Ortho Care",
      price: "₹24,500",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
      type: "Orthopedic",
    },
    {
      id: "3",
      name: "Luxury Spring Hybrid",
      price: "₹32,000",
      img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800",
      type: "Hybrid Spring",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-cream"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-dark/50">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Bedroom" 
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6">
              Sleep Better. <br/><span className="text-brand-gold">Live Better.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
              Premium luxury mattresses designed for ultimate comfort and orthopedic support in Berhampur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/mattresses"
                className="bg-brand-gold text-brand-dark px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                Explore Collection
              </Link>
              <a 
                href="https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20your%20luxury%20mattresses"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white hover:text-brand-dark transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">The Royale Standard</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Premium Comfort", desc: "Crafted with the finest materials for a hotel-like plush feel." },
              { icon: ShieldCheck, title: "Orthopedic Support", desc: "Spine alignment technology for pain-free mornings." },
              { icon: Feather, title: "Breathable Fabric", desc: "Advanced cooling tech keeping you fresh all night." },
              { icon: ThumbsUp, title: "Trusted Warranty", desc: "Up to 10 years of reliable warranty on all models." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-brand-cream/50 p-8 rounded-2xl text-center flex flex-col items-center hover:bg-brand-cream transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 lux-shadow text-brand-gold">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-brand-beige/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Collection</h2>
              <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
            </div>
            <Link to="/mattresses" className="hidden md:flex items-center text-brand-gold font-medium hover:text-brand-gold-dark group">
              View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl overflow-hidden lux-shadow group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 rounded-full">
                    {product.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg text-brand-gold-dark font-medium">{product.price}</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">In Stock</span>
                  </div>
                  <a 
                    href={`https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20${product.name}`}
                    className="w-full block text-center border border-brand-dark text-brand-dark py-3 rounded-full text-sm font-medium hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Link to="/mattresses" className="inline-flex items-center text-brand-dark bg-white px-6 py-3 rounded-full lux-shadow font-medium">
              View All Collection <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <ReviewsMarquee />
    </motion.div>
  );
}
