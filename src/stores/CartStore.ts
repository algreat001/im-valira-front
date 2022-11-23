import { makeAutoObservable, runInAction } from "mobx";
import { ProductStore } from "./ProductStore";
import { ProfileStore } from "./ProfileStore";

export class CartStore {

  products: ProductStore[] = [];

  viewer: null | ProfileStore = null;

  exitLink = '/';

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  get(index: null | number): null | ProductStore {
    if (index === null || !this.isContainedProducts) {
      return null;
    }
    return this.products[index];
  }

  get length(): number {
    return this.products.length;
  }

  add(product: ProductStore): void {
    if (!product.id) {
      return;
    }

    const productOption = JSON.stringify(product.selectedOptions);

    const findProduct = this.products.find(cardRecords =>
      cardRecords.id === product.id
      && JSON.stringify(cardRecords.selectedOptions) === productOption);

    if (findProduct) {
      runInAction(() => {
        findProduct.amount += product.amount;
        this.save();
      });
      return;
    }

    this.products.push(product.clone());
    this.save();
  }

  delete(index: number): void {
    if (!this.isContainedProducts) {
      return;
    }
    this.products.splice(index, 1);
    this.save();
    return;
  }

  clear(): void {
    this.products = [];
    this.save();
    return;
  }

  get isContainedProducts(): boolean {
    return this.products.length > 0;
  }

  price(index: number): string {
    const product = this.get(index);
    if (!product) {
      return "unknown";
    }

    const price = product.calculatePrice(true) * product.amount;
    return price.toFixed(2);
  }

  get totalPrice(): string {
    let totalPrice = 0;
    for (let indexProduct = 0; indexProduct < this.length; indexProduct++) {
      totalPrice += Number(this.price(indexProduct));
    }
    return totalPrice.toFixed(2);
  }


  save() {
    const saveString = JSON.stringify(this.products.map(product => product.toString()));
    window.sessionStorage.setItem("cart", saveString);
    if (this.viewer) {
      //TODO save cart to server
    }
  }

  load() {
    if (this.viewer) {
      //TODO load cart from server
    }
    const cartStringFromSessionStorage = window.sessionStorage.getItem("cart");
    if (!cartStringFromSessionStorage) {
      return;
    }
    const cartObjectSessionStorage = JSON.parse(cartStringFromSessionStorage);
    if (!Array.isArray(cartObjectSessionStorage)) {
      return;
    }
    this.products = cartObjectSessionStorage.map(stringProduct => new ProductStore(stringProduct));
  }

  setExitLink(link: string) {
    this.exitLink = link;
  }

}
