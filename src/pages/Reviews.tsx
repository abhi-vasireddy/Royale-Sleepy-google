import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: "Aarav Patnaik",
      location: "Berhampur",
      text: "The Cloud Memory mattress changed my life. I used to wake up with back pain every morning, but since switching to Royale Sleepy, I feel completely rested.",
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

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Words from Our Sleepers</h1>
          <p className="text-gray-600 text-lg font-light">
            Don't just take our word for it. Read what our valued customers have to say about their Royale Sleepy experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl lux-shadow relative"
            >
              <Quote className="absolute top-8 right-8 w-8 h-8 text-brand-beige/50" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
                {[...Array(5 - review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-gray-200" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic mb-8 font-light text-sm">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark font-serif font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
