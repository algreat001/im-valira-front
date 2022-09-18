import { CatalogDto, CatalogMeta } from "interfaces/ext";
import { makeAutoObservable, runInAction } from "mobx";
import { deleteCatalog, loadCatalogList, saveCatalog } from "services/api";
import { gap } from "./RootStore";
import { t } from "../res/i18n/i18n";

export type CatalogTextField = "name" | "description" | "meta";


export class CatalogStore {
  id: null | string = null;
  name: null | string = null;
  description: null | string = null;
  meta: null | CatalogMeta = null;

  children: CatalogStore[] = [];
  parent: null | CatalogStore = null;

  isChildrenLoaded = false;
  isExpand = false;
  hasChildren = false;

  private cache: null | string = null;

  constructor(isMain = false) {
    makeAutoObservable(this);
    if (isMain) {
      this.loadChildren();
    }
  }

  async loadChildren() {
    //TODO сейчас блокирую повторную загрузку полностью, в дальнейшем стоит подумать о времени жизни этого кэша
    if (this.isChildrenLoaded) {
      return;
    }
    const dtoList = await loadCatalogList(this.id);
    if (!dtoList) {
      return;
    }
    runInAction(() => {
      this.children = [];
    });
    for (const dtoCatalog of dtoList) {
      const newChildren = new CatalogStore();
      newChildren.fromDto(dtoCatalog, this);
      runInAction(() => {
        this.children.push(newChildren);
      });
    }
    runInAction(() => {
      this.isChildrenLoaded = true;
    });
  }

  fromDto(dto: CatalogDto, parent: null | CatalogStore = null) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.meta = dto.meta;
    if (parent) {
      this.parent = parent;
    } else if (dto.parent) {
      this.parent = gap.catalogStore.findById(dto.parent);
    }
    this.hasChildren = dto.hasChildren;
  }

  toDto(): CatalogDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      meta: this.meta,
      parent: this.parent?.id ?? null,
      hasChildren: this.hasChildren
    } as CatalogDto;
  }

  toggleExpend() {
    this.isExpand = !this.isExpand;
  }

  select() {
    this.toggleExpend();
    if (this.isExpand) {
      this.loadChildren();
    }
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

    this.parent.pushChildren(this);
    if (!this.parent.hasChildren) {
      this.parent.hasChildren = true;
      if (this.parent.id) {
        this.parent.save();
      }
    }

  }

  pushChildren(child: CatalogStore) {
    if (!this.children.some(ch => ch.id === child.id)) {
      this.children.push(child);
    }
  }

  deleteChildren(child: CatalogStore) {
    this.children = this.children.filter(ch => ch.id !== child.id);
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
    this.parent?.deleteChildren(this);
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

  findById(id: string): null | CatalogStore {
    if (this.id === id) {
      return this;
    }
    for (const child of this.children) {
      const res = child.findById(id);
      if (res) {
        return res;
      }
    }
    return null;
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
    const newCatalog = new CatalogStore();
    newCatalog.setDefaultValue();
    newCatalog.parent = this;
    return newCatalog;
  }

  setDefaultValue() {
    this.name = t("catalog.default.name");
    this.description = "";
    this.meta = JSON.parse(t("catalog.default.meta") ?? "{}") as null | CatalogMeta;
  }

}
