import { config } from "config";
import { CatalogDto, ProductDto, ProductReviewMeta, RoleDto, UserDto } from "interfaces/ext";
import { Token } from "interfaces/profile";
import { request } from "services/request";

// profiles
export const signup = async (user: UserDto) => await request({ api: config.api.auth, query: "signup", data: user });

export const saveProfile = async (user: UserDto): Promise<null | UserDto> =>
  (await request<UserDto>({ api: config.api.user, query: "profile", method: "PUT", data: user }));

export const signin = async (user: UserDto): Promise<null | Token> =>
  (await request<Token>({ api: config.api.auth, query: "signin", data: user }));

export const loadProfile = async (): Promise<null | UserDto> =>
  (await request<UserDto>({ api: config.api.user, query: "profile" }));

export const loadProfiles = async (): Promise<null | UserDto[]> =>
  (await request<UserDto[]>({ api: config.api.user, query: "profiles" }));

export const loadRoles = async (): Promise<null | RoleDto[]> =>
  (await request<RoleDto[]>({ api: config.api.role, query: "list" }));

// products
export const loadProduct = async (productId: string): Promise<null | ProductDto> =>
  (await request<ProductDto>({ api: config.api.product, query: productId }));

export const loadListProduct = async (catalogId: string): Promise<null | string[]> =>
  (await request<string[]>({ api: config.api.products, query: catalogId }));

export const saveListProduct = async (catalogId: string, productIds: string[]): Promise<null | boolean> =>
  (await request<boolean>({ api: config.api.products, method: "PUT", query: catalogId, data: productIds }));


export const loadSearchProduct = async (search: string): Promise<null | string[]> =>
  (await request<string[]>({ api: config.api.searchProducts, query: search }));

// catalog
export const loadCatalogList = async (parentCatalogId: null | string): Promise<null | string[]> =>
  (await request<string[]>({
    api: config.api.catalogList,
    query: parentCatalogId ? parentCatalogId.toString() : ""
  }));

export const loadCatalog = async (catalogId: string): Promise<null | CatalogDto> =>
  (await request<CatalogDto>({ api: config.api.catalog, query: catalogId }));

export const saveCatalog = async (dto: CatalogDto): Promise<null | CatalogDto> =>
  (await request<CatalogDto>({ api: config.api.catalog, method: "PUT", data: dto }));

export const deleteCatalog = async (id: string): Promise<null | boolean> =>
  (await request<boolean>({ api: config.api.catalog, method: "DELETE", query: id }));

// review
export const addReview = async (productId: string, review: ProductReviewMeta): Promise<null | ProductReviewMeta> =>
  (await request<ProductReviewMeta>({
    api: config.api.review.replace(":productId", productId),
    method: "POST",
    data: review
  }));

export const updateReview = async (productId: string, review: ProductReviewMeta): Promise<null | ProductReviewMeta> =>
  (await request<ProductReviewMeta>({
    api: config.api.review.replace(":productId", productId),
    method: "PUT",
    data: review
  }));

export const deleteReview = async (productId: string, review: ProductReviewMeta): Promise<null | boolean> =>
  (await request<boolean>({
    api: config.api.review.replace(":productId", productId),
    method: "DELETE",
    data: review
  }));
