'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';
import { toast } from 'sonner';

interface Studio {
  _id: string;
  name: string;
  category: string;
  city: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  images: string[];
}

const categoryLabels: Record<string, string> = {
  photo: 'Photo Studio', sound: 'Sound Stage', podcast: 'Podcast Room',
  music: 'Music Suite', art: 'Art Workshop', video: 'Video Production',
  dance: 'Dance Studio', other: 'Creative Space',
};

const categoryColors: Record<string, string> = {
  photo: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  sound: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  podcast: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  music: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  art: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  video: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  dance: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
};

export default function StudioCard({ studio }: { studio: Studio }) {
  const { user, token } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    // Check if studio is in wishlist
    if (user) {
      fetch(`${API_BASE_URL}/api/wishlist/my-wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((items) => {
          setInWishlist(items.some((item: any) => item.studioId._id === studio._id));
        })
        .catch(() => {});
    }
  }, [user, token, studio._id]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.info('Please log in to save studios');
      return;
    }
    setIsSaving(true);
    try {
      if (inWishlist) {
        await fetch(`${API_BASE_URL}/api/wishlist/${studio._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await fetch(`${API_BASE_URL}/api/wishlist/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ studioId: studio._id }),
        });
        setInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
    setIsSaving(false);
  };

  return (
    <Link href={`/studios/${studio._id}`} className="studio-card group block">
      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={studio.images[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'}
            alt={studio.name}
            width={400}
            height={300}
            className="card-image w-full h-full object-cover transition-transform duration-500"
          />
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-red-500 hover:text-white'
            }`}
            disabled={isSaving}
          >
            <svg className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[studio.category] || categoryColors.other}`}>
              {categoryLabels[studio.category] || studio.category}
            </span>
          </div>
          {studio.rating > 0 && (
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{studio.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">({studio.reviewCount})</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {studio.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{studio.city}</span>
          </div>
          <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">${studio.hourlyRate}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400"> / hour</span>
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}