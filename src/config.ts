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

    catalog: `${api}catalog/`,
    catalogList: `${api}catalog/list/`
  },
  route: {
    catalog: { path: "catalog", param: ":catalogId" },
    product: { path: "product", param: ":productId" }
  },
  limits: {
    minSearchLength: 3
  }
};
