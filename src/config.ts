// в конце не забудь "/"

const api =
  process.env.NODE_ENV === "production"
    ? "/api/v1/"
    : "http://localhost:3010/api/v1/";
console.log(process.env.NODE_ENV);

export const config = {
  api: {
    main: api,
    user: `${api}user/`,
    auth: `${api}auth/`,
    role: `${api}role/`,

    product: `${api}product/`,
    products: `${api}product/list/`,
    searchProducts: `${api}product/search/`,
    addProductToCatalog: `${api}product/add/:productId/to/:catalogId`,

    catalog: `${api}catalog/`,
    catalogList: `${api}catalog/list/`,

    review: `${api}product/:productId/review`,
    characteristic: `${api}product/:productId/characteristic`,

    send: {
      order: `${api}send/order`
    }
  },
  route: {
    catalog: { path: "catalog", param: ":catalogId" },
    product: { path: "product", param: ":productId" },
    cart: { path: "cart" },
    checkout: { path: "checkout" },
    search: { path: "search" }
  },
  limits: {
    minSearchLength: 3
  }
};
