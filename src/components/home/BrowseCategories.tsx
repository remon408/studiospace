'use client';

import { useRouter } from 'next/navigation';

const categories = [
  { id: 'photo', name: 'Photo Studios', icon: '📸', description: 'Cyc walls, professional backdrops & lighting setups for stunning shoots', count: 120 },
  { id: 'sound', name: 'Sound Stages', icon: '🎵', description: 'Cinema-grade acoustics and professional sound equipment', count: 85 },
  { id: 'podcast', name: 'Podcast Rooms', icon: '🎙️', description: 'Dedicated podcast lounges with recording and streaming gear', count: 65 },
  { id: 'music', name: 'Music Suites', icon: '🎸', description: 'Recording studios with instruments, mixing consoles & amplifiers', count: 95 },
  { id: 'art', name: 'Art Workshops', icon: '🎨', description: 'Creative spaces for painting, sculpture, pottery & crafts', count: 40 },
  { id: 'video', name: 'Video Production', icon: '🎬', description: 'Full video production with editing bays and green screens', count: 55 },
  { id: 'dance', name: 'Dance Studios', icon: '💃', description: 'Mirrored floors, barres & professional sound systems', count: 30 },
  { id: 'other', name: 'Other Spaces', icon: '✨', description: 'Unique creative spaces not listed above', count: 25 },
];

export default function BrowseCategories() {
  const router = useRouter();

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Browse by Studio Category
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find the perfect space for your creative needs, filtered by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => router.push(`/studios?category=${cat.id}`)}
              className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-left hover:bg-amber-50 dark:hover:bg-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {cat.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  {cat.count} spaces
                </span>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}