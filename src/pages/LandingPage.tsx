import { observer } from "mobx-react";

import { useStores } from "../hooks/useStores";
import { useParams } from "react-router-dom";
import { t } from "res/i18n/i18n";

import { Stack } from "@mui/material";

import { CatalogMenu } from "components/Catalog/CatalogMenu/CatalogMenu";
import { CatalogEditor } from "components/forms/CatalogEditor/CatalogEditor";
import { ProductCardHolder } from "components/Product/ProductCardHolder";

export const LandingPage = observer(() => {
  const { uiStore, catalogRepository } = useStores();

  const { catalogId } = useParams();

  if (catalogId) {
    uiStore.setCurrentCatalogId(catalogId);
  }

  const currentCatalog = catalogRepository.getCatalog(uiStore.currentCatalogId);
  const recommended = catalogRepository.getRecommended();
  const favorites = catalogRepository.getFavorites();

  const isCatalogSelected = Boolean(uiStore.currentCatalogId);

  return <div className="landing">
    <CatalogMenu />
    {!!uiStore.catalogEdit && <CatalogEditor {...uiStore.catalogEdit} />}
    <Stack spacing={2} className="landing__item">
      {isCatalogSelected && <ProductCardHolder
        catalog={currentCatalog}
        title={currentCatalog?.name ?? ""}
        type="wrap"
      />}

      <ProductCardHolder
        catalog={recommended}
        title={t("landing.recommended")}
        type="line"
      />

      <ProductCardHolder
        catalog={favorites}
        title={t("landing.favorites")}
        type="line"
      />

      {/*<Product id="0" />*/}
    </Stack>
  </div>;
});
