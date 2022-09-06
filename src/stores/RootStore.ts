import React from "react";
import { LoginStore } from "./LoginStore";
import { ProfileStore } from "./ProfileStore";
import { RoleStore } from "./RoleStore";

const profileStore = new ProfileStore();
const roleStore = new RoleStore();
const loginStore = new LoginStore(profileStore);

export const gap = {
  profileStore,
  roleStore,
  loginStore
};

export const storesContext = React.createContext(gap);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).T = gap;
