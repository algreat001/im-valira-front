import React, { useState, ChangeEvent } from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { CharacteristicMeta } from "interfaces/ext";
import { CharacteristicEditParams, EditorProps } from "interfaces/product";
import { CharacteristicStore } from "stores/CharactersticStore";
import { t } from "res/i18n/i18n";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";


import { CloseButton } from "components/Bricks/CloseButton";
import SaveIcon from "@mui/icons-material/Save";

export const CharacteristicEditorDlg: React.FC<EditorProps<CharacteristicStore, CharacteristicEditParams>>
  = observer(({ store, mode, params }) => {
  const { uiStore } = useStores();
  const { isShowCharacteristicEditDlg } = uiStore;

  const meta = store.get(params?.name ?? null);
  const allCharacteristics = store.getAllCharacteristics();

  const [ name, setName ] = useState(meta?.name ?? "");
  const [ value, setValue ] = useState(meta?.value ?? "");

  const unit = !!name ? t(`char.${name}.unit`) : "-";

  const handleSave = () => {
    uiStore.hideCharacteristicEditDlg();
    if (mode === "edit") {
      if (!name || !meta || !params?.name) {
        return;
      }
      store?.update(params.name, {
        name,
        value,
        unitOfMeasurement: unit
      } as CharacteristicMeta);
    } else {
      store?.add({
        name,
        value,
        unitOfMeasurement: unit
      } as CharacteristicMeta);
    }
  };

  const handleCancel = () => {
    uiStore.hideCharacteristicEditDlg();
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <Dialog open={isShowCharacteristicEditDlg} onClose={handleCancel}>
      <DialogTitle>
        {mode === "edit"
          ? t("review.title.edit")
          : t("review.title.new")}
        <CloseButton onClose={handleCancel} />
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <InputLabel id="char-name-select-label">{t((`char.header.name`))}</InputLabel>
          <Select
            labelId="char-name-select-label"
            value={name}
            label={t((`char.header.name`))}
            onChange={(event) => setName(event.target.value as string)}
          >
            {allCharacteristics.map(charName => <MenuItem key={charName} value={charName}>
              {t((`char.${charName}.name`))}
            </MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="value"
          type="text"
          fullWidth
          variant="outlined"
          value={value}
          onChange={handleChangeValue}
          multiline
          rows="5"
        />
        <TextField
          margin="dense"
          id="unit"
          type="text"
          fullWidth
          variant="outlined"
          value={unit}
          aria-readonly
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>{t("review.save")}</Button>
      </DialogActions>
    </Dialog>
  );
});
