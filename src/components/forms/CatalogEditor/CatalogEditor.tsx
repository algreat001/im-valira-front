import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";

import { CatalogStore, CatalogTextField } from "stores/CatalogStore";

import { useStores } from "stores/useStores";
import { t } from "res/i18n/i18n";

import { CloseButton } from "components/Bricks/CloseButton";

import SaveIcon from "@mui/icons-material/Save";


export interface CatalogEditorProps {
  catalog: CatalogStore;
  mode: "new" | "edit";
}

export const CatalogEditor = observer(({ catalog, mode }: CatalogEditorProps) => {
  const { uiStore } = useStores();

  useEffect(() => {
    catalog.saveToCache();
  }, []);

  const handleTextChange = (e: any) => {
    catalog.changeTextField(e.target.id as CatalogTextField, e.target.value);
  };

  const handleSave = async () => {
    await catalog.save();
    uiStore.hideCatalogEditDlg();
  };

  const handleCancel = () => {
    catalog.restoreFromCache();
    uiStore.hideCatalogEditDlg();
  };

  return <Dialog open={uiStore.isShowCatalogEditDlg} onClose={handleCancel}>
    <DialogTitle>
      {t(`catalog.edit.title.${mode}`)}
      <CloseButton onCLose={handleCancel} />
    </DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        id="name"
        label={t("catalog.edit.name")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={catalog.name}
      />
      <TextField
        margin="dense"
        id="description"
        label={t("catalog.edit.description")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={catalog.description}
        multiline
        rows={4}
      />
      <TextField
        margin="dense"
        id="lastName"
        label={t("catalog.edit.meta")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={JSON.stringify(catalog.meta)}
        multiline
        rows={4}
      />
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>{t("catalog.edit.save")}</Button>
    </DialogActions>
  </Dialog>;
});
