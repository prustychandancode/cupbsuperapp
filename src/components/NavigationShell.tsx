import React from 'react';
import {
  Bike,
  Car,
  Compass,
  Drumstick,
  Home,
  Pill,
  ReceiptText,
  ShoppingBag,
  Store,
  User,
  Utensils,
} from 'lucide-react';
import { BottomTabId, ScreenId, StudentProfile } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface NavigationShellProps {
  activeScreen: ScreenId;
  activeTab: BottomTabId;
  cartCount: number;
  cartTotal: number;
  profile: StudentProfile;
  unreadCount: number;
  showBottomNav?: boolean;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export const NavigationShell: React.FC<NavigationShellProps> = ({
  activeScreen,
  activeTab,
  cartCount,
  cartTotal,
  profile,
  unreadCount,
  showBottomNav = true,
  onNavigate,
  children,
}) => {
  const navTabs: { id: BottomTabId; label: string; screen: ScreenId; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', screen: 'home', icon: <Home className="w-5 h-5" /> },
    { id: 'explore', label: 'Explore', screen: 'food', icon: <Compass className="w-5 h-5" /> },
    { id: 'market', label: 'Market', screen: 'market', icon: <Store className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', screen: 'activity', icon: <ReceiptText className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', screen: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  const quickServices: { label: string; screen: ScreenId; icon: React.ReactNode }[] = [
    { label: 'Food', screen: 'food', icon: <Utensils className="w-4 h-4" /> },
    { label: 'Rides', screen: 'rides', icon: <Car className="w-4 h-4" /> },
    { label: 'Mart', screen: 'mart', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Meds', screen: 'meds', icon: <Pill className="w-4 h-4" /> },
    { label: 'Chicken', screen: 'chicken', icon: <Drumstick className="w-4 h-4" /> },
    { label: 'Rentals', screen: 'rentals', icon: <Bike className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col lg:flex-row lg:max-w-7xl lg:mx-auto">
      {/* Desktop Navigation Rail */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen bg-surface border-r border-outline-subtle p-5 justify-between">
        <div className="flex flex-col gap-6">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus-visible:outline-2 focus-visible:outline-primary rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-sm">
              <span className="font-display text-lg font-extrabold text-primary">C1</span>
            </div>
            <div>
              <span className="block font-display text-base font-bold text-secondary leading-tight">
                CUPB ONE
              </span>
              <span className="block font-body text-xs text-text-secondary">
                Bathinda Campus
              </span>
            </div>
          </button>

          <nav aria-label="Desktop primary navigation" className="flex flex-col gap-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onNavigate(tab.screen)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-tint text-primary-deep'
                      : 'text-text-secondary hover:bg-surface-subtle hover:text-secondary'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                  {tab.id === 'activity' && unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-on-accent text-xs tabular-nums">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-outline-subtle flex flex-col gap-2">
            <span className="px-3 text-xs font-semibold text-muted-grey">Campus Services</span>
            <div className="grid grid-cols-2 gap-1.5">
              {quickServices.map((svc) => {
                const isActive = activeScreen === svc.screen;
                return (
                  <button
                    key={svc.screen}
                    type="button"
                    onClick={() => onNavigate(svc.screen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-background text-on-surface hover:bg-surface-subtle'
                    }`}
                  >
                    {svc.icon}
                    <span>{svc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="tabular-nums">{cartCount} items</span>
              </span>
              <span className="tabular-nums">₹{cartTotal}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-background border border-outline-subtle hover:border-primary/40 transition-colors text-left"
          >
            <ResilientImage
              src={profile.avatar}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-primary shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="font-title text-sm font-semibold text-secondary truncate">
                {profile.name}
              </p>
              <p className="font-body text-xs text-text-secondary truncate">
                {profile.verified ? 'Verified' : 'Unverified'} · {profile.hostel.split(' ')[0]} {profile.hostel.split(' ')[1] || ''}
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 min-w-0 flex flex-col w-full max-w-[460px] md:max-w-3xl lg:max-w-4xl mx-auto bg-background min-h-screen relative">
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Mobile / Tablet 5-Tab Bottom Navigation */}
        {showBottomNav && (
          <nav
            aria-label="Primary navigation"
            className="lg:hidden sticky bottom-0 z-30 bg-surface/95 backdrop-blur-md border-t border-outline-subtle px-2 py-1.5"
          >
            <div className="grid grid-cols-5 items-center">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onNavigate(tab.screen)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex flex-col items-center justify-center gap-1 py-1.5 min-h-[44px] transition-colors ${
                      isActive ? 'text-primary-deep' : 'text-text-secondary hover:text-secondary'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-label text-[11px] font-semibold leading-none whitespace-nowrap">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};
