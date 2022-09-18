import { observer } from "mobx-react";
import { Product } from "components/Product/Product";
import { CatalogMenu } from "components/Catalog/CatalogMenu/CatalogMenu";
import { CatalogEditor } from "components/forms/CatalogEditor/CatalogEditor";
import { useStores } from "stores/useStores";

export const LandingPage = observer(() => {
  const { uiStore } = useStores();

  return <div className="landing">
    <CatalogMenu />
    {!!uiStore.catalogEdit && <CatalogEditor {...uiStore.catalogEdit} />}
    <Product id="0" />
  </div>;
});
