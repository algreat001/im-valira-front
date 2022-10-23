import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";

import { Stack } from "@mui/material";

import { CatalogMenu } from "../Catalog/CatalogMenu";
import { CatalogEditor } from "components/forms/CatalogEditor/CatalogEditor";

export interface CatalogPageProps {
  children?: React.ReactNode;
}

export const CatalogPage: React.FC<CatalogPageProps> = observer(({ children }) => {
  const { uiStore } = useStores();


  return <div className="landing">
    <CatalogMenu />
    {!!uiStore.catalogEdit && <CatalogEditor {...uiStore.catalogEdit} />}
    <Stack spacing={2} className="landing__item">
      {children}
    </Stack>
  </div>;
});
