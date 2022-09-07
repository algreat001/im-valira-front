import { UserDto } from "interfaces/ext";
import { makeAutoObservable } from "mobx";
import { signin, signup } from "services/api";
import { ProfileStore } from "./ProfileStore";

export class LoginStore {
  token?: string;

  email?: string;

  password?: string;

  isLogined: boolean;
  
  constructor(private profileStore: ProfileStore) {
    makeAutoObservable(this);
    this.token = "";
    this.email = "";
    this.password = "";
    this.isLogined = false;
    this.initFromStorage();
  }

  async login(email: string, password: string): Promise<boolean> {
    this.email = email;
    this.password = password;
    await this.signin();
    return this.isLogined;
  }

  async signin(): Promise<boolean> {
    const user = this.dto;
    if (!user) {
      return false;
    }
    const result = await signin(user);
    if (!result) {
      return false;
    }
    this.password = undefined;
    this.token = result.token;
    this.saveToStorage();
    this.logined();
    return true;
  }

  private saveToStorage() {
    localStorage.setItem("user", JSON.stringify(this.dto));
  }

  private initFromStorage() {
    const key = localStorage.getItem("user");
    if (!key) {
      return;
    }
    const user = JSON.parse(key) as UserDto;
    this.email = user?.email;
    this.token = user?.token;
    if (this.token) {
      this.logined();
    }
  }

  async logined() {
    this.isLogined = true;
    try {
      await this.profileStore.loadProfile();
    } catch {
      this.isLogined = false;
    }
  }

  logout() {
    this.isLogined = false;
    this.token = undefined;
    this.saveToStorage();
    this.profileStore.logout();
  }

  async signup(email: string, password: string): Promise<boolean> {
    const result = await signup({ email, password });
    if (!result) {
      return false;
    }
    await this.login(email, password);
    return true;
  }

  get dto(): null | UserDto {
    if (!this.email) {
      return null;
    }
    if (this.password) {
      return { email: this.email, token: this.token, password: this.password };
    } else {
      return { email: this.email, token: this.token };
    }
  }
}
