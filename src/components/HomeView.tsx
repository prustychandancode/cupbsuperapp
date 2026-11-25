import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  MapPin,
  Pizza,
  Search,
  ShoppingBag,
  Store,
  X,
} from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { ScreenId, StudentProfile } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  profile: StudentProfile;
  campusLocation: string;
  unreadCount: number;
  cartCount: number;
  onSelectLocation: (loc: string) => void;
  onNavigate: (screen: ScreenId, params?: { restaurantId?: string; driverId?: string; marketId?: string }) => void;
  onGlobalSearch: (query: string) => void;
}

const CAMPUS_LOCATIONS = [
  'CUPB Campus',
  'Hostel 4, Room 212',
  'Hostel 2 (Girls)',
  'Academic Block A',
  'Ghudda Main Gate',
];

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  campusLocation,
  unreadCount,
  cartCount,
  onSelectLocation,
  onNavigate,
  onGlobalSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);

  const serviceTiles: {
    id: string;
    label: string;
    icon: string;
    screen?: ScreenId;
    onClick?: () => void;
  }[] = [
    { id: 'food', label: 'Food', icon: ASSETS.iconFood, screen: 'food' },
    { id: 'rides', label: 'Rides', icon: ASSETS.iconRides, screen: 'rides' },
    { id: 'mart', label: 'Mart', icon: ASSETS.iconMart, screen: 'mart' },
    { id: 'meds', label: 'Meds', icon: ASSETS.iconMeds, screen: 'meds' },
    { id: 'chicken', label: 'Chicken', icon: ASSETS.iconChicken, screen: 'chicken' },
    { id: 'rentals', label: 'Rentals', icon: ASSETS.iconRentals, screen: 'rentals' },
    { id: 'market', label: 'Market', icon: ASSETS.iconMarket, screen: 'market' },
    {
      id: 'more',
      label: 'More',
      icon: ASSETS.iconMore,
      onClick: () => setShowMoreModal(true),
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onGlobalSearch(searchInput.trim());
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top App Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 shadow-sm lg:hidden">
            <span className="font-display text-base font-bold text-primary">C</span>
          </div>
          <div className="min-w-0">
            <span className="block font-headline text-base font-bold text-secondary leading-tight lg:hidden">
              CUPB ONE
            </span>
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-text-secondary hover:text-secondary transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-primary-deep shrink-0" aria-hidden="true" />
              <span className="font-body text-xs font-medium truncate">{campusLocation}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              aria-label={`View cart with ${cartCount} items`}
              className="relative inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full hover:border-primary/40 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-on-primary font-label text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('activity')}
            aria-label="Notifications and activity"
            className="relative inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full hover:border-primary/40 transition-colors"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                aria-label="Unread notifications"
                className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-accent"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            aria-label="Student Profile"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-primary"
          >
            <ResilientImage
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8 flex flex-col gap-5">
        {/* Illustrated Campus Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-48 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerCampusHero}
              alt="CUPB Campus Plaza"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="px-4 -mt-6 relative z-10 flex flex-col gap-3">
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="w-full flex items-center gap-2 bg-surface border border-outline-subtle rounded-full px-4 py-3 shadow-md focus-within:border-primary transition-colors"
            >
              <Search className="w-5 h-5 text-muted-grey shrink-0" aria-hidden="true" />
              <input
                id="home-search"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search food, rides, market"
                placeholder="Search food, rides, market..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
              {searchInput.trim() && (
                <button
                  type="submit"
                  className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold shrink-0"
                >
                  Go
                </button>
              )}
            </form>

            <h1 className="font-display text-2xl font-bold tracking-tight text-secondary">
              Hey, What&apos;s up? 👋
            </h1>
          </div>
        </section>

        {/* 2-Row 3D Icon Services Grid */}
        <section className="px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5 items-stretch">
            {serviceTiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => {
                  if (tile.onClick) tile.onClick();
                  else if (tile.screen) onNavigate(tile.screen);
                }}
                className="bg-surface rounded-xl border border-outline-subtle p-2 flex flex-col items-center text-center gap-1.5 shadow-sm hover:border-primary/40 active:scale-[0.97] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center overflow-hidden">
                  <ResilientImage
                    src={tile.icon}
                    alt={tile.label}
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <span className="font-label text-xs font-semibold text-on-surface whitespace-nowrap">
                  {tile.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Around Campus */}
        <section className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-secondary">Trending 🔥</h2>
            <button
              type="button"
              onClick={() => onNavigate('food')}
              className="font-label text-xs font-semibold text-primary-deep hover:underline"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
            <button
              type="button"
              onClick={() => onNavigate('restaurant', { restaurantId: 'punjabi-zaika' })}
              className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col h-full text-left hover:border-primary/40 transition-colors"
            >
              <div className="relative h-24 w-full">
                <ResilientImage
                  src={ASSETS.foodBiryani}
                  alt="Punjabi Zaika"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
                  4.7 ★
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
                <h3 className="font-title text-base font-semibold text-on-surface">
                  Punjabi Zaika
                </h3>
                <p className="font-body text-xs text-text-secondary tabular-nums">20m • ₹149</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('market', { marketId: 'mkt-cycle' })}
              className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col h-full text-left hover:border-primary/40 transition-colors"
            >
              <div className="relative h-24 w-full">
                <ResilientImage
                  src={ASSETS.marketCycle}
                  alt="Sprint Cycle"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                  Like New
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
                <h3 className="font-title text-base font-semibold text-on-surface">Sprint Cycle</h3>
                <p className="font-body text-xs text-text-secondary tabular-nums">
                  ₹3,200 • Hostel 4
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('mart')}
              className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-3 flex flex-col justify-between gap-2 h-full text-left hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9 h-9 rounded-lg bg-primary-tint flex items-center justify-center text-primary-deep">
                  <Store className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                  24x7
                </span>
              </div>
              <div>
                <h3 className="font-title text-base font-semibold text-on-surface">Hostel Mart</h3>
                <p className="font-body text-xs text-text-secondary">Maggi &amp; Snacks</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cab-details', { driverId: 'driver-rahul' })}
              className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-3 flex flex-col justify-between gap-2 h-full text-left hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <ResilientImage
                  src={ASSETS.driverRahul}
                  alt="Rahul Kumar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                  Available
                </span>
              </div>
              <div>
                <h3 className="font-title text-base font-semibold text-on-surface">Rahul Kumar</h3>
                <p className="font-body text-xs text-text-secondary tabular-nums">
                  Bathinda • ₹350
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section aria-label="Promotional banners" className="flex flex-col gap-2">
          <div className="px-4 flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-secondary">Campus Promos</h2>
          </div>

          <div className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar">
            <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="font-label text-xs font-semibold text-primary-deep">
                  CUPB ONE
                </span>
                <h3 className="font-title text-base font-semibold text-secondary">
                  Campus life, sorted. 💚
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface border border-outline-subtle p-1 flex items-center justify-center shrink-0">
                <ResilientImage
                  src={ASSETS.iconDeals}
                  alt="Deals"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="font-label text-xs font-semibold text-on-accent-container">
                  LATE NIGHT
                </span>
                <h3 className="font-title text-base font-semibold text-on-accent-container">
                  Hungry? Order now. 💀
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('food')}
                className="shrink-0 bg-accent text-on-accent px-3.5 py-2 rounded-lg font-label text-sm font-semibold hover:opacity-95 transition-opacity"
              >
                Order
              </button>
            </div>
          </div>
        </section>

        {/* Student Deals */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Student Deals</h2>

          <button
            type="button"
            onClick={() => onNavigate('restaurant', { restaurantId: 'campus-crust' })}
            className="bg-surface rounded-xl border border-outline-subtle p-3.5 flex items-center justify-between gap-3 shadow-sm hover:border-primary/40 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-accent-container flex items-center justify-center text-on-accent-container shrink-0">
                <Pizza className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-title text-base font-semibold text-on-surface">
                  30% Off Campus Crust
                </h3>
                <p className="font-body text-xs text-text-secondary tabular-nums">Code: CUPB30</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-grey" aria-hidden="true" />
          </button>
        </section>
      </main>

      {/* Location Selector Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Select Campus Location
              </h2>
              <button
                type="button"
                onClick={() => setShowLocationModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {CAMPUS_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    onSelectLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                    campusLocation === loc
                      ? 'bg-primary-tint border-primary text-primary-deep'
                      : 'bg-background border-outline-subtle text-on-surface hover:border-outline'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{loc}</span>
                  </span>
                  {campusLocation === loc && <span className="text-xs">Selected</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More Services Modal */}
      {showMoreModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                More Campus Services
              </h2>
              <button
                type="button"
                onClick={() => setShowMoreModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowMoreModal(false);
                  onNavigate('verify-id');
                }}
                className="p-3.5 rounded-xl bg-primary-tint border border-primary/20 text-left flex flex-col gap-1"
              >
                <span className="font-title text-sm font-bold text-primary-deep">Verify CUPB ID</span>
                <span className="text-xs text-text-secondary">Unlock 40% student pass</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMoreModal(false);
                  onNavigate('splash');
                }}
                className="p-3.5 rounded-xl bg-background border border-outline-subtle text-left flex flex-col gap-1"
              >
                <span className="font-title text-sm font-bold text-secondary">Welcome Intro</span>
                <span className="text-xs text-text-secondary">View CUPB ONE splash</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMoreModal(false);
                  onNavigate('activity');
                }}
                className="p-3.5 rounded-xl bg-background border border-outline-subtle text-left flex flex-col gap-1"
              >
                <span className="font-title text-sm font-bold text-secondary">Order History</span>
                <span className="text-xs text-text-secondary">Track orders &amp; rides</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMoreModal(false);
                  onNavigate('cart');
                }}
                className="p-3.5 rounded-xl bg-background border border-outline-subtle text-left flex flex-col gap-1"
              >
                <span className="font-title text-sm font-bold text-secondary">My Cart</span>
                <span className="text-xs text-text-secondary">Review items &amp; checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
