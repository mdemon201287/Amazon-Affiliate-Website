import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowUpRight, Lock, Menu, X, BarChart3, ExternalLink } from 'lucide-react';
import { store } from '../services/store';
import { StoreSettings } from '../types';

interface NavbarProps {
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onGoToAdmin: () => void;
  onOpenSocialHub: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdminLoggedIn,
  onOpenAdminLogin,
  onGoToAdmin,
  onOpenSocialHub,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(store.getStoreSettings());

  useEffect(() => {
    const refresh = () => setStoreSettings(store.getStoreSettings());
    const unsub = store.subscribe(refresh);
    return unsub;
  }, []);

  const handleOfficialStoreClick = () => {
    store.trackOfficialStoreClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* FTC Affiliate Transparency Notice Banner */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          As an Amazon Associate, <strong className="text-white">{storeSettings.shopName}</strong> earns from qualifying purchases with Prime benefits at zero extra cost to you.
        </span>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Kefayaan Brand with Official Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-sm group-hover:border-amber-400 transition-colors">
            <img
              src={storeSettings.logoUrl || '/assets/aistudio/DP_af5fa802.png'}
              alt={storeSettings.shopName}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback elegant monogram
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors">
                {storeSettings.shopName}
              </span>
              {storeSettings.arabicName && (
                <span className="text-xs font-semibold text-slate-400 font-serif" dir="rtl">
                  {storeSettings.arabicName}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              Amazon Official Associate Store
            </p>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('deals')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            US Best Sellers
          </button>
          <button
            onClick={() => onScrollToSection('departments')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Trending Departments
          </button>
          <button
            onClick={() => onScrollToSection('comparison')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Comparison Matrix
          </button>
          <button
            onClick={() => onScrollToSection('video-reviews')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Video Lab
          </button>
          <button
            onClick={onOpenSocialHub}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Social Concierge
          </button>
        </nav>

        {/* Zone 3: Amazon Official Store Button + Admin */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Prominent Amazon Official Store Affiliate Button */}
          <a
            href={storeSettings.amazonOfficialStoreUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={handleOfficialStoreClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all hover:scale-102 cursor-pointer border border-amber-500/80"
            title="Visit Kefayaan Official Store on Amazon"
          >
            <span className="hidden sm:inline">Amazon Official Store</span>
            <span className="sm:hidden">Amazon Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
          </a>

          {isAdminLoggedIn ? (
            <button
              onClick={onGoToAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-950 rounded-xl hover:bg-slate-800 transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Dashboard</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Admin Login"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-950 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <a
            href={storeSettings.amazonOfficialStoreUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              handleOfficialStoreClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
          >
            <span>Visit Amazon Official Store ({storeSettings.shopName})</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              onScrollToSection('deals');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            US Best Sellers
          </button>
          <button
            onClick={() => {
              onScrollToSection('departments');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Trending Departments
          </button>
          <button
            onClick={() => {
              onScrollToSection('comparison');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Comparison Matrix
          </button>
          <button
            onClick={() => {
              onScrollToSection('video-reviews');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Video Lab Reviews
          </button>
          <button
            onClick={() => {
              onOpenSocialHub();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Social Concierge & Live Chat
          </button>
          <div className="pt-2 border-t border-slate-100">
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  onGoToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold text-white bg-slate-950 rounded-xl"
              >
                Go to Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAdminLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

