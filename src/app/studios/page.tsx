'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import StudioCard from '@/components/home/StudioCard';
import { API_BASE_URL } from '@/components/auth/AuthContext';

type Studio = {
  _id: string; name: string; description: string; category: string; city: string;
  hourlyRate: number; rating: number; reviewCount: number; images: string[];
};

const categories = [
  { id: 'all', name: 'All Studios', icon: '🌟' },
  { id: 'photo', name: 'Photo Studios', icon: '📸' },
  { id: 'sound', name: 'Sound Stages', icon: '🎵' },
  { id: 'podcast', name: 'Podcast Rooms', icon: '🎙️' },
  { id: 'music', name: 'Music Suites', icon: '🎸' },
  { id: 'art', name: 'Art Workshops', icon: '🎨' },
  { id: 'video', name: 'Video Production', icon: '🎬' },
  { id: 'dance', name: 'Dance Studios', icon: '💃' },
  { id: 'other', name: 'Other Spaces', icon: '✨' },
];

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ category: selectedCategory, sortBy, page: '1', limit: '20' });
        if (search) params.set('search', search);
        const res = await fetch(`${API_BASE_URL}/api/studios?${params}`);
        if (res.ok) {
          const data = await res.json();
          setStudios(data.studios);
        }
      } catch {
        // Fallback data
        setStudios([
          { _id: '1', name: 'Creative Lens Studio', description: 'Professional photo studio', category: 'photo', city: 'New York', hourlyRate: 45, rating: 4.8, reviewCount: 124, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'] },
          { _id: '2', name: 'Wave Sound Stage', description: 'Cinema-grade acoustics', category: 'sound', city: 'Los Angeles', hourlyRate: 85, rating: 4.9, reviewCount: 89, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&sat=-100'] },
          { _id: '3', name: 'Podcast Corner', description: 'Dedicated podcast room', category: 'podcast', city: 'Chicago', hourlyRate: 35, rating: 4.7, reviewCount: 56, images: ['https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop'] },
          { _id: '4', name: 'Melody Suite', description: 'Recording studio', category: 'music', city: 'Nashville', hourlyRate: 65, rating: 4.6, reviewCount: 78, images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop'] },
          { _id: '5', name: 'Artisan Space', description: 'Creative workshop', category: 'art', city: 'Portland', hourlyRate: 30, rating: 4.5, reviewCount: 42, images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop'] },
          { _id: '6', name: 'Film House', description: 'Video production studio', category: 'video', city: 'Austin', hourlyRate: 75, rating: 4.8, reviewCount: 95, images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudios();
  }, [selectedCategory, sortBy, search]);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-[calc(100vh-12rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Explore Studios</h1>

          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search studios by name or location..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="rating">Top Rated</option>
                <option value="hourlyRate">Price: Low to High</option>
                <option value="createdAt">Newest First</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Showing {studios.length} studios {selectedCategory !== 'all' ? `in ${selectedCategory}` : ''}
              </p>
              {studios.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No studios found</h3>
                  <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studios.map((studio) => (
                    <StudioCard key={studio._id} studio={studio} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}