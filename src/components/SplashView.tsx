import React from 'react';
import { ArrowRight, GraduationCap, Zap } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { ResilientImage } from './ResilientImage';

interface SplashViewProps {
  onContinue: () => void;
  onVerifyId: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onContinue, onVerifyId }) => {
  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between bg-background p-6">
      {/* Top Badge */}
      <header className="flex items-center justify-center pt-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-tint border border-primary/20 text-primary-deep font-label text-xs font-semibold">
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          <span>Central University of Punjab</span>
        </span>
      </header>

      {/* Center Brand Mark */}
      <main className="flex flex-col items-center text-center gap-5 my-auto py-8">
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 rounded-2xl bg-primary flex items-center justify-center shadow-md">
            <span className="font-display text-[32px] font-extrabold text-on-primary tracking-tight">
              C1
            </span>
          </div>
          <span className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent border-2 border-surface flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-on-accent fill-current" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="font-display text-[28px] leading-[34px] font-extrabold tracking-tight text-secondary">
            CUPB ONE
          </h1>
          <p className="font-body text-sm text-text-secondary max-w-[280px] text-pretty">
            Campus life, sorted. Food, rides, meds &amp; market in one tap.
          </p>
        </div>

        {/* 3D Mini Service Strip */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <ResilientImage
            src={ASSETS.iconFood}
            alt="Food"
            className="w-12 h-12 rounded-xl object-contain bg-surface border border-outline-subtle p-1 shadow-sm"
          />
          <ResilientImage
            src={ASSETS.iconRides}
            alt="Rides"
            className="w-12 h-12 rounded-xl object-contain bg-surface border border-outline-subtle p-1 shadow-sm"
          />
          <ResilientImage
            src={ASSETS.iconMarket}
            alt="Market"
            className="w-12 h-12 rounded-xl object-contain bg-surface border border-outline-subtle p-1 shadow-sm"
          />
        </div>
      </main>

      {/* Bottom Action */}
      <footer className="flex flex-col items-center gap-3 pb-4">
        <button
          type="button"
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3.5 rounded-xl font-label text-sm font-semibold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onVerifyId}
          className="text-xs font-semibold text-primary-deep hover:underline py-1"
        >
          Verify CUPB Student ID
        </button>
        <span className="font-mono text-xs text-text-secondary">
          v2.4 • Bathinda Campus
        </span>
      </footer>
    </div>
  );
};
