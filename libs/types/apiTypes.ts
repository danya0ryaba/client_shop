export type ProductImage = {
  id: number;
  url: string;
  productId: number;
  createdAt: string;
};

export interface Product {
  id: number;
  name: string;
  quantityProduct: number;
  description: string;
  price: number;
  images: ProductImage[];
  categoryId: number;
  size: number | null;
  unit: string;
  deliveryToCities: boolean;
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
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
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
  images: ProductImage[];
  size?: number | null;
}

export interface CartItemDTO {
  id: number;
  quantity: number;
  selected: boolean;
  product: {
    id: number;
    name: string;
    images: ProductImage[];
    description: string;
    price: number;
    size: string;
  };
}

export interface CartResponse {
  items: CartItemDTO[];
  totalQuantity: number;
  totalPrice: number;
}
