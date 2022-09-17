import React from "react";
import { LoginStore } from "./LoginStore";
import { RoleStore } from "./RoleStore";
import { UIStore } from "./UIStore";
import { ProfileManagerStore } from "./ProfileManagerStore";
import { ProductManagerStore } from "./ProductManagerStore";

const uiStore = new UIStore();
const profileManagerStore = new ProfileManagerStore();
const roleStore = new RoleStore();
const loginStore = new LoginStore(profileManagerStore.viewer);

const productManagerStore = new ProductManagerStore();

export const gap = {
  profileManagerStore,
  roleStore,
  loginStore,
  uiStore,

  productManagerStore
};

export const storesContext = React.createContext(gap);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).T = gap;
