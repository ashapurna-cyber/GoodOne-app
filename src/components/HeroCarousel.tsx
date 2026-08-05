import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Sparkles, ArrowRight } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  bgGradient: string;
  image: string;
  category: string;
  tag: string;
}

const BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'BIG BILLION FREEDOM FEST',
    subtitle: 'Unbeatable Prices on iPhone 15 Pro & Flagship 5G Phones',
    discount: 'UP TO 45% OFF',
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000',
    category: 'Mobiles',
    tag: 'LIMITED TIME DEAL'
  },
  {
    id: 'b2',
    title: 'NEXT-GEN AUDIO & LAPTOPS',
    subtitle: 'Experience Noise Cancellation with Sony & Apple M3 MacBooks',
    discount: 'FLAT ₹5,000 INSTANT CASHBACK',
    bgGradient: 'from-violet-900 via-purple-900 to-slate-950',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electronics',
    tag: 'TOP RATED 4.9★'
  },
  {
    id: 'b3',
    title: 'SMART HOME & APPLIANCES',
    subtitle: 'Upgrade your Kitchen with LG InstaView & Dyson Smart Tech',
    discount: 'NO COST EMI UP TO 24 MONTHS',
    bgGradient: 'from-amber-900 via-yellow-950 to-slate-950',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliances',
    tag: 'FREE INSTALLATION'
  }
];

export const HeroCarousel: React.FC<{ onCategorySelect: (cat: any) => void }> = ({ onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const banner = BANNERS[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg my-4 bg-slate-900 border border-slate-800">
      <div
        className={`w-full min-h-[280px] sm:min-h-[340px] bg-gradient-to-r ${banner.bgGradient} text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 relative`}
      >
        {/* Glow ambient background element */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-25 pointer-events-none">
          <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        {/* Banner Content Left */}
        <div className="flex-1 space-y-4 z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{banner.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-white italic">
            {banner.title}
          </h2>

          <p className="text-blue-100/90 text-sm font-normal leading-relaxed line-clamp-2">
            {banner.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-wider italic">
              {banner.discount}
            </span>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onCategorySelect(banner.category)}
              className="px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded uppercase tracking-widest shadow-md flex items-center gap-2 group transition-all"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-600" />
            </button>
          </div>
        </div>

        {/* Banner Image Right */}
        <div className="relative w-full md:w-1/2 h-44 sm:h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl"></div>
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10 hover:scale-102 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
