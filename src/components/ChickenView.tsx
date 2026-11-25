import React, { useMemo, useState } from 'react';
import { ArrowLeft, Navigation, Search, ShoppingBag, X } from 'lucide-react';
import { ASSETS, CHICKEN_ITEMS } from '../data/mockData';
import { CartItem } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface ChickenViewProps {
  cart: CartItem[];
  onBack: () => void;
  onOpenCart: () => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const CATEGORIES = ['All', 'Curry Cut', 'Boneless', 'Eggs'];

export const ChickenView: React.FC<ChickenViewProps> = ({
  cart,
  onBack,
  onOpenCart,
  onAddToCart,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOrderSheet, setShowOrderSheet] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    return CHICKEN_ITEMS.filter((p) => {
      const matchesCat =
        selectedCategory === 'All' || p.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCategory]);

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
              src={ASSETS.iconChicken}
              alt="Chicken 3D icon"
              className="w-8 h-8 rounded-lg object-contain bg-surface border border-outline-subtle"
            />
            <h1 className="font-headline text-xl font-bold text-secondary">Chicken</h1>
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
        {/* Chicken Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerChickenHero}
              alt="CUPB ONE Fresh Chicken"
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
                id="chicken-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search fresh chicken, boneless, eggs"
                placeholder="Search chicken, boneless, eggs..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Chicken promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                FRESH CUTS
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Farm-fresh curry cut ₹220/kg
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconChicken}
              alt="Chicken"
              className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </div>

          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">
                HOSTEL PROTEIN
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                30 Farm Eggs tray for ₹175
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label text-xs font-semibold shrink-0">
              Fresh
            </span>
          </div>
        </section>

        {/* Category Chips */}
        <section
          aria-label="Meat categories"
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

        {/* Chicken Shops & Map */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Nearby Shops</h2>

          <article className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-36 md:h-44 w-full">
              <ResilientImage
                src={ASSETS.chickenFresh}
                alt="Punjab Fresh Poultry"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shadow-sm">
                Open Now
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-title text-lg font-bold text-on-surface">
                    Punjab Fresh Poultry
                  </h3>
                  <p className="font-body text-xs text-text-secondary tabular-nums">
                    Opens 7:00 AM • Closes 9:30 PM
                  </p>
                  <p className="font-body text-xs text-text-secondary tabular-nums">
                    Curry Cut ₹220/kg • Boneless ₹310/kg
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold tabular-nums shrink-0">
                  4.8 ★
                </span>
              </div>

              <div className="relative h-24 rounded-lg overflow-hidden border border-outline-subtle">
                <ResilientImage
                  src={ASSETS.mapCampusShops}
                  alt="Punjab Fresh Poultry Map"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary-deep" aria-hidden="true" />
                  <span>0.5 km • Map</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919876540000"
                  className="inline-flex items-center justify-center gap-1 bg-surface border border-outline text-secondary px-3 py-2.5 rounded-lg font-label text-sm font-semibold"
                >
                  <span>Call Shop</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowOrderSheet(true)}
                  className="inline-flex items-center justify-center gap-1 bg-primary text-on-primary px-3 py-2.5 rounded-lg font-label text-sm font-semibold"
                >
                  <span>Order</span>
                </button>
              </div>
            </div>
          </article>

          {/* Direct Cuts List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-surface rounded-xl border border-outline-subtle p-3.5 flex items-center justify-between gap-2 shadow-sm"
              >
                <div>
                  <h3 className="font-title text-sm font-bold text-on-surface">{p.name}</h3>
                  <p className="text-xs text-text-secondary tabular-nums">
                    {p.unit} · ₹{p.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart({
                      id: p.id,
                      sourceName: p.shopName,
                      sourceType: 'chicken',
                      name: p.name,
                      price: p.price,
                      image: p.image,
                    });
                  }}
                  className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showOrderSheet && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Select Fresh Cut
              </h2>
              <button
                type="button"
                onClick={() => setShowOrderSheet(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {CHICKEN_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-background border border-outline-subtle"
                >
                  <div>
                    <p className="font-title text-sm font-bold text-secondary">{item.name}</p>
                    <p className="text-xs text-text-secondary tabular-nums">
                      {item.unit} • ₹{item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: item.id,
                        sourceName: item.shopName,
                        sourceType: 'chicken',
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      });
                      setShowOrderSheet(false);
                      onOpenCart();
                    }}
                    className="bg-primary text-on-primary px-3.5 py-2 rounded-lg text-xs font-semibold"
                  >
                    Add &amp; Checkout
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Punjab Fresh Poultry
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
              alt="Shop map"
              className="w-full h-48 rounded-xl object-cover border border-outline-subtle"
            />
            <p className="text-sm text-text-secondary">
              Ghudda Road, 500m outside CUPB Main Gate. Free campus gate delivery on ₹200+.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
