import * as React from "react";

import { MenuItemProps, ProductEditorMenuProps } from "interfaces/menu";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { ContextMenu } from "components/ContextMenu/ContextMenu";

export const productEditorMenuId = "product-editor-menu";

export const ProductEditorContextMenu: React.FC<ProductEditorMenuProps> = ({ anchorEl, product, onClose }) => {
  const { uiStore } = useStores();

  const handleEdit = () => {
    uiStore.showProductEditDlg({ store: product, mode: "edit" });
  };
  const handleDelete = () => {
    //product.delete();
  };

  const items: MenuItemProps[] = [ {
    text: t("menu.editor.catalog.edit"),
    onClick: handleEdit,
    condition: () => true
  }, {
    text: t("menu.editor.catalog.delete"),
    onClick: handleDelete,
    condition: () => true
  } ];


  return <ContextMenu
    anchorEl={anchorEl}
    menuId={productEditorMenuId}
    onClose={onClose}
    items={items}
  />;
};
