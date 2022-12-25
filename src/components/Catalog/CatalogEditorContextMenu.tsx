import * as React from "react";
import { observer } from "mobx-react";

import { CatalogEditorMenuProps, MenuItemProps } from "interfaces/menu";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { ContextMenu } from "components/ContextMenu/ContextMenu";
import { ROOT_CATALOG } from "stores/CatalogRepositoryStore";

export const catalogEditorMenuId = "catalog-editor-menu";

export const CatalogEditorContextMenu: React.FC<CatalogEditorMenuProps> = observer(({ anchorEl, catalog, onClose }) => {
  const { uiStore, productRepository } = useStores();

  const handleEdit = () => {
    uiStore.showCatalogEditDlg({ store: catalog, mode: "edit" });
  };
  const handleAddChildCatalog = () => {
    uiStore.showCatalogEditDlg({ store: catalog.getNewChildCatalog(), mode: "new" });
  };
  const handleAddProducts = () => {
    uiStore.setCurrentCatalogId(catalog.id);
    uiStore.showSelectProductDlg();
  };
  const handleDeleteCatalog = () => {
    const deletedId = catalog.id
    catalog.delete().then(() => {
      if (deletedId === uiStore.currentCatalogId) {
        uiStore.setCurrentCatalogId(ROOT_CATALOG);
      }
    });

  };

  const handleAddNewProduct = () => {
    uiStore.showProductEditDlg({ params: { catalog }, store: productRepository.newProduct(), mode: "new" });
  };

  const items: MenuItemProps[] = [ {
    text: t("menu.editor.catalog.edit"),
    onClick: handleEdit,
    condition: () => !!catalog.id && catalog.id !== ROOT_CATALOG
  }, {
    text: t("menu.editor.catalog.delete"),
    onClick: handleDeleteCatalog,
    condition: () => !!catalog.id && !catalog.hasChildren && catalog.id !== ROOT_CATALOG
  }, {
    text: t("menu.editor.catalog.editProducts"),
    onClick: handleAddProducts,
    condition: () => true
  }, {
    text: t("menu.editor.catalog.addChildCatalog"),
    onClick: handleAddChildCatalog,
    condition: () => true
  }, {
    text: t("menu.editor.catalog.addNewProduct"),
    onClick: handleAddNewProduct,
    condition: () => true
  } ];


  return <ContextMenu
    anchorEl={anchorEl}
    menuId={catalogEditorMenuId + catalog.id ?? "0"}
    onClose={onClose}
    items={items}
  />;
});
