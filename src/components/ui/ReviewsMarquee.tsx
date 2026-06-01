import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Star } from 'lucide-react';

interface Review {
  id?: string;
  name: string;
  image?: string;
  text: string;
  rating: number;
  mattress?: string;
}

const defaultReviews: Review[] = [
  { name: 'Kavya S.', rating: 5, text: 'Absolutely incredible comfort. The Cloud Memory mattress changed how I sleep completely.', mattress: 'The Cloud Memory', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { name: 'Rohan P.', rating: 5, text: 'Best investment for my back. The orthopedic support is perfect after a long day at work.', mattress: 'Royale Ortho Care', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150' },
  { name: 'Priya D.', rating: 4, text: 'Very premium feel. The showroom staff in Berhampur were extremely helpful in choosing.', mattress: 'Luxury Spring Hybrid', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
  { name: 'Aditya M.', rating: 5, text: 'Stays cool even in summer. The plush top feels like a 5-star hotel bed.', mattress: 'The Cloud Memory' },
  { name: 'Sneha R.', rating: 5, text: 'The quality of the fabric is exceptional. Very happy with my purchase.', mattress: 'Latex Organic Bliss', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
  { name: 'Bikas M.', rating: 5, text: 'Unbelievable value for a luxury mattress. Recommend it to anyone with back issues.', mattress: 'Royale Ortho Care' }
];

export default function ReviewsMarquee() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(12));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const fetched: Review[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            fetched.push({
              id: doc.id,
              name: data.name,
              rating: data.rating,
              text: data.text || '',
              mattress: data.mattress || 'Verified Sleeper',
              image: data.image
            });
          });
          setReviews(fetched);
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews(defaultReviews);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  const row1 = [...reviews, ...reviews, ...reviews];
  const row2 = [...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section className="py-24 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 font-light max-w-xl mx-auto">
            Trusted comfort experiences from happy sleepers. Discover why Deamy Soft is Berhampur's choice for luxury sleep.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col space-y-6 max-w-[100vw]">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-cream to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-cream to-transparent z-10 hidden md:block"></div>

        {/* Top Row (Left to Right) */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex space-x-4 min-w-max"
            animate={{ x: [0, -880] }} // Adjusted tracking layout offset slightly for tighter loops
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35 // Speeds up marquee slightly since travel path is narrower
            }}
          >
            {row1.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Row (Right to Left) */}
        <div className="flex overflow-hidden" dir="rtl">
          <motion.div
            className="flex space-x-4 min-w-max"
            animate={{ x: [0, 880] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40
            }}
            dir="ltr"
          >
            {row2.map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // 👈 Decreased overall card size dimensions from w-[380px] to w-[320px], padding from p-8 to p-5/p-6
      className="w-[260px] md:w-[320px] bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[1.5rem] lux-shadow border border-white/80 mx-2 shrink-0 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          {review.image ? (
            <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark font-serif font-bold text-base shrink-0">
              {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <div className="truncate">
            <h4 className="font-semibold text-brand-dark text-xs md:text-sm truncate">{review.name}</h4>
            {review.mattress && <p className="text-[10px] md:text-xs text-brand-gold truncate">{review.mattress}</p>}
          </div>
        </div>

        <div className="flex space-x-0.5 mb-3">
          {[...Array(review.rating || 5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
          ))}
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed font-light text-xs md:text-sm italic line-clamp-4">
        "{review.text}"
      </p>
    </motion.div>
  );
}