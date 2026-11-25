import React, { useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react';
import { CartItem } from '../types/app';

interface FoodCartViewProps {
  cart: CartItem[];
  deliveryAddress: string;
  onUpdateAddress: (addr: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onPlaceOrder: (total: number, discount: number, promoCode: string) => void;
  onBack: () => void;
  onBrowseFood: () => void;
}

const HOSTEL_ADDRESSES = [
  'Hostel 4, Room 212',
  'Hostel 2, Room 118',
  'Hostel 3, Room 304',
  'Academic Block A, Reception',
  'Main Gate Security Desk',
];

export const FoodCartView: React.FC<FoodCartViewProps> = ({
  cart,
  deliveryAddress,
  onUpdateAddress,
  onUpdateQuantity,
  onPlaceOrder,
  onBack,
  onBrowseFood,
}) => {
  const [promoCode, setPromoCode] = useState<'CUPB20' | 'CUPB30'>('CUPB20');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [orderPlacedReceipt, setOrderPlacedReceipt] = useState<{
    total: number;
    address: string;
  } | null>(null);

  const itemTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = promoCode === 'CUPB30' ? 0.3 : 0.2;
  const studentDiscount = Math.min(itemTotal, Math.round(itemTotal * discountRate));
  const deliveryFee = itemTotal > 0 ? 15 : 0;
  const toPay = Math.max(0, itemTotal - studentDiscount + deliveryFee);

  const sourceTitle =
    cart.length > 0
      ? Array.from(new Set(cart.map((c) => c.sourceName))).join(', ')
      : 'Punjabi Zaika';

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderPlacedReceipt({ total: toPay, address: deliveryAddress });
    onPlaceOrder(toPay, studentDiscount, promoCode);
  };

  if (orderPlacedReceipt) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-4 py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary-container text-primary-deep flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <h1 className="font-headline text-2xl font-bold text-secondary">Order Confirmed!</h1>
          <p className="font-body text-sm text-text-secondary">
            Your order of <span className="font-semibold text-secondary tabular-nums">₹{orderPlacedReceipt.total}</span> is being prepared and will arrive at{' '}
            <span className="font-semibold text-secondary">{orderPlacedReceipt.address}</span> in ~20 mins.
          </p>
        </div>
        <button
          type="button"
          onClick={onBrowseFood}
          className="mt-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold shadow-sm"
        >
          Back to Campus Discovery
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Contextual Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div>
            <h1 className="font-headline text-xl font-bold text-secondary">Food Cart</h1>
            <p className="font-body text-xs text-text-secondary truncate max-w-[220px]">
              {sourceTitle}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 flex flex-col gap-4">
        {cart.length === 0 ? (
          <div className="bg-surface rounded-xl border border-outline-subtle p-8 text-center flex flex-col items-center gap-3 my-4">
            <div className="w-12 h-12 rounded-xl bg-primary-tint text-primary-deep flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-lg font-bold text-secondary">Your cart is empty</h2>
            <p className="font-body text-sm text-text-secondary">
              Add dishes from Punjabi Zaika, Campus Crust, Mart, or Meds to checkout.
            </p>
            <button
              type="button"
              onClick={onBrowseFood}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold"
            >
              Browse Food &amp; Mart
            </button>
          </div>
        ) : (
          <>
            {/* Promotional Banner Card */}
            <section className="bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-label text-xs font-semibold text-primary-deep">
                    APPLIED: {promoCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPromoCode(promoCode === 'CUPB20' ? 'CUPB30' : 'CUPB20')}
                    className="text-[11px] font-semibold text-secondary underline"
                  >
                    Switch to {promoCode === 'CUPB20' ? 'CUPB30' : 'CUPB20'}
                  </button>
                </div>
                <p className="font-title text-base font-semibold text-secondary tabular-nums">
                  You saved ₹{studentDiscount} on this order!
                </p>
              </div>
              <BadgeCheck className="w-6 h-6 text-primary-deep shrink-0" aria-hidden="true" />
            </section>

            {/* Delivery Address */}
            <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-tint flex items-center justify-center text-primary-deep shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-title text-base font-semibold text-on-surface">
                    {deliveryAddress}
                  </h2>
                  <p className="font-body text-xs text-text-secondary">Delivery in 20 mins</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="font-label text-xs font-semibold text-primary-deep hover:underline"
              >
                Change
              </button>
            </section>

            {/* Cart Items */}
            <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-3">
              <h2 className="font-headline text-lg font-bold text-secondary">Your Items</h2>

              <div className="divide-y divide-outline-subtle">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <h3 className="font-title text-base font-semibold text-on-surface truncate">
                        {item.name}
                      </h3>
                      <span className="font-body text-xs text-text-secondary tabular-nums">
                        ₹{item.price} · {item.sourceName}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-background border border-outline-subtle rounded-lg px-2 py-1 shrink-0">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-secondary font-semibold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-label text-xs font-semibold text-on-surface tabular-nums min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-primary-deep font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bill Details */}
            <section className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-2">
              <h2 className="font-headline text-lg font-bold text-secondary pb-1">Bill Summary</h2>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-text-secondary">Item Total</span>
                <span className="font-body text-sm text-on-surface tabular-nums">₹{itemTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-primary-deep">Student Discount</span>
                <span className="font-label text-sm font-semibold text-primary-deep tabular-nums">
                  -₹{studentDiscount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-text-secondary">Delivery Fee</span>
                <span className="font-body text-sm text-on-surface tabular-nums">
                  ₹{deliveryFee}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-outline-subtle">
                <span className="font-headline text-base font-bold text-secondary">To Pay</span>
                <span className="font-headline text-xl font-bold text-secondary tabular-nums">
                  ₹{toPay}
                </span>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Sticky Place Order CTA */}
      {cart.length > 0 && (
        <div className="sticky bottom-14 lg:bottom-0 z-20 bg-surface border-t border-outline-subtle px-4 py-3">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3.5 rounded-xl font-label text-sm font-semibold shadow-sm tabular-nums hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <span>Place Order • ₹{toPay}</span>
          </button>
        </div>
      )}

      {/* Hostel Address Picker Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-surface rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-secondary">Delivery Address</h2>
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {HOSTEL_ADDRESSES.map((addr) => (
                <button
                  key={addr}
                  type="button"
                  onClick={() => {
                    onUpdateAddress(addr);
                    setShowAddressModal(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold ${
                    deliveryAddress === addr
                      ? 'bg-primary-tint border-primary text-primary-deep'
                      : 'bg-background border-outline-subtle text-on-surface'
                  }`}
                >
                  <span>{addr}</span>
                  {deliveryAddress === addr && <span className="text-xs">Selected</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
