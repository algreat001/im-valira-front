import { makeAutoObservable } from "mobx";

import { ProductStore } from "./ProductStore";

export class ProductManagerStore {
  private products = new Map<string, ProductStore>();

  constructor() {
    makeAutoObservable(this);
  }

  getProduct(id: string): ProductStore {
    const product = this.products.get(id);
    if (product) {
      return product;
    }
    const loadProduct = new ProductStore();
    this.products.set(id, loadProduct);
    loadProduct.load(id);
    return loadProduct;
  }

}
