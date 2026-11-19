'use client';

import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSlider from '@/components/home/HeroSlider';
import BrowseCategories from '@/components/home/BrowseCategories';
import StudioCard from '@/components/home/StudioCard';
import HowItWorks from '@/components/home/HowItWorks';
import { API_BASE_URL } from '@/components/auth/AuthContext';

interface Studio {
  _id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  images: string[];
}

export default function HomePage() {
  const [featuredStudios, setFeaturedStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/studios/featured`);
        if (res.ok) {
          const data = await res.json();
          setFeaturedStudios(data);
        }
      } catch {
        // Use fallback data if API unavailable
        setFeaturedStudios([
          { _id: '1', name: 'Creative Lens Photo Studio', description: 'Professional photo studio with cyc walls', category: 'photo', city: 'New York', hourlyRate: 45, rating: 4.8, reviewCount: 124, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'] },
          { _id: '2', name: 'Wave Sound Stage', description: 'Cinema-grade sound stage with full equipment', category: 'sound', city: 'Los Angeles', hourlyRate: 85, rating: 4.9, reviewCount: 89, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&sat=-100'] },
          { _id: '3', name: 'Podcast Corner Lounge', description: 'Dedicated podcast recording lounge', category: 'podcast', city: 'Chicago', hourlyRate: 35, rating: 4.7, reviewCount: 56, images: ['https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop'] },
          { _id: '4', name: 'Melody Recording Suite', description: 'Full recording suite with mixing console', category: 'music', city: 'Nashville', hourlyRate: 65, rating: 4.6, reviewCount: 78, images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop'] },
          { _id: '5', name: 'Artisan Workshop Space', description: 'Creative art workshop with natural lighting', category: 'art', city: 'Portland', hourlyRate: 30, rating: 4.5, reviewCount: 42, images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop'] },
          { _id: '6', name: 'Film House Production', description: 'Full video production with editing bay', category: 'video', city: 'Austin', hourlyRate: 75, rating: 4.8, reviewCount: 95, images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <MainLayout>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Studios */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Featured Studios
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Hand-picked top-rated studios for your next project
              </p>
            </div>
            <button
              onClick={() => router.push('/studios')}
              className="hidden sm:inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStudios.map((studio) => (
                <StudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => router.push('/studios')}
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
            >
              View All Studios
            </button>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <BrowseCategories />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Creative Space to Share?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of hosts earning income from their unused studios. List your space on StudioSpace and connect with creators worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
            >
              Start Hosting Today
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />
    </MainLayout>
  );
}