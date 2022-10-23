import * as React from "react";
import { CatalogStore } from "stores/CatalogStore";
import { ReviewStore } from "stores/ReviewStore";

export interface BaseMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

export type MobileMenuProps = BaseMenuProps;


export interface CatalogEditorMenuProps extends BaseMenuProps {
  catalog: CatalogStore;
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
