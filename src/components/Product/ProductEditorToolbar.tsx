import React from "react";
import { observer } from "mobx-react";

import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useStores } from "hooks/useStores";

import { ProductProps } from "./Product";
import { ProductEditorContextMenu } from "./ProductEditorContextMenu";


export const ProductEditorToolbar: React.FC<ProductProps> = observer(({ product }) => {
  const { profileManagerStore: { viewer } } = useStores();
  const [ editorMenuAnchorEl, setEditorMenuAnchorEl ] = React.useState<null | HTMLElement>(null);

  const { meta } = product;

  if (!meta) {
    return null;
  }

  const isEditable = (viewer.isAdmin || viewer.hasRole("Editor"));

  if (!isEditable) {
    return null;
  }

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
    <ProductEditorContextMenu
      product={product}
      anchorEl={editorMenuAnchorEl}
      onClose={handleEditorMenuClose}
    />
  </>;
});
