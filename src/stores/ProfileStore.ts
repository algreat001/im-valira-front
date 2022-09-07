import { UserDto, RoleDto } from "interfaces/ext";
import { Messages, Notification } from "interfaces/profile";
import { makeAutoObservable, runInAction } from "mobx";
import { loadProfile, loadProfiles, saveProfile } from "services/api";

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

  profiles: ProfileStore[] = [];

  currentProfileIndex: null | number;

  constructor() {
    makeAutoObservable(this);
    this.currentProfileIndex = null;
  }

  get currentProfile(): ProfileStore {
    if (this.currentProfileIndex === null || this.currentProfileIndex === -1) {
      return this;
    }
    return this.profiles[this.currentProfileIndex];
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

  async loadProfiles() {
    if (this.isAdmin) {
      await runInAction(async () => {
        this.profiles = [];
      });
      const newProfiles = (await loadProfiles()).map(userDto => {
        const store = new ProfileStore();
        store.initFromDto(userDto);
        return store;
      });
      await runInAction(async () => {
        this.profiles = newProfiles;
      });
    }
  }

  setCurrentProfile = (index: number) => {
    this.currentProfileIndex = index;
  };

  get isAdmin(): boolean {
    return this.isIncludeRole("Admin");
  }

  isIncludeRole(role: string): boolean {
    return this.roles.some(r => r.role === role);
  }

}
