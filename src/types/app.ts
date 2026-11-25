export type ScreenId =
  | 'splash'
  | 'home'
  | 'food'
  | 'restaurant'
  | 'cart'
  | 'rides'
  | 'cab-details'
  | 'mart'
  | 'meds'
  | 'chicken'
  | 'rentals'
  | 'market'
  | 'activity'
  | 'profile'
  | 'verify-id';

export type BottomTabId = 'home' | 'explore' | 'market' | 'activity' | 'profile';

export interface DishItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  category: string;
  dietary: 'Non-Veg' | 'Pure Veg' | 'Veg';
  description: string;
  image?: string;
  recommended?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  categories: string[];
  startingPrice: number;
  etaMins: number;
  rating: number;
  gate: string;
  hours: string;
  badge?: string;
  badgeVariant?: 'accent' | 'primary';
  promoCode?: string;
  promoLabel?: string;
  image: string;
  dishes: DishItem[];
}

export interface CartItem {
  id: string;
  sourceName: string;
  sourceType: 'food' | 'mart' | 'meds' | 'chicken';
  name: string;
  price: number;
  quantity: number;
  unit?: string;
  image?: string;
}

export interface Driver {
  id: string;
  vehicle: string;
  vehicleType: string;
  driverName: string;
  plate: string;
  rating: number;
  fare: number;
  status: 'Available' | 'On Trip';
  route: string;
  distanceKm: number;
  phone: string;
  seats: number;
  fuel: string;
  bags: string;
  experience: string;
  languages: string;
  driverPhoto: string;
  photos: string[];
  fares: { route: string; price: number }[];
}

export interface MartItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  category: string;
  discountBadge?: string;
  image?: string;
  fallbackIcon: 'milk' | 'notebook' | 'noodles' | 'coffee';
}

export interface MedsItem {
  id: string;
  name: string;
  pack: string;
  price: number;
  category: string;
  inStock: boolean;
  icon: 'medical' | 'droplet' | 'pill' | 'bandage';
}

export interface ChickenProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: 'Curry Cut' | 'Boneless' | 'Eggs';
  shopName: string;
  image?: string;
}

export interface RentalBike {
  id: string;
  name: string;
  pricePerDay: number;
  owner: string;
  location: string;
  status: 'Available' | 'Booked';
  verified: boolean;
  phone: string;
  mileage: string;
  helmetIncluded: boolean;
  deposit: number;
  image: string;
}

export interface MarketListing {
  id: string;
  title: string;
  price: number;
  condition: 'Like New' | 'Good' | 'Used';
  category: 'Cycles' | 'Books' | 'Electronics' | 'Hostel';
  postedAgo: string;
  sellerName: string;
  hostel: string;
  phone: string;
  description: string;
  image?: string;
  fallbackIcon?: 'cooler' | 'book' | 'cycle' | 'headphones';
}

export interface ActivityRecord {
  id: string;
  type: 'food' | 'mart' | 'meds' | 'ride' | 'rental' | 'market' | 'verification';
  title: string;
  subtitle: string;
  amount?: number;
  status: 'Delivered' | 'Confirmed' | 'In Progress' | 'Active' | 'Submitted';
  timestamp: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  rollNo: string;
  hostel: string;
  room: string;
  verified: boolean;
  avatar: string;
  idCardUploaded: boolean;
  idFileName?: string;
}
