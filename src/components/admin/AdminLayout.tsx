import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  MessageSquare,
  Globe,
  LogOut,
  Settings,
  Plus,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';
import { store } from '../../services/store';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSocialInbox } from './AdminSocialInbox';
import { AdminSocialAccounts } from './AdminSocialAccounts';
import { AdminVercelGuide } from './AdminVercelGuide';
import { AdminProductFormModal } from './AdminProductFormModal';
import { AdminPixelTracking } from './AdminPixelTracking';

interface AdminLayoutProps {
  onBackToStore: () => void;
  onLogout: () => void;
}

export type AdminTab = 'overview' | 'products' | 'analytics' | 'inbox' | 'socials' | 'pixels' | 'vercel';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToStore, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const loadData = () => {
    setProducts(store.getProducts());
    const convs = store.getConversations();
    const count = convs.reduce((acc, c) => acc + c.unreadCount, 0);
    setUnreadMessages(count);
  };

  useEffect(() => {
    loadData();
    const unsub = store.subscribe(loadData);
    return unsub;
  }, []);

  const handleSaveProduct = (prodData: any) => {
    store.saveProduct(prodData);
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-30 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/assets/aistudio/DP_af5fa802.png"
                alt="Kefayaan"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Kefayaan</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono uppercase text-amber-400 font-semibold">
                  Admin Panel
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-serif" dir="rtl">
                کفایان · Official Amazon Associate
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={store.getStoreSettings().amazonOfficialStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Amazon Official Store</span>
            </a>

            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Store</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>


        {/* Tab Navigation Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-900 py-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products & Video Links</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Visitor & Click Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Social Inbox</span>
            {unreadMessages > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                {unreadMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'socials'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Connect Social Accounts</span>
          </button>

          <button
            onClick={() => setActiveTab('pixels')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'pixels'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ad Pixels (Meta, TikTok, Google)</span>
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'vercel'
                ? 'bg-white/10 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Vercel & Settings</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'overview' && (
          <AdminOverview
            products={products}
            onNavigate={(t) => setActiveTab(t)}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
          />
        )}

        {activeTab === 'products' && (
          <AdminProducts products={products} onRefresh={loadData} />
        )}

        {activeTab === 'analytics' && <AdminAnalytics />}

        {activeTab === 'inbox' && <AdminSocialInbox />}

        {activeTab === 'socials' && (
          <AdminSocialAccounts onNavigateToInbox={() => setActiveTab('inbox')} />
        )}

        {activeTab === 'pixels' && <AdminPixelTracking />}

        {activeTab === 'vercel' && <AdminVercelGuide />}
      </main>

      {/* Add Product Modal Shortcut */}
      <AdminProductFormModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};
