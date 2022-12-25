import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";

import { SelectProducts } from "components/Admins/SelectProducts";
import { ProductEditorDlg } from "components/forms/ProductEditor/ProductEditor";
import { ReviewEditorDlg } from "components/forms/ReviewEditor/ReviewEditor";
import { CatalogEditor } from "components/forms/CatalogEditor/CatalogEditor";
import { CharacteristicEditorDlg } from "components/forms/CharacteristicEditor/CharacteristicEditor";

export const EditDialogs = observer(() => {
  const { uiStore } = useStores();

  return <>
    <SelectProducts />
    {!!uiStore.productEdit && <ProductEditorDlg {...uiStore.productEdit} />}
    {!!uiStore.reviewEdit && <ReviewEditorDlg {...uiStore.reviewEdit} />}
    {!!uiStore.catalogEdit && <CatalogEditor {...uiStore.catalogEdit} />}
    {!!uiStore.characteristicEdit && <CharacteristicEditorDlg {...uiStore.characteristicEdit} />}
  </>;
});
