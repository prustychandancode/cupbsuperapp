import React, { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  ChevronRight,
  HelpCircle,
  IdCard,
  ReceiptText,
  Settings,
  Store,
  X,
} from 'lucide-react';
import { ScreenId, StudentProfile } from '../types/app';
import { ResilientImage } from './ResilientImage';

interface ProfileViewProps {
  profile: StudentProfile;
  marketListingCount: number;
  bikeListingCount: number;
  activityCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  marketListingCount,
  bikeListingCount,
  activityCount,
  onNavigate,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [lateNightDeals, setLateNightDeals] = useState(true);

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <h1 className="font-headline text-xl font-bold text-secondary">Profile</h1>
        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          aria-label="Settings"
          className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full hover:border-primary/40"
        >
          <Settings className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-8 flex flex-col gap-4">
        {/* Student Identity Card */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex items-center gap-3.5">
          <ResilientImage
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline text-lg font-bold text-secondary truncate">
                {profile.name}
              </h2>
              {profile.verified && (
                <BadgeCheck
                  className="w-5 h-5 text-primary-deep shrink-0"
                  aria-label="Verified Student"
                />
              )}
            </div>
            <p className="font-body text-xs text-text-secondary truncate">{profile.email}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
              {profile.verified ? 'Verified' : 'Pending'} • {profile.hostel.split(' (')[0]}
            </span>
          </div>
        </section>

        {/* Promotional Banner Card */}
        <button
          type="button"
          onClick={() => onNavigate('verify-id')}
          className="bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm text-left hover:border-primary/40 transition-colors"
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-xs font-semibold text-primary-deep">
              STUDENT PASS
            </span>
            <p className="font-title text-base font-semibold text-secondary">
              Manage CUPB ID Verification
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-primary-deep shrink-0" aria-hidden="true" />
        </button>

        {/* Account & Listings */}
        <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm divide-y divide-outline-subtle">
          <button
            type="button"
            onClick={() => onNavigate('market')}
            className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-background transition-colors"
          >
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span className="font-title text-base font-semibold text-on-surface">
                My Market Listings
              </span>
            </div>
            <span className="font-label text-xs font-semibold text-text-secondary tabular-nums">
              {marketListingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('rentals')}
            className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-background transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bike className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span className="font-title text-base font-semibold text-on-surface">
                My Bike Listings
              </span>
            </div>
            <span className="font-label text-xs font-semibold text-text-secondary tabular-nums">
              {bikeListingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('activity')}
            className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-background transition-colors"
          >
            <div className="flex items-center gap-3">
              <ReceiptText className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span className="font-title text-base font-semibold text-on-surface">
                Order Activity
              </span>
            </div>
            <span className="font-label text-xs font-semibold text-text-secondary tabular-nums">
              {activityCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('verify-id')}
            className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-background transition-colors"
          >
            <div className="flex items-center gap-3">
              <IdCard className="w-5 h-5 text-primary-deep" aria-hidden="true" />
              <span className="font-title text-base font-semibold text-on-surface">
                Student Verification
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-semibold">
              {profile.verified ? 'Active' : 'Verify'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-background transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span className="font-title text-base font-semibold text-on-surface">
                Help &amp; Support
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-grey" aria-hidden="true" />
          </button>
        </section>
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">Settings</h2>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-background">
                <span className="text-sm font-semibold text-secondary">Order &amp; Ride Alerts</span>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl bg-background">
                <span className="text-sm font-semibold text-secondary">Late Night Hostel Deals</span>
                <input
                  type="checkbox"
                  checked={lateNightDeals}
                  onChange={(e) => setLateNightDeals(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowSettingsModal(false);
                  onNavigate('splash');
                }}
                className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary text-sm font-semibold"
              >
                Preview CUPB ONE Splash Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">
                CUPB ONE Campus Support
              </h2>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-background rounded-xl p-4 flex flex-col gap-2 text-sm">
              <p className="font-semibold text-secondary">Campus Desk (Ghudda Gate)</p>
              <p className="text-text-secondary">Daily 8:00 AM – 11:00 PM IST</p>
              <a
                href="tel:+919876543210"
                className="mt-1 inline-flex items-center justify-center bg-primary text-on-primary py-2.5 rounded-xl font-semibold"
              >
                Call Student Helpdesk
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
