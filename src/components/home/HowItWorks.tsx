'use client';

import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/components/auth/AuthContext';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'book' | 'host'>('book');

  const bookSteps = [
    { step: 1, title: 'Search & Discover', description: 'Browse thousands of creative spaces by category, location, and amenities using our advanced filters.', icon: '🔍' },
    { step: 2, title: 'Compare & Choose', description: 'View detailed listings with photos, hourly rates, availability calendars, and reviews from other creators.', icon: '⭐' },
    { step: 3, title: 'Book Your Slot', description: 'Select your preferred date and time slot, review the transparent pricing, and confirm your booking instantly.', icon: '📅' },
    { step: 4, title: 'Create & Enjoy', description: 'Show up to your booked studio, start creating, and leave a review to help fellow creators.', icon: '🎨' },
  ];

  const hostSteps = [
    { step: 1, title: 'Create Your Listing', description: 'Add your creative space with photos, description, amenities, and set your pricing and availability.', icon: '📝' },
    { step: 2, title: 'Set Your Rules', description: 'Define your availability calendar, booking policies, cancellation terms, and house rules.', icon: '⚙️' },
    { step: 3, title: 'Get Booked', description: 'Receive booking requests, manage your calendar, and get notified of new reservations instantly.', icon: '🔔' },
    { step: 4, title: 'Earn & Grow', description: 'Build your reputation with great reviews, grow your client base, and maximize your studio income.', icon: '💰' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            How StudioSpace Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Whether you are looking for a space or want to host one, we make it simple
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-slate-200 dark:bg-slate-700 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'book' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Find a Studio
            </button>
            <button
              onClick={() => setActiveTab('host')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'host' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Host Your Space
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeTab === 'book' ? bookSteps : hostSteps).map((item) => (
            <div key={item.step} className="relative group">
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-amber-300 to-transparent dark:from-amber-600 z-0" style={{ width: 'calc(100% - 3rem)', right: 'calc(100% - 1.5rem)' }} />
              )}
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 h-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4 text-sm font-bold text-amber-500">
                  {String(item.step).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '10,000+', label: 'Studios Listed' },
            { value: '50,000+', label: 'Happy Creators' },
            { value: '100K+', label: 'Bookings Made' },
            { value: '200+', label: 'Cities Covered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}