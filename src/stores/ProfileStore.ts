import { UserDto, RoleDto } from "interfaces/ext";
import { Messages, Notification } from "interfaces/profile";
import { makeAutoObservable, runInAction } from "mobx";
import { loadProfile, saveProfile } from "services/api";

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

  constructor() {
    makeAutoObservable(this);
  }

  logout() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.photo = "";
    this.cache = "";
    this.messages = [];
    this.notifications = [];
    this.roles = [];
  }


  get messagesCount(): number {
    return this.messages.filter((msg) => !msg.isReadied).length;
  }

  get notificationsCount(): number {
    return this.notifications.filter((nt) => !nt.isReadied).length;
  }

  get fullName(): string {
    return [ this.firstName, this.lastName ].join(" ");
  }

  saveToCache() {
    this.cache = JSON.stringify({ firstName: this.firstName, lastName: this.lastName, roles: this.roles });
  }

  restoreFromCache() {
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

  changeTextField(field: ProfileTextField, value: string) {
    this[field] = value;
  }

  async loadProfile() {
    const user = await loadProfile();
    if (!user) {
      throw new Error("Error upload user profile");
    }
    this.initFromDto(user);
  }

  initFromDto(userDto: UserDto) {
    runInAction(() => {
      this.email = userDto.email ?? "";
      this.firstName = userDto.firstName ?? "";
      this.lastName = userDto.lastName ?? "";
      this.photo = userDto.photo ?? null;
      this.roles = userDto.roles ?? [];
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

  hasRole(role: string) {
    return this.isAdmin || this.roles.some(r => r.role.toLowerCase() === role.toLowerCase());
  }

  async saveProfile(password: string) {
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
