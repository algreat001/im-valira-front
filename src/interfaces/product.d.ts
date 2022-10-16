import { CatalogStore } from "stores/CatalogStore";
import { ProductStore } from "stores/ProductStore";

export interface EditorProps {
  catalog?: CatalogStore;
  product?: ProductStore;
  mode: "new" | "edit";
}
