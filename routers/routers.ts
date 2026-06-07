export const ROUTES = {
  HOME: "/products",
  ABOUT: "/about",
  AUTH: "/auth",
  CART: "/cart",
  PRODUCT: (id: string | number) => `/products/${id}`,
  ADMIN: "/admin",
  ADMIN_PRODUCT_UPDATE: (id: string | number) => `/admin/${String(id)}`,
  ADMIN_PRODUCT_CREATE: "/admin/create-product",
  ORDER: "/order",
  //   ARTICLE_EDIT: (id: string | number) => `/articles/${id}/edit`,
};
