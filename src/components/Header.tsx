import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Language } from '../types';
import { 
  Search, ShoppingCart, Heart, User as UserIcon, ShieldCheck, 
  MapPin, Sun, Moon, Globe, ChevronDown, Package, LogOut, 
  Sparkles, Smartphone, Shirt, Laptop, Home as HomeIcon, 
  ShoppingBag, Sparkles as BeautyIcon, Tv, Gamepad2, Layers
} from 'lucide-react';

// Category icons mapping with circular design
const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  All: <Layers className="w-5 h-5 text-blue-600" />,
  Mobiles: <Smartphone className="w-5 h-5 text-blue-500" />,
  Fashion: <Shirt className="w-5 h-5 text-pink-500" />,
  Electronics: <Laptop className="w-5 h-5 text-purple-500" />,
  Home: <HomeIcon className="w-5 h-5 text-amber-500" />,
  Grocery: <ShoppingBag className="w-5 h-5 text-red-500" />,
  Beauty: <BeautyIcon className="w-5 h-5 text-emerald-500" />,
  Appliances: <Tv className="w-5 h-5 text-indigo-500" />,
  Toys: <Gamepad2 className="w-5 h-5 text-violet-500" />
};

export const Header: React.FC = () => {
  const { 
    theme, setTheme, language, setLanguage, t, 
    cart, wishlist, user, setIsCartOpen, setIsAuthModalOpen, logout,
    products, setSelectedProduct, filterState, setFilterState, resetFilters,
    currentView, setCurrentView, userPincode, setUserPincode
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [editingPincode, setEditingPincode] = useState(false);
  const [tempPincode, setTempPincode] = useState(userPincode);

  const searchRef = useRef<HTMLDivElement>(null);

  // Auto suggestions filtered list
  const suggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState((prev) => ({ ...prev, searchQuery, category: 'All' }));
    setShowSuggestions(false);
    if (currentView !== 'home') setCurrentView('home');
  };

  const handleSelectCategory = (cat: Category) => {
    setFilterState((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    if (currentView !== 'home') setCurrentView('home');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="bg-yellow-400 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
            Big Billion Sale
          </span>
          <span className="truncate">
            ⚡ Extra 10% OFF with code <strong className="underline cursor-pointer">GOODONE10</strong> | Free Delivery on Orders above ₹499!
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 hover:text-yellow-300 font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : language === 'bn' ? 'বাংলা' : 'Español'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 text-xs">
                <button
                  onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setIsLangMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                >
                  हिंदी (Hindi)
                </button>
                <button
                  onClick={() => { setLanguage('bn'); setIsLangMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                >
                  বাংলা (Bengali)
                </button>
                <button
                  onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                >
                  Español (Spanish)
                </button>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
            title="Toggle Dark / Light Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-yellow-300" />
            )}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => { setCurrentView('home'); resetFilters(); }}
          className="cursor-pointer flex items-center gap-2 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-yellow-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-blue-600 rounded-[10px] flex items-center justify-center text-white font-extrabold text-xl tracking-tighter">
              G1
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black italic tracking-tight text-blue-600 dark:text-blue-400 leading-none">
              Good<span className="text-yellow-500 font-bold not-italic">One</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase">
              Explore Plus ✦
            </span>
          </div>
        </div>

        {/* Location / Pincode Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500">{t('deliverTo')}</span>
            {editingPincode ? (
              <input
                type="text"
                value={tempPincode}
                maxLength={6}
                onChange={(e) => setTempPincode(e.target.value)}
                onBlur={() => { setUserPincode(tempPincode || '560001'); setEditingPincode(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { setUserPincode(tempPincode); setEditingPincode(false); } }}
                className="w-16 bg-white dark:bg-slate-900 border border-blue-500 rounded px-1 py-0.5 text-xs font-bold"
                autoFocus
              />
            ) : (
              <span 
                onClick={() => setEditingPincode(true)}
                className="font-bold cursor-pointer hover:underline text-slate-800 dark:text-slate-100"
              >
                {userPincode} (Change)
              </span>
            )}
          </div>
        </div>

        {/* Live Search Bar with Suggestions */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm pl-4 pr-12 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Live Search Auto-Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Matching Products
              </div>
              {suggestions.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700/60 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-[0px]"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-10 h-10 object-cover rounded-md border border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <span className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 rounded text-[10px]">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Admin, User Account, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Admin Toggle */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'admin'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{t('adminPanel')}</span>
          </button>

          {/* Account Dropdown / Login */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="text-xs font-semibold max-w-[90px] truncate hidden md:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-xs text-slate-700 dark:text-slate-200">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 font-bold">
                      Hello, {user.name}
                    </div>
                    <button
                      onClick={() => { setCurrentView('dashboard'); setIsAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-blue-600" />
                      {t('myOrders')}
                    </button>
                    <button
                      onClick={() => { setCurrentView('dashboard'); setIsAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-emerald-600" />
                      {t('myProfile')}
                    </button>
                    <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={() => { logout(); setIsAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title="View Wishlist"
          >
            <Heart className="w-5 h-5 text-rose-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">{t('cart')}</span>
            {totalCartCount > 0 && (
              <span className="bg-yellow-400 text-slate-900 font-extrabold text-[11px] px-1.5 py-0.2 rounded-full">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar - Editorial Circular Icons */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-3 shadow-xs overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:justify-around gap-6">
          {(['All', 'Mobiles', 'Fashion', 'Electronics', 'Home', 'Grocery', 'Beauty', 'Appliances', 'Toys'] as Category[]).map(
            (cat) => {
              const active = filterState.category === cat && currentView === 'home';
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 transition-transform hover:-translate-y-0.5"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1.5 transition-colors border ${
                    active
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200/60 dark:border-slate-700/60 group-hover:bg-blue-50 dark:group-hover:bg-slate-700'
                  }`}>
                    {React.cloneElement(CATEGORY_ICONS[cat] as React.ReactElement, {
                      className: `w-5 h-5 ${active ? 'text-white' : ''}`
                    })}
                  </div>
                  <span className={`text-xs font-bold ${active ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                    {cat === 'All' ? t('allCategories') : t(cat.toLowerCase() as any) || cat}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>
    </header>
  );
};
