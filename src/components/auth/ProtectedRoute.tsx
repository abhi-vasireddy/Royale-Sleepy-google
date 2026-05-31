import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Replace with Firebase onAuthStateChanged later
    const authStatus = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4"></div>
          <p className="text-brand-dark font-serif animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
