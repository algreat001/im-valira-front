import { makeAutoObservable } from "mobx";

import { CatalogStore } from "./CatalogStore";

export class CatalogRepositoryStore {
  private catalogs = new Map<string, CatalogStore>();

  private rootCatalogs = new CatalogStore(this);

  constructor() {
    makeAutoObservable(this);
    this.rootCatalogs.id = "100";
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
    return this.getCatalog("1");
  }

  getFavorites(): CatalogStore {
    return this.getCatalog("2");
  }

}
