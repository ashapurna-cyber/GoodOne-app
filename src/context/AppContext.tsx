import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, CartItem, Order, User, Coupon, Address, 
  Category, Language, Theme, FilterState, OrderStatus 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_ORDERS, DEMO_ADDRESS } from '../data/mockData';
import { translations } from '../utils/translations';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Theme & Language
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Filters
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Selected Product Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginAsDemoUser: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    shippingAddress: Address, 
    paymentMethod: Order['paymentMethod']
  ) => Order;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (open: boolean) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (order: Order | null) => void;
  invoiceOrder: Order | null;
  setInvoiceOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (id: string) => void;

  // UI Active Views
  currentView: 'home' | 'dashboard' | 'admin';
  setCurrentView: (view: 'home' | 'dashboard' | 'admin') => void;

  // Delivery Pincode
  userPincode: string;
  setUserPincode: (pincode: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_FILTER: FilterState = {
  category: 'All',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 200000,
  minRating: 0,
  sortBy: 'featured',
  inStockOnly: false,
  brand: 'All',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with HTML dark class sync
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('goodone_theme') as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('goodone_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Language
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('goodone_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('goodone_lang', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('goodone_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('goodone_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const product: Product = { ...newProd, id: `prod-${Date.now()}` };
    setProducts((prev) => [product, ...prev]);
    showToast('Product added successfully!', 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // Filters
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER);
  const resetFilters = () => setFilterState(INITIAL_FILTER);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('goodone_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('goodone_cart', JSON.stringify(cart));
  }, [cart]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    showToast(`Added "${product.title.slice(0, 25)}..." to Cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('goodone_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('goodone_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addCoupon = (c: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = { ...c, id: `coup-${Date.now()}` };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon ${c.code} created`, 'success');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon deleted', 'info');
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired promo code' };
    }

    const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (cartSubtotal < found.minOrderAmount) {
      return { 
        success: false, 
        message: `Minimum order amount of ₹${found.minOrderAmount.toLocaleString('en-IN')} required for ${found.code}` 
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: `Applied ${found.discountPercent}% OFF` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('goodone_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('goodone_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Saved to Wishlist!', 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);

  // User & Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('goodone_user');
    return saved ? JSON.parse(saved) : {
      id: 'user-demo-1',
      name: 'Asha Purna Sarkar',
      email: 'ashapurnasarkar114@gmail.com',
      phone: '+91 98765 43210',
      role: 'user',
      addresses: [DEMO_ADDRESS],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('goodone_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('goodone_user');
    }
  }, [user]);

  const loginAsDemoUser = () => {
    setUser({
      id: 'user-demo-1',
      name: 'Asha Purna Sarkar',
      email: 'ashapurnasarkar114@gmail.com',
      phone: '+91 98765 43210',
      role: 'user',
      addresses: [DEMO_ADDRESS],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });
    setIsAuthModalOpen(false);
    showToast('Logged in as Asha Purna Sarkar', 'success');
  };

  const loginAsAdmin = () => {
    setUser({
      id: 'admin-1',
      name: 'GoodOne Admin',
      email: 'admin@goodone.in',
      phone: '+91 99999 88888',
      role: 'admin',
      addresses: [DEMO_ADDRESS]
    });
    setIsAuthModalOpen(false);
    showToast('Switched to Admin Account', 'success');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('home');
    showToast('Logged out successfully', 'info');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = { ...addr, id: `addr-${Date.now()}` };
    const updatedUser: User = {
      ...user,
      addresses: [...user.addresses, newAddress]
    };
    setUser(updatedUser);
    showToast('Delivery address saved!', 'success');
  };

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('goodone_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('goodone_orders', JSON.stringify(orders));
  }, [orders]);

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const placeOrder = (
    shippingAddress: Address,
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    // Discount calculation
    let discountAmount = 0;
    if (appliedCoupon) {
      const calcDiscount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      discountAmount = Math.min(calcDiscount, appliedCoupon.maxDiscount);
    }

    const deliveryFee = subtotal >= 499 ? 0 : 50;
    // 18% GST tax inclusive breakdown
    const taxableTotal = Math.round(subtotal / 1.18);
    const taxAmount = subtotal - taxableTotal;
    const finalAmount = subtotal - discountAmount + deliveryFee;

    const orderId = `GO-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(now.getDate() + 2);

    const newOrder: Order = {
      id: orderId,
      userId: user?.id || 'guest',
      userEmail: user?.email || 'customer@goodone.in',
      userName: user?.name || shippingAddress.fullName,
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        gstRate: 18
      })),
      totalAmount: subtotal,
      taxAmount,
      discountAmount,
      deliveryFee,
      finalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      orderStatus: 'Placed',
      createdAt: now.toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      trackingSteps: [
        { status: 'Placed', date: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, note: 'Order confirmed' },
        { status: 'Processing', date: 'In Progress', completed: false, note: 'Packing at GoodOne Hub' },
        { status: 'Shipped', date: 'Pending', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: `Expected ${deliveryDate.toLocaleDateString()}`, completed: false }
      ],
      couponCode: appliedCoupon?.code
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    showToast('Order placed successfully!', 'success');

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedSteps = ord.trackingSteps.map((step) => {
            if (step.status === status) return { ...step, completed: true, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            return step;
          });
          return { ...ord, orderStatus: status, trackingSteps: updatedSteps };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  // View Navigation
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin'>('home');
  const [userPincode, setUserPincode] = useState('560001');

  // Toasts engine
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        t,
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        filterState,
        setFilterState,
        resetFilters,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAsDemoUser,
        loginAsAdmin,
        logout,
        addAddress,
        orders,
        placeOrder,
        activeOrder,
        setActiveOrder,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        trackingOrder,
        setTrackingOrder,
        invoiceOrder,
        setInvoiceOrder,
        updateOrderStatus,
        coupons,
        addCoupon,
        deleteCoupon,
        currentView,
        setCurrentView,
        userPincode,
        setUserPincode,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
