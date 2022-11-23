import React from "react";

import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


export interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return <IconButton
    aria-label="close"
    onClick={onClose}
    sx={{
      position: "absolute",
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500]
    }}
  >
    <CloseIcon />
  </IconButton>;
};
