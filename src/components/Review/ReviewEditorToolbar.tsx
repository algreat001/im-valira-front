import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";

import { MoreButton } from "components/Bricks/MoreButton";
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
    <MoreButton onClick={handleEditorMenuOpen} />
    <ReviewEditorContextMenu
      reviews={reviews}
      index={index}
      anchorEl={editorMenuAnchorEl}
      onClose={handleEditorMenuClose}
    />
  </>;
});
