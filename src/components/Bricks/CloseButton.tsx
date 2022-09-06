import React from "react";

import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


export interface CloseButtonProps {
  onCLose: () => void;
}

export const CloseButton = ({ onCLose }: CloseButtonProps) => {
  return <IconButton
    aria-label="close"
    onClick={onCLose}
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
