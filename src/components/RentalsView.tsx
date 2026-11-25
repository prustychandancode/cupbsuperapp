import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Plus, Search, ShieldCheck, X } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { RentalBike } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface RentalsViewProps {
  bikes: RentalBike[];
  onBack: () => void;
  onListBike: (bike: RentalBike) => void;
  onRentBike: (bike: RentalBike, days: number) => void;
}

export const RentalsView: React.FC<RentalsViewProps> = ({
  bikes,
  onBack,
  onListBike,
  onRentBike,
}) => {
  const [search, setSearch] = useState('');
  const [selectedBike, setSelectedBike] = useState<RentalBike | null>(null);
  const [rentDays, setRentDays] = useState(1);
  const [showListBikeModal, setShowListBikeModal] = useState(false);

  const [newBikeName, setNewBikeName] = useState('');
  const [newPrice, setNewPrice] = useState('180');
  const [newLocation, setNewLocation] = useState('Hostel 4');
  const [newOwner, setNewOwner] = useState('Aarav Sharma');

  const filteredBikes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bikes;
    return bikes.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.owner.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
    );
  }, [bikes, search]);

  const handleCreateBike = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBikeName.trim()) return;
    const created: RentalBike = {
      id: `bike-${Date.now()}`,
      name: newBikeName.trim(),
      pricePerDay: Math.max(80, Number(newPrice) || 180),
      owner: newOwner.trim() || 'Aarav Sharma',
      location: newLocation.trim() || 'CUPB Campus',
      status: 'Available',
      verified: true,
      phone: '+919876511223',
      mileage: '42 km/l • Well Maintained',
      helmetIncluded: true,
      deposit: 300,
      image: ASSETS.bikeActiva,
    };
    onListBike(created);
    setNewBikeName('');
    setShowListBikeModal(false);
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
              src={ASSETS.iconRentals}
              alt="Rentals 3D icon"
              className="w-8 h-8 rounded-lg object-contain bg-surface border border-outline-subtle"
            />
            <h1 className="font-headline text-xl font-bold text-secondary">Rentals</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowListBikeModal(true)}
          className="inline-flex items-center gap-1 bg-secondary text-on-secondary px-3 py-2 rounded-full font-label text-xs font-semibold shrink-0 hover:opacity-90"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>List Bike</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8 flex flex-col gap-5">
        {/* Rentals Hero Banner + Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerRentHero}
              alt="CUPB ONE Bike Rentals"
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
                id="rent-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Classic 350, Activa, scooters"
                placeholder="Search Classic 350, Activa..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Rental promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-primary-deep">
                STUDENT TO STUDENT
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Rent bikes from ₹150/day.
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconRentals}
              alt="Rentals"
              className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowListBikeModal(true)}
            className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm text-left"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                EARN ON CAMPUS
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                List your bike, earn weekly.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent text-on-accent font-label text-xs font-semibold shrink-0">
              ID Check
            </span>
          </button>
        </section>

        {/* Available Bikes */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Available Bikes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredBikes.map((bike) => (
              <article
                key={bike.id}
                className="bg-surface rounded-xl border border-outline-subtle shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative h-36 w-full">
                  <ResilientImage
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shadow-sm">
                    {bike.status}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
                    ₹{bike.pricePerDay}/day
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-title text-lg font-bold text-on-surface">{bike.name}</h3>
                      <p className="font-body text-xs text-text-secondary">
                        {bike.owner} • {bike.location}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-semibold shrink-0">
                      Verified ID
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBike(bike);
                        setRentDays(1);
                      }}
                      className="inline-flex items-center justify-center gap-1 bg-surface border border-outline text-secondary px-3 py-2.5 rounded-lg font-label text-sm font-semibold hover:bg-surface-subtle"
                    >
                      <span>View Bike</span>
                    </button>
                    <a
                      href={`tel:${bike.phone}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary px-3 py-2.5 rounded-lg font-label text-sm font-semibold"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Contact Owner</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Bike Details Modal */}
      {selectedBike && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                {selectedBike.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedBike(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ResilientImage
              src={selectedBike.image}
              alt={selectedBike.name}
              className="w-full h-44 rounded-xl object-cover"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-background rounded-lg p-3">
                <span className="text-text-secondary block">Owner</span>
                <span className="font-semibold text-secondary flex items-center gap-1">
                  {selectedBike.owner}
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-deep" />
                </span>
              </div>
              <div className="bg-background rounded-lg p-3">
                <span className="text-text-secondary block">Spec</span>
                <span className="font-semibold text-secondary">{selectedBike.mileage}</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-primary-tint rounded-xl p-3">
              <div>
                <span className="text-xs font-semibold text-primary-deep block">Rental Duration</span>
                <span className="text-xs text-text-secondary tabular-nums">
                  Refundable deposit ₹{selectedBike.deposit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setRentDays(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tabular-nums ${
                      rentDays === d
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface text-secondary border border-outline-subtle'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onRentBike(selectedBike, rentDays);
                setSelectedBike(null);
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold tabular-nums"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Request Bike • ₹{selectedBike.pricePerDay * rentDays}</span>
            </button>
          </div>
        </div>
      )}

      {/* List Bike Modal */}
      {showListBikeModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <form
            onSubmit={handleCreateBike}
            className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                List Your Bike for Rent
              </h2>
              <button
                type="button"
                onClick={() => setShowListBikeModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="Bike / Scooter model (e.g. TVS Jupiter)"
              value={newBikeName}
              onChange={(e) => setNewBikeName(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="number"
                required
                placeholder="₹ per day"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm tabular-nums"
              />
              <input
                type="text"
                placeholder="Hostel / Gate"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Owner Name"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
            >
              Publish Bike Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
