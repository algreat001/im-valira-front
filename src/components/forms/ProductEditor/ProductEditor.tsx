import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { EditorProps } from "interfaces/product";
import { ProductStore, ProductTextField } from "stores/ProductStore";
import { CatalogStore } from "stores/CatalogStore";
import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CloseButton } from "components/Bricks/CloseButton";

import SaveIcon from "@mui/icons-material/Save";

export interface ProductEditParams {
  catalog?: CatalogStore;
}


export const ProductEditorDlg: React.FC<EditorProps<ProductStore, ProductEditParams>>
  = observer(({ store, mode, params }) => {
  const { uiStore, productRepository } = useStores();
  const [ isSaved, setSaved ] = useState(false);

  if (!store) {
    return null;
  }

  useEffect(() => {
    store.saveToCache();
  }, []);

  const handleTextChange = (e: any) => {
    store.changeTextField(e.target.id as ProductTextField, e.target.value);
  };

  const handleSave = async () => {
    setSaved(true);
    try {
      await store.save();
      if (mode === "new" && store.id !== null) {
        productRepository.addProduct(store.id, store);
        if (params?.catalog?.id) {
          if (await store.addToCatalog(params.catalog.id)) {
            productRepository.addProductToCatalog(store.id, params.catalog.id);
          }
        }
      }
    } finally {
      setSaved(false);
    }
    uiStore.hideProductEditDlg();
  };

  const handleCancel = () => {
    store.restoreFromCache();
    uiStore.hideProductEditDlg();
  };

  return <Dialog open={uiStore.isShowProductEditDlg} onClose={handleCancel}>
    <DialogTitle>
      {t(`product.edit.title.${mode}`)}
      <CloseButton onClose={handleCancel} />
    </DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        id="name"
        label={t("product.edit.name")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={store.name}
      />
      <TextField
        margin="dense"
        id="meta.description"
        label={t("product.edit.description")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={store.meta?.description}
        multiline
        rows={5}
      />
      <TextField
        margin="dense"
        id="meta"
        label={t("product.edit.meta")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={JSON.stringify(store.meta)}
        multiline
        rows={10}
      />
    </DialogContent>
    <DialogActions>
      <LoadingButton
        loading={isSaved}
        loadingPosition="start"
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={handleSave}
      >
        {t("product.edit.save")}
      </LoadingButton>
    </DialogActions>
  </Dialog>;
});
