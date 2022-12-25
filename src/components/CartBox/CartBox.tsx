import * as React from "react";
import { observer } from "mobx-react";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { MenuItem } from "@mui/material";

import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";
import { useNavigate, useLocation } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export interface CartBoxProps {
  showTitle?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const CartBox: React.FC<CartBoxProps> = observer(({ showTitle, onClick }) => {
  const { profileManagerStore: { viewer }, cartStore } = useStores();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (location.pathname === '/cart') {
      return;
    }
    cartStore.setExitLink(location.pathname);
    navigate("/cart");
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <MenuItem onClick={handleClick}>
      <IconButton size="large" color="inherit">
        <Badge badgeContent={cartStore.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {showTitle && <p>{t("appbar.cart")}</p>}
    </MenuItem>
  );
});
