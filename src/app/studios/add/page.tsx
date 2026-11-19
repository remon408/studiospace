'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';

export default function AddStudioPage() {
  const [formData, setFormData] = useState({
    name: '', description: '', category: 'photo', subCategory: '',
    location: '', city: '', hourlyRate: '', capacity: '',
    amenities: '', images: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please Log In</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">You must be logged in as a host to list a studio.</p>
          <button onClick={() => router.push('/login')} className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
            Log In
          </button>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/studios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          capacity: Number(formData.capacity),
          amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
          images: formData.images.split(',').map((i) => i.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        toast.success('Studio listed successfully! It is now live on StudioSpace.');
        router.push('/my-listings');
      } else {
        const error = await res.json();
        toast.error(error.message || 'Failed to list studio.');
      }
    } catch {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">List Your Studio</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Fill in the details below to list your creative space on StudioSpace.</p>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Studio Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., Creative Lens Photo Studio" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                placeholder="Describe your space, what it is suitable for, and what makes it special..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none">
                  <option value="photo">📸 Photo Studio</option>
                  <option value="sound">🎵 Sound Stage</option>
                  <option value="podcast">🎙️ Podcast Room</option>
                  <option value="music">🎸 Music Suite</option>
                  <option value="art">🎨 Art Workshop</option>
                  <option value="video">🎬 Video Production</option>
                  <option value="dance">💃 Dance Studio</option>
                  <option value="other">✨ Other Space</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sub-Category</label>
                <input type="text" value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g., Cyc Wall, Green Screen" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Street address or area name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City *</label>
                <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g., New York" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hourly Rate ($) *</label>
                <input type="number" value={formData.hourlyRate} onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })} required min="1"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="45" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Capacity *</label>
                <input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required min="1"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amenities (comma separated)</label>
              <input type="text" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="WiFi, Parking, Air Conditioning, Sound System" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URLs (comma separated)</label>
              <input type="text" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors">
              {loading ? 'Listing Studio...' : 'List My Studio'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}