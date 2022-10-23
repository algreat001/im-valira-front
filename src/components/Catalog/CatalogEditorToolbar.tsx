import * as React from "react";

import { observer } from "mobx-react";

import { CatalogStore } from "stores/CatalogStore";

import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

import { SelectProducts } from "components/Admins/SelectProducts";
import { CatalogEditorContextMenu } from "./CatalogEditorContextMenu";

export interface CatalogEditorToolbarProps {
  catalog: CatalogStore;
}

export const CatalogEditorToolbar: React.FC<CatalogEditorToolbarProps> = observer(({ catalog }) => {
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
      aria-haspopup="true"
      onClick={handleEditorMenuOpen}
      color="inherit"
      className="menu_icon"
    >
      <MoreIcon />
    </IconButton>
    <CatalogEditorContextMenu catalog={catalog} anchorEl={editorMenuAnchorEl} onClose={handleEditorMenuClose} />
    <SelectProducts />
  </>;
});
