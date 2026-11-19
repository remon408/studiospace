'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/components/auth/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'creator', bio: '', phone: '', location: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, password: formData.password,
          role: formData.role, bio: formData.bio, phone: formData.phone, location: formData.location,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data);
        toast.success('Account created! Welcome to StudioSpace.');
        router.push('/');
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Your Account</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Join StudioSpace and start your creative journey</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  placeholder="Min. 6 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I am a...</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none">
                  <option value="creator">Creator - Looking to book studios</option>
                  <option value="host">Host - Want to list my space</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location (Optional)</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio (Optional)</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about yourself and your creative work..." />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}