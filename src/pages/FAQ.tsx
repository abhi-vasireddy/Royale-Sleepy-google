import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ChevronDown, HelpCircle, Loader2, MessageCircle } from 'lucide-react';

interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fallbackFaqs: FaqItem[] = [
    {
      question: "Do you provide custom sizing adjustments for mattresses?",
      answer: "Yes, absolutely! We can customize the dimensions (length, width, and thickness) of our mattresses to perfectly match your specific bed frames. Reach out to our team on WhatsApp for precise inquiries."
    },
    {
      question: "What is your showroom delivery process within Bhubaneswar?",
      answer: "We offer completely free doorstep distribution across Bhubaneswar. Our specialized transit vehicle will securely package and transport your mattress right to your bedroom floor."
    },
    {
      question: "What kind of warranty coverage comes with the mattresses?",
      answer: "Our premium mattress series carries a dependable replacement warranty extending up to 10 years, covering internal sagging, structural layer failures, or spring warping."
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'faqs'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveFaqs: FaqItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        liveFaqs.push({
          id: doc.id,
          question: data.question,
          answer: data.answer
        });
      });
      setFaqs(liveFaqs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore FAQ list read failure:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-4 block">Help Center</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-brand-dark">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Got questions about sizes, materials, or delivery terms? Find clear, direct answers prepared by our sleep consulting team.
          </p>
        </div>

        {/* Loading Matrix */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          /* Animated Expandable Accordion List Container */
          <div className="space-y-4">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left outline-none focus:outline-none transition-colors hover:bg-gray-50/50 group"
                  >
                    <div className="flex items-start space-x-3.5 pr-4">
                      <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-serif font-medium text-base md:text-lg text-brand-dark group-hover:text-brand-gold transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 pl-12 border-t border-gray-50 text-sm md:text-base text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Dynamic Help Footer Block */}
        <div className="mt-16 bg-brand-dark text-white rounded-3xl p-8 md:p-10 text-center lux-shadow flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl mb-2 text-white">Still have query modules remaining?</h3>
            <p className="text-gray-400 font-light text-sm">Connect with our support team straight on WhatsApp for rapid support turnaround.</p>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi,%20I%20have%20a%20question%20regarding%20Deamy%20Soft%20products."
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 bg-brand-gold text-brand-dark px-6 py-3.5 rounded-full hover:bg-white transition-colors font-medium text-sm tracking-wide shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Expert</span>
          </a>
        </div>

      </div>
    </div>
  );
}