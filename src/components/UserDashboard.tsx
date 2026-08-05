import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Package, MapPin, User as UserIcon, Heart, FileText, 
  Truck, ArrowRight, ShieldCheck, Plus, CheckCircle2 
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    user, orders, wishlist, setTrackingOrder, setInvoiceOrder, 
    setCurrentView, addAddress, t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'wishlist'>('orders');
  const [newAddrLine, setNewAddrLine] = useState('');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Please login to view your Dashboard</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Overview Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
              <span className="bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Plus Member
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
          <div>
            <span className="text-blue-200 block text-[10px] font-bold uppercase">Total Orders</span>
            <span className="text-lg font-black">{orders.length}</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <span className="text-blue-200 block text-[10px] font-bold uppercase">Wishlist Items</span>
            <span className="text-lg font-black">{wishlist.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t('myOrders')} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>{t('wishlist')} ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({user.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>{t('myProfile')}</span>
        </button>
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-xs">
                  <div>
                    <span className="text-slate-400">Order ID:</span>{' '}
                    <strong className="text-blue-600 dark:text-blue-400 font-bold">{ord.id}</strong>
                    <span className="text-slate-400 ml-3">Date:</span>{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                      {ord.orderStatus}
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">
                      ₹{ord.finalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-3">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">
                          {item.title}
                        </h4>
                        <span className="text-slate-400">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Action CTAs */}
                <div className="pt-2 flex flex-wrap gap-2 justify-end border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setInvoiceOrder(ord)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t('downloadInvoice')}</span>
                  </button>

                  <button
                    onClick={() => setTrackingOrder(ord)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 shadow-sm"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{t('trackOrder')}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <Package className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No orders placed yet</h3>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <Heart className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Your Wishlist is empty</h3>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">{addr.fullName}</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">
                  {addr.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">📱 {addr.phone}</span>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-xl space-y-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold uppercase block text-[10px]">Full Name</label>
            <div className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{user.name}</div>
          </div>
          <div>
            <label className="text-slate-400 font-bold uppercase block text-[10px]">Email Address</label>
            <div className="font-bold text-slate-800 dark:text-slate-100">{user.email}</div>
          </div>
          <div>
            <label className="text-slate-400 font-bold uppercase block text-[10px]">Phone Number</label>
            <div className="font-bold text-slate-800 dark:text-slate-100">{user.phone}</div>
          </div>
          <div>
            <label className="text-slate-400 font-bold uppercase block text-[10px]">Account Role</label>
            <div className="font-bold text-blue-600 uppercase">{user.role}</div>
          </div>
        </div>
      )}
    </div>
  );
};
