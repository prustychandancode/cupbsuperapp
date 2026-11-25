import React from 'react';
import {
  BadgeCheck,
  Bike,
  Car,
  Pill,
  ReceiptText,
  ShoppingBag,
  Store,
  Utensils,
} from 'lucide-react';
import { ActivityRecord } from '../types/app';

interface ActivityViewProps {
  records: ActivityRecord[];
  onClearUnread: () => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ records, onClearUnread }) => {
  const renderIcon = (type: ActivityRecord['type']) => {
    switch (type) {
      case 'food':
        return <Utensils className="w-5 h-5" />;
      case 'mart':
        return <ShoppingBag className="w-5 h-5" />;
      case 'meds':
        return <Pill className="w-5 h-5" />;
      case 'ride':
        return <Car className="w-5 h-5" />;
      case 'rental':
        return <Bike className="w-5 h-5" />;
      case 'market':
        return <Store className="w-5 h-5" />;
      default:
        return <BadgeCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-headline text-xl font-bold text-secondary">Activity</h1>
          <p className="font-body text-xs text-text-secondary">
            Orders, rides &amp; campus updates
          </p>
        </div>
        <button
          type="button"
          onClick={onClearUnread}
          className="px-3 py-1.5 rounded-full bg-surface border border-outline-subtle text-xs font-semibold text-primary-deep hover:border-primary/40"
        >
          Mark all read
        </button>
      </header>

      <main className="flex-1 px-4 pb-8 flex flex-col gap-3">
        {records.length === 0 ? (
          <div className="bg-surface rounded-xl border border-outline-subtle p-8 text-center flex flex-col items-center gap-2">
            <ReceiptText className="w-8 h-8 text-muted-grey" />
            <p className="font-title text-base font-semibold text-secondary">No activity yet</p>
            <p className="text-xs text-text-secondary">
              Your food orders, cab bookings, and campus listings appear here.
            </p>
          </div>
        ) : (
          records.map((rec) => (
            <article
              key={rec.id}
              className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary-tint text-primary-deep flex items-center justify-center shrink-0">
                  {renderIcon(rec.type)}
                </div>
                <div className="min-w-0">
                  <h2 className="font-title text-base font-semibold text-on-surface truncate">
                    {rec.title}
                  </h2>
                  <p className="font-body text-xs text-text-secondary truncate">{rec.subtitle}</p>
                  <p className="font-mono text-[11px] text-muted-grey mt-0.5">{rec.timestamp}</p>
                </div>
              </div>

              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                {typeof rec.amount === 'number' && (
                  <span className="font-headline text-base font-bold text-secondary tabular-nums">
                    ₹{rec.amount}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-[11px] font-semibold">
                  {rec.status}
                </span>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};
