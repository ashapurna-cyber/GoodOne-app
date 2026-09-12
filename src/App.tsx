import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { GSTInvoiceModal } from './components/GSTInvoiceModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AIChatbot } from './components/AIChatbot';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { MobileUpdates } from './components/MobileUpdates';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, setFilterState, toasts } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-yellow-300 selection:text-slate-900">
      {/* Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 space-y-6">
        {currentView === 'home' && (
          <>
            <HeroCarousel
  onCategorySelect={(cat) => {
    setFilterState((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    setCurrentView('home');
  }}
/>

<MobileUpdates />

<ProductGrid />
          </>
        )}

        {currentView === 'dashboard' && <UserDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlay Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <GSTInvoiceModal />
      <AuthModal />
      <AIChatbot />

      {/* Toast Notifications System */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-xl border text-xs font-extrabold flex items-center gap-2.5 animate-in slide-in-from-left duration-300 ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-emerald-500/50'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-500/50'
                : 'bg-slate-900 text-slate-100 border-blue-500/50'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
