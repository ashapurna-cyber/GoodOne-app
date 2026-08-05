import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle, FileText, Truck, ArrowRight, ShieldCheck, 
  Package, Calendar, MapPin, X 
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    isConfirmationOpen, setIsConfirmationOpen, activeOrder, 
    setInvoiceOrder, setTrackingOrder, setCurrentView, t 
  } = useApp();

  useEffect(() => {
    if (isConfirmationOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Confetti animation error:', err);
      }
    }
  }, [isConfirmationOpen]);

  if (!isConfirmationOpen || !activeOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative my-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsConfirmationOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Banner */}
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {t('orderSuccessTitle')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Order Confirmation #<strong className="text-blue-600 dark:text-blue-400">{activeOrder.id}</strong>
          </p>
        </div>

        {/* Order Brief Info */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-slate-500 font-medium">Estimated Delivery</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(activeOrder.estimatedDelivery).toLocaleDateString()}</span>
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-slate-500 font-medium">Payment Status</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">
              {activeOrder.paymentMethod} ({activeOrder.paymentStatus})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Total Amount Paid</span>
            <span className="font-black text-sm text-blue-600 dark:text-blue-400">
              ₹{activeOrder.finalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Order Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              setInvoiceOrder(activeOrder);
              setIsConfirmationOpen(false);
            }}
            className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{t('downloadInvoice')}</span>
          </button>

          <button
            onClick={() => {
              setTrackingOrder(activeOrder);
              setIsConfirmationOpen(false);
            }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>{t('trackOrder')}</span>
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              setIsConfirmationOpen(false);
              setCurrentView('home');
            }}
            className="text-xs text-slate-500 hover:text-blue-600 font-bold underline"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    </div>
  );
};
