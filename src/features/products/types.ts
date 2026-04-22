export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  description?: string;
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  stock: number;
  priceModifier?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  tags: string[];
  variants: Variant[];
  stock: number;
  isFeatured: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  createdAt: string;
  shippingAddress: ShippingAddress;
}