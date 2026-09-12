import React from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';

const mobileUpdates = [
  {
    brand: 'Samsung',
    title: 'Latest Samsung Mobile Update',
    description:
      'Check latest launch, price, specifications and software updates.',
  },
  {
    brand: 'Vivo',
    title: 'Latest Vivo Mobile Update',
    description:
      'Check new Vivo phones, prices, specifications and Android updates.',
  },
  {
    brand: 'Redmi',
    title: 'Latest Redmi Mobile Update',
    description:
      'Check latest Redmi launches, prices and specifications.',
  },
];

export const MobileUpdates: React.FC = () => {
const handleViewUpdate = (brand: string) => {
  alert(`Latest ${brand} mobile updates coming soon!`);
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
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500">
                  {mobile.brand}
                </p>

                <h3 className="font-black">
                  {mobile.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {mobile.description}
            </p>

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
    </section>
  );
};