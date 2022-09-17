import * as React from "react";
import { observer } from "mobx-react";

import { useStores } from "stores/useStores";

import { AppBar, Box, Toolbar, IconButton, Menu } from "@mui/material";

import { AccountBox } from "components/AccountBox/AccountBox";
import { NotificationsBox } from "components/NotificationsBox/NotificationsBox";
import { SearchBar } from "components/SearchBar/SearchBar";
import { LogoBar } from "components/LogoBar/LogoBar";
import { MessagesBox } from "components/MessagesBox/MessagesBox";
import { Signin } from "components/forms/Sign/Signin";
import { Signup } from "components/forms/Sign/Signup";
import { Profile } from "components/forms/Profile/Profile";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

const mobileMenuId = "primary-search-account-menu-mobile";

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const MobileMenu = ({ anchorEl, onClose }: MobileMenuProps) => {
  const { loginStore } = useStores();
  const isMobileMenuOpen = Boolean(anchorEl);

  const handleMobileMenuClose = () => {
    onClose();
  };

  return <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    {loginStore.isLogined && <MessagesBox onClick={handleMobileMenuClose} showTitle />}
    {loginStore.isLogined && <NotificationsBox onClick={handleMobileMenuClose} showTitle />}
    <AccountBox showTitle />
  </Menu>;
};

export interface ApplicationBarProps {
  name?: string;
}

export const ApplicationBar = observer(({ name }: ApplicationBarProps) => {
  const { loginStore, profileManagerStore } = useStores();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState<null | HTMLElement>(null);

  console.log(name);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <LogoBar />
            <SearchBar />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {loginStore.isLogined && (
                <>
                  <MessagesBox onClick={handleMobileMenuClose} />
                  <NotificationsBox onClick={handleMobileMenuClose} />
                </>
              )}
              <AccountBox />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <MobileMenu anchorEl={mobileMoreAnchorEl} onClose={handleMobileMenuClose} />
      </Box>
      <Signin />
      <Signup />
      <Profile profile={profileManagerStore.currentProfile} />
    </>
  );
});
