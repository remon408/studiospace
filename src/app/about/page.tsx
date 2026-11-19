'use client';

import MainLayout from '@/components/layouts/MainLayout';

export default function AboutPage() {
  const team = [
    { name: 'Alex Rivera', role: 'Founder & CEO', bio: 'Filmmaker turned entrepreneur passionate about connecting creators with spaces.', avatar: '🎬' },
    { name: 'Jordan Chen', role: 'CTO', bio: 'Full-stack developer with 10+ years building scalable platforms.', avatar: '💻' },
    { name: 'Sam Williams', role: 'Head of Community', bio: 'Photographer and community builder dedicated to empowering creators.', avatar: '📸' },
    { name: 'Morgan Lee', role: 'Design Lead', bio: 'UX designer who believes great tools should be accessible to everyone.', avatar: '🎨' },
  ];

  const values = [
    { icon: '🌍', title: 'Accessibility', description: 'Making professional creative spaces accessible to everyone, regardless of budget or location.' },
    { icon: '🤝', title: 'Community', description: 'Building a supportive network of creators, hosts, and enthusiasts who inspire each other.' },
    { icon: '✨', title: 'Quality', description: 'Curating high-quality spaces and ensuring a seamless booking experience for all users.' },
    { icon: '📈', title: 'Growth', description: 'Helping hosts grow their business and creators elevate their work through better spaces.' },
  ];

  return (
    <MainLayout>
      <div className="bg-white dark:bg-slate-900 min-h-[calc(100vh-12rem)]">
        {/* Hero */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About StudioSpace</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We believe every creator deserves access to the right space to bring their vision to life.
              StudioSpace connects creative professionals with the perfect workspace.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '10,000+', label: 'Studios Listed' },
              { value: '50,000+', label: 'Active Creators' },
              { value: '100K+', label: 'Bookings Made' },
              { value: '200+', label: 'Cities Worldwide' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                StudioSpace was born from a simple frustration: finding the right creative space was too hard.
                Photographers needed studios with the right lighting. Podcasters needed quiet rooms. Filmmakers
                needed stages with proper acoustics.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Meanwhile, countless studio owners had empty spaces sitting idle during off-hours, while creators
                struggled to find affordable, professional spaces near them.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We built StudioSpace to bridge this gap. Today, our platform connects creators with hosts in
                over 200 cities, offering everything from photo cyc walls to full cinema sound stages.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['📸', '🎵', '🎙️', '🎸'].map((icon, i) => (
                <div key={i} className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8 flex items-center justify-center text-5xl hover:scale-105 transition-transform">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-slate-50 dark:bg-slate-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}