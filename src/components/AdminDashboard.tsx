import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus, Category } from '../types';
import { 
  ShieldCheck, Package, DollarSign, Users, Tag, Plus, 
  Trash2, Edit, CheckCircle, TrendingUp, AlertTriangle, X 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    orders, updateOrderStatus, coupons, addCoupon, deleteCoupon, t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product State
  const [pTitle, setPTitle] = useState('');
  const [pBrand, setPBrand] = useState('');
  const [pCategory, setPCategory] = useState<Category>('Mobiles');
  const [pPrice, setPPrice] = useState(19999);
  const [pOrigPrice, setPOrigPrice] = useState(24999);
  const [pImage, setPImage] = useState('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800');
  const [pStock, setPStock] = useState(50);
  const [pDesc, setPDesc] = useState('');

  // Coupon State
  const [cCode, setCCode] = useState('');
  const [cDiscount, setCDiscount] = useState(15);
  const [cMaxDisc, setCMaxDisc] = useState(1500);
  const [cMinOrder, setCMinOrder] = useState(1000);

  const totalRevenue = orders.reduce((acc, o) => acc + o.finalAmount, 0);
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = Math.round(((pOrigPrice - pPrice) / pOrigPrice) * 100);
    const newP: Omit<Product, 'id'> = {
      title: pTitle,
      brand: pBrand,
      category: pCategory,
      subcategory: 'General',
      price: Number(pPrice),
      originalPrice: Number(pOrigPrice),
      discountPercent: discountPercent > 0 ? discountPercent : 0,
      rating: 4.8,
      ratingCount: 1,
      images: [pImage],
      description: pDesc || `${pTitle} - Premium flagship product by ${pBrand}`,
      stock: Number(pStock),
      isFeatured: true,
      deliveryDays: 2,
      returnPolicy: '7 Days Replacement',
      specs: { 'Brand': pBrand, 'Category': pCategory }
    };

    if (editingProduct) {
      updateProduct({ ...newP, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(newP);
    }
    setIsAddProductOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setPTitle('');
    setPBrand('');
    setPPrice(19999);
    setPOrigPrice(24999);
    setPDesc('');
    setEditingProduct(null);
  };

  const startEdit = (prod: Product) => {
    setEditingProduct(prod);
    setPTitle(prod.title);
    setPBrand(prod.brand);
    setPCategory(prod.category);
    setPPrice(prod.price);
    setPOrigPrice(prod.originalPrice);
    setPImage(prod.images[0]);
    setPStock(prod.stock);
    setPDesc(prod.description);
    setIsAddProductOpen(true);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cCode) return;
    addCoupon({
      code: cCode.toUpperCase(),
      discountPercent: Number(cDiscount),
      maxDiscount: Number(cMaxDisc),
      minOrderAmount: Number(cMinOrder),
      active: true
    });
    setCCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 font-black">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t('adminDashboard')}</h1>
            <p className="text-xs text-slate-400">GoodOne E-Commerce Control Center & Inventory</p>
          </div>
        </div>

        <button
          onClick={() => { resetForm(); setIsAddProductOpen(true); }}
          className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addNewProduct')}</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Total Revenue</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Total Orders</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{orders.length}</div>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Active Products</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{products.length}</div>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Low Stock Alert</span>
            <div className="text-xl font-black text-amber-500 mt-1">{lowStockCount} Items</div>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Catalog Inventory ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'coupons'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Coupons & Offers ({coupons.length})
        </button>
      </div>

      {/* TAB: CATALOG PRODUCTS */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-3 flex items-center gap-3 font-bold max-w-xs">
                      <img src={p.images[0]} alt={p.title} className="w-9 h-9 object-contain rounded bg-slate-100 dark:bg-slate-900 p-0.5" />
                      <span className="truncate">{p.title}</span>
                    </td>
                    <td className="p-3 font-semibold">{p.category}</td>
                    <td className="p-3 font-black text-blue-600 dark:text-blue-400">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stock < 10 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs font-bold border-b border-slate-100 dark:border-slate-700 pb-2">
                <div>
                  <span>Order #{ord.id}</span> • <span className="text-slate-400">{ord.userName} ({ord.userEmail})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Change Status:</span>
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1 text-xs font-bold text-blue-600"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Items: {ord.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: COUPONS MANAGER */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateCoupon} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 max-w-xl">
            <h3 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200">Create New Promo Code</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Coupon Code (e.g. SALE50)"
                value={cCode}
                onChange={(e) => setCCode(e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold uppercase"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={cDiscount}
                onChange={(e) => setCDiscount(Number(e.target.value))}
                required
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />
              <input
                type="number"
                placeholder="Max Discount (₹)"
                value={cMaxDisc}
                onChange={(e) => setCMaxDisc(Number(e.target.value))}
                required
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />
              <input
                type="number"
                placeholder="Min Order Amount (₹)"
                value={cMinOrder}
                onChange={(e) => setCMinOrder(Number(e.target.value))}
                required
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />
            </div>
            <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md">
              Publish Promo Code
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coupons.map((c) => (
              <div key={c.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{c.code}</div>
                  <div className="text-slate-400">{c.discountPercent}% OFF up to ₹{c.maxDiscount}</div>
                </div>
                <button onClick={() => deleteCoupon(c.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                {editingProduct ? 'Edit Product' : 'Add New Product to GoodOne'}
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="p-1 rounded-full text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Product Title"
                value={pTitle}
                onChange={(e) => setPTitle(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Brand (e.g. Apple, Samsung)"
                  value={pBrand}
                  onChange={(e) => setPBrand(e.target.value)}
                  required
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                />
                <select
                  value={pCategory}
                  onChange={(e) => setPCategory(e.target.value as Category)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                >
                  <option value="Mobiles">Mobiles</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Toys">Toys</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Selling Price (₹)"
                  value={pPrice}
                  onChange={(e) => setPPrice(Number(e.target.value))}
                  required
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                />
                <input
                  type="number"
                  placeholder="MRP Price (₹)"
                  value={pOrigPrice}
                  onChange={(e) => setPOrigPrice(Number(e.target.value))}
                  required
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                />
                <input
                  type="number"
                  placeholder="Initial Stock"
                  value={pStock}
                  onChange={(e) => setPStock(Number(e.target.value))}
                  required
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                />
              </div>

              <input
                type="text"
                placeholder="Image URL"
                value={pImage}
                onChange={(e) => setPImage(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
              />

              <textarea
                placeholder="Product Description"
                value={pDesc}
                onChange={(e) => setPDesc(e.target.value)}
                rows={3}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
              />

              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="px-4 py-2 font-bold text-slate-500">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
