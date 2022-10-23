import * as React from "react";
import { Menu, MenuItem } from "@mui/material";

import { MenuItemProps, MenuProps } from "interfaces/menu";

export const ContextMenuItem: React.FC<MenuItemProps> = ({ onClick, text, condition }) => {
  if (!condition()) {
    return null;
  }
  return <MenuItem onClick={(e) => onClick(e)}>
    {text}
  </MenuItem>;
};

export const ContextMenu: React.FC<MenuProps> = ({ menuId, anchorEl, items, onClose }) => {
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClose();
  };

  const handleItemOnClick = (event: React.MouseEvent<HTMLElement>, item: MenuItemProps) => {
    item.onClick(event);
    handleMenuClose(event);
  };

  return <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    id={menuId}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    {items.map((item) => <ContextMenuItem
      key={item.text}
      onClick={(event) => { event && handleItemOnClick(event, item);}}
      condition={() => item.condition()}
      text={item.text}
    />)}

  </Menu>;
};
