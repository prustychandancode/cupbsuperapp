/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { ActivityView } from './components/ActivityView';
import { CabDetailsView } from './components/CabDetailsView';
import { ChickenView } from './components/ChickenView';
import { FoodCartView } from './components/FoodCartView';
import { FoodDiscoveryView } from './components/FoodDiscoveryView';
import { HomeView } from './components/HomeView';
import { MarketView } from './components/MarketView';
import { MartView } from './components/MartView';
import { MedsView } from './components/MedsView';
import { NavigationShell } from './components/NavigationShell';
import { ProfileView } from './components/ProfileView';
import { RentalsView } from './components/RentalsView';
import { RestaurantView } from './components/RestaurantView';
import { RidesView } from './components/RidesView';
import { SplashView } from './components/SplashView';
import { VerifyIdView } from './components/VerifyIdView';
import {
  ASSETS,
  INITIAL_ACTIVITY,
  INITIAL_DRIVERS,
  INITIAL_MARKET_LISTINGS,
  INITIAL_RENTAL_BIKES,
  INITIAL_STUDENT_PROFILE,
  RESTAURANTS,
} from './data/mockData';
import {
  ActivityRecord,
  BottomTabId,
  CartItem,
  Driver,
  MarketListing,
  RentalBike,
  ScreenId,
  StudentProfile,
} from './types/app';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('punjabi-zaika');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('driver-rahul');
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [searchSeed, setSearchSeed] = useState<string>('');

  const [campusLocation, setCampusLocation] = useState<string>('CUPB Campus');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Hostel 4, Room 212');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [bikes, setBikes] = useState<RentalBike[]>(INITIAL_RENTAL_BIKES);
  const [marketListings, setMarketListings] = useState<MarketListing[]>(INITIAL_MARKET_LISTINGS);
  const [activity, setActivity] = useState<ActivityRecord[]>(INITIAL_ACTIVITY);
  const [unreadCount, setUnreadCount] = useState<number>(2);
  const [toast, setToast] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'pz-chicken-biryani',
      sourceName: 'Punjabi Zaika',
      sourceType: 'food',
      name: 'Chicken Biryani',
      price: 149,
      quantity: 1,
      image: ASSETS.foodBiryani,
    },
    {
      id: 'pz-hostel-thali',
      sourceName: 'Punjabi Zaika',
      sourceType: 'food',
      name: 'Hostel Thali',
      price: 99,
      quantity: 1,
      image: ASSETS.foodThali,
    },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const navigate = (
    nextScreen: ScreenId,
    params?: { restaurantId?: string; driverId?: string; marketId?: string }
  ) => {
    setPreviousScreen(screen);
    if (params?.restaurantId) setSelectedRestaurantId(params.restaurantId);
    if (params?.driverId) setSelectedDriverId(params.driverId);
    if (params?.marketId !== undefined) setSelectedMarketId(params.marketId);
    else if (nextScreen !== 'market') setSelectedMarketId(null);

    if (nextScreen !== screen) {
      setSearchSeed('');
    }
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalSearch = (query: string) => {
    const q = query.toLowerCase();
    setSearchSeed(query);
    if (q.includes('cab') || q.includes('ride') || q.includes('bathinda') || q.includes('rahul')) {
      setScreen('rides');
    } else if (q.includes('cycle') || q.includes('book') || q.includes('cooler') || q.includes('sony')) {
      setScreen('market');
    } else if (q.includes('maggi') || q.includes('milk') || q.includes('coffee') || q.includes('mart')) {
      setScreen('mart');
    } else if (q.includes('med') || q.includes('dettol') || q.includes('ors')) {
      setScreen('meds');
    } else if (q.includes('chicken') || q.includes('egg')) {
      setScreen('chicken');
    } else if (q.includes('bike') || q.includes('activa') || q.includes('classic')) {
      setScreen('rentals');
    } else {
      setScreen('food');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const handlePlaceOrder = (total: number, discount: number, promoCode: string) => {
    const summary = cart.map((c) => `${c.name} × ${c.quantity}`).join(', ');
    const sourceName = Array.from(new Set(cart.map((c) => c.sourceName))).join(', ');
    const record: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: cart[0]?.sourceType === 'mart' ? 'mart' : cart[0]?.sourceType === 'meds' ? 'meds' : 'food',
      title: sourceName || 'Campus Order',
      subtitle: `${summary} (${promoCode} saved ₹${discount})`,
      amount: total,
      status: 'In Progress',
      timestamp: 'Just now',
    };
    setActivity((prev) => [record, ...prev]);
    setUnreadCount((u) => u + 1);
    setCart([]);
  };

  const handleBookRide = (driver: Driver, route: string, fare: number) => {
    const record: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: 'ride',
      title: `${driver.driverName} • ${driver.vehicle}`,
      subtitle: route,
      amount: fare,
      status: 'Confirmed',
      timestamp: 'Just now',
    };
    setActivity((prev) => [record, ...prev]);
    setUnreadCount((u) => u + 1);
    showToast(`Cab reserved with ${driver.driverName}`);
  };

  const handleRentBike = (bike: RentalBike, days: number) => {
    const record: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: 'rental',
      title: `${bike.name} (${days} ${days === 1 ? 'day' : 'days'})`,
      subtitle: `Owner: ${bike.owner} • ${bike.location}`,
      amount: bike.pricePerDay * days,
      status: 'Confirmed',
      timestamp: 'Just now',
    };
    setActivity((prev) => [record, ...prev]);
    setUnreadCount((u) => u + 1);
    showToast(`Rental request sent to ${bike.owner}`);
  };

  const handleUploadRx = (rxName: string) => {
    const record: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: 'meds',
      title: 'Prescription Submitted',
      subtitle: `${rxName} → CUPB Health Mart`,
      status: 'Submitted',
      timestamp: 'Just now',
    };
    setActivity((prev) => [record, ...prev]);
    setUnreadCount((u) => u + 1);
    showToast('Prescription sent to CUPB Health Mart');
  };

  const handleContactSeller = (listing: MarketListing) => {
    const record: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: 'market',
      title: `Reserved: ${listing.title}`,
      subtitle: `${listing.sellerName} • ${listing.hostel}`,
      amount: listing.price,
      status: 'Active',
      timestamp: 'Just now',
    };
    setActivity((prev) => [record, ...prev]);
    setUnreadCount((u) => u + 1);
    showToast(`Reserved ${listing.title} from ${listing.sellerName}`);
  };

  const activeTab: BottomTabId = useMemo(() => {
    if (screen === 'home') return 'home';
    if (screen === 'market') return 'market';
    if (screen === 'activity') return 'activity';
    if (screen === 'profile' || screen === 'verify-id') return 'profile';
    return 'explore';
  }, [screen]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const selectedRestaurant =
    RESTAURANTS.find((r) => r.id === selectedRestaurantId) || RESTAURANTS[0];
  const selectedDriver = drivers.find((d) => d.id === selectedDriverId) || drivers[0];

  if (screen === 'splash') {
    return (
      <SplashView
        onContinue={() => navigate('home')}
        onVerifyId={() => navigate('verify-id')}
      />
    );
  }

  const showBottomNav = !['restaurant', 'cart', 'cab-details', 'verify-id'].includes(screen);

  return (
    <NavigationShell
      activeScreen={screen}
      activeTab={activeTab}
      cartCount={cartCount}
      cartTotal={cartTotal}
      profile={profile}
      unreadCount={unreadCount}
      showBottomNav={showBottomNav}
      onNavigate={(s) => navigate(s)}
    >
      {screen === 'home' && (
        <HomeView
          profile={profile}
          campusLocation={campusLocation}
          unreadCount={unreadCount}
          cartCount={cartCount}
          onSelectLocation={(loc) => {
            setCampusLocation(loc);
            setDeliveryAddress(loc);
          }}
          onNavigate={navigate}
          onGlobalSearch={handleGlobalSearch}
        />
      )}

      {screen === 'food' && (
        <FoodDiscoveryView
          campusLocation={campusLocation}
          cartCount={cartCount}
          initialQuery={searchSeed}
          onBack={() => navigate('home')}
          onOpenCart={() => navigate('cart')}
          onSelectRestaurant={(id) => navigate('restaurant', { restaurantId: id })}
        />
      )}

      {screen === 'restaurant' && (
        <RestaurantView
          restaurant={selectedRestaurant}
          cart={cart}
          onBack={() => navigate('food')}
          onOpenCart={() => navigate('cart')}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
        />
      )}

      {screen === 'cart' && (
        <FoodCartView
          cart={cart}
          deliveryAddress={deliveryAddress}
          onUpdateAddress={(addr) => setDeliveryAddress(addr)}
          onUpdateQuantity={updateCartQuantity}
          onPlaceOrder={handlePlaceOrder}
          onBack={() =>
            navigate(previousScreen === 'cart' ? 'food' : previousScreen)
          }
          onBrowseFood={() => navigate('food')}
        />
      )}

      {screen === 'rides' && (
        <RidesView
          drivers={drivers}
          initialQuery={searchSeed}
          onBack={() => navigate('home')}
          onViewDriver={(id) => navigate('cab-details', { driverId: id })}
          onListCab={(driver) => {
            setDrivers((prev) => [driver, ...prev]);
            showToast(`Listed ${driver.vehicle} on ZeRide`);
          }}
          onBookRide={handleBookRide}
        />
      )}

      {screen === 'cab-details' && (
        <CabDetailsView
          driver={selectedDriver}
          onBack={() => navigate('rides')}
          onBookRide={handleBookRide}
        />
      )}

      {screen === 'mart' && (
        <MartView
          cart={cart}
          onBack={() => navigate('home')}
          onOpenCart={() => navigate('cart')}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
        />
      )}

      {screen === 'meds' && (
        <MedsView
          cart={cart}
          onBack={() => navigate('home')}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
          onUploadRx={handleUploadRx}
        />
      )}

      {screen === 'chicken' && (
        <ChickenView
          cart={cart}
          onBack={() => navigate('home')}
          onOpenCart={() => navigate('cart')}
          onAddToCart={addToCart}
        />
      )}

      {screen === 'rentals' && (
        <RentalsView
          bikes={bikes}
          onBack={() => navigate('home')}
          onListBike={(bike) => {
            setBikes((prev) => [bike, ...prev]);
            showToast(`Listed ${bike.name} for ₹${bike.pricePerDay}/day`);
          }}
          onRentBike={handleRentBike}
        />
      )}

      {screen === 'market' && (
        <MarketView
          listings={marketListings}
          initialSelectedId={selectedMarketId}
          initialQuery={searchSeed}
          onAddListing={(listing) => {
            setMarketListings((prev) => [listing, ...prev]);
            showToast(`Published "${listing.title}" on Campus Market`);
          }}
          onContactSeller={handleContactSeller}
        />
      )}

      {screen === 'activity' && (
        <ActivityView
          records={activity}
          onClearUnread={() => {
            setUnreadCount(0);
            showToast('All notifications marked as read');
          }}
        />
      )}

      {screen === 'profile' && (
        <ProfileView
          profile={profile}
          marketListingCount={marketListings.filter((l) => l.sellerName === profile.name).length || 2}
          bikeListingCount={bikes.filter((b) => b.owner === profile.name).length || 1}
          activityCount={activity.length}
          onNavigate={(s) => navigate(s)}
        />
      )}

      {screen === 'verify-id' && (
        <VerifyIdView
          profile={profile}
          onBack={() => navigate('profile')}
          onVerify={(updated) => {
            setProfile((prev) => ({ ...prev, ...updated }));
            showToast('CUPB Student ID Verified');
          }}
        />
      )}

      {/* Subtle Feedback Toast */}
      {toast && (
        <div
          role="status"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-secondary text-on-secondary px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </NavigationShell>
  );
}
