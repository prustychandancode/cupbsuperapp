import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Droplet,
  FileUp,
  MapPin,
  Minus,
  Navigation,
  Pill,
  Plus,
  Search,
  ShieldPlus,
  Stethoscope,
  X,
} from 'lucide-react';
import { ASSETS, MEDS_ITEMS } from '../data/mockData';
import { CartItem, MedsItem } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface MedsViewProps {
  cart: CartItem[];
  onBack: () => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onUploadRx: (rxName: string) => void;
}

const CATEGORIES = ['All', 'First Aid', 'OTC', 'Personal Care', 'Wellness'];

export const MedsView: React.FC<MedsViewProps> = ({
  cart,
  onBack,
  onAddToCart,
  onUpdateQuantity,
  onUploadRx,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxFileName, setRxFileName] = useState('');
  const [rxNotes, setRxNotes] = useState('');
  const [rxSubmitted, setRxSubmitted] = useState(false);
  const [mapTarget, setMapTarget] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MEDS_ITEMS.filter((item) => {
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

  const renderMedIcon = (icon: MedsItem['icon']) => {
    switch (icon) {
      case 'droplet':
        return <Droplet className="w-8 h-8" />;
      case 'pill':
        return <Pill className="w-8 h-8" />;
      case 'bandage':
        return <ShieldPlus className="w-8 h-8" />;
      default:
        return <Stethoscope className="w-8 h-8" />;
    }
  };

  const handleSubmitRx = (e: React.FormEvent) => {
    e.preventDefault();
    const label = rxFileName.trim() || 'campus_prescription.jpg';
    onUploadRx(label);
    setRxSubmitted(true);
    setTimeout(() => {
      setRxSubmitted(false);
      setShowRxModal(false);
      setRxFileName('');
      setRxNotes('');
    }, 1400);
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
              src={ASSETS.iconMeds}
              alt="Meds 3D icon"
              className="w-8 h-8 rounded-lg object-contain bg-surface border border-outline-subtle"
            />
            <h1 className="font-headline text-xl font-bold text-secondary">Meds</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRxModal(true)}
          className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-3 py-2 rounded-full font-label text-xs font-semibold shrink-0 hover:opacity-95"
        >
          <FileUp className="w-4 h-4" aria-hidden="true" />
          <span>Upload Rx</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8 flex flex-col gap-5">
        {/* Meds Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerMedsHero}
              alt="CUPB ONE Meds Pharmacy"
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
                id="meds-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search medicines, first aid"
                placeholder="Search medicines, first aid..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Pharmacy promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <button
            type="button"
            onClick={() => setShowRxModal(true)}
            className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm text-left"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">
                PRESCRIPTION
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Upload Rx for verified meds.
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconMeds}
              alt="Meds"
              className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </button>

          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">WELLNESS</span>
              <p className="font-title text-base font-semibold text-secondary">
                15% off First Aid &amp; OTC
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shrink-0">
              24x7
            </span>
          </div>
        </section>

        {/* Category Chips */}
        <section
          aria-label="Healthcare categories"
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

        {/* Pharmacies & OTC */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Nearby Pharmacies</h2>

          <article className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-28 w-full">
              <ResilientImage
                src={ASSETS.mapCampusShops}
                alt="CUPB Health Mart Map Location"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shadow-sm">
                Open Now
              </span>
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
                0.3 km
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-title text-base font-semibold text-on-surface">
                    CUPB Health Mart
                  </h3>
                  <p className="font-body text-xs text-text-secondary tabular-nums">
                    Opens 8:00 AM • Closes 11:00 PM
                  </p>
                </div>
                <a
                  href="tel:+919876500111"
                  className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label text-xs font-semibold shrink-0"
                >
                  Call
                </a>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-outline-subtle">
                <span className="font-body text-xs text-text-secondary">
                  Near Main Gate, Ghudda
                </span>
                <button
                  type="button"
                  onClick={() => setMapTarget('CUPB Health Mart · Near Main Gate, Ghudda (0.3 km)')}
                  className="inline-flex items-center gap-1 font-label text-xs font-semibold text-primary-deep hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </article>

          <article className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-title text-base font-semibold text-on-surface">
                Ghudda Medicals
              </h3>
              <p className="font-body text-xs text-text-secondary tabular-nums">
                Opens 9:00 AM • Closes 10:00 PM
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMapTarget('Ghudda Medicals · Ghudda Market Road (0.6 km)')}
              className="inline-flex items-center gap-1 bg-surface border border-outline text-secondary px-3 py-2 rounded-lg font-label text-xs font-semibold shrink-0 hover:bg-surface-subtle"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Map</span>
            </button>
          </article>

          <h2 className="font-headline text-lg font-bold text-secondary pt-1">OTC Essentials</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
            {filteredItems.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <article
                  key={item.id}
                  className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-3 flex flex-col justify-between gap-2.5 h-full"
                >
                  <div className="h-20 rounded-lg bg-primary-tint flex items-center justify-center text-primary-deep">
                    {renderMedIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="font-title text-base font-semibold text-on-surface">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs text-text-secondary tabular-nums">
                      {item.pack}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
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
                            sourceName: 'CUPB Health Mart',
                            sourceType: 'meds',
                            name: item.name,
                            price: item.price,
                          })
                        }
                        className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label text-xs font-semibold"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Upload Prescription Modal */}
      {showRxModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <form
            onSubmit={handleSubmitRx}
            className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Upload Prescription (Rx)
              </h2>
              <button
                type="button"
                onClick={() => setShowRxModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rxSubmitted ? (
              <div className="py-6 flex flex-col items-center gap-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-primary-deep" />
                <p className="font-title text-base font-bold text-secondary">
                  Prescription Sent to CUPB Health Mart
                </p>
                <p className="text-xs text-text-secondary">
                  Pharmacist will confirm availability in ~5 mins.
                </p>
              </div>
            ) : (
              <>
                <label className="w-full border border-dashed border-primary bg-primary-tint rounded-xl p-5 flex flex-col items-center gap-1.5 text-primary-deep cursor-pointer">
                  <FileUp className="w-6 h-6" />
                  <span className="text-xs font-semibold">
                    {rxFileName || 'Tap to attach prescription photo / PDF'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setRxFileName(f.name);
                    }}
                    className="sr-only"
                  />
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional note (e.g. Hostel 4, call on arrival)"
                  value={rxNotes}
                  onChange={(e) => setRxNotes(e.target.value)}
                  className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
                >
                  Submit Prescription
                </button>
              </>
            )}
          </form>
        </div>
      )}

      {mapTarget && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">Pharmacy Map</h2>
              <button
                type="button"
                onClick={() => setMapTarget(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ResilientImage
              src={ASSETS.mapCampusShops}
              alt="Campus pharmacy map"
              className="w-full h-48 rounded-xl object-cover border border-outline-subtle"
            />
            <p className="text-sm font-medium text-secondary">{mapTarget}</p>
          </div>
        </div>
      )}
    </div>
  );
};
