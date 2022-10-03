import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

import { EditProductsCatalogList } from "components/EditProductsCatalogList/EditProductsCatalogList";


export const SelectProducts = observer(() => {
  const { uiStore, productRepository, catalogRepository } = useStores();

  const { currentCatalogId } = uiStore;

  const handleSetProductIds = (ids: string[]) => {
    productRepository.setProductIdsToCatalog(currentCatalogId, ids);
  };

  const handleSave = () => {
    productRepository.saveProductIdsToCatalog(currentCatalogId);
    uiStore.hideSelectProductDlg();
  };

  const handleCancel = () => {
    productRepository.setProductIdsToCatalog(currentCatalogId, uiStore.cancelProductIds);
    uiStore.hideSelectProductDlg();
  };

  return <Dialog fullWidth maxWidth="md" open={uiStore.isShowSelectProductDlg} onClose={handleCancel}>
    <DialogTitle>{t('catalog.edit.selectProduct')}, {catalogRepository.getCatalog(currentCatalogId).name}</DialogTitle>
    <DialogContent dividers>
      <EditProductsCatalogList setProductIds={handleSetProductIds} />
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSave}>
        {t('catalog.edit.saveChanges')}
      </Button>
    </DialogActions>
  </Dialog>;
});
