import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem, Restaurant } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface RestaurantViewProps {
  restaurant: Restaurant;
  cart: CartItem[];
  onBack: () => void;
  onOpenCart: () => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const RestaurantView: React.FC<RestaurantViewProps> = ({
  restaurant,
  cart,
  onBack,
  onOpenCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(restaurant.dishes.map((d) => d.category)));
    return ['Recommended', ...uniqueCats];
  }, [restaurant]);

  const [selectedCat, setSelectedCat] = useState('Recommended');

  const visibleDishes = useMemo(() => {
    if (selectedCat === 'Recommended') {
      return restaurant.dishes;
    }
    return restaurant.dishes.filter((d) => d.category === selectedCat);
  }, [restaurant, selectedCat]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col flex-1">
      {/* Cover Header */}
      <div className="relative h-44 md:h-52 w-full">
        <ResilientImage
          src={restaurant.image}
          alt={`${restaurant.name} Cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Food"
            className="inline-flex items-center justify-center w-10 h-10 bg-surface text-secondary rounded-full shadow-md hover:bg-surface-subtle transition-colors"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="View Cart"
            className="relative inline-flex items-center justify-center w-10 h-10 bg-surface text-secondary rounded-full shadow-md hover:bg-surface-subtle transition-colors"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center tabular-nums">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 -mt-6 relative z-10 pb-24 flex flex-col gap-4">
        {/* Restaurant Info Card */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="font-headline text-xl font-bold text-secondary">{restaurant.name}</h1>
              <p className="font-body text-xs text-text-secondary">
                {restaurant.cuisine} • {restaurant.gate}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold tabular-nums shrink-0">
              {restaurant.rating.toFixed(1)} ★
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-outline-subtle text-text-secondary">
            <span className="font-label text-xs font-semibold text-primary-deep tabular-nums">
              {restaurant.etaMins} mins
            </span>
            <span className="font-body text-xs tabular-nums">{restaurant.hours}</span>
          </div>
        </section>

        {/* Promotional Banner Card */}
        <section className="bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-xs font-semibold text-on-accent-container">
              STUDENT DEAL
            </span>
            <p className="font-title text-base font-semibold text-secondary">
              {restaurant.promoLabel || 'Flat 20% off with CUPB20'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-accent text-on-accent font-label text-xs font-semibold shrink-0">
            {restaurant.promoCode === 'CUPB30' ? '30% OFF' : '20% OFF'}
          </span>
        </section>

        {/* Menu Category Chips */}
        <section
          aria-label="Menu categories"
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {categories.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCat(cat)}
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

        {/* Menu Items */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Menu</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleDishes.map((dish) => {
              const inCart = cart.find((c) => c.id === dish.id);
              return (
                <article
                  key={dish.id}
                  className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ResilientImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded-sm font-label text-[11px] font-semibold mb-1 ${
                          dish.dietary === 'Non-Veg'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-primary-container text-on-primary-container'
                        }`}
                      >
                        {dish.dietary}
                      </span>
                      <h3 className="font-title text-base font-semibold text-on-surface truncate">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-1 mb-0.5">
                        {dish.description}
                      </p>
                      <span className="font-headline text-base font-bold text-secondary tabular-nums">
                        ₹{dish.price}
                      </span>
                    </div>
                  </div>

                  {inCart ? (
                    <div className="inline-flex items-center gap-1.5 bg-background border border-outline-subtle rounded-lg px-2 py-1 shrink-0">
                      <button
                        type="button"
                        aria-label={`Decrease ${dish.name}`}
                        onClick={() => onUpdateQuantity(dish.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-secondary font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-label text-xs font-bold text-on-surface tabular-nums min-w-[16px] text-center">
                        {inCart.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${dish.name}`}
                        onClick={() => onUpdateQuantity(dish.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-primary-deep font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onAddToCart({
                          id: dish.id,
                          sourceName: restaurant.name,
                          sourceType: 'food',
                          name: dish.name,
                          price: dish.price,
                          image: dish.image,
                        })
                      }
                      className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-xs font-semibold shrink-0 hover:opacity-95 active:scale-[0.97] transition-all"
                    >
                      Add
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Sticky Cart Summary Bar */}
      {cartItemCount > 0 && (
        <div className="sticky bottom-14 lg:bottom-0 z-20 bg-surface border-t border-outline-subtle px-4 py-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="w-full bg-primary text-on-primary px-4 py-3 rounded-xl flex items-center justify-between shadow-sm hover:opacity-95 transition-opacity"
          >
            <span className="font-label text-sm font-semibold tabular-nums">
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} • ₹{cartTotal}
            </span>
            <span className="inline-flex items-center gap-1 font-label text-sm font-semibold">
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
