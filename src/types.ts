export type Category = 
  | 'All' 
  | 'Mobiles' 
  | 'Fashion' 
  | 'Electronics' 
  | 'Home' 
  | 'Grocery' 
  | 'Beauty' 
  | 'Appliances' 
  | 'Toys';

export interface Product {
  id: string;
  title: string;
  category: Category;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  stock: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  deliveryDays: number;
  returnPolicy: string;
  hsnCode?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'Home' | 'Work';
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod' | 'razorpay' | 'stripe';

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  gstRate: number; // e.g. 18 for 18%
}

export interface TrackingStep {
  status: OrderStatus;
  date: string;
  completed: boolean;
  note?: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  deliveryFee: number;
  finalAmount: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  couponCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  addresses: Address[];
  avatar?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderAmount: number;
  active: boolean;
  expiresAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export type Language = 'en' | 'hi' | 'bn' | 'es';
export type Theme = 'light' | 'dark';

export interface FilterState {
  category: Category;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  inStockOnly: boolean;
  brand: string;
}
