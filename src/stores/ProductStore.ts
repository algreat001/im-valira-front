import { makeAutoObservable, runInAction } from "mobx";

import { t } from "res/i18n/i18n";
import { CharacteristicMeta, Option, OptionType, ProductDto, ProductMeta, ProductReviewMeta } from "interfaces/ext";
import { addProductToCatalog, loadProduct, saveProduct } from "services/api";
import { ReviewStore } from "stores/ReviewStore";
import { CharacteristicStore } from "stores/CharactersticStore";
import { calculatePrice } from "helpers/price";
import { mapToString, stringToMap } from "helpers/helper";


interface ProductJson {
  dto: ProductDto;
  selectedOptions: string;
  amount: number;
}

export type ProductTextField = "name" | "meta.description" | "meta"

export class ProductStore {
  id: null | string = null;
  name: null | string = null;
  meta: null | ProductMeta = null;

  selectedOptions: Map<string, Option> = new Map<string, Option>();

  reviews: null | ReviewStore = null;

  characteristics: null | CharacteristicStore = null;

  isLoading = false;
  isError = false;
  isPhoto = false;

  amount = 1;

  private cache: null | string = null;

  constructor(stringProduct?: string) {
    makeAutoObservable(this);
    this.isLoading = true;
    this.name = t("product.default.name");
    this.createMeta();
    if (stringProduct) {
      this.fromString(stringProduct);
    }
  }

  private getValidAmount(amount: number, min: number, max: number): number {
    if (Number.isNaN(amount)) {
      return min;
    }
    if (amount < min) {
      return min;
    }
    if (amount > max) {
      return max;
    }
    return amount;
  }


  setAmount(value: string) {
    const numValue = this.getValidAmount(parseInt(value), 1, 10);
    this.amount = numValue;
  }

  calculatePrice(withActions: boolean): number {

    const price = this.meta?.price;
    if (!price) {
      return 0;
    }

    const calcOptions: Option[] = [...this.selectedOptions.values()];

    const operations = [
      ...calcOptions.map(option => option?.operation),
      ...(withActions
        ? this.meta?.actions?.map(action => action.operation) ?? []
        : [])
    ];
    return calculatePrice(price, operations);
  }

  selectedOptionsToString(): undefined | string {
    const stringOptions: string[] = [];
    this.selectedOptions.forEach((option, type) => {
      const localizeType = t(`option.${type}.type`);
      const localizeValue = t(`option.${type}.${option.name}`);
      stringOptions.push(`${localizeType}: ${localizeValue || option.name}`);
    });
    return stringOptions.length > 0 ? " (" + stringOptions.join(", ") + ")" : undefined;
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

  initCharacteristic(characteristics: CharacteristicMeta[]) {
    runInAction(() => {
      if (!this.meta) {
        return;
      }
      this.meta.characteristics = characteristics;
    });
  }

  resetAmount() {
    this.amount = 1;
  }

  private fromDto(dto: ProductDto) {
    this.name = dto.name;
    this.meta = dto.meta;
    this.id = dto.id;
    if (this.meta?.photos.length > 0) {
      this.isPhoto = true;
    }
    this.reviews = new ReviewStore(this);
    this.characteristics = new CharacteristicStore(this);
    this.initOptions();
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

  toString(): string {
    return JSON.stringify({
      dto: this.toDto(),
      selectedOptions: mapToString(this.selectedOptions),
      amount: this.amount
    });
  }

  private fromString(productString: string) {
    const dtoWithSelectedOptions = JSON.parse(productString) as ProductJson;
    if (!dtoWithSelectedOptions) {
      return;
    }
    this.fromDto(dtoWithSelectedOptions.dto);
    this.selectedOptions = stringToMap(dtoWithSelectedOptions.selectedOptions);
    this.amount = dtoWithSelectedOptions.amount;
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

  initOptions() {
    if (!this.meta?.options) {
      return;
    }
    for (const option of this.meta.options) {
      const defaultOption = option.options[0];
      if (!defaultOption) {
        continue;
      }
      this.selectedOptions.set(option.type, defaultOption);
    }
  }

  clone(): ProductStore {
    const cloneProduct = new ProductStore();
    const dto = this.toDto();
    cloneProduct.fromDto(dto);
    cloneProduct.selectedOptions = new Map(this.selectedOptions);
    cloneProduct.amount = this.amount;
    return cloneProduct;
  }

  private createMeta() {
    this.meta = {
      description: "",
      price: 10000,
      rating: 5,
      photos: [],
      options: [],
      actions: [],
      characteristics: [],
      reviews: []
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
      actions: [],
      characteristics: [],
      reviews: []
    };
  }

}
