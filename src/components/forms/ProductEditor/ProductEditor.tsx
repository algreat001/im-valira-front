import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { EditorProps } from "interfaces/product";
import { CatalogTextField } from "stores/CatalogStore";
import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import { CloseButton } from "components/Bricks/CloseButton";

import SaveIcon from "@mui/icons-material/Save";

export const ProductEditor = observer(({ catalog, mode }: EditorProps) => {
  const { uiStore } = useStores();

  if (!catalog) {
    return null;
  }

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
