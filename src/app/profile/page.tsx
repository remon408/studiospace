'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthContext';
import { API_BASE_URL } from '@/components/auth/AuthContext';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '', email: '', bio: '', phone: '', location: '',
  });
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '', email: user.email || '', bio: '', phone: '', location: '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch {
      toast.error('Connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please Log In</h2>
          <p className="text-slate-600 dark:text-slate-400">You must be logged in to view your profile.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Profile Settings</h1>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  placeholder="Tell us about yourself and your creative work..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="City, Country" />
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}