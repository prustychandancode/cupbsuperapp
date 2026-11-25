import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { Driver } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface CabDetailsViewProps {
  driver: Driver;
  onBack: () => void;
  onBookRide: (driver: Driver, route: string, fare: number) => void;
}

export const CabDetailsView: React.FC<CabDetailsViewProps> = ({
  driver,
  onBack,
  onBookRide,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [bookedToast, setBookedToast] = useState(false);

  const selectedFare = driver.fares[selectedRouteIndex] || {
    route: driver.route,
    price: driver.fare,
  };

  const handleConfirmRide = () => {
    onBookRide(driver, selectedFare.route, selectedFare.price);
    setBookedToast(true);
    setTimeout(() => setBookedToast(false), 3500);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Contextual Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Rides"
            className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h1 className="font-headline text-xl font-bold text-secondary">Cab Details</h1>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold shrink-0">
          {driver.status}
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 flex flex-col gap-4">
        {bookedToast && (
          <div className="bg-primary-container text-on-primary-container border border-primary/30 rounded-xl p-3 flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>
              Ride reserved for {selectedFare.route} (₹{selectedFare.price}). Added to Activity!
            </span>
          </div>
        )}

        {/* 3 Cab Photos Gallery */}
        <section aria-label="Cab photos" className="flex flex-col gap-2">
          <div className="relative w-full h-44 md:h-56 rounded-xl overflow-hidden border border-outline-subtle shadow-sm">
            <ResilientImage
              src={driver.photos[activePhotoIndex]}
              alt={`${driver.vehicle} view ${activePhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface text-secondary font-label text-xs font-semibold shadow-sm tabular-nums">
              {activePhotoIndex + 1} / {driver.photos.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {driver.photos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`h-20 rounded-lg overflow-hidden border transition-all ${
                  activePhotoIndex === idx
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-outline-subtle opacity-80 hover:opacity-100'
                }`}
              >
                <ResilientImage
                  src={photo}
                  alt={`${driver.vehicle} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Running Promotional Banner Card */}
        <section
          aria-label="Ride promotion"
          className="bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm"
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-xs font-semibold text-primary-deep">
              CUPB ONE RIDES
            </span>
            <p className="font-title text-base font-semibold text-secondary">
              Direct call, zero booking fee.
            </p>
          </div>
          <ResilientImage
            src={ASSETS.iconRides}
            alt="3D Car Icon"
            className="w-11 h-11 rounded-lg object-contain bg-surface border border-outline-subtle p-1 shrink-0"
          />
        </section>

        {/* Vehicle Details */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <ResilientImage
                src={ASSETS.iconRides}
                alt="3D Car"
                className="w-10 h-10 rounded-lg object-contain bg-background border border-outline-subtle p-1"
              />
              <div>
                <h2 className="font-headline text-lg font-bold text-secondary">
                  {driver.vehicle}
                </h2>
                <span className="font-mono text-xs text-text-secondary tabular-nums">
                  {driver.plate}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-semibold">
              {driver.vehicleType}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-subtle text-center">
            <div className="bg-background rounded-lg p-2.5">
              <span className="block font-label text-xs text-text-secondary">Seats</span>
              <span className="font-title text-base font-bold text-on-surface tabular-nums">
                {driver.seats}
              </span>
            </div>
            <div className="bg-background rounded-lg p-2.5">
              <span className="block font-label text-xs text-text-secondary">Fuel</span>
              <span className="font-title text-base font-bold text-on-surface">{driver.fuel}</span>
            </div>
            <div className="bg-background rounded-lg p-2.5">
              <span className="block font-label text-xs text-text-secondary">Bags</span>
              <span className="font-title text-base font-bold text-on-surface tabular-nums">
                {driver.bags}
              </span>
            </div>
          </div>
        </section>

        {/* Driver Details */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-3">
          <h2 className="font-headline text-lg font-bold text-secondary">Driver Details</h2>
          <div className="flex items-center gap-3">
            <ResilientImage
              src={driver.driverPhoto}
              alt={driver.driverName}
              className="w-14 h-14 rounded-full object-cover border border-outline shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-title text-base font-semibold text-on-surface">
                  {driver.driverName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold tabular-nums">
                  {driver.rating.toFixed(1)} ★
                </span>
              </div>
              <p className="font-body text-xs text-text-secondary">{driver.experience}</p>
              <p className="font-body text-xs text-text-secondary">{driver.languages}</p>
            </div>
          </div>
        </section>

        {/* Fare Details */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-2">
          <h2 className="font-headline text-lg font-bold text-secondary">Fare Details</h2>
          <div className="divide-y divide-outline-subtle">
            {driver.fares.map((f, idx) => (
              <button
                key={f.route}
                type="button"
                onClick={() => setSelectedRouteIndex(idx)}
                className={`w-full py-2.5 px-2 -mx-2 rounded-lg flex items-center justify-between gap-2 text-left transition-colors ${
                  selectedRouteIndex === idx ? 'bg-primary-tint' : 'hover:bg-background'
                }`}
              >
                <span className="font-body text-sm text-on-surface">{f.route}</span>
                <span className="font-title text-base font-bold text-secondary tabular-nums">
                  ₹{f.price}
                </span>
              </button>
            ))}
            <div className="pt-2.5 flex items-center justify-between gap-2">
              <span className="font-body text-xs text-text-secondary">
                Waiting (after 15 mins)
              </span>
              <span className="font-label text-xs font-semibold text-text-secondary tabular-nums">
                ₹50 / hr
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Direct Call Action Bar */}
      <div className="sticky bottom-14 lg:bottom-0 z-20 bg-surface border-t border-outline-subtle px-4 py-3 grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${driver.phone}`}
          className="inline-flex items-center justify-center gap-1.5 bg-surface border border-outline text-secondary px-3 py-3 rounded-xl font-label text-sm font-semibold"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Call ({driver.phone.slice(-10)})</span>
        </a>
        <button
          type="button"
          onClick={handleConfirmRide}
          className="inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary px-3 py-3 rounded-xl font-label text-sm font-semibold shadow-sm"
        >
          <span>Book • ₹{selectedFare.price}</span>
        </button>
      </div>
    </div>
  );
};
