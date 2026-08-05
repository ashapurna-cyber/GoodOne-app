import { Product, Coupon, Order, Address } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // MOBILES
  {
    id: 'prod-mob-1',
    title: 'iPhone 15 Pro Max (256 GB) - Natural Titanium',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    brand: 'Apple',
    price: 134900,
    originalPrice: 159900,
    discountPercent: 15,
    rating: 4.8,
    ratingCount: 1420,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    specs: {
      'Display': '6.7" Super Retina XDR OLED 120Hz',
      'Processor': 'A17 Pro Chip 3nm',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto',
      'Battery': 'Up to 29 hrs Video Playback',
      'OS': 'iOS 17'
    },
    isFeatured: true,
    isFlashSale: true,
    deliveryDays: 1,
    returnPolicy: '7 Days Replacement Guarantee',
    hsnCode: '85171200'
  },
  {
    id: 'prod-mob-2',
    title: 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 512GB Storage) Titanium Gray',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 144999,
    discountPercent: 10,
    rating: 4.7,
    ratingCount: 980,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display, powered by Galaxy AI.',
    specs: {
      'Display': '6.8" Dynamic AMOLED 2X 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP + 50MP + 12MP + 10MP Quad Camera',
      'S-Pen': 'Built-in S-Pen included',
      'Battery': '5000 mAh Fast Charging 45W'
    },
    isFeatured: true,
    isFlashSale: false,
    deliveryDays: 2,
    returnPolicy: '7 Days Replacement',
    hsnCode: '85171200'
  },
  {
    id: 'prod-mob-3',
    title: 'OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB Storage)',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    brand: 'OnePlus',
    price: 64999,
    originalPrice: 69999,
    discountPercent: 7,
    rating: 4.6,
    ratingCount: 640,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, and 100W SUPERVOOC charging.',
    specs: {
      'Display': '6.82" 2K 120 Hz ProXDR',
      'Processor': 'Snapdragon 8 Gen 3',
      'Charging': '100W Wired + 50W Wireless',
      'Camera': '50MP Sony LYT-808 + 64MP Telephoto'
    },
    deliveryDays: 2,
    returnPolicy: '7 Days Replacement',
    hsnCode: '85171200'
  },

  // ELECTRONICS
  {
    id: 'prod-elec-1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    price: 26990,
    originalPrice: 34990,
    discountPercent: 22,
    rating: 4.9,
    ratingCount: 2310,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Industry-leading noise cancellation with two processors and 8 microphones for unprecedented sound purity.',
    specs: {
      'Battery Life': 'Up to 30 Hours',
      'Noise Cancellation': 'Auto NC Optimizer',
      'Connectivity': 'Bluetooth 5.2 Multipoint',
      'Microphones': '4 Beamforming Mics for Crystal Clear Calls'
    },
    isFeatured: true,
    isFlashSale: true,
    deliveryDays: 1,
    returnPolicy: '10 Days Return Policy',
    hsnCode: '85183000'
  },
  {
    id: 'prod-elec-2',
    title: 'Apple MacBook Air 15" M3 Chip (16GB RAM, 512GB SSD) - Space Grey',
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    price: 139900,
    originalPrice: 154900,
    discountPercent: 9,
    rating: 4.9,
    ratingCount: 512,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lean. Mean. M3 machine. Liquid Retina display, sleek fanless design with up to 18 hours of battery life.',
    specs: {
      'Chip': 'Apple M3 8-core CPU, 10-core GPU',
      'RAM': '16GB Unified Memory',
      'Display': '15.3" Liquid Retina 500 nits',
      'Weight': '1.51 kg'
    },
    isFeatured: true,
    deliveryDays: 1,
    returnPolicy: '7 Days Replacement',
    hsnCode: '84713010'
  },
  {
    id: 'prod-elec-3',
    title: 'Dell UltraSharp 27" 4K USB-C Hub Monitor (U2723QE)',
    category: 'Electronics',
    subcategory: 'Monitors',
    brand: 'Dell',
    price: 48999,
    originalPrice: 59999,
    discountPercent: 18,
    rating: 4.6,
    ratingCount: 180,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Experience brilliant color and contrast with IPS Black technology and comprehensive hub connectivity.',
    specs: {
      'Resolution': '4K UHD 3840 x 2160',
      'Panel': 'IPS Black 2000:1 Contrast',
      'Ports': 'USB-C 90W PD, RJ45 Ethernet, DP 1.4'
    },
    deliveryDays: 3,
    returnPolicy: '10 Days Return',
    hsnCode: '85285200'
  },

  // FASHION
  {
    id: 'prod-fash-1',
    title: 'Nike Air Max 270 Men Running Shoes - Triple Black',
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'Nike',
    price: 9495,
    originalPrice: 12995,
    discountPercent: 27,
    rating: 4.5,
    ratingCount: 890,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Nike Air Max 270 delivers unmatched all-day comfort with a bold Max Air unit and woven breathable mesh upper.',
    specs: {
      'Upper': 'Mesh & Synthetic',
      'Sole': 'Rubber Outsole',
      'Closure': 'Lace-Up',
      'Style': 'Casual Running'
    },
    isFeatured: true,
    isFlashSale: true,
    deliveryDays: 2,
    returnPolicy: '14 Days Easy Exchange',
    hsnCode: '64041190'
  },
  {
    id: 'prod-fash-2',
    title: "Levi's Men Trucker Jacket - Classic Indigo Denim",
    category: 'Fashion',
    subcategory: 'Clothing',
    brand: "Levi's",
    price: 3899,
    originalPrice: 6499,
    discountPercent: 40,
    rating: 4.7,
    ratingCount: 1250,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The original jean jacket since 1967. A symbol of self-expression for generations.',
    specs: {
      'Material': '100% Cotton Non-Stretch Denim',
      'Fit': 'Standard Fit',
      'Closure': 'Button Front'
    },
    isFlashSale: true,
    deliveryDays: 3,
    returnPolicy: '14 Days Easy Return',
    hsnCode: '62011310'
  },

  // HOME
  {
    id: 'prod-home-1',
    title: 'Ergonomic High Back Executive Office Mesh Chair with Headrest',
    category: 'Home',
    subcategory: 'Furniture',
    brand: 'Green Soul',
    price: 8999,
    originalPrice: 17990,
    discountPercent: 50,
    rating: 4.6,
    ratingCount: 3410,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Heavy duty ergonomic mesh chair with 3D adjustable armrests, 2D lumbar support, and 135-degree recline.',
    specs: {
      'Mechanism': 'Synchro-tilt Multi-lock',
      'Weight Capacity': '135 kg',
      'Base': 'Heavy Duty Metal Base',
      'Warranty': '3 Years Manufacturer Warranty'
    },
    isFeatured: true,
    deliveryDays: 3,
    returnPolicy: '10 Days Replacement',
    hsnCode: '94013000'
  },
  {
    id: 'prod-home-2',
    title: 'Philips Smart Wi-Fi LED Desk Lamp & Ambient Light Strip',
    category: 'Home',
    subcategory: 'Lighting',
    brand: 'Philips',
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.4,
    ratingCount: 560,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'
    ],
    description: '16 Million Colors LED smart lamp with Alexa & Google Assistant voice control, schedule timers and eye-care tint.',
    specs: {
      'Wattage': '12W',
      'Connectivity': 'Wi-Fi 2.4GHz + Bluetooth',
      'Life': '25,000 Hours'
    },
    deliveryDays: 2,
    returnPolicy: '7 Days Replacement',
    hsnCode: '94052090'
  },

  // GROCERY
  {
    id: 'prod-groc-1',
    title: 'Happilo Premium California Whole Almonds Badam (1 kg Pack)',
    category: 'Grocery',
    subcategory: 'Dry Fruits & Nuts',
    brand: 'Happilo',
    price: 749,
    originalPrice: 1249,
    discountPercent: 40,
    rating: 4.7,
    ratingCount: 5120,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1508061252966-dfd30f67ea55?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Raw, crunchy, high protein premium California almonds packaged in zip-lock pouch for maximum freshness.',
    specs: {
      'Quantity': '1000g / 1kg',
      'Diet Type': 'Vegetarian, High Protein',
      'Storage': 'Store in a cool dry place'
    },
    isFlashSale: true,
    deliveryDays: 1,
    returnPolicy: 'Grocery Non-Returnable',
    hsnCode: '08021200'
  },
  {
    id: 'prod-groc-2',
    title: 'Organic India Tulsi Green Tea Honey Lemon (100 Tea Bags)',
    category: 'Grocery',
    subcategory: 'Beverages',
    brand: 'Organic India',
    price: 520,
    originalPrice: 650,
    discountPercent: 20,
    rating: 4.8,
    ratingCount: 3100,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Abundant in antioxidants and rich in immune boosting herbs for a refreshing daily detox.',
    specs: {
      'Servings': '100 Tea Infusion Bags',
      'Flavour': 'Honey Lemon Tulsi'
    },
    deliveryDays: 1,
    returnPolicy: 'Non-Returnable',
    hsnCode: '09021000'
  },

  // BEAUTY
  {
    id: 'prod-beau-1',
    title: 'CeraVe Hydrating Facial Cleanser for Normal to Dry Skin (473 ml)',
    category: 'Beauty',
    subcategory: 'Skincare',
    brand: 'CeraVe',
    price: 1350,
    originalPrice: 1699,
    discountPercent: 20,
    rating: 4.8,
    ratingCount: 4200,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Formulated with 3 essential ceramides & hyaluronic acid to restore skin barrier without stripping moisture.',
    specs: {
      'Volume': '473 ml',
      'Skin Type': 'Normal to Dry',
      'Key Ingredients': 'Ceramides 1, 3, 6-II & Hyaluronic Acid'
    },
    isFeatured: true,
    deliveryDays: 2,
    returnPolicy: 'Non-Returnable',
    hsnCode: '33049990'
  },

  // APPLIANCES
  {
    id: 'prod-app-1',
    title: 'LG 655L Frost Free Inverter Side-by-Side Refrigerator with InstaView',
    category: 'Appliances',
    subcategory: 'Refrigerators',
    brand: 'LG',
    price: 94990,
    originalPrice: 124990,
    discountPercent: 24,
    rating: 4.7,
    ratingCount: 420,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Knock twice and see 23% more of what is inside with LG InstaView Door-in-Door refrigerator.',
    specs: {
      'Capacity': '655 Litres',
      'Energy Rating': 'Inverter Smart Compressor',
      'Dispenser': 'Water & Ice Dispenser Built-in',
      'Warranty': '10 Years Compressor Warranty'
    },
    isFeatured: true,
    deliveryDays: 3,
    returnPolicy: '10 Days Replacement Guarantee',
    hsnCode: '84181010'
  },
  {
    id: 'prod-app-2',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner (Yellow/Nickel)',
    category: 'Appliances',
    subcategory: 'Vacuum Cleaners',
    brand: 'Dyson',
    price: 59900,
    originalPrice: 65900,
    discountPercent: 9,
    rating: 4.9,
    ratingCount: 310,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Dyson most powerful cordless vacuum with laser illumination that reveals microscopic dust.',
    specs: {
      'Run Time': 'Up to 60 Minutes',
      'Filtration': '99.99% HEPA Filtration',
      'Weight': '3.1 kg'
    },
    deliveryDays: 2,
    returnPolicy: '7 Days Replacement',
    hsnCode: '85081100'
  },

  // TOYS
  {
    id: 'prod-toy-1',
    title: 'LEGO Technic Bugatti Bolide Racing Car Building Toy Set (905 Pieces)',
    category: 'Toys',
    subcategory: 'Building Blocks',
    brand: 'LEGO',
    price: 4999,
    originalPrice: 5999,
    discountPercent: 17,
    rating: 4.9,
    ratingCount: 840,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Inspire kids to build their own racing car model with realistic W16 engine and scissor doors.',
    specs: {
      'Pieces': '905 Pcs',
      'Age Range': '9+ Years',
      'Model Number': '42151'
    },
    isFeatured: true,
    isFlashSale: true,
    deliveryDays: 2,
    returnPolicy: '10 Days Return',
    hsnCode: '95030030'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'GOODONE10',
    discountPercent: 10,
    maxDiscount: 2000,
    minOrderAmount: 999,
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    id: 'coup-2',
    code: 'WELCOME500',
    discountPercent: 15,
    maxDiscount: 500,
    minOrderAmount: 499,
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    id: 'coup-3',
    code: 'BIGSALE25',
    discountPercent: 25,
    maxDiscount: 5000,
    minOrderAmount: 4999,
    active: true,
    expiresAt: '2026-12-31'
  }
];

