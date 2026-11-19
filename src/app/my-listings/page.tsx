'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';

type Studio = {
  _id: string; name: string; category: string; city: string;
  hourlyRate: number; rating: number; images: string[]; isActive: boolean;
};

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    // In production, fetch from /api/studios/my-listings
    // For now using fallback
    setStudios([
      { _id: '1', name: 'Creative Lens Studio', category: 'photo', city: 'New York', hourlyRate: 45, rating: 4.8, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'], isActive: true },
    ]);
    setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please Log In</h2>
          <p className="text-slate-600 dark:text-slate-400">You must be logged in to view your listings.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Studio Listings</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage your studio spaces</p>
            </div>
            <Link href="/studios/add" className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25">
              + Add New Studio
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse h-32" />
              ))}
            </div>
          ) : studios.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Studios Listed</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Start listing your creative space today!</p>
              <Link href="/studios/add" className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors">
                List Your Studio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studios.map((studio) => (
                <div key={studio._id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="h-48 overflow-hidden">
                    <img src={studio.images[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'} alt={studio.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{studio.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${studio.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'}`}>
                        {studio.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{studio.city} • ${studio.hourlyRate}/hr</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}