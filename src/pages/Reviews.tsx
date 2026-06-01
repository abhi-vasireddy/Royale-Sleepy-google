import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface ReviewItem {
  id?: string;
  name: string;
  location?: string;
  text: string;
  rating: number;
}

export default function Reviews() {
  const [dbReviews, setDbReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial reviews to display if the database doesn't have entries yet
  const fallbackReviews: ReviewItem[] = [
    {
      name: "Aarav Patnaik",
      location: "Berhampur",
      text: "The Cloud Memory mattress changed my life. I used to wake up with back pain every morning, but since switching to Deamy Soft, I feel completely rested.",
      rating: 5,
    },
    {
      name: "Sneha Mishra",
      location: "Bhubaneswar",
      text: "Premium quality at a very reasonable price. The buying experience was smooth and the WhatsApp support team guided me perfectly to choose the Ortho Care model.",
      rating: 5,
    },
    {
      name: "Rajesh Mohanty",
      location: "Berhampur",
      text: "Very elegant showroom and excellent products. The Spring Hybrid is incredibly comfortable. highly recommended for anyone looking for luxury sleep.",
      rating: 5,
    },
    {
      name: "Priya Das",
      location: "Cuttack",
      text: "I was skeptical about buying without trying it for long, but the staff was so helpful. It’s been 6 months and the mattress still feels brand new.",
      rating: 4,
    },
    {
      name: "Bikash Sahoo",
      location: "Berhampur",
      text: "The cooling fabric actually works. Summers in Odisha are tough, but this mattress stays surprisingly cool. Great investment.",
      rating: 5,
    },
    {
      name: "Anjali Rath",
      location: "Berhampur",
      text: "Bought a King size Memory Foam. Delivery was prompt and the luxurious feel of the mattress is exactly like staying in a 5-star hotel.",
      rating: 5,
    }
  ];

  // Subscribe to real-time reviews collection updates from Firestore
  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveReviews: ReviewItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        liveReviews.push({
          id: doc.id,
          name: data.name,
          location: data.location || "Verified Buyer", // Uses fallback label if location isn't provided via admin
          text: data.text,
          rating: data.rating,
        });
      });

      setDbReviews(liveReviews);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch database reviews: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Combine database values with placeholder elements if real-time state is blank
  const displayReviews = dbReviews.length > 0 ? dbReviews : fallbackReviews;

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Words from Our Sleepers</h1>
          <p className="text-gray-600 text-lg font-light">
            Don't just take our word for it. Read what our valued customers have to say about their Deamy Soft experience.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReviews.map((review, i) => (
              <motion.div
                key={review.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                className="bg-white p-8 rounded-2xl lux-shadow relative flex flex-col justify-between"
              >
                <Quote className="absolute top-8 right-8 w-8 h-8 text-brand-beige/50" />

                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed italic mb-8 font-light text-sm">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark font-serif font-bold shrink-0">
                    {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}