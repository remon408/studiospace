'use client';

import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

export default function HowItWorksPage() {
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

  const [activeTab, setActiveTab] = useState<'book' | 'host'>('book');

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-[calc(100vh-12rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How StudioSpace Works</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Whether you are looking for a space or want to host one, we make it simple.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-slate-200 dark:bg-slate-700 rounded-xl p-1">
                <button onClick={() => setActiveTab('book')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'book' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Find a Studio
                </button>
                <button onClick={() => setActiveTab('host')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'host' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Host Your Space
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(activeTab === 'book' ? bookSteps : hostSteps).map((item) => (
                <div key={item.step} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                  <div className="absolute top-4 right-4 text-sm font-bold text-amber-500">{String(item.step).padStart(2, '0')}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: 'How do I book a studio?', a: 'Simply browse studios, select your preferred date and time, and confirm your booking. Payment is processed securely through our platform.' },
                { q: 'Can I cancel my booking?', a: 'Yes! You can cancel your booking through your dashboard. Cancellation policies vary by host.' },
                { q: 'How do I list my studio?', a: 'Create an account, verify your host status, and use the Add New Studio form to list your space.' },
                { q: 'Is StudioSpace free to use?', a: 'Finding and booking studios is free. We charge a small service fee on each booking to maintain our platform.' },
                { q: 'What categories of studios are available?', a: 'We offer photo studios, sound stages, podcast rooms, music suites, art workshops, video production spaces, and dance studios.' },
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to Get Started?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Join thousands of creators on StudioSpace today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/register" className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors">Create Free Account</a>
              <a href="/studios" className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-300 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-600 transition-colors">Browse Studios</a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-left">
        <span className="font-medium text-slate-900 dark:text-white pr-4">{question}</span>
        <svg className={`w-5 h-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">{answer}</div>}
    </div>
  );
}