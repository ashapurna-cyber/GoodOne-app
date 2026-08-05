import React from 'react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import { 
  ShieldCheck, RefreshCw, Truck, CreditCard, Heart, ShoppingCart, 
  Home as HomeIcon, Package, User as UserIcon, Sparkles 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentView, setCurrentView, setFilterState, cart, wishlist, setIsCartOpen, t } = useApp();

  const handleCategoryClick = (cat: Category) => {
    setFilterState((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    if (currentView !== 'home') setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 sm:pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Assurances Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-800/60 rounded-3xl border border-slate-700/60">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">100% Genuine Products</h4>
              <p className="text-[11px] text-slate-400">Direct from Authorized Brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-blue-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">7 Days Easy Return</h4>
              <p className="text-[11px] text-slate-400">Hassle-free replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Express Delivery</h4>
              <p className="text-[11px] text-slate-400">Free shipping on orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Secure Payments</h4>
              <p className="text-[11px] text-slate-400">UPI, Cards, Netbanking & COD</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-base">
                G1
              </div>
              <span className="text-xl font-black italic tracking-tight text-white">
                Good<span className="text-yellow-400 not-italic">One</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              India's favorite online shopping destination for Mobiles, Electronics, Fashion, Home & Grocery. Experience top deals and instant lightning delivery.
            </p>
          </div>

          {/* Top Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-slate-400">
              {(['Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances'] as Category[]).map((cat) => (
                <li key={cat}>
                  <button onClick={() => handleCategoryClick(cat)} className="hover:text-yellow-400 transition-colors">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Help & Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#orders" onClick={() => setCurrentView('dashboard')} className="hover:text-yellow-400">Track Order Status</a></li>
              <li><a href="#shipping" className="hover:text-yellow-400">Shipping Policies</a></li>
              <li><a href="#returns" className="hover:text-yellow-400">Returns & Refunds</a></li>
              <li><a href="#faq" className="hover:text-yellow-400">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Corporate */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">GoodOne Retail</h4>
            <p className="text-slate-400">
              GoodOne Buildings, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, Karnataka, 560103
            </p>
            <span className="text-[11px] font-mono text-slate-500 block">CIN: U51909KA2024PTC123456</span>
          </div>
        </div>

        {/* Bottom copyright & Editorial status strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} GoodOne E-Commerce Retail Pvt. Ltd.</span>
            <span>•</span>
            <span className="text-blue-400 font-bold">GST: 27AAACG0000Z1Z1</span>
            <span>•</span>
            <span className="text-slate-400">CIN: U51909KA2024PTC123456</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 text-slate-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-[10px]">AI Assistant Online</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around text-[10px] text-slate-400">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-yellow-400 font-bold' : ''}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-yellow-400 font-bold' : ''}`}
        >
          <Package className="w-5 h-5" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex flex-col items-center gap-1 relative"
        >
          <Heart className="w-5 h-5 text-rose-500" />
          <span>Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 relative"
        >
          <ShoppingCart className="w-5 h-5 text-blue-400" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 font-extrabold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </footer>
  );
};
