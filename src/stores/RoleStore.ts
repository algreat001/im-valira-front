import { makeAutoObservable, runInAction } from "mobx";

import { RoleDto } from "interfaces/ext";

import { loadRoles } from "services/api";

export class RoleStore {
  roles: RoleDto[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadAllRoles() {
    const roles = await loadRoles();
    runInAction(() => {
      this.roles = roles;
    });
  }

}
