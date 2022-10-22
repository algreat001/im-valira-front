import React, { useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";

import { IconButton, MenuItem, Menu } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";

export interface AccountBoxProps {
  showTitle?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const AccountBox: React.FC<AccountBoxProps> = observer(({ showTitle, onClick }) => {
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
