'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layouts/ThemeProvider';
import { AuthProvider } from '@/components/auth/AuthContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}