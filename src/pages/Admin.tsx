import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { LogOut, LayoutDashboard, Database, MessageSquare, Users, Image as ImageIcon } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Only subscribe to leads if tab is active
    if (activeTab !== 'leads') return;
    
    // IMPORTANT: In a real app we'd also protect database access using Firebase Rules based on the authenticated user.
    // For this demo, assuming client has access.
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const leadsData: any[] = [];
      snapshot.forEach((doc) => leadsData.push({ id: doc.id, ...doc.data() }));
      setLeads(leadsData);
    });
    return () => unsub();
  }, [activeTab]);

  const handleLogout = () => {
    // TODO: Replace with Firebase signOut(auth) later
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'homepage', icon: LayoutDashboard, label: 'Homepage' },
    { id: 'products', icon: Database, label: 'Products' },
    { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
    { id: 'leads', icon: Users, label: 'Leads' },
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

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-serif mb-8 text-brand-dark capitalize">{activeTab} Management</h2>
        
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

        {activeTab !== 'leads' && (
          <div className="bg-white rounded-2xl p-10 lux-shadow text-center flex flex-col items-center justify-center min-h-[400px]">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-xl font-medium text-brand-dark mb-2">Module Not Implemented Yet</h3>
             <p className="text-gray-500 font-light max-w-md">The {activeTab} management system requires full backend provisioning to save complex relational schema in Firestore. Only leads collection is active for this demo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
