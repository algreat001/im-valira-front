import { makeAutoObservable } from "mobx";

import { ProductDto, ProductMeta } from "interfaces/ext";
import { loadProduct } from "services/api";

export class ProductStore {
  id: null | string = null;
  name: null | string = null;
  meta: null | ProductMeta = null;

  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
    this.isLoading = true;
  }

  private fromDto(dto: ProductDto) {
    this.name = dto.name;
    this.meta = dto.meta;
  }

  async load(id: string): Promise<void> {
    this.id = id;
    this.isLoading = true;
    const dto = await loadProduct(id);
    this.isLoading = false;
    this.isError = !dto;
    if (!dto) {
      return;
    }
    this.fromDto(dto);
    return;
  }

  async save(): Promise<void> {
    return;
  }

}