export const DEMO_ADDRESS: Address = {
  id: 'addr-demo-1',
  fullName: 'Asha Purna Sarkar',
  phone: '+91 98765 43210',
  addressLine1: 'Flat 402, Sunshine Apartments, MG Road',
  addressLine2: 'Near Central Mall, Sector 14',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560001',
  isDefault: true,
  type: 'Home'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'GO-ORD-98214',
    userId: 'user-demo-1',
    userEmail: 'ashapurnasarkar114@gmail.com',
    userName: 'Asha Purna Sarkar',
    items: [
      {
        productId: 'prod-elec-1',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black',
        price: 26990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        gstRate: 18
      }
    ],
    totalAmount: 26990,
    taxAmount: 4117,
    discountAmount: 2000,
    deliveryFee: 0,
    finalAmount: 24990,
    shippingAddress: DEMO_ADDRESS,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-08-04T14:30:00Z',
    estimatedDelivery: '2026-08-06',
    trackingSteps: [
      { status: 'Placed', date: '04 Aug 2026, 02:30 PM', completed: true, note: 'Order received & verified' },
      { status: 'Processing', date: '04 Aug 2026, 05:00 PM', completed: true, note: 'Packed at GoodOne Bengaluru Hub' },
      { status: 'Shipped', date: '05 Aug 2026, 08:15 AM', completed: true, note: 'In transit via BlueDart Air' },
      { status: 'Out for Delivery', date: 'Expected 06 Aug', completed: false, note: 'Driver assignment pending' },
      { status: 'Delivered', date: 'Expected 06 Aug', completed: false }
    ],
    couponCode: 'GOODONE10'
  }
];
