import React from "react";

import { IconButton } from "@mui/material";

import MoreIcon from "@mui/icons-material/MoreVert";


export interface MoreButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MoreButton: React.FC<MoreButtonProps> = ({ onClick }) => {
  return <IconButton
    size="small"
    aria-haspopup="true"
    onClick={onClick}
    color="inherit"
    className="menu_icon"
  >
    <MoreIcon />
  </IconButton>;
};
