import React, { useMemo, useState } from 'react';
import { ArrowLeft, Phone, Plus, Search, X } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { Driver } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface RidesViewProps {
  drivers: Driver[];
  initialQuery?: string;
  onBack: () => void;
  onViewDriver: (driverId: string) => void;
  onListCab: (driver: Driver) => void;
  onBookRide: (driver: Driver, route: string, fare: number) => void;
}

export const RidesView: React.FC<RidesViewProps> = ({
  drivers,
  initialQuery = '',
  onBack,
  onViewDriver,
  onListCab,
  onBookRide,
}) => {
  const [search, setSearch] = useState(initialQuery);
  const [showListCabModal, setShowListCabModal] = useState(false);
  const [callDriverModal, setCallDriverModal] = useState<Driver | null>(null);

  const [newVehicle, setNewVehicle] = useState('');
  const [newDriverName, setNewDriverName] = useState('');
  const [newPlate, setNewPlate] = useState('');
  const [newFare, setNewFare] = useState('320');
  const [newPhone, setNewPhone] = useState('+919876543219');

  const filteredDrivers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return drivers;
    return drivers.filter(
      (d) =>
        d.driverName.toLowerCase().includes(q) ||
        d.vehicle.toLowerCase().includes(q) ||
        d.route.toLowerCase().includes(q) ||
        d.plate.toLowerCase().includes(q)
    );
  }, [drivers, search]);

  const handleCreateCab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.trim() || !newDriverName.trim()) return;
    const fareNum = Math.max(100, Number(newFare) || 320);
    const created: Driver = {
      id: `driver-${Date.now()}`,
      vehicle: newVehicle.trim(),
      vehicleType: 'AC Cab',
      driverName: newDriverName.trim(),
      plate: (newPlate.trim() || 'PB-03-XY-9901').toUpperCase(),
      rating: 4.8,
      fare: fareNum,
      status: 'Available',
      route: 'CUPB → Bathinda',
      distanceKm: 0.5,
      phone: newPhone.trim() || '+919876543219',
      seats: 4,
      fuel: 'CNG',
      bags: '2 Large',
      experience: '4 yrs exp • CUPB Verified',
      languages: 'Punjabi, Hindi',
      driverPhoto: ASSETS.driverRahul,
      photos: [ASSETS.cabSwiftFront, ASSETS.cabSwiftInterior, ASSETS.cabSwiftSide],
      fares: [
        { route: 'CUPB → Bathinda Station', price: fareNum },
        { route: 'CUPB → Bus Stand', price: Math.max(100, fareNum - 50) },
        { route: 'CUPB → AIIMS Bathinda', price: Math.max(100, fareNum - 70) },
      ],
    };
    onListCab(created);
    setNewVehicle('');
    setNewDriverName('');
    setNewPlate('');
    setShowListCabModal(false);
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
              src={ASSETS.iconRides}
              alt="3D Cab Icon"
              className="w-8 h-8 rounded-lg object-contain bg-surface border border-outline-subtle"
            />
            <h1 className="font-headline text-xl font-bold text-secondary">Need a ride? 🚕</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowListCabModal(true)}
          className="inline-flex items-center gap-1 bg-secondary text-on-secondary px-3 py-2 rounded-full font-label text-xs font-semibold shrink-0 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>List Cab</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8 flex flex-col gap-5">
        {/* Cab Hero Banner + Overlapping Pill Search */}
        <section className="flex flex-col">
          <div className="relative w-full h-36 md:h-44 overflow-hidden md:rounded-2xl md:mx-4 md:w-auto">
            <ResilientImage
              src={ASSETS.bannerCabHero}
              alt="CUPB ONE Rides Banner"
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
                id="cab-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Bathinda, Chandigarh, or driver"
                placeholder="CUPB Campus → Bathinda Station..."
                className="w-full bg-transparent border-0 p-0 font-body text-sm text-on-surface placeholder:text-muted-grey focus:outline-none"
              />
            </form>
          </div>
        </section>

        {/* Running Promotional Banner Carousel */}
        <section
          aria-label="Cab promotions"
          className="flex md:grid md:grid-cols-2 items-stretch gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-1 no-scrollbar"
        >
          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs font-semibold text-primary-deep">
                CUPB ONE RIDES
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                Bathinda drops from ₹300.
              </p>
            </div>
            <ResilientImage
              src={ASSETS.iconRides}
              alt="3D Car"
              className="w-12 h-12 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
            />
          </div>

          <div className="snap-start shrink-0 w-80 md:w-auto bg-gradient-to-r from-accent-container via-surface to-surface border border-accent/30 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs font-semibold text-on-accent-container">
                GROUP TRIPS
              </span>
              <p className="font-title text-base font-semibold text-secondary">
                6-Seater Ertiga for ₹450
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewDriver('driver-harpreet')}
              className="px-3 py-1 rounded-full bg-accent text-on-accent font-label text-xs font-semibold shrink-0"
            >
              Call Direct
            </button>
          </div>
        </section>

        {/* Available Drivers List */}
        <section className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-secondary">Nearby Drivers</h2>
            <span className="font-label text-xs font-semibold text-primary-deep tabular-nums">
              {filteredDrivers.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredDrivers.map((driver) => (
              <article
                key={driver.id}
                className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-3"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ResilientImage
                      src={ASSETS.iconRides}
                      alt={`${driver.vehicle} 3D icon`}
                      className="w-12 h-12 rounded-lg object-contain bg-background border border-outline-subtle p-1 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-title text-base font-semibold text-on-surface">
                          {driver.vehicle}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold tabular-nums shrink-0">
                          {driver.rating.toFixed(1)} ★
                        </span>
                      </div>
                      <p className="font-body text-xs text-text-secondary">{driver.driverName}</p>
                      <span className="font-mono text-xs text-text-secondary tabular-nums">
                        {driver.plate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-headline text-xl font-bold text-secondary tabular-nums">
                      ₹{driver.fare}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
                      {driver.status}
                    </span>
                  </div>
                </header>

                <div className="bg-background rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                  <span className="font-body text-xs text-on-surface">{driver.route}</span>
                  <span className="font-label text-xs font-semibold text-text-secondary tabular-nums shrink-0">
                    {driver.distanceKm} km
                  </span>
                </div>

                <footer className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDriver(driver.id)}
                    className="inline-flex items-center justify-center gap-1 bg-surface border border-outline text-secondary px-3 py-2.5 rounded-lg font-label text-sm font-semibold hover:bg-surface-subtle transition-colors"
                  >
                    <span>View Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCallDriverModal(driver)}
                    className="inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary px-3 py-2.5 rounded-lg font-label text-sm font-semibold hover:opacity-95 transition-opacity"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call Driver</span>
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Call / Book Driver Sheet */}
      {callDriverModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                Connect with {callDriverModal.driverName}
              </h2>
              <button
                type="button"
                onClick={() => setCallDriverModal(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-background rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <p className="font-title text-sm font-bold text-secondary">
                  {callDriverModal.vehicle} ({callDriverModal.plate})
                </p>
                <p className="text-xs text-text-secondary">{callDriverModal.route}</p>
              </div>
              <span className="font-headline text-lg font-bold text-primary-deep tabular-nums">
                ₹{callDriverModal.fare}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${callDriverModal.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-surface border border-outline text-secondary py-3 rounded-xl font-label text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>Dial Now</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onBookRide(callDriverModal, callDriverModal.route, callDriverModal.fare);
                  setCallDriverModal(null);
                }}
                className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
              >
                <span>Reserve Cab</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Cab Modal */}
      {showListCabModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <form
            onSubmit={handleCreateCab}
            className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">List a Campus Cab</h2>
              <button
                type="button"
                onClick={() => setShowListCabModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="Vehicle model (e.g. WagonR, Dzire)"
              value={newVehicle}
              onChange={(e) => setNewVehicle(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            />
            <input
              type="text"
              required
              placeholder="Driver name"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Plate (PB-03-XX-1122)"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm font-mono"
              />
              <input
                type="number"
                placeholder="Fare ₹"
                value={newFare}
                onChange={(e) => setNewFare(e.target.value)}
                className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm tabular-nums"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone (+91...)"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 text-sm font-mono"
            />
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-semibold"
            >
              Publish Cab Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
