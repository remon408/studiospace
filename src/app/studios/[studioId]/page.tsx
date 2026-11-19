'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';

type Studio = {
  _id: string; name: string; description: string; category: string;
  city: string; location: string; hourlyRate: number; rating: number;
  reviewCount: number; images: string[]; amenities: string[]; capacity: number;
  ownerId: { name: string; image?: string }; availableSlots?: any[];
};

type Review = { _id: string; userName: string; rating: number; comment: string; createdAt: string };

const categoryLabels: Record<string, string> = {
  photo: 'Photo Studio', sound: 'Sound Stage', podcast: 'Podcast Room',
  music: 'Music Suite', art: 'Art Workshop', video: 'Video Production',
  dance: 'Dance Studio', other: 'Creative Space',
};

const categoryIcons: Record<string, string> = {
  photo: '📸', sound: '🎵', podcast: '🎙️', music: '🎸',
  art: '🎨', video: '🎬', dance: '💃', other: '✨',
};

export default function StudioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState(2);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studioRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/studios/${params.studioId}`),
          fetch(`${API_BASE_URL}/api/reviews/${params.studioId}`),
        ]);
        if (studioRes.ok) setStudio(await studioRes.json());
        if (reviewsRes.ok) setReviews(await reviewsRes.json());
      } catch {
        // Fallback
        setStudio({
          _id: params.studioId as string,
          name: 'Creative Studio Space',
          description: 'A beautiful professional studio space equipped with everything you need for your creative projects. Features natural lighting, professional equipment, and a comfortable environment.',
          category: 'photo', city: 'New York', location: '123 Creative Ave, NY',
          hourlyRate: 45, rating: 4.8, reviewCount: 124, images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop'],
          amenities: ['Professional Lighting', 'Cyc Wall', 'Tripod', 'Backdrops', 'WiFi', 'Parking', 'Air Conditioning', 'Sound System'],
          capacity: 10, ownerId: { name: 'Jane Smith' }, availableSlots: [
            { date: new Date().toISOString().split('T')[0], slots: [
              { time: '09:00', available: true }, { time: '10:00', available: true },
              { time: '11:00', available: false }, { time: '14:00', available: true },
              { time: '15:00', available: true }, { time: '16:00', available: false },
            ]},
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.studioId]);

  const handleBooking = async () => {
    if (!user) {
      toast.info('Please log in to book a studio');
      router.push('/login');
      return;
    }
    if (!bookingDate || !bookingTime) {
      toast.error('Please select a date and time for your booking.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ studioId: studio!._id, date: bookingDate, timeSlot: bookingTime, duration: bookingDuration }),
      });
      if (res.ok) {
        toast.success('Booking confirmed! Your studio slot has been reserved.');
        router.push('/my-bookings');
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch {
      toast.error('Connection error. Please try again.');
    }
  };

  const handleReview = async () => {
    if (!user || !reviewText.trim()) {
      toast.error('Please write a review before submitting.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ studioId: studio!._id, rating: reviewRating, comment: reviewText }),
      });
      if (res.ok) {
        toast.success('Review submitted successfully!');
        setShowReviewForm(false);
        setReviewText('');
        router.refresh();
      }
    } catch {
      toast.error('Failed to submit review.');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full" />
        </div>
      </MainLayout>
    );
  }

  if (!studio) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Studio Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The studio you are looking for may have been removed.</p>
          <button onClick={() => router.push('/studios')} className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
            Browse Studios
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Studios
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Images & Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image gallery */}
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <Image src={studio.images[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop'}
                  alt={studio.name} width={800} height={500} className="w-full h-[400px] object-cover" />
              </div>
              {studio.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {studio.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-square">
                      <Image src={img} alt="" width={200} height={200} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{categoryIcons[studio.category]}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{categoryLabels[studio.category]}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{studio.name}</h1>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">${studio.hourlyRate}</div>
                    <div className="text-sm text-slate-500">per hour</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {studio.rating.toFixed(1)} ({studio.reviewCount} reviews)
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {studio.location}, {studio.city}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Up to {studio.capacity} people
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">About This Space</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{studio.description}</p>
                </div>

                {/* Amenities */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {studio.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reviews ({studio.reviewCount})</h3>
                  {user && (
                    <button onClick={() => setShowReviewForm(!showReviewForm)} className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">
                      Write a Review
                    </button>
                  )}
                </div>

                {showReviewForm && user && (
                  <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium">Your Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setReviewRating(star)} className="text-2xl">
                            {star <= reviewRating ? '⭐' : '☆'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this studio..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none mb-3"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleReview} className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">Submit Review</button>
                      <button onClick={() => setShowReviewForm(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white transition-colors">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {reviews.length > 0 ? reviews.map((review) => (
                    <div key={review._id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">{review.userName}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < review.rating ? 'text-amber-500' : 'text-slate-300'}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
                    </div>
                  )) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 py-4">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Book This Studio</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Date</label>
                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
                    <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none">
                      <option value="">Select a time</option>
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                    <select value={bookingDuration} onChange={(e) => setBookingDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none">
                      {[1, 2, 3, 4, 5, 6].map((h) => (
                        <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">${studio.hourlyRate} x {bookingDuration} hours</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${studio.hourlyRate * bookingDuration}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-slate-900 dark:text-white">Total</span>
                      <span className="text-amber-600 dark:text-amber-400">${studio.hourlyRate * bookingDuration}</span>
                    </div>
                  </div>

                  <button onClick={handleBooking}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-500/25">
                    Confirm Booking
                  </button>
                </div>

                {/* Host info */}
                <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hosted by</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {studio.ownerId?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{studio.ownerId?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Verified Host</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}