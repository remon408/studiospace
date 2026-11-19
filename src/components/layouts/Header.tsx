'use client';

import { ThemeContext } from '@/components/layouts/ThemeProvider';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/studios', label: 'Explore Studios' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
];

const categoryIcons: Record<string, string> = {
  photo: '📸',
  sound: '🎵',
  podcast: '🎙️',
  music: '🎸',
  art: '🎨',
  video: '🎬',
  dance: '💃',
  other: '✨',
};

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.5-7.5l-1.5 1.5m-9 9l-1.5 1.5m12-9l-1.5 1.5m-9 9l-1.5 1.5" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              StudioSpace
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {!user ? (
              <>
                <Link href="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Log In
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors">
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                      Dashboard
                    </Link>
                    <Link href="/studios/add" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                      Add New Studio
                    </Link>
                    <Link href="/my-listings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                      My Studio Listings
                    </Link>
                    <Link href="/my-bookings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                      My Bookings
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-700 mt-1 pt-1">
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 mt-3 px-4">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg">
                  Log In
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}