import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAsDemoUser, loginAsAdmin, setUser, t } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email || 'user@goodone.in',
      phone: '+91 98765 43210',
      role: 'user',
      addresses: [
        {
          id: 'addr-1',
          fullName: name || 'Valued Customer',
          phone: '+91 98765 43210',
          addressLine1: 'Flat 402, Sunshine Heights',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          type: 'Home'
        }
      ]
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 space-y-5">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto shadow-md">
            G1
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? t('loginTitle') : t('signupTitle')}
          </h2>
          <p className="text-xs text-slate-500">Access your Wishlist, Track Orders & Unlock Deals</p>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block text-center">
            ⚡ Quick 1-Click Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={loginAsDemoUser}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Customer Login</span>
            </button>
            <button
              onClick={loginAsAdmin}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center my-2">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
          <span className="px-3 text-[10px] font-bold text-slate-400 uppercase">Or use email</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Asha Purna Sarkar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              placeholder="customer@goodone.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
          >
            {mode === 'login' ? t('login') : t('signup')}
          </button>
        </form>

        <div className="text-center text-xs">
          {mode === 'login' ? (
            <p className="text-slate-500">
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-blue-600 font-bold underline">
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-slate-500">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-600 font-bold underline">
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
