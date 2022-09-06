import { UserDto, RoleDto } from "interfaces/ext";
import { Messages, Notification } from "interfaces/profile";
import { makeAutoObservable, runInAction } from "mobx";
import { loadProfile, saveProfile } from "services/api";
import { LoginStore } from "./LoginStore";

export type ProfileTextField = "firstName" | "lastName" | "email";

export class ProfileStore {
  firstName = "";

  lastName = "";

  email = "";

  photo: null | string = null;

  roles: RoleDto[] = [];

  private cache = "";

  messages: Messages[] = [];

  notifications: Notification[] = [];

  isShowProfileDlg = false;

  constructor() {
    makeAutoObservable(this);
    this.isShowProfileDlg = false;
  }

  logout() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.photo = "";
    this.messages = [];
    this.notifications = [];
  }


  get messagesCount(): number {
    return this.messages.filter((msg) => !msg.isReadied).length;
  }

  get notificationsCount(): number {
    return this.notifications.filter((nt) => !nt.isReadied).length;
  }

  showProfileDlg = () => {
    this.isShowProfileDlg = true;
    this.saveToCache();
  };

  saveToCache() {
    this.cache = JSON.stringify({ firstName: this.firstName, lastName: this.lastName, roles: this.roles });
  }

  restoreFromCache() {
    this.hideProfileDlg();
    if (!this.cache) {
      return;
    }
    const obj = JSON.parse(this.cache);
    if (!obj) {
      return;
    }
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.roles = obj.roles;
  }

  hideProfileDlg = () => {
    this.isShowProfileDlg = false;
  };

  changeTextField(field: ProfileTextField, value: string) {
    this[field] = value;
  }

  async loadProfile() {
    const user = await loadProfile();
    if (!user) {
      throw new Error("Error upload user profile");
    }
    runInAction(() => {
      this.email = user.email ?? "";
      this.firstName = user.firstName ?? "";
      this.lastName = user.lastName ?? "";
      this.photo = user.photo ?? null;
      this.roles = user.roles ?? [];
    });
  }

  get dto(): UserDto {
    return {
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName,
      roles: this.roles
    };
  }

  deleteRole(role: string) {
    this.roles = this.roles.filter(r => r.role !== role);
  }

  addRole(role: RoleDto) {
    if (!this.roles.some(r => r.role === role.role)) {
      this.roles.push(role);
    }
  }

  async saveProfile(password: string) {
    this.hideProfileDlg();
    const user: any = this.dto;
    if (password) {
      user.password = password;
    }
    const resultUser = await saveProfile(user);
    if (!resultUser) {
      throw new Error("Error update user profile");
    }
  }

  get isAdmin(): boolean {
    return this.isIncludeRole("Admin");
  }

  isIncludeRole(role: string): boolean {
    return this.roles.some(r => r.role === role);
  }

}