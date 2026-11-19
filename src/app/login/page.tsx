'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/components/auth/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data);
        toast.success('Welcome back to StudioSpace!');
        router.push('/');
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || 'Login failed. Please check your credentials.');
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Log in to your StudioSpace account</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}