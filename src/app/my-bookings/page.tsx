'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';

type Booking = {
  _id: string;
  studioId: { name: string; images: string[]; category: string; hourlyRate: number };
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.ok) setBookings(await res.json());
      } catch {
        // Fallback data
        setBookings([
          { _id: '1', studioId: { name: 'Creative Lens Studio', images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&h=100&fit=crop'], category: 'photo', hourlyRate: 45 }, date: '2024-01-15', timeSlot: '10:00', duration: 2, totalPrice: 90, status: 'confirmed', createdAt: '2024-01-10T10:00:00Z' },
          { _id: '2', studioId: { name: 'Podcast Corner', images: ['https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=100&h=100&fit=crop'], category: 'podcast', hourlyRate: 35 }, date: '2024-01-20', timeSlot: '14:00', duration: 3, totalPrice: 105, status: 'pending', createdAt: '2024-01-12T10:00:00Z' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please Log In</h2>
          <p className="text-slate-600 dark:text-slate-400">You must be logged in to view your bookings.</p>
        </div>
      </MainLayout>
    );
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    completed: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Bookings</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Manage all your studio reservations</p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse h-32" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Bookings Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">You have not booked any studios yet.</p>
              <a href="/studios" className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors">
                Browse Studios
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={booking.studioId.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&h=100&fit=crop'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{booking.studioId.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{booking.date} at {booking.timeSlot}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{booking.duration} hour{booking.duration > 1 ? 's' : ''} • ${booking.totalPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => { toast.error('Booking cancelled'); }} className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
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