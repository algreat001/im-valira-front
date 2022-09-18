import { config } from "config";
import { CatalogDto, ProductDto, RoleDto, UserDto } from "interfaces/ext";
import { Token } from "interfaces/profile";
import { request } from "services/request";

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


export const loadProduct = async (productId: string): Promise<null | ProductDto> =>
  (await request<ProductDto>({ api: config.api.product, data: productId }));

export const loadListProduct = async (catalogId: string): Promise<null | ProductDto[]> =>
  (await request<ProductDto[]>({ api: config.api.products, query: catalogId }));


export const loadCatalogList = async (parentCatalogId: null | string): Promise<null | CatalogDto[]> =>
  (await request<CatalogDto[]>({ api: config.api.catalog, query: parentCatalogId ? parentCatalogId.toString() : "" }));

export const saveCatalog = async (dto: CatalogDto): Promise<null | CatalogDto> =>
  (await request<CatalogDto>({ api: config.api.catalog, method: "PUT", data: dto }));

export const deleteCatalog = async (id: string): Promise<null | boolean> =>
  (await request<boolean>({ api: config.api.catalog, method: "DELETE", query: id }));
