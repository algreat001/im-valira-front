import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { t } from "res/i18n/i18n";
import { useStores } from "stores/useStores";
import { observer } from "mobx-react";

export interface AcountBoxProps {
  showTitle?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const AccountBox = observer(({ showTitle, onClick }: AcountBoxProps) => {
  const { loginStore, uiStore } = useStores();
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (loginStore.isLogined) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      if (onClick) {
        onClick(event);
      }
    } else {
      uiStore.showLoginDlg();
    }
  };

  const handleProfileCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowProfile = () => {
    uiStore.showProfileDlg();
  };

  const handleLogout = () => {
    loginStore.logout();
  };

  const menuId = "primary-search-account-menu";
  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleProfileCloseMenu}
    >
      {

      }
      <MenuItem onClick={handleShowProfile}>{t("appbar.profile.profile")}</MenuItem>
      <MenuItem onClick={handleLogout}>{t("appbar.profile.logout")}</MenuItem>
    </Menu>
  );
  return (
    <MenuItem onClick={handleProfileClickMenu}>
      <IconButton size="large" color="inherit">
        <AccountCircle />
      </IconButton>
      {showTitle && <p>{t("appbar.profile.title")}</p>}
      {loginStore.isLogined && accountMenu}
    </MenuItem>
  );
});
