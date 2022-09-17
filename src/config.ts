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
    catalog: `${api}catalog/`
  }
};
