import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  X, Star, Heart, ShoppingCart, Zap, Check, Truck, ShieldCheck, 
  MapPin, RefreshCw, Share2, ThumbsUp, MessageSquare 
} from 'lucide-react';

export const ProductDetailsModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen, userPincode, t } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [pincode, setPincode] = useState(userPincode);
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'available' | 'invalid'>('idle');
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  if (!selectedProduct) return null;

  const isLiked = isInWishlist(selectedProduct.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('available');
    } else {
      setPincodeStatus('invalid');
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="w-full h-80 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 flex items-center justify-center border border-slate-200 dark:border-slate-700 relative">
              <img
                src={selectedProduct.images[activeImgIndex] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="max-h-full max-w-full object-contain"
              />
              {selectedProduct.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                  {selectedProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-50 dark:bg-slate-800 ${
                      idx === activeImgIndex
                        ? 'border-blue-600 shadow-md scale-105'
                        : 'border-slate-200 dark:border-slate-700 opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {selectedProduct.brand} • {selectedProduct.category}
                </span>
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedProduct.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <span>{selectedProduct.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedProduct.ratingCount.toLocaleString('en-IN')} Ratings & Reviews
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-slate-400 line-through font-medium">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Inclusive of all 18% GST taxes & Govt duties</p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Delivery Pincode Checker */}
            <div className="border-t border-b border-slate-200 dark:border-slate-800 py-4 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{t('pinCodeCheck')}</span>
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 w-44"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold"
                >
                  {t('check')}
                </button>
              </form>

              {pincodeStatus === 'available' && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <Check className="w-4 h-4" />
                  <span>Available for Delivery by Tomorrow | Cash on Delivery available</span>
                </div>
              )}
              {pincodeStatus === 'invalid' && (
                <div className="text-xs text-rose-500 font-medium">
                  Please enter a valid 6-digit PIN code.
                </div>
              )}
            </div>

            {/* Specifications Table */}
            {selectedProduct.specs && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <span className="text-slate-400 font-medium block">{key}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>{t('buyNow')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
