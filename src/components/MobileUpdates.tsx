import React from 'react';
import { Smartphone, ArrowRight, X } from 'lucide-react';

const mobileUpdates = [
  {
    brand: 'Samsung',
    model: 'Samsung Galaxy S25',
    price: '₹74,999',
    launch: '2025',
    processor: 'Snapdragon 8 Elite',
    battery: '4000 mAh',
    camera: '50 MP',
  },
  {
    brand: 'Vivo',
    model: 'Vivo V50',
    price: '₹34,999',
    launch: '2025',
    processor: 'Snapdragon 7 Gen 3',
    battery: '6000 mAh',
    camera: '50 MP',
  },
  {
    brand: 'Redmi',
    model: 'Redmi Note 14 Pro',
    price: '₹24,999',
    launch: '2025',
    processor: 'MediaTek Dimensity',
    battery: '5500 mAh',
    camera: '200 MP',
  },
];

export const MobileUpdates: React.FC = () => {
const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
const handleViewUpdate = (brand: string) => {
  setSelectedBrand(brand);
};
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">
            📱 Mobile Phone Updates
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest phones, prices, launches and software updates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mobileUpdates.map((mobile) => (
          <div
            key={mobile.brand}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <div className="w-full h-48 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
  <Smartphone className="w-20 h-20 opacity-40" />
</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500">
                  {mobile.brand}
                </p>

                <h3 className="font-black">
                  {mobile.model}
                </h3>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
  <p>💰 Price: {mobile.price}</p>
  <p>⚡ Processor: {mobile.processor}</p>
  <p>🔋 Battery: {mobile.battery}</p>
  <p>📷 Camera: {mobile.camera}</p>
  <p>📅 Launch: {mobile.launch}</p>
</div>

            <button
  onClick={() => handleViewUpdate(mobile.brand)}
  className="mt-4 flex items-center gap-2 text-sm font-black"
>
              View Update
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
{selectedBrand && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">
          📱 {selectedBrand} Mobile Updates
        </h2>

        <button
          onClick={() => setSelectedBrand(null)}
          className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <p>📱 Latest mobile launches</p>
        <p>💰 Latest prices</p>
        <p>⚙️ Android/software updates</p>
        <p>📷 Camera and specifications</p>
        <p>🔋 Battery information</p>
      </div>

      <button
        onClick={() => setSelectedBrand(null)}
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white dark:bg-white dark:text-slate-900"
      >
        Close
      </button>
    </div>
  </div>
)}
    </section>
  );
};