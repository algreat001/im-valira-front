import * as React from "react";
import { observer } from "mobx-react";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { MenuItem } from "@mui/material";

import { t } from "res/i18n/i18n";
import { useStores } from "../../hooks/useStores";

import NotificationsIcon from "@mui/icons-material/Notifications";

export interface NotificationsBoxProps {
  showTitle?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const NotificationsBox = observer(({ showTitle, onClick }: NotificationsBoxProps) => {
  const { profileManagerStore } = useStores();
  const { viewer } = profileManagerStore;

  return (
    <MenuItem onClick={onClick}>
      <IconButton size="large" color="inherit">
        <Badge badgeContent={viewer.notificationsCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {showTitle && <p>{t("appbar.notifications")}</p>}
    </MenuItem>
  );
});
