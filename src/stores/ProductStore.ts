import { makeAutoObservable, runInAction } from "mobx";

import { t } from "res/i18n/i18n";
import { Option, OptionType, ProductDto, ProductMeta, ProductReviewMeta } from "interfaces/ext";
import { addProductToCatalog, loadProduct, saveProduct } from "services/api";
import { ReviewStore } from "stores/ReviewStore";
import { calculatePrice } from "helpers/price";


export type ProductTextField = "name" | "meta.description" | "meta";

export class ProductStore {
  id: null | string = null;
  name: null | string = null;
  meta: null | ProductMeta = null;

  selectedOptions: Map<string, Option> = new Map<string, Option>();

  reviews: null | ReviewStore = null;

  isLoading = false;
  isError = false;
  isPhoto = false;

  amount = 1;

  private cache: null | string = null;

  constructor() {
    makeAutoObservable(this);
    this.isLoading = true;
    this.name = t("product.default.name");
    this.createMeta();
  }

  setAmount(value: string) {
    const numValue = Number.parseInt(value);
    this.amount = numValue < 1 ? 1 : numValue > 10 ? 10 : numValue;
  }

  calculatePrice(withActions: boolean): number {
    const price = this.meta?.price;
    if (!price) {
      return 0;
    }
    const operations = [
      ...[ ...this.selectedOptions.values() ].map(option => option?.operation),
      ...(withActions
        ? this.meta?.actions?.map(action => action.operation) ?? []
        : [])
    ];
    return calculatePrice(price, operations);
  }

  calculateRating(): number {
    const initValue = { sumRating: 0, amount: 0 };
    const { sumRating, amount } = this.meta?.reviews?.reduce(
      (prev, current) => {
        if (!current || !current.rating) {
          return prev;
        }
        return {
          sumRating: prev.sumRating + current.rating,
          amount: prev.amount + 1
        };
      },
      initValue
    ) ?? initValue;
    return amount > 0 ? sumRating / amount : 5;
  }

  get hasUndefinedOptions(): boolean {
    if (!this.meta?.options) {
      return false;
    }
    for (const option of this.meta?.options) {
      if (!this.selectedOptions.has(option.type)) {
        return true;
      }
    }
    return false;
  }

  setOptions(type: OptionType, option: Option) {
    this.selectedOptions.set(type, option);
  }

  initReviews(reviews: ProductReviewMeta[]) {
    runInAction(() => {
      if (!this.meta) {
        return;
      }
      this.meta.reviews = reviews;
    });
  }

  private fromDto(dto: ProductDto) {
    this.name = dto.name;
    this.meta = dto.meta;
    this.id = dto.id;
    if (this.meta?.photos.length > 0) {
      this.isPhoto = true;
    }
    this.reviews = new ReviewStore(this);

  }

  private toDto(): ProductDto {
    return {
      name: this.name,
      meta: this.meta,
      id: this.id
    } as ProductDto;
  }

  async load(id: string): Promise<void> {
    this.id = id;
    this.isLoading = true;
    const dto = await loadProduct(id);
    runInAction(() => {
      this.isLoading = false;
      this.isError = !dto;
      if (!dto) {
        this.mock();
        return;
      }
      this.fromDto(dto);
    });
    return;
  }

  async save(): Promise<void> {
    const dto = this.toDto();
    const result = await saveProduct(dto);
    if (!result) {
      console.log("error save product");
      return;
    }
    this.fromDto(result);
    return;
  }

  async addToCatalog(catalogId: string): Promise<boolean> {
    if (this.id === null) {
      return false;
    }
    const result = await addProductToCatalog(this.id, catalogId);
    if (!result) {
      console.log("error add product to catalog");
      return false;
    }
    this.fromDto(result);
    return true;
  }

  saveToCache() {
    this.cache = JSON.stringify(this.toDto());
  }

  restoreFromCache() {
    if (!this.cache) {
      return;
    }
    const obj = JSON.parse(this.cache);
    if (!obj) {
      return;
    }
    this.fromDto(obj);
  }

  changeTextField(field: ProductTextField, text: string) {
    switch (field) {
      case "name": {
        this[field] = text;
        return;
      }
      case "meta": {
        this.meta = (text === "null" || text === "") ? null : JSON.parse(text) as ProductMeta;
        return;
      }
      case "meta.description": {
        if (!this.meta) {
          this.createMeta();
        }
        if (!this.meta) {
          return;
        }
        this.meta.description = text;
        return;
      }
    }
  }

  private createMeta() {
    this.meta = {
      description: "",
      price: 10000,
      rating: 5,
      photos: [],
      options: [],
      actions: []
    };
  }

  mock() {
    this.name = "Product ProductProductProduct" + this.id;
    this.meta = {
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      price: 100,
      rating: Math.floor(Math.random() * 5),
      photos: [],
      options: [],
      actions: []
    };
  }

}
