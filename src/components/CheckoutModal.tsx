import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address, PaymentMethod } from '../types';
import { 
  X, MapPin, CreditCard, QrCode, Building2, Truck, ShieldCheck, 
  Check, Plus, ArrowRight, Lock 
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, setIsCheckoutOpen, user, cart, appliedCoupon, 
    placeOrder, addAddress, t 
  } = useApp();

  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    user?.addresses[0] || null
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isAddingNewAddr, setIsAddingNewAddr] = useState(false);

  // New Address Form
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newState, setNewState] = useState('Karnataka');
  const [newPincode, setNewPincode] = useState('560001');

  // Simulated Card Info
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('421');

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    const calc = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    discountAmount = Math.min(calc, appliedCoupon.maxDiscount);
  }
  const deliveryFee = subtotal >= 499 ? 0 : 50;
  const finalPayable = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addr: Omit<Address, 'id'> = {
      fullName: newFullName,
      phone: newPhone,
      addressLine1: newLine1,
      addressLine2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      type: 'Home'
    };
    addAddress(addr);
    setIsAddingNewAddr(false);
  };

  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    placeOrder(selectedAddress, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
              {t('checkoutTitle')}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Steps Indicator */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold">
            <button
              onClick={() => setStep('address')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${
                step === 'address'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>1. Delivery Address</span>
            </button>
            <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
            <button
              onClick={() => { if (selectedAddress) setStep('payment'); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${
                step === 'payment'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>2. Payment Method</span>
            </button>
          </div>

          {/* STEP 1: ADDRESS */}
          {step === 'address' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {t('selectAddress')}
                </h3>
                <button
                  onClick={() => setIsAddingNewAddr(!isAddingNewAddr)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('addAddress')}</span>
                </button>
              </div>

              {/* Add Address Form */}
              {isAddingNewAddr && (
                <form onSubmit={handleSaveAddress} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      required
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Phone (+91)"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1 (Flat, House No, Street)"
                      value={newLine1}
                      onChange={(e) => setNewLine1(e.target.value)}
                      required
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium sm:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      required
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      maxLength={6}
                      required
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddr(false)}
                      className="px-3 py-1.5 text-xs text-slate-500 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user?.addresses.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-slate-800 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {addr.fullName}
                        </span>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 font-bold px-2 py-0.5 rounded">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mt-2">
                        📱 {addr.phone}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  disabled={!selectedAddress}
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {t('paymentMethod')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* UPI Option */}
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-slate-800 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <QrCode className="w-6 h-6 text-emerald-600 mb-2" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">UPI Instant Pay</div>
                  <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm, BHIM</div>
                </button>

                {/* Card Option */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-slate-800 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Credit / Debit Card</div>
                  <div className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</div>
                </button>

                {/* COD Option */}
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-slate-800 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Truck className="w-6 h-6 text-amber-500 mb-2" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-400">Pay cash upon delivery</div>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                {paymentMethod === 'upi' && (
                  <div className="space-y-2 text-center py-2">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Scan QR Code or enter VPA address (e.g. user@okaxis)
                    </p>
                    <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-200 mx-auto shadow-sm flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-slate-800" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      ⚡ Instant 100% Refundable Payment Protected
                    </span>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                      />
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV"
                        maxLength={3}
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p className="font-bold">Pay cash or scan QR when delivery agent arrives.</p>
                    <p className="text-[11px] text-slate-400">An OTP will be sent to your registered phone number for order verification.</p>
                  </div>
                )}
              </div>

              {/* Order Total Breakdown */}
              <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-2xl border border-blue-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Total Amount Payable</span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('placeOrder')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
