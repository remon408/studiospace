'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'Your Creative Space Awaits',
    subtitle: 'Discover and book professional studios for photography, podcasting, music production, and more.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop',
    cta1: 'Explore Studios',
    cta2: 'Host Your Space',
  },
  {
    title: 'Professional Sound Stages',
    subtitle: 'Cinema-grade acoustics and equipment ready for your next production.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop&sat=-100',
    cta1: 'Sound Stages',
    cta2: 'Start Creating',
  },
  {
    title: 'Podcast Lounges & Recording Suites',
    subtitle: 'Broadcast-quality spaces equipped for podcasters and musicians.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=600&fit=crop',
    cta1: 'Find Podcast Rooms',
    cta2: 'List Your Studio',
  },
];

export default function HeroSlider() {
  const router = useRouter();

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => router.push('/studios')}
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                      >
                        {slide.cta1}
                      </button>
                      <button
                        onClick={() => router.push('/register')}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                      >
                        {slide.cta2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <span key={i} className="w-3 h-3 rounded-full bg-white/40" />
        ))}
      </div>
    </div>
  );
}