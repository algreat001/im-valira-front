import * as React from "react";

import { observer } from "mobx-react";

import { CatalogStore } from "stores/CatalogStore";
import { MoreButton } from "components/Bricks/MoreButton";

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
    <MoreButton onClick={handleEditorMenuOpen} />
    <CatalogEditorContextMenu catalog={catalog} anchorEl={editorMenuAnchorEl} onClose={handleEditorMenuClose} />
  </>;
});
