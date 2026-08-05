import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Trash2, ShoppingCart, Plus, Minus, Tag, ArrowRight, 
  ShieldCheck, Check, Info 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart,
    appliedCoupon, applyCoupon, removeCoupon, setIsCheckoutOpen, t 
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalMRP = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSavings = totalMRP - subtotal;

  let discountAmount = 0;
  if (appliedCoupon) {
    const calc = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    discountAmount = Math.min(calc, appliedCoupon.maxDiscount);
  }

  const deliveryFee = subtotal >= 499 || cart.length === 0 ? 0 : 50;
  const finalPayable = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
              {t('cart')} ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex gap-3"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {item.product.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{item.product.brand}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Your Shopping Cart is Empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our top deals on Mobiles, Electronics, and Fashion to add items!
              </p>
            </div>
          )}
        </div>

        {/* Footer Summary & Coupon */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 space-y-3">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                    <Check className="w-4 h-4" />
                    <span>Coupon '{appliedCoupon.code}' ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-slate-400 hover:text-rose-500 text-[11px] underline font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t('couponPlaceholder')}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-500 font-medium mt-1">{couponError}</p>
              )}
            </div>

            {/* Price Details */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
              <div className="flex justify-between">
                <span>{t('totalMRP')}</span>
                <span>₹{totalMRP.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>{t('discountOnMRP')}</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount ({appliedCoupon.code})</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('deliveryFee')}</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                <span>{t('totalPayable')}</span>
                <span className="text-blue-600 dark:text-blue-400">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <span>{t('proceedToCheckout')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
