import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingCart, Zap, Check, Truck } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isInWishlist, cart, t } = useApp();

  const isLiked = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 transition-all duration-200 hover:shadow-md flex flex-col items-center text-center relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.discountPercent > 0 && (
          <span className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wide">
            {product.discountPercent}% {t('off')}
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-amber-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            <span>Flash</span>
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Product Image Box */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="w-full h-44 bg-slate-50 dark:bg-slate-800/50 rounded mb-3 flex items-center justify-center p-3 cursor-pointer relative group-hover:bg-blue-50/40 dark:group-hover:bg-slate-800 transition-colors"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details & Info */}
      <div className="w-full flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
            {product.brand}
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-1.5"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <div className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
            <span className="text-[10px] text-slate-400">({product.ratingCount.toLocaleString('en-IN')})</span>
          </div>

          {/* Price - Editorial Green Italic */}
          <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1 italic text-base flex items-center justify-center gap-2">
            <span>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through not-italic font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Delivery perk */}
          <div className="text-[10px] text-slate-400 mb-3 flex items-center justify-center gap-1">
            <Truck className="w-3 h-3 text-slate-400" />
            <span>{product.deliveryDays === 1 ? 'Express Delivery' : `${product.deliveryDays} Days Shipping`}</span>
          </div>
        </div>

        {/* Add to Cart CTA Button - Editorial Solid Dark */}
        <button
          onClick={() => addToCart(product)}
          className={`w-full py-2 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 ${
            cartItem
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900'
          }`}
        >
          {cartItem ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added ({cartItem.quantity})</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
