import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Star, ArrowRight, Loader2, Shield, Sparkles, RefreshCw } from 'lucide-react';

interface MattressProduct {
  id?: string;
  name: string;
  price: number;
  tagline: string;
  image: string;
  description: string;
}

export default function Mattresses() {
  const [dbProducts, setDbProducts] = useState<MattressProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial products to display if your Firestore database collection is empty[cite: 1]
  const fallbackProducts: MattressProduct[] = [
    {
      name: "The Cloud Memory",
      price: 12999,
      tagline: "Ultra plush temperature regulating luxurious foam layers.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600",
      description: "Infused with responsive zero-gravity memory configurations designed to contour organically around stress centers while minimizing motion transfer."
    },
    {
      name: "Royale Ortho Care",
      price: 15499,
      tagline: "Chiropractor endorsed 5-zone spinal alignment support matrix.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600",
      description: "Engineered specifically for persistent back discomfort using high-density rebonded support systems that counter pressure dynamically."
    },
    {
      name: "Luxury Spring Hybrid",
      price: 18999,
      tagline: "Individually pocketed steel springs with pocket-mesh breathable profiles.",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
      description: "Combines premium high-tensile pocket coil assemblies with cooling organic gel caps to ensure bounce without heat retention."
    }
  ];

  // Subscribe to live Firestore product database collection updates[cite: 1]
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveItems: MattressProduct[] = [];
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
      console.error("Firestore database product retrieval issue:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayProducts = dbProducts.length > 0 ? dbProducts : fallbackProducts;

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Page Header[cite: 1] */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">The Collection</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Premium Mattress Ecosystem</h1>
          <p className="text-gray-600 text-lg font-light">
            Meticulously engineered luxury comfort models built for restful sleep. Explore premium mattress designs available at our Berhampur showroom.
          </p>
        </div>

        {/* Loading Indicator[cite: 1] */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          /* Products Grid Layout - 👈 Changed from lg:grid-cols-3 to lg:grid-cols-4 for tighter sizing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((prod, i) => (
              <motion.div
                key={prod.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                // 👈 Changed border radius slightly to rounded-2xl to match smaller aesthetic profile
                className="bg-white rounded-2xl overflow-hidden lux-shadow border border-gray-100 flex flex-col group justify-between"
              >
                {/* Image Section[cite: 1] */}
                {/* 👈 Changed aspect ratio from aspect-[4/3] to aspect-video to shrink vertical image footprint */}
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

                {/* Info Text Blocks[cite: 1] */}
                {/* 👈 Decreased layout internal padding from p-8 to p-5 */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* 👈 Reduced typography heading styles from text-2xl to text-xl */}
                    <h3 className="text-xl font-serif text-brand-dark mb-1 group-hover:text-brand-gold transition-colors">{prod.name}</h3>
                    <p className="text-[10px] text-brand-gold font-medium tracking-wide mb-3 uppercase truncate">{prod.tagline}</p>
                    {/* 👈 Adjusted text scale down to text-xs to match smaller width bounds smoothly */}
                    <p className="text-gray-500 font-light text-xs leading-relaxed mb-4 line-clamp-4">
                      {prod.description}
                    </p>
                  </div>

                  {/* Showroom Call-To-Action Hooks[cite: 1] */}
                  <div className="border-t border-gray-50 pt-4 mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Available</span>
                    <a
                      href={`https://wa.me/91XXXXXXXXXX?text=Hi%20Royale%20Sleepy,%20I'm%20interested%20in%20the%20${encodeURIComponent(prod.name)}%20mattress%20model.`}
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

        {/* Brand Value Props Footer Banner[cite: 1] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-gray-200/60 pt-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Shield className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">10 Year Warranty</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Rest assured knowing every dynamic product layer core is backed by institutional replacement coverage warranties.</p>
          </div>
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Sparkles className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">100% Organic Fabrics</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">We skin-wrap our mattresses in pure bamboo fabrics or eco-certified anti-dustmite yarn layouts.</p>
          </div>
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <RefreshCw className="w-8 h-8 text-brand-gold mb-4" />
            <h4 className="font-serif font-medium text-lg mb-1 text-brand-dark">Free Doorstep Delivery</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Direct transit distribution vehicles roll straight to your house anywhere in Berhampur at no extra charge.</p>
          </div>
        </div>

      </div>
    </div>
  );
}