import * as React from "react";

import { observer } from "mobx-react";
import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";

import { EditorMenuProps } from "interfaces/menu";

import { CatalogStore } from "stores/CatalogStore";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

import { SelectProducts } from "components/Admins/SelectProducts";

const editorMenuId = "catalog-editor-menu";

interface MenuItemProps<T> {
  onClick: (event: React.MouseEvent<HTMLElement>, data: T) => void;
  text: null | string;
  condition: () => boolean;
  icon?: React.ReactNode;
  data: T;
}

const MyMenuItem = <T, >({ onClick, text, condition, data }: MenuItemProps<T>) => {
  if (!condition()) {
    return null;
  }
  return <MenuItem onClick={(e) => onClick(e, data)}>
    {text}
  </MenuItem>;
};

const EditorMenu = ({ anchorEl, catalog, onClose }: EditorMenuProps) => {
  const { uiStore } = useStores();
  const isMenuOpen = Boolean(anchorEl);

  const handleMobileMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClose();
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>, data: CatalogStore) => {
    uiStore.showCatalogEditDlg({ catalog: data, mode: "edit" });
    handleMobileMenuClose(event);
  };
  const handleAddChildCatalog = (event: React.MouseEvent<HTMLElement>, data: CatalogStore) => {
    uiStore.showCatalogEditDlg({ catalog: data.getNewChildCatalog(), mode: "new" });
    handleMobileMenuClose(event);
  };
  const handleAddProducts = (event: React.MouseEvent<HTMLElement>, data: CatalogStore) => {
    uiStore.showSelectProductDlg();
    handleMobileMenuClose(event);
  };
  const handleDeleteCatalog = (event: React.MouseEvent<HTMLElement>, data: CatalogStore) => {
    data.delete();
    handleMobileMenuClose(event);
  };

  const items: MenuItemProps<CatalogStore>[] = [ {
    text: t("menu.editor.catalog.edit"),
    onClick: handleEdit,
    condition: () => !!catalog.id,
    data: catalog
  }, {
    text: t("menu.editor.catalog.delete"),
    onClick: handleDeleteCatalog,
    condition: () => !!catalog.id && !catalog.hasChildren,
    data: catalog
  }, {
    text: t("menu.editor.catalog.editProducts"),
    onClick: handleAddProducts,
    condition: () => true,
    data: catalog
  }, {
    text: t("menu.editor.catalog.addChildCatalog"),
    onClick: handleAddChildCatalog,
    condition: () => true,
    data: catalog
  } ];


  return <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    id={editorMenuId + catalog.id ?? "0"}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    open={isMenuOpen}
    onClose={handleMobileMenuClose}
  >
    {items.map(item => <MyMenuItem
      key={item.text}
      onClick={item.onClick}
      condition={item.condition}
      data={catalog}
      text={item.text}
    />)}

  </Menu>;
};

export interface CatalogEditorToolbarProps {
  catalog: CatalogStore;
}

export const CatalogEditorToolbar = observer(({ catalog }: CatalogEditorToolbarProps) => {
  const [ editorMenuAnchorEl, setEditorMenuAnchorEl ] = React.useState<null | HTMLElement>(null);

  const handleEditorMenuClose = () => {
    setEditorMenuAnchorEl(null);
  };

  const handleEditorMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setEditorMenuAnchorEl(event.currentTarget);
  };

  return <>
    <IconButton
      size="small"
      aria-controls={editorMenuId}
      aria-haspopup="true"
      onClick={handleEditorMenuOpen}
      color="inherit"
    >
      <MoreIcon />
    </IconButton>
    <EditorMenu catalog={catalog} anchorEl={editorMenuAnchorEl} onClose={handleEditorMenuClose} />
    <SelectProducts />
  </>;
});
