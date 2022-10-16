import { makeAutoObservable, runInAction } from "mobx";

import { ProductStore } from "./ProductStore";
import { loadListProduct, saveListProduct } from "services/api";

export class ProductRepositoryStore {
  private products = new Map<string, ProductStore>();

  private productsInCatalog = new Map<string, string[]>;

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

  newProduct(): ProductStore {
    return new ProductStore();
  }

  getProductIdsForCatalog(catalogId: null | string): string[] {
    const normalizeCatalogId = this.getNormalizeId(catalogId);
    if (this.productsInCatalog.has(normalizeCatalogId)) {
      return this.productsInCatalog?.get(normalizeCatalogId) ?? [];
    } else {
      loadListProduct(normalizeCatalogId).then(products => {
        runInAction(() => {
          if (!products || products.length === 0) {
            products = this.mockProductIdsForCatalog();
          }
          this.productsInCatalog.set(normalizeCatalogId, products);
        });
      });
      return [];
    }
  }

  async saveProductIdsToCatalog(catalogId: null | string) {
    const normalizeCatalogId = this.getNormalizeId(catalogId);
    const productIds = this.productsInCatalog.get(normalizeCatalogId);
    if (!productIds) {
      return;
    }
    await saveListProduct(normalizeCatalogId, productIds);
  }

  setProductIdsToCatalog(catalogId: null | string, productIds: string[]) {
    const normalizeCatalogId = this.getNormalizeId(catalogId);
    this.productsInCatalog.set(normalizeCatalogId, productIds);
  }

  private mockProductIdsForCatalog(): string[] {
    const products: string[] = [ "1" ];
    let length = Math.random() * 20;
    for (length; length > 0; length--) {
      let newProductId = (Math.random() * 1000).toFixed();
      while (products.some(p => p === newProductId)) {
        newProductId = (Math.random() * 1000).toFixed();
      }
      products.push(newProductId);
    }
    return products;
  }

  private getNormalizeId(id: null | string): string {
    return id ?? "0";
  }

}
