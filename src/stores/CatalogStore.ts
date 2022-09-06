import { CatalogMeta } from "interfaces/ext";
import { makeAutoObservable } from "mobx";

class CatalogStore {
  name: null | string = null;
  meta: null | CatalogMeta = null;

  children: CatalogStore[] = [];
  parent: null | CatalogStore = null;


  constructor() {
    makeAutoObservable(this);

  }

}
