import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { ArrowRight, Loader2, Shield, Sparkles, RefreshCw } from 'lucide-react';

interface PillowProduct {
  id?: string;
  name: string;
  price: number;
  tagline: string;
  image: string;
  description: string;
}

export default function Pillows() {
  const [dbProducts, setDbProducts] = useState<PillowProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial products to display if your Firestore pillows collection is empty
  const fallbackPillows: PillowProduct[] = [
    {
      name: "Sovereign Gel Pillow",
      price: 1999,
      tagline: "Cooling Tech Alignment",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600",
      description: "Infused with thermal fluid micro-beads designed to target cervical alignment contours effortlessly without holding onto head heat."
    },
    {
      name: "Cloud Comfort Memory Pillow",
      price: 2499,
      tagline: "Zero-Gravity Neck Support",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600",
      description: "Premium high-density memory foam engineered to cradle the head and release upper spine pressure for side and back sleepers."
    }
  ];

  useEffect(() => {
    // Queries only products where the category type is explicitly marked 'pillow'
    const q = query(
      collection(db, 'products'),
      where('type', '==', 'pillow'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveItems: PillowProduct[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        liveItems.push({
          id: doc.id,
          name: data.name,
          price: Number(data.price),
          tagline: data.tagline,
          image: data.image,
          description: data.description
        });
      });

      setDbProducts(liveItems);
      setLoading(false);
    }, (error) => {
      console.error("Firestore pillow lookup failure:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayProducts = dbProducts.length > 0 ? dbProducts : fallbackPillows;

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">The Essentials</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Luxury Pillow Collection</h1>
          <p className="text-gray-600 text-lg font-light">
            Plush, breathable contours constructed with premium memory modules to perfectly cradle your head and neck.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          /* Products 4-Column Compact Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((prod, i) => (
              <motion.div
                key={prod.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden lux-shadow border border-gray-100 flex flex-col group justify-between"
              >
                {/* Image Aspect Box */}
                <div className="relative overflow-hidden aspect-video bg-gray-100 shrink-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-brand-gold text-[11px] font-semibold uppercase tracking-wider">
                     ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Info Text Blocks */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-brand-dark mb-1 group-hover:text-brand-gold transition-colors">{prod.name}</h3>
                    <p className="text-[10px] text-brand-gold font-medium tracking-wide mb-3 uppercase truncate">{prod.tagline}</p>
                    <p className="text-gray-500 font-light text-xs leading-relaxed mb-4 line-clamp-4">
                      {prod.description}
                    </p>
                  </div>

                  {/* WhatsApp Hook Call to Action */}
                  <div className="border-t border-gray-50 pt-4 mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">In Stock</span>
                    <a
                      href={`https://wa.me/919999999999?text=Hi%20Gurudev%20Furniture,%20I'm%20interested%20in%20the%20${encodeURIComponent(prod.name)}%20pillow.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Trust Value Props Footer Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-gray-200/60 pt-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Shield className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">Premium Quality</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Rest assured knowing every product uses premium high-density materials engineered to last.</p>
          </div>
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Sparkles className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">100% Breathable Fabrics</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Wrapped in specialized cooling technology structures keeping you fresh all night long.</p>
          </div>
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <RefreshCw className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">Easy Procurement</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Instant assistance and logistics coordination directly from our Bhubaneswar showroom hub.</p>
          </div>
        </div>

      </div>
    </div>
  );
}