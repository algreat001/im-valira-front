import { CatalogStore } from "../stores/CatalogStore";

export interface BaseMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

export type MobileMenuProps = BaseMenuProps;

export interface EditorMenuProps extends BaseMenuProps {
  catalog: CatalogStore;
}
