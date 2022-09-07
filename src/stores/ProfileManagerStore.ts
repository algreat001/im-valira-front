import { makeAutoObservable, runInAction } from "mobx";
import { loadProfiles } from "services/api";
import { ProfileStore } from "./ProfileStore";

export class ProfileManagerStore {

  viewer: ProfileStore = new ProfileStore();

  profiles: ProfileStore[] = [];

  currentProfileIndex: null | number;

  constructor() {
    makeAutoObservable(this);
    this.currentProfileIndex = null;
  }

  get currentProfile(): ProfileStore {
    if (this.currentProfileIndex === null || this.currentProfileIndex === -1) {
      return this.viewer;
    }
    return this.profiles[this.currentProfileIndex];
  }

  isProfileEqualViewer(profile: ProfileStore): boolean {
    return profile.email === this.viewer.email;
  }

  async loadProfiles() {
    if (this.viewer.isAdmin) {
      await runInAction(async () => {
        this.profiles = [];
        this.currentProfileIndex = null;
      });
      const newProfiles = (await loadProfiles()).map(userDto => {
        const store = new ProfileStore();
        store.initFromDto(userDto);
        return store;
      });
      await runInAction(async () => {
        this.profiles = newProfiles;
        this.currentProfileIndex = this.profiles.findIndex((profile) => profile.email === this.viewer.email);
      });
    }
  }

  setCurrentProfile = (index: number) => {
    this.currentProfileIndex = index;
  };

}
