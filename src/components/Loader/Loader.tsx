import * as React from "react";

import { t } from "res/i18n/i18n";

import { Box, CircularProgress } from "@mui/material";

export interface LoaderProps {
  show: boolean;
  message?: string;
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ show, message, size }) => {
  if (!show) {
    return null;
  }

  const loaderMessage = message ?? t("loading");

  return <Box className="loader">
    <CircularProgress size={size ?? 20} />
    {loaderMessage}
  </Box>;
};
