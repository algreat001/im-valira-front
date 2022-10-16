import { makeAutoObservable, runInAction } from "mobx";

import { Option, OptionType, ProductDto, ProductMeta } from "interfaces/ext";
import { loadProduct } from "services/api";
import { calculatePrice } from "../helpers/price";

export class ProductStore {
  id: null | string = null;
  name: null | string = null;
  meta: null | ProductMeta = null;

  selectedOptions: Map<string, Option> = new Map<string, Option>();

  isLoading = false;
  isError = false;
  isPhoto = false;

  amount = 1;

  constructor() {
    makeAutoObservable(this);
    this.isLoading = true;
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

  private fromDto(dto: ProductDto) {
    this.name = dto.name;
    this.meta = dto.meta;
    if (this.meta?.photos.length > 0) {
      this.isPhoto = true;
    }
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
    return;
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
