import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Headphones,
  Phone,
  Plus,
  Search,
  Snowflake,
  X,
} from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { MarketListing } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface MarketViewProps {
  listings: MarketListing[];
  initialSelectedId?: string | null;
  initialQuery?: string;
  onAddListing: (listing: MarketListing) => void;
  onContactSeller: (listing: MarketListing) => void;
}

const CATEGORIES = ['All', 'Cycles', 'Books', 'Electronics', 'Hostel'];

export const MarketView: React.FC<MarketViewProps> = ({
  listings,
  initialSelectedId = null,
  initialQuery = '',
  onAddListing,
  onContactSeller,
}) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<MarketListing | null>(() => {
    if (!initialSelectedId) return null;
    return listings.find((l) => l.id === initialSelectedId) || null;
  });
  const [showSellModal, setShowSellModal] = useState(false);

  const [sellTitle, setSellTitle] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellCategory, setSellCategory] = useState<MarketListing['category']>('Hostel');
  const [sellCondition, setSellCondition] = useState<MarketListing['condition']>('Like New');
  const [sellDesc, setSellDesc] = useState('');

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [listings, search, selectedCategory]);

  const handlePublishItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellTitle.trim()) return;
    const newItem: MarketListing = {
      id: `mkt-${Date.now()}`,
      title: sellTitle.trim(),
      price: Math.max(50, Number(sellPrice) || 500),
      condition: sellCondition,
      category: sellCategory,
      postedAgo: 'Just now',
      sellerName: 'Aarav Sharma',
      hostel: 'Hostel 4, Room 212',
      phone: '+919876543210',
      description:
        sellDesc.trim() || 'Clean item available for pickup at Hostel 4, CUPB Campus.',
      fallbackIcon:
        sellCategory === 'Books'
          ? 'book'
          : sellCategory === 'Electronics'
          ? 'headphones'
          : 'cooler',
    };
    onAddListing(newItem);
    setSellTitle('');
    setSellPrice('');
    setSellDesc('');
    setShowSellModal(false);
  };

  return (
    <div className="flex flex-col flex-1 relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <h1 className="font-headline text-xl font-bold text-secondary">Campus Market</h1>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shrink-0">
          <BadgeCheck className="w-4 h-4" aria-hidden="true" />
          <span>CUPB ONE</span>
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 flex flex-col gap-5">
        {/* Market Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerMarketHero}
              alt="CUPB ONE Campus Market Banner"
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
                id="market-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search cycles, books, coolers"
                placeholder="Search cycles, books, coolers..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Market promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">ZERO FEES</span>
              <p className="font-title text-base font-semibold text-secondary">
                Your old stuff, someone&apos;s treasure.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSellModal(true)}
              className="px-3 py-1 rounded-full bg-primary text-on-primary font-label text-xs font-semibold shrink-0"
            >
              Sell Free
            </button>
          </div>

          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                HOSTEL DEALS
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Cycles &amp; coolers under ₹3,500
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconMarket}
              alt="Market"
              className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </div>
        </section>

        {/* Category Chips */}
        <section
          aria-label="Marketplace categories"
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

        {/* Product Grid */}
        <section className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-secondary">Fresh Listings</h2>
            <span className="text-xs text-text-secondary tabular-nums">
              {filteredListings.length} items
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
            {filteredListings.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedProduct(item)}
                className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col h-full text-left hover:border-primary/40 transition-colors"
              >
                {item.image ? (
                  <div className="relative h-28 w-full">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-label text-xs font-semibold ${
                        item.condition === 'Like New'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>
                ) : (
                  <div className="relative h-28 w-full bg-secondary-container flex items-center justify-center">
                    {item.fallbackIcon === 'book' ? (
                      <BookOpen className="w-9 h-9 text-secondary" />
                    ) : item.fallbackIcon === 'headphones' ? (
                      <Headphones className="w-9 h-9 text-secondary" />
                    ) : (
                      <Snowflake className="w-9 h-9 text-secondary" />
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface text-on-secondary-container font-label text-xs font-semibold shadow-xs">
                      {item.condition}
                    </span>
                  </div>
                )}

                <div className="p-3 flex flex-col gap-1 flex-1 justify-between w-full">
                  <h3 className="font-title text-base font-semibold text-on-surface truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-headline text-base font-bold text-secondary tabular-nums">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="font-body text-xs text-text-secondary">
                      {item.postedAgo}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Prominent Floating Sell Button */}
      <div className="sticky bottom-16 lg:bottom-6 z-20 flex justify-end px-4 pointer-events-none pb-2">
        <button
          type="button"
          onClick={() => setShowSellModal(true)}
          className="pointer-events-auto inline-flex items-center gap-1.5 bg-primary text-on-primary px-5 py-3 rounded-full font-label text-sm font-semibold shadow-lg hover:opacity-95 active:scale-[0.97] transition-all"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span>Sell Something</span>
        </button>
      </div>

      {/* Product Details Sheet */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                {selectedProduct.condition} · {selectedProduct.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProduct.image && (
              <ResilientImage
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-44 rounded-xl object-cover"
              />
            )}

            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-headline text-xl font-bold text-secondary">
                  {selectedProduct.title}
                </h2>
                <p className="text-xs text-text-secondary">
                  {selectedProduct.sellerName} • {selectedProduct.hostel}
                </p>
              </div>
              <span className="font-headline text-xl font-bold text-primary-deep tabular-nums">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${selectedProduct.phone}`}
                className="inline-flex items-center justify-center gap-1.5 bg-surface border border-outline text-secondary py-3 rounded-xl font-label text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>Call Seller</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onContactSeller(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Reserve Item</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Product Modal */}
      {showSellModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <form
            onSubmit={handlePublishItem}
            className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Sell on Campus Market
              </h2>
              <button
                type="button"
                onClick={() => setShowSellModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              required
              placeholder="Item title (e.g. Study Lamp, Cycle)"
              value={sellTitle}
              onChange={(e) => setSellTitle(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="number"
                required
                placeholder="Price ₹"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm tabular-nums"
              />
              <select
                value={sellCategory}
                onChange={(e) => setSellCategory(e.target.value as MarketListing['category'])}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
              >
                <option value="Cycles">Cycles</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Hostel">Hostel</option>
              </select>
            </div>
            <select
              value={sellCondition}
              onChange={(e) => setSellCondition(e.target.value as MarketListing['condition'])}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Used">Used</option>
            </select>
            <textarea
              rows={2}
              placeholder="Condition notes & pickup hostel..."
              value={sellDesc}
              onChange={(e) => setSellDesc(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
            >
              Post Free Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
