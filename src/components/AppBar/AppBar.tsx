import * as React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, IconButton, Menu } from "@mui/material";

import { AccountBox } from "components/AccountBox/AccountBox";
import { SearchBar } from "components/SearchBar/SearchBar";
import { LogoBar } from "components/LogoBar/LogoBar";
import { CartBox } from "components/CartBox/CartBox";
import { Signin } from "components/forms/Sign/Signin";
import { Signup } from "components/forms/Sign/Signup";
import { Profile } from "components/forms/Profile/Profile";
import { HideOnScroll } from "components/Bricks/HideOnScroll";

import { MobileMenuProps } from "interfaces/menu";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

const mobileMenuId = "primary-search-account-menu-mobile";

const MobileMenu: React.FC<MobileMenuProps> = ({ anchorEl, onClose }) => {
  // const { loginStore } = useStores();
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
    {/*{loginStore.isLogined && <MessagesBox onClick={handleMobileMenuClose} showTitle />}*/}
    {/*{loginStore.isLogined && <NotificationsBox onClick={handleMobileMenuClose} showTitle />}*/}
    <CartBox showTitle />
    <AccountBox showTitle />
  </Menu>;
};

export interface ApplicationBarProps {
  name?: string;
}

export const ApplicationBar: React.FC<ApplicationBarProps> = observer(() => {
  const { loginStore, searchStore, profileManagerStore } = useStores();
  const navigate = useNavigate();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState<null | HTMLElement>(null);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (searchLine: string) => {
    searchStore.search(searchLine);
    navigate("/search");
  };

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer" sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <MenuIcon />
            </IconButton>
            <LogoBar />
            <SearchBar onSearch={handleSearch} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/*{loginStore.isLogined && (*/}
              {/*  <>*/}
              {/*    <MessagesBox onClick={handleMobileMenuClose} />*/}
              {/*    <NotificationsBox onClick={handleMobileMenuClose} />*/}
              {/*  </>*/}
              {/*)}*/}
              <CartBox />
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
      </HideOnScroll>
      <Toolbar />
      <MobileMenu anchorEl={mobileMoreAnchorEl} onClose={handleMobileMenuClose} />
      <Signin />
      <Signup />
      <Profile profile={profileManagerStore.currentProfile} />
    </>
  );
});
