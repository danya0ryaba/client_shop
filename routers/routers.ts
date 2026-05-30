export const ROUTES = {
  HOME: "/products",
  ABOUT: "/about",
  AUTH: "/auth",
  CART: "/cart",
  PRODUCT: (id: string | number) => `/products/${id}`,
  //   ARTICLE_EDIT: (id: string | number) => `/articles/${id}/edit`,
};
