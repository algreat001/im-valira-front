import React from "react";
import { LoginStore } from "./LoginStore";
import { RoleStore } from "./RoleStore";
import { UIStore } from "./UIStore";
import { ProfileManagerStore } from "./ProfileManagerStore";
import { ProductRepositoryStore } from "./ProductRepositoryStore";
import { CatalogRepositoryStore } from "./CatalogRepositoryStore";
import { CartStore } from "./CartStore";
import { SearchStore } from "./SearchStore";

const profileManagerStore = new ProfileManagerStore();
const roleStore = new RoleStore();
const loginStore = new LoginStore(profileManagerStore.viewer);

const cartStore = new CartStore();

const productRepository = new ProductRepositoryStore();
const catalogRepository = new CatalogRepositoryStore();
const uiStore = new UIStore(productRepository, catalogRepository);
const searchStore = new SearchStore(productRepository);

export const gap = {
  profileManagerStore,
  roleStore,
  loginStore,
  uiStore,
  cartStore,

  productRepository,
  catalogRepository,
  searchStore
};

export const storesContext = React.createContext(gap);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).T = gap;

