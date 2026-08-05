import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, RotateCcw, PackageX } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, filterState, setFilterState, resetFilters, t } = useApp();

  // Apply filtering
  const filteredProducts = products.filter((p) => {
    if (filterState.category !== 'All' && p.category !== filterState.category) {
      return false;
    }
    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchBrand = p.brand.toLowerCase().includes(query);
      const matchCat = p.category.toLowerCase().includes(query);
      if (!matchTitle && !matchBrand && !matchCat) return false;
    }
    if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
      return false;
    }
    if (filterState.minRating > 0 && p.rating < filterState.minRating) {
      return false;
    }
    if (filterState.inStockOnly && p.stock <= 0) {
      return false;
    }
    if (filterState.brand !== 'All' && p.brand !== filterState.brand) {
      return false;
    }
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filterState.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  // Get available brands for the active filter
  const availableBrands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="space-y-6">
      {/* Control Bar: Sort dropdown, Active Filter badges, Reset */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {filterState.category === 'All' ? 'Best of Electronics & Deals' : filterState.category}
          </h2>
          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {sortedProducts.length} Products
          </span>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-3 text-xs">
          <label className="text-slate-500 font-medium hidden sm:inline">{t('sortBy')}:</label>
          <select
            value={filterState.sortBy}
            onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-1.5 font-bold border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">{t('featured')}</option>
            <option value="price-low">{t('priceLowHigh')}</option>
            <option value="price-high">{t('priceHighLow')}</option>
            <option value="rating">{t('ratingHighLow')}</option>
            <option value="newest">{t('newest')}</option>
          </select>

          <button
            onClick={resetFilters}
            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Filtered Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No products match your search criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your category filters or searching for another keyword.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
