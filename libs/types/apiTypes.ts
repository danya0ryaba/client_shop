export interface Product {
  id: number;
  name: string;
  quantityProduct: number;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  size: number | null;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithCategory extends Product {
  category?: {
    id: number;
    name: string;
  };
}

export interface CategoryI {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductsResponse {
  products: ProductWithCategory[];
  totalCount: number;
  page: number;
  limit: number;
}

// USER
export type UserDTO = {
  id: string | number;
  email: string;
  isActivated: boolean;
  role: string;
  // fullName может не приходить в DTO — зависит от твоего UserDTO на бэке
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string; // в ответе есть, но cookie тоже ставится (httpOnly)
  user: UserDTO;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// CARD

export interface CartItem {
  productId: string | number;
  quantity: number;
  productName?: string;
  price?: number;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  size?: number | null;
}
export interface CartItemDTO {
  id: number; // id позиции в корзине (cartItemId) — нужен для remove/select
  quantity: number;
  product: CartProduct; // главное: продукт внутри
  selected?: boolean; // если на бэке есть выбор
}
export interface CartResponse {
  items: CartItemDTO[];
  totalQuantity: number;
  totalPrice: number;
}
