import { makeAutoObservable } from "mobx";

import { ProductMeta } from "interfaces/ext";

class ProductStore {
  name: null | string = null;
  description: null | string = null;
  meta: null | ProductMeta = null;

  constructor() {
    makeAutoObservable(this);
  }

}
