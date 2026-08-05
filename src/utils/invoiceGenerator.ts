import { Order } from '../types';

export interface GSTInvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  sellerDetails: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
    cin: string;
  };
  buyerDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  orderId: string;
  orderDate: string;
  items: {
    slNo: number;
    description: string;
    hsnCode: string;
    qty: number;
    unitPrice: number;
    taxableValue: number;
    cgstRate: number;
    cgstAmount: number;
    sgstRate: number;
    sgstAmount: number;
    total: number;
  }[];
  totalTaxableValue: number;
  totalCGST: number;
  totalSGST: number;
  totalTax: number;
  discount: number;
  shipping: number;
  grandTotal: number;
}

export function generateGSTInvoice(order: Order): GSTInvoiceData {
  const sellerDetails = {
    name: 'GoodOne Retail E-Commerce India Pvt. Ltd.',
    address: 'Plot 42, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103',
    gstin: '29AAACG9821K1ZM',
    pan: 'AAACG9821K',
    cin: 'U72900KA2026PTC182930'
  };

  const buyerDetails = {
    name: order.shippingAddress.fullName,
    address: `${order.shippingAddress.addressLine1}, ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + ', ' : ''}${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
    phone: order.shippingAddress.phone,
    email: order.userEmail
  };

  let totalTaxableValue = 0;
  let totalCGST = 0;
  let totalSGST = 0;

  const invoiceItems = order.items.map((item, idx) => {
    // Standard GST calculation: Assume 18% inclusive or breakdown
    const itemTotal = item.price * item.quantity;
    const taxableValue = Number((itemTotal / 1.18).toFixed(2));
    const taxValue = Number((itemTotal - taxableValue).toFixed(2));
    const cgstAmount = Number((taxValue / 2).toFixed(2));
    const sgstAmount = Number((taxValue / 2).toFixed(2));

    totalTaxableValue += taxableValue;
    totalCGST += cgstAmount;
    totalSGST += sgstAmount;

    return {
      slNo: idx + 1,
      description: item.title,
      hsnCode: '85171200',
      qty: item.quantity,
      unitPrice: Number((item.price / 1.18).toFixed(2)),
      taxableValue,
      cgstRate: 9,
      cgstAmount,
      sgstRate: 9,
      sgstAmount,
      total: itemTotal
    };
  });

  const totalTax = totalCGST + totalSGST;

  return {
    invoiceNumber: `INV-${order.id.replace('GO-ORD-', '')}`,
    invoiceDate: new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    sellerDetails,
    buyerDetails,
    orderId: order.id,
    orderDate: new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    items: invoiceItems,
    totalTaxableValue: Number(totalTaxableValue.toFixed(2)),
    totalCGST: Number(totalCGST.toFixed(2)),
    totalSGST: Number(totalSGST.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    discount: order.discountAmount,
    shipping: order.deliveryFee,
    grandTotal: order.finalAmount
  };
}
