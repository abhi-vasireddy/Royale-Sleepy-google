import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { LogOut, LayoutDashboard, Database, MessageSquare, Users, Image as ImageIcon, Plus, Loader2, Trash2, IndianRupee, Layers, HelpCircle } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate();

  // Review state properties
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Product state properties
  const [products, setProducts] = useState<any[]>([]);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodTagline, setProdTagline] = useState('');
  const [prodType, setProdType] = useState('mattress');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  // FAQ state properties
  const [faqs, setFaqs] = useState<any[]>([]);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [isSubmittingFaq, setIsSubmittingFaq] = useState(false);

  // Unified real-time listeners dependent on active view pane
  useEffect(() => {
    if (activeTab === 'leads') {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const leadsData: any[] = [];
        snapshot.forEach((doc) => leadsData.push({ id: doc.id, ...doc.data() }));
        setLeads(leadsData);
      });
      return () => unsub();
    }

    if (activeTab === 'reviews') {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const reviewsData: any[] = [];
        snapshot.forEach((doc) => reviewsData.push({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);
      });
      return () => unsub();
    }

    if (activeTab === 'products') {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const productsData: any[] = [];
        snapshot.forEach((doc) => productsData.push({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      });
      return () => unsub();
    }

    // Subscribe to live Firestore FAQs collection updates
    if (activeTab === 'faqs') {
      const q = query(collection(db, 'faqs'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const faqsData: any[] = [];
        snapshot.forEach((doc) => faqsData.push({ id: doc.id, ...doc.data() }));
        setFaqs(faqsData);
      });
      return () => unsub();
    }
  }, [activeTab]);

  // Handle Review submission
  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return alert('Complete all review fields.');
    setIsSubmittingReview(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name: reviewName.trim(),
        rating: Number(reviewRating),
        text: reviewText.trim(),
        createdAt: serverTimestamp(),
      });
      setReviewName('');
      setReviewText('');
      setReviewRating(5);
      alert('Review published cleanly!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Handle Dynamic Product creation
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim() || !prodImage.trim() || !prodDesc.trim()) {
      alert('Please fill out all product specification modules.');
      return;
    }

    setIsSubmittingProduct(true);
    try {
      await addDoc(collection(db, 'products'), {
        name: prodName.trim(),
        price: Number(prodPrice),
        tagline: prodTagline.trim() || 'Luxury Comfort Guaranteed',
        type: prodType,
        image: prodImage.trim(),
        description: prodDesc.trim(),
        createdAt: serverTimestamp(),
      });

      setProdName('');
      setProdPrice('');
      setProdTagline('');
      setProdType('mattress');
      setProdImage('');
      setProdDesc('');
      alert('New item profile written to cloud collections successfully!');
    } catch (error) {
      console.error("Firestore Product Creation Failure:", error);
      alert('Failed to publish product model structure.');
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  // Handle FAQ entry creation
  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert('Please fill out both the question and answer text boxes.');
      return;
    }

    setIsSubmittingFaq(true);
    try {
      await addDoc(collection(db, 'faqs'), {
        question: faqQuestion.trim(),
        answer: faqAnswer.trim(),
        createdAt: serverTimestamp(),
      });

      setFaqQuestion('');
      setFaqAnswer('');
      alert('New FAQ structural entry written to cloud database successfully!');
    } catch (error) {
      console.error("Firestore FAQ Creation Failure:", error);
      alert('Failed to register and publish the FAQ entry.');
    } finally {
      setIsSubmittingFaq(false);
    }
  };

  // Delete a product row helper
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this catalog model?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.error("Deletion issue:", err);
    }
  };

  // Delete an FAQ row helper
  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ entry permanently?')) return;
    try {
      await deleteDoc(doc(db, 'faqs', id));
    } catch (err) {
      console.error("FAQ deletion failure:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'homepage', icon: LayoutDashboard, label: 'Homepage' },
    { id: 'products', icon: Database, label: 'Products' },
    { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
    { id: 'media', icon: ImageIcon, label: 'Media' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex pt-[88px] selection:bg-brand-gold selection:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-brand-dark text-white p-6 shadow-xl z-10 sticky top-[88px] h-[calc(100vh-88px)] flex flex-col">
        <div className="mb-10">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-wider mb-2">Admin Panel</p>
          <p className="opacity-70 text-sm">admin@royalesleepy.com</p>
        </div>

        <nav className="space-y-2 flex-grow">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-colors ${activeTab === item.id ? 'bg-brand-gold text-brand-dark font-medium' : 'hover:bg-gray-800 text-gray-300'}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 text-gray-400 hover:text-white transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-serif mb-8 text-brand-dark capitalize">{activeTab} Management</h2>

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl lux-shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="font-medium text-gray-600 p-4">Name</th>
                  <th className="font-medium text-gray-600 p-4">Phone</th>
                  <th className="font-medium text-gray-600 p-4">Message</th>
                  <th className="font-medium text-gray-600 p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={4} className="text-center p-6 text-gray-500 text-sm">No leads found.</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-brand-dark">{lead.name}</td>
                      <td className="p-4 text-sm text-gray-600">{lead.phone}</td>
                      <td className="p-4 text-sm text-gray-600 max-w-[200px] truncate">{lead.message || '-'}</td>
                      <td className="p-4 text-sm text-gray-500">
                         {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="bg-white rounded-2xl p-6 lux-shadow border border-gray-100 lg:col-span-1">
              <h3 className="text-lg font-serif font-medium text-brand-dark mb-4 flex items-center gap-2">Add New Review</h3>
              <form onSubmit={handleCreateReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Customer Name</label>
                  <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Rating Stars</label>
                  <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-white">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Review Text</label>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" />
                </div>
                <button type="submit" disabled={isSubmittingReview} className="w-full p-3 bg-brand-dark text-white rounded-xl font-medium text-sm">
                  {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Publish Live Review'}
                </button>
              </form>
            </div>
            <div className="bg-white rounded-2xl lux-shadow overflow-hidden lg:col-span-2 border border-gray-100">
              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5">
                    <h4 className="font-medium text-sm text-brand-dark">{rev.name} - {rev.rating}★</h4>
                    <p className="text-xs text-gray-600 font-light mt-1">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column Form */}
            <div className="bg-white rounded-2xl p-6 lux-shadow border border-gray-100 lg:col-span-1">
              <h3 className="text-lg font-serif font-medium text-brand-dark mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add Collection Item
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Product Category</label>
                  <div className="relative">
                    <select
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value)}
                      className="w-full appearance-none px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none bg-white focus:border-brand-gold transition-colors cursor-pointer"
                    >
                      <option value="mattress">Mattress 🛏️</option>
                      <option value="pillow">Pillow ☁️</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <Layers className="w-4 h-4 text-brand-gold" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Memory Foam Ultra"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Starting Price (INR)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="e.g. 14999"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Product Tagline</label>
                  <input
                    type="text"
                    value={prodTagline}
                    onChange={(e) => setProdTagline(e.target.value)}
                    placeholder="e.g. Orthopedic Support Matrix"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unsplash Image URL Link</label>
                  <input
                    type="text"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description Specs</label>
                  <textarea
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Highlight core materials, layer configurations, and structural layouts..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingProduct}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-brand-dark text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmittingProduct ? (
                    <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                  ) : (
                    <>
                      <Database className="w-4 h-4 text-brand-gold" />
                      <span>Save Live Item</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column Product Row Display List */}
            <div className="bg-white rounded-2xl lux-shadow overflow-hidden lg:col-span-2 border border-gray-100">
              <div className="p-4 bg-gray-50 border-b font-medium text-gray-700 text-sm font-serif">
                Showroom Online Inventory ({products.length})
              </div>

              <div className="divide-y divide-gray-100 max-h-[620px] overflow-y-auto">
                {products.length === 0 ? (
                  <div className="text-center p-12 text-gray-400 text-sm">No items in inventory database. Create a card profile to populate.</div>
                ) : (
                  products.map((prod) => (
                    <div key={prod.id} className="p-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-brand-dark truncate">{prod.name}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${prod.type === 'pillow' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-brand-cream text-brand-gold-dark border border-brand-gold/20'}`}>
                            {prod.type || 'mattress'}
                          </span>
                        </div>
                        <p className="text-xs text-brand-gold font-medium flex items-center gap-0.5 mt-0.5">
                          <IndianRupee className="w-3 h-3" />
                          {prod.price.toLocaleString('en-IN')} onwards
                        </p>
                        <p className="text-[11px] text-gray-500 truncate mt-1">{prod.tagline}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-gray-100 transition-all shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* FAQS MANAGEMENT TAB */}
        {activeTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column FAQ Entry Form */}
            <div className="bg-white rounded-2xl p-6 lux-shadow border border-gray-100 lg:col-span-1">
              <h3 className="text-lg font-serif font-medium text-brand-dark mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New FAQ
              </h3>

              <form onSubmit={handleCreateFaq} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Question Text</label>
                  <input
                    type="text"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    placeholder="e.g., Do you offer custom sizes?"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Answer Summary</label>
                  <textarea
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    placeholder="Provide a detailed solution summary for visitors..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingFaq}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-brand-dark text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmittingFaq ? (
                    <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-brand-gold" />
                      <span>Publish FAQ</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column FAQ List Render */}
            <div className="bg-white rounded-2xl lux-shadow overflow-hidden lg:col-span-2 border border-gray-100">
              <div className="p-4 bg-gray-50 border-b font-medium text-gray-700 text-sm font-serif">
                Showroom Live FAQs ({faqs.length})
              </div>

              <div className="divide-y divide-gray-100 max-h-[620px] overflow-y-auto">
                {faqs.length === 0 ? (
                  <div className="text-center p-12 text-gray-400 text-sm">No FAQs written to database yet. Create a module to populate.</div>
                ) : (
                  faqs.map((faq) => (
                    <div key={faq.id} className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-brand-dark leading-snug">Q: {faq.question}</h4>
                        <p className="text-xs text-gray-500 font-light mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100 whitespace-pre-wrap">A: {faq.answer}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-gray-100 transition-all shrink-0 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT DEMO WRAPPER FOR REMAINING MODULES */}
        {activeTab !== 'leads' && activeTab !== 'reviews' && activeTab !== 'products' && activeTab !== 'faqs' && (
          <div className="bg-white rounded-2xl p-10 lux-shadow text-center flex flex-col items-center justify-center min-h-[400px]">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-xl font-medium text-brand-dark mb-2">Module Not Implemented Yet</h3>
             <p className="text-gray-500 font-light max-w-md">The {activeTab} management system requires full backend configurations.</p>
          </div>
        )}
      </div>
    </div>
  );
}