import * as React from "react";

import { MenuItemProps, ReviewEditorMenuProps } from "interfaces/menu";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { ContextMenu } from "components/ContextMenu/ContextMenu";

export const reviewEditorMenuId = "review-editor-menu";

export const ReviewEditorContextMenu: React.FC<ReviewEditorMenuProps> = ({ anchorEl, reviews, index, onClose }) => {
  const { uiStore } = useStores();

  const handleEdit = () => {
    uiStore.showReviewEditDlg({ store: reviews, mode: "edit", params: { index } });
  };
  const handleDelete = () => {
    reviews.delete(index);
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
    menuId={reviewEditorMenuId + index ?? "0"}
    onClose={onClose}
    items={items}
  />;
};
