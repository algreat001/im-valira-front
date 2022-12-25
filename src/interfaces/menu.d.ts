import * as React from "react";
import { CatalogStore } from "stores/CatalogStore";
import { ProductStore } from "stores/ProductStore";
import { ReviewStore } from "stores/ReviewStore";
import { CharacteristicStore } from "../stores/CharactersticStore";

export interface BaseMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

export type MobileMenuProps = BaseMenuProps;


export interface CatalogEditorMenuProps extends BaseMenuProps {
  catalog: CatalogStore;
}

export interface ProductEditorMenuProps extends BaseMenuProps {
  product: ProductStore;
}

export interface CharacteristicEditorMenuProps extends BaseMenuProps {
  characteristic: CharacteristicStore;
  name: null | string;
}

export interface ReviewEditorMenuProps extends BaseMenuProps {
  reviews: ReviewStore;
  index: number;
}

export interface MenuItemProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  text: null | string;
  condition: () => boolean;
  icon?: React.ReactNode;
}

export interface MenuProps extends BaseMenuProps {
  menuId: string;
  items: MenuItemProps[];
}
