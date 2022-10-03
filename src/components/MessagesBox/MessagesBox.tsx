import * as React from "react";
import { observer } from "mobx-react";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { MenuItem } from "@mui/material";

import { t } from "res/i18n/i18n";
import { useStores } from "../../hooks/useStores";

import MailIcon from "@mui/icons-material/Mail";

export interface MessagesBoxProps {
  showTitle?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const MessagesBox = observer(({ showTitle, onClick }: MessagesBoxProps) => {
  const { profileManagerStore } = useStores();
  const { viewer } = profileManagerStore;

  return (
    <MenuItem onClick={onClick}>
      <IconButton size="large" color="inherit">
        <Badge badgeContent={viewer.messagesCount} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      {showTitle && <p>{t("appbar.messages")}</p>}
    </MenuItem>
  );
});
