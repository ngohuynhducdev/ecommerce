export interface CartItem {
  productId: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
