import { makeAutoObservable, runInAction } from "mobx";

import { CharacteristicMeta } from "interfaces/ext";
import { getDictionary } from "res/i18n/i18n";

import { addCharacteristic, updateCharacteristic, deleteCharacteristic } from "services/api";

import { ProductStore } from "./ProductStore";

export class CharacteristicStore {
  meta: null | CharacteristicMeta[] = null;

  product: null | ProductStore = null;

  allCharacteristics: null | string[] = null;

  constructor(product: ProductStore) {
    makeAutoObservable(this);
    this.product = product;
    if (product.meta?.characteristics) {
      this.meta = product.meta.characteristics;
    } else {
      this.meta = [];
      product.initCharacteristic(this.meta);
    }
    this.initCharacteristicsMap();
  }

  private initCharacteristicsMap() {
    this.allCharacteristics = [];
    const dict = getDictionary()["char"];
    for (const char in dict) {
      if (char === "header") {
        continue;
      }
      this.allCharacteristics.push(char);
    }
  }

  getAllCharacteristics(): Readonly<string[]> {
    if (!this.allCharacteristics) {
      return [];
    }
    return this.allCharacteristics;
  }

  get(name: null | string): null | CharacteristicMeta {
    if (name === null || !this.meta) {
      return null;
    }
    return this.meta.find(ch => ch.name === name) ?? null;
  }

  get length(): number {
    return this.meta?.length ?? 0;
  }

  async add(characteristic: CharacteristicMeta): Promise<void> {
    if (!this.product?.id) {
      return;
    }

    const savedMeta = await addCharacteristic(this.product.id, characteristic);
    if (!savedMeta) {
      return;
    }
    runInAction(() => {
      if (!this.meta) {
        this.meta = [ savedMeta ];
      } else {
        this.meta.push(savedMeta);
      }
    });
  }

  async update(name: string, characteristic: CharacteristicMeta): Promise<void> {
    if (!this.product?.id) {
      return;
    }
    if (!this.meta || !characteristic) {
      return;
    }
    const resultUpdate = await updateCharacteristic(this.product.id, characteristic);
    if (resultUpdate) {
      const index = this.meta.findIndex(ch => ch.name === name);
      this.meta[index] = resultUpdate;
    }
  }

  async delete(name: string): Promise<void> {
    if (!this.product?.id) {
      return;
    }
    if (!this.meta) {
      return;
    }
    const characteristic = this.get(name);
    if (!characteristic) {
      return;
    }
    const deleteSuccess = await deleteCharacteristic(this.product.id, characteristic);
    if (deleteSuccess) {
      runInAction(() => {
        if (!this.meta) {
          return;
        }
        this.meta = this.meta.filter(ch => ch.name !== name);
      });
    }
  }
}
