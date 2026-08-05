import React from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import { 
  X, CheckCircle2, Clock, Truck, Package, MapPin, AlertCircle, Phone 
} from 'lucide-react';

const TRACK_STEPS: OrderStatus[] = [
  'Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrderTrackingModal: React.FC = () => {
  const { trackingOrder, setTrackingOrder, t } = useApp();

  if (!trackingOrder) return null;

  const currentStepIndex = TRACK_STEPS.indexOf(trackingOrder.orderStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Real-time Express Tracking
            </span>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
              Order #{trackingOrder.id}
            </h2>
          </div>
          <button
            onClick={() => setTrackingOrder(null)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Banner */}
        <div className="bg-blue-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-blue-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Status</div>
              <div className="text-sm font-black text-slate-900 dark:text-white uppercase">
                {trackingOrder.orderStatus}
              </div>
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="text-slate-500 font-medium">Estimated Delivery</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">
              {new Date(trackingOrder.estimatedDelivery).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </div>
          </div>
        </div>

        {/* Step Timeline */}
        <div className="space-y-6 py-2">
          {TRACK_STEPS.map((step, idx) => {
            const isDone = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const stepDetail = trackingOrder.trackingSteps.find((s) => s.status === step);

            return (
              <div key={step} className="flex items-start gap-4 relative">
                {/* Connecting Line */}
                {idx < TRACK_STEPS.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 w-0.5 h-12 -ml-[1px] ${
                      idx < currentStepIndex ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}

                {/* Step Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                    isDone
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                </div>

                {/* Step Info */}
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-black ${isCurrent ? 'text-blue-600 dark:text-blue-400 text-sm' : 'text-slate-800 dark:text-slate-200'}`}>
                      {step}
                    </span>
                    <span className="text-slate-400 font-medium">{stepDetail?.date || 'Pending'}</span>
                  </div>
                  {stepDetail?.note && (
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">{stepDetail.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Courier & Driver Info */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-bold">
              BD
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-100">BlueDart Express Air</div>
              <div className="text-[11px] text-slate-400">AWB: BD-89210-GO</div>
            </div>
          </div>
          <button
            onClick={() => alert('Delivery Agent Contact: +91 98765 12345')}
            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold flex items-center gap-1.5 hover:bg-slate-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
};
