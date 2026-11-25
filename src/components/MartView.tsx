import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Coffee,
  Milk,
  Minus,
  Navigation,
  NotebookPen,
  Plus,
  Search,
  ShoppingBag,
  Utensils,
  X,
} from 'lucide-react';
import { ASSETS, MART_ITEMS } from '../data/mockData';
import { CartItem, MartItem } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface MartViewProps {
  cart: CartItem[];
  onBack: () => void;
  onOpenCart: () => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CATEGORIES = ['All', 'Instant Food', 'Dairy', 'Snacks', 'Cold Drinks', 'Stationery'];

export const MartView: React.FC<MartViewProps> = ({
  cart,
  onBack,
  onOpenCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMapModal, setShowMapModal] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredItems = useMemo(() => {
    return MART_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCategory]);

  const renderFallback = (icon: MartItem['fallbackIcon']) => {
    switch (icon) {
      case 'milk':
        return <Milk className="w-9 h-9 text-on-accent-container" />;
      case 'notebook':
        return <NotebookPen className="w-9 h-9 text-secondary" />;
      case 'coffee':
        return <Coffee className="w-9 h-9 text-secondary" />;
      default:
        return <Utensils className="w-9 h-9 text-primary-deep" />;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Contextual Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Home"
            className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <ResilientImage
              src={ASSETS.iconMart}
              alt="Mart 3D icon"
              className="w-8 h-8 rounded-lg object-contain bg-surface border border-outline-subtle"
            />
            <h1 className="font-headline text-xl font-bold text-secondary">Mart</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Cart, ${cartCount} items`}
          className="relative inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full"
        >
          <ShoppingBag className="w-5 h-5" aria-hidden="true" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8 flex flex-col gap-5">
        {/* Mart Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerMartHero}
              alt="CUPB ONE Mart"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="px-4 -mt-6 relative z-10">
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="w-full flex items-center gap-2 bg-surface border border-outline-subtle rounded-full px-4 py-3 shadow-md focus-within:border-primary"
            >
              <Search className="w-5 h-5 text-muted-grey shrink-0" aria-hidden="true" />
              <input
                id="mart-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Maggi, milk, snacks"
                placeholder="Search Maggi, milk, snacks..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Mart promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                24X7 HOSTEL MART
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Midnight Maggi cravings? 🍜
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent text-on-accent font-label text-xs font-semibold shrink-0">
              10 mins
            </span>
          </div>

          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">
                STUDY COMBO
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Coffee + Chips at ₹79
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconMart}
              alt="Mart"
              className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </div>
        </section>

        {/* Category Chips */}
        <section
          aria-label="Grocery categories"
          className="px-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full font-label text-xs font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface border border-outline text-on-surface hover:border-secondary/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* Mart Shop & Map */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Nearby Store</h2>

          <article className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-28 w-full">
              <ResilientImage
                src={ASSETS.mapCampusShops}
                alt="Hostel Mart Map"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shadow-sm">
                Open 24x7
              </span>
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
                0.2 km
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-title text-base font-semibold text-on-surface">
                  Hostel Mart 24x7
                </h3>
                <p className="font-body text-xs text-text-secondary tabular-nums">
                  Opens 6:00 AM • Closes 2:00 AM
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(true)}
                className="inline-flex items-center gap-1 bg-surface border border-outline text-secondary px-3 py-2 rounded-lg font-label text-xs font-semibold shrink-0 hover:bg-surface-subtle"
              >
                <Navigation className="w-4 h-4 text-primary-deep" aria-hidden="true" />
                <span>Map</span>
              </button>
            </div>
          </article>
        </section>

        {/* Product Grid */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Hostel Essentials</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-stretch">
            {filteredItems.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <article
                  key={item.id}
                  className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col h-full"
                >
                  {item.image ? (
                    <div className="relative h-28 w-full">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.discountBadge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-on-accent font-label text-xs font-semibold">
                          {item.discountBadge}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`relative h-28 w-full flex items-center justify-center ${
                        item.fallbackIcon === 'milk'
                          ? 'bg-accent-container'
                          : 'bg-secondary-container'
                      }`}
                    >
                      {renderFallback(item.fallbackIcon)}
                      {item.discountBadge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                          {item.discountBadge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
                    <div>
                      <h3 className="font-title text-base font-semibold text-on-surface">
                        {item.name}
                      </h3>
                      <p className="font-body text-xs text-text-secondary tabular-nums">
                        {item.weight}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-headline text-base font-bold text-secondary tabular-nums">
                        ₹{item.price}
                      </span>
                      {inCart ? (
                        <div className="inline-flex items-center gap-1 bg-background border border-outline-subtle rounded-lg px-1.5 py-0.5">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-secondary"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-label text-xs font-bold tabular-nums">
                            {inCart.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-primary-deep"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onAddToCart({
                              id: item.id,
                              sourceName: 'Hostel Mart 24x7',
                              sourceType: 'mart',
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            })
                          }
                          className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label text-xs font-semibold"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Hostel Mart 24x7 Location
              </h2>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ResilientImage
              src={ASSETS.mapCampusShops}
              alt="Campus shops map"
              className="w-full h-48 rounded-xl object-cover border border-outline-subtle"
            />
            <p className="text-sm text-text-secondary">
              Located 200m from Hostel 4 Ground Floor Courtyard, CUPB Bathinda. Open 6:00 AM – 2:00 AM daily.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
