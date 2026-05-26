export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  size: number | null;
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
