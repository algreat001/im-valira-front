import * as React from "react";
import { Typography } from "@mui/material";

import { t } from "res/i18n/i18n";

export const LogoBar = () => {
  return (
    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
      {t("title")}
    </Typography>
  );
};
