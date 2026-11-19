'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    { label: 'Total Studios', value: '12', icon: '🏠', color: 'from-blue-500 to-blue-600' },
    { label: 'Active Bookings', value: '5', icon: '📅', color: 'from-green-500 to-green-600' },
    { label: 'Total Revenue', value: '$2,450', icon: '💰', color: 'from-amber-500 to-orange-500' },
    { label: 'Avg Rating', value: '4.8', icon: '⭐', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400">Welcome back! Here is your overview.</p>
            </div>
            <button onClick={() => router.push('/studios/add')} className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25">
              + Add New Studio
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'My Studios', desc: 'View and manage your studio listings', href: '/my-listings', icon: '🏠' },
              { title: 'My Bookings', desc: 'Track your upcoming and past bookings', href: '/my-bookings', icon: '📅' },
              { title: 'Edit Profile', desc: 'Update your personal information', href: '/profile', icon: '👤' },
            ].map((action) => (
              <button key={action.title} onClick={() => router.push(action.href)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all text-left">
                <div className="text-2xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{action.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}