'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudios: 0,
    activeBookings: 0,
    totalRevenue: 0,
    avgRating: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Fetch stats from API
      fetch(`${API_BASE_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(() => {
          // Set demo stats
          setStats({
            totalStudios: 12,
            activeBookings: 5,
            totalRevenue: 2450,
            avgRating: 4.8,
          });
          setRecentBookings([
            { _id: '1', studioId: { name: 'Creative Lens Studio' }, date: '2024-01-15', totalPrice: 90, status: 'confirmed' },
            { _id: '2', studioId: { name: 'Podcast Corner' }, date: '2024-01-20', totalPrice: 105, status: 'pending' },
            { _id: '3', studioId: { name: 'Melody Suite' }, date: '2024-01-25', totalPrice: 130, status: 'completed' },
          ]);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please Log In</h2>
          <p className="text-slate-600 dark:text-slate-400">You must be logged in to view your dashboard.</p>
        </div>
      </MainLayout>
    );
  }

  const quickActions = [
    { title: 'Add New Studio', href: '/studios/add', desc: 'List your creative space', icon: '🏠' },
    { title: 'Browse Studios', href: '/studios', desc: 'Find your perfect space', icon: '🔍' },
    { title: 'My Bookings', href: '/my-bookings', desc: 'View upcoming reservations', icon: '📅' },
    { title: 'Edit Profile', href: '/profile', desc: 'Update your information', icon: '👤' },
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Welcome back, {user.name}! Here is your overview.</p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Studios', value: stats.totalStudios, icon: '🏠', color: 'from-blue-500 to-blue-600' },
              { label: 'Active Bookings', value: stats.activeBookings, icon: '📅', color: 'from-green-500 to-green-600' },
              { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'from-amber-500 to-orange-500' },
              { label: 'Avg Rating', value: stats.avgRating, icon: '⭐', color: 'from-purple-500 to-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl mb-4" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Bookings</h2>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{booking.studioId.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{booking.date} • ${booking.totalPrice}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{action.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{action.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}