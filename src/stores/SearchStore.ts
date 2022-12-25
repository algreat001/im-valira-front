import { makeAutoObservable } from "mobx";
import { loadSearchProduct } from "services/api";
import { ProductRepositoryStore } from "./ProductRepositoryStore";
import { ProductStore } from "./ProductStore";

export class SearchStore {
  searchProductIds: string[] = [];

  searchLine = "";

  constructor(private productRepository: ProductRepositoryStore) {
    makeAutoObservable(this);
  }

  async search(searchLine: string) {
    this.searchLine = searchLine;
    this.searchProductIds = await loadSearchProduct(searchLine) ?? [];
  }

  get isContainedSearchItems(): boolean {
    return this.searchProductIds.length > 0;
  }

  getSearchProductList(): ProductStore[] {
    return this.searchProductIds.map(productId => this.productRepository.getProduct(productId));
  }

}
