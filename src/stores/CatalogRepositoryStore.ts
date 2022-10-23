import { makeAutoObservable } from "mobx";

import { CatalogStore } from "./CatalogStore";

export const ROOT_CATALOG = "100";
export const RECOMMENDED = "1";
export const FAVORITES = "2";

export class CatalogRepositoryStore {
  private catalogs = new Map<string, CatalogStore>();

  private rootCatalogs = new CatalogStore(this);

  constructor() {
    makeAutoObservable(this);
    this.rootCatalogs.id = ROOT_CATALOG;
    this.rootCatalogs.loadChildren();
  }

  getCatalog(id: null | string): CatalogStore {
    if (!id) {
      return this.rootCatalogs;
    }
    const catalog = this.catalogs.get(id);
    if (catalog) {
      return catalog;
    }
    const loadCatalog = new CatalogStore(this);
    this.catalogs.set(id, loadCatalog);
    loadCatalog.load(id);
    return loadCatalog;
  }

  getRoot(): CatalogStore {
    return this.rootCatalogs;
  }

  getRecommended(): CatalogStore {
    return this.getCatalog(RECOMMENDED);
  }

  getFavorites(): CatalogStore {
    return this.getCatalog(FAVORITES);
  }

}
