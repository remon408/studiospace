'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingReminders: true,
    marketingEmails: false,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-12rem)] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Manage your account preferences</p>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates about your bookings via email' },
                { key: 'bookingReminders', label: 'Booking Reminders', desc: 'Get reminded about upcoming reservations' },
                { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive tips, offers, and platform news' },
                { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900/50">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors">
              Delete Account
            </button>
          </div>

          <button onClick={handleSave} className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  );
}