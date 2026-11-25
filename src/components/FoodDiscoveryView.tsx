import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { ASSETS, RESTAURANTS } from '../data/mockData';
import { ResilientImage } from './ResilientImage';

interface FoodDiscoveryViewProps {
  campusLocation: string;
  cartCount: number;
  initialQuery?: string;
  onBack: () => void;
  onOpenCart: () => void;
  onSelectRestaurant: (restaurantId: string) => void;
}

const CATEGORIES = ['All', 'Biryani', 'Pizza', 'Burgers', 'Chinese', 'Thali'];

export const FoodDiscoveryView: React.FC<FoodDiscoveryViewProps> = ({
  campusLocation,
  cartCount,
  initialQuery = '',
  onBack,
  onOpenCart,
  onSelectRestaurant,
}) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const matchesCategory =
        selectedCategory === 'All' || r.categories.includes(selectedCategory);
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.dishes.some((d) => d.name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
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
            className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div>
            <h1 className="font-headline text-xl font-bold text-secondary leading-tight">Food</h1>
            <p className="font-body text-xs text-text-secondary">{campusLocation}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Cart, ${cartCount} items`}
          className="relative inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full hover:border-primary/40 transition-colors"
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
        {/* Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerFoodHero}
              alt="CUPB ONE Food Banners"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="px-4 -mt-6 relative z-10">
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="w-full flex items-center gap-2 bg-surface border border-outline-subtle rounded-full px-4 py-3 shadow-md focus-within:border-primary transition-colors"
            >
              <Search className="w-5 h-5 text-muted-grey shrink-0" aria-hidden="true" />
              <input
                id="food-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search biryani, pizza, thali"
                placeholder="Search biryani, pizza, thali..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Food promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <button
            type="button"
            onClick={() => onSelectRestaurant('punjabi-zaika')}
            className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm text-left"
          >
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                CUPB ONE FOOD
              </span>
              <p className="font-title text-base font-semibold text-secondary text-balance">
                Biryani today, study later.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent text-on-accent font-label text-xs font-semibold shrink-0">
              40% OFF
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectRestaurant('campus-crust')}
            className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm text-left"
          >
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs font-semibold text-primary-deep">
                HOSTEL COMBO
              </span>
              <p className="font-title text-base font-semibold text-secondary text-balance">
                Free Coke on orders ₹249+
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label text-xs font-semibold shrink-0">
              CUPB30
            </span>
          </button>
        </section>

        {/* Category Chips */}
        <section
          aria-label="Food categories"
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
                className={`shrink-0 inline-flex items-center px-4 py-2 rounded-full font-label text-xs font-semibold transition-colors whitespace-nowrap ${
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

        {/* Restaurant Cards */}
        <section className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-secondary">Near CUPB</h2>
            <span className="text-xs font-medium text-text-secondary tabular-nums">
              {filteredRestaurants.length} places
            </span>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="bg-surface rounded-xl border border-outline-subtle p-6 text-center flex flex-col items-center gap-2">
              <p className="font-title text-base font-semibold text-secondary">
                No restaurants match &ldquo;{search}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredRestaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  type="button"
                  onClick={() => onSelectRestaurant(restaurant.id)}
                  className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col text-left hover:border-primary/40 transition-colors"
                >
                  <div className="relative h-36 w-full">
                    <ResilientImage
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.badge && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full font-label text-xs font-semibold shadow-sm ${
                          restaurant.badgeVariant === 'accent'
                            ? 'bg-accent text-on-accent'
                            : 'bg-primary text-on-primary'
                        }`}
                      >
                        {restaurant.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
                      {restaurant.etaMins} mins
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between gap-2 w-full">
                    <div>
                      <h3 className="font-title text-lg font-bold text-on-surface">
                        {restaurant.name}
                      </h3>
                      <p className="font-body text-xs text-text-secondary tabular-nums">
                        {restaurant.cuisine} • ₹{restaurant.startingPrice}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold tabular-nums shrink-0">
                      {restaurant.rating.toFixed(1)} ★
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
