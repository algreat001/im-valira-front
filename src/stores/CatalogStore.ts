import { CatalogDto, CatalogMeta } from "interfaces/ext";
import { makeAutoObservable, runInAction } from "mobx";

import { deleteCatalog, loadCatalog, loadCatalogList, saveCatalog } from "services/api";
import { t } from "res/i18n/i18n";

import { CatalogRepositoryStore } from "./CatalogRepositoryStore";

export type CatalogTextField = "name" | "description" | "meta";


export class CatalogStore {
  id: null | string = null;
  name: null | string = null;
  description: null | string = null;
  meta: null | CatalogMeta = null;

  children: string[] = [];
  parent: null | string = null;

  isChildrenLoaded = false;
  isExpand = false;
  hasChildren = false;

  private cache: null | string = null;

  constructor(private catalogRepository: CatalogRepositoryStore) {
    makeAutoObservable(this);
  }

  async loadChildren() {
    //TODO сейчас блокирую повторную загрузку полностью, в дальнейшем стоит подумать о времени жизни этого кэша
    if (this.isChildrenLoaded) {
      return;
    }
    const listIds = await loadCatalogList(this.id);
    if (!listIds) {
      return;
    }
    runInAction(() => {
      this.children = listIds;
      this.isChildrenLoaded = true;
    });

  }

  fromDto(dto: CatalogDto, parentId: null | string = null) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.meta = dto.meta;
    if (parentId) {
      this.parent = parentId;
    } else if (dto.parent) {
      this.parent = dto.parent;
    }
    this.hasChildren = dto.hasChildren;
  }

  toDto(): CatalogDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      meta: this.meta,
      parent: this.parent,
      hasChildren: this.hasChildren
    } as CatalogDto;
  }

  toggleExpend() {
    this.isExpand = !this.isExpand;
    if (this.isExpand) {
      this.loadChildren();
    }
  }

  select() {
    this.toggleExpend();
    // if (this.isExpand) {
    //   this.loadChildren();
    // }
  }

  async load(id: string) {
    const dto = await loadCatalog(id);
    if (!dto) {
      return;
    }
    this.fromDto(dto);

  }

  async save() {
    const res = await saveCatalog(this.toDto());
    if (!res) {
      this.restoreFromCache();
      return;
    }
    if (!this.parent) {
      return;
    }
    const parentStore = this.catalogRepository.getCatalog(this.parent);
    if (!parentStore || !this.id) {
      return;
    }
    parentStore.pushChildren(this.id);
    if (!parentStore.hasChildren) {
      parentStore.hasChildren = true;
      parentStore.save();
    }
  }

  pushChildren(childId: string) {
    if (!this.children.some(id => id === childId)) {
      this.children.push(childId);
    }
  }

  deleteChildren(childId: string) {
    this.children = this.children.filter(id => id !== childId);
    if (this.children.length === 0) {
      this.hasChildren = false;
    }
  }

  async delete() {
    if (this.children.length > 0 || !this.id) {
      return;
    }
    if (!await deleteCatalog(this.id)) {
      return;
    }
    if (!this.parent) {
      return;
    }
    const parentStore = this.catalogRepository.getCatalog(this.parent);
    parentStore?.deleteChildren(this.id);
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

  findById(id: null | string): null | CatalogStore {
    if (!id) {
      return null;
    }
    return this.catalogRepository.getCatalog(id);
  }

  changeTextField(field: CatalogTextField, text: string) {
    switch (field) {
      case "description":
      case "name": {
        this[field] = text;
        return;
      }
      case "meta": {
        this.meta = (text === "null" || text === "") ? null : JSON.parse(text) as CatalogMeta;
      }

    }
  }

  getNewChildCatalog(): CatalogStore {
    const newCatalog = new CatalogStore(this.catalogRepository);
    newCatalog.setDefaultValue();
    newCatalog.parent = this.id;
    return newCatalog;
  }

  setDefaultValue() {
    this.name = t("catalog.default.name");
    this.description = "";
    this.meta = JSON.parse(t("catalog.default.meta") ?? "{}") as null | CatalogMeta;
  }

}
