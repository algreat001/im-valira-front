import React from "react";
import { observer } from "mobx-react";

import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useStores } from "hooks/useStores";

import { ReviewItemProps } from "./ReviewItem";
import { ReviewEditorContextMenu } from "./ReviewEditorContextMenu";


export const ReviewEditorToolbar: React.FC<ReviewItemProps> = observer(({ reviews, index }) => {
  const { profileManagerStore: { viewer } } = useStores();
  const [ editorMenuAnchorEl, setEditorMenuAnchorEl ] = React.useState<null | HTMLElement>(null);

  const meta = reviews.get(index);

  if (!meta) {
    return null;
  }

  const isEditable = (viewer.isAdmin || viewer.hasRole("Moderator") || viewer.email === meta.email);

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
    <ReviewEditorContextMenu
      reviews={reviews}
      index={index}
      anchorEl={editorMenuAnchorEl}
      onClose={handleEditorMenuClose}
    />
  </>;
});
