import React from "react";
import { observer } from "mobx-react";

import { Stack } from "@mui/material";

import { CatalogMenu } from "components/Catalog/CatalogMenu";

export interface CatalogPageProps {
  children?: React.ReactNode;
}

export const CatalogPage: React.FC<CatalogPageProps> = observer(({ children }) => {
  return <div className="landing">
    <CatalogMenu />
    <Stack spacing={2} className="landing__item">
      {children}
    </Stack>
  </div>;
});
