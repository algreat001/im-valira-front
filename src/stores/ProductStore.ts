import { makeAutoObservable, runInAction } from "mobx";

import { ProductDto, ProductMeta } from "interfaces/ext";
import { loadProduct } from "services/api";

export class ProductStore {
  id: null | string = null;
  name: null | string = null;
  meta: null | ProductMeta = null;

  isLoading = false;
  isError = false;
  isPhoto = false;

  constructor() {
    makeAutoObservable(this);
    this.isLoading = true;
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
