import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to admin
    if (localStorage.getItem('adminAuth') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hardcoded credentials for demo/testing purposes.
    // TODO: Replace with Firebase signInWithEmailAndPassword later
    if (email === 'admin@royalesleepy.com' && password === 'Royale@123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please contact system administrator.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream relative flex items-center justify-center overflow-hidden selection:bg-brand-gold selection:text-white">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-beige/40 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[2rem] lux-shadow border border-white">
          <div className="w-14 h-14 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-8 text-brand-gold shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-brand-dark mb-2">Admin Portal</h1>
            <p className="text-gray-500 font-light text-sm">Sign in to manage Royale Sleepy</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 flex items-start gap-3 border border-red-100"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-brand-cream/50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-brand-gold focus:bg-white transition-all"
                placeholder="admin@royalesleepy.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-cream/50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-brand-gold focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center space-x-2 font-medium"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
