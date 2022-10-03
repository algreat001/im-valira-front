import React from "react";
import { LoginStore } from "./LoginStore";
import { RoleStore } from "./RoleStore";
import { UIStore } from "./UIStore";
import { ProfileManagerStore } from "./ProfileManagerStore";
import { ProductRepositoryStore } from "./ProductRepositoryStore";
import { CatalogRepositoryStore } from "./CatalogRepositoryStore";

const profileManagerStore = new ProfileManagerStore();
const roleStore = new RoleStore();
const loginStore = new LoginStore(profileManagerStore.viewer);

const productRepository = new ProductRepositoryStore();
const catalogRepository = new CatalogRepositoryStore();
const uiStore = new UIStore(productRepository, catalogRepository);

export const gap = {
  profileManagerStore,
  roleStore,
  loginStore,
  uiStore,

  productRepository,
  catalogRepository
};

export const storesContext = React.createContext(gap);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).T = gap;
