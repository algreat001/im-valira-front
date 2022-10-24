import React, { useState, ChangeEvent } from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { ProductReviewMeta } from "interfaces/ext";
import { EditorProps } from "interfaces/product";
import { ReviewStore } from "stores/ReviewStore";
import { t } from "res/i18n/i18n";

import { Rating, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";


import { CloseButton } from "components/Bricks/CloseButton";
import SaveIcon from "@mui/icons-material/Save";

export interface ReviewEditParams {
  index?: number;
}

export const ReviewEditorDlg: React.FC<EditorProps<ReviewStore, ReviewEditParams>>
  = observer(({ store, mode, params }) => {
  const { uiStore, profileManagerStore: { viewer } } = useStores();
  const { isShowReviewEditDlg } = uiStore;

  const index = params?.index ?? null;
  const meta = store.get(index);

  const [ textReview, setTextReview ] = useState(meta?.text ?? "");
  const [ rating, setRating ] = useState(meta?.rating ?? 5);

  const fullName = meta?.author ?? viewer.fullName;

  const handleSave = () => {
    uiStore.hideReviewEditDlg();
    if (mode === "edit") {
      if (!index || !meta) {
        return;
      }
      store?.update(index, {
        text: textReview,
        author: meta.author,
        email: meta.email,
        dataUpdate: meta.dataUpdate,
        rating
      } as ProductReviewMeta);
    } else {
      store?.add({
        text: textReview,
        author: viewer.fullName,
        email: viewer.email,
        rating: rating ?? 5
      } as ProductReviewMeta);
    }
  };

  const handleCancel = () => {
    uiStore.hideReviewEditDlg();
  };

  const handleChangeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextReview(event.target.value);
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: null | number) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };

  return (
    <Dialog open={isShowReviewEditDlg} onClose={handleCancel}>
      <DialogTitle>
        {mode === "edit"
          ? t("review.title.edit")
          : t("review.title.new")}
        <CloseButton onCLose={handleCancel} />
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="email"
          type="email"
          fullWidth
          variant="outlined"
          value={fullName}
          aria-readonly={true}
        />
        <TextField
          margin="dense"
          id="email"
          type="email"
          fullWidth
          variant="outlined"
          value={textReview}
          onChange={handleChangeText}
          multiline
          rows="5"
        />
        <Rating name="half-rating" defaultValue={meta?.rating ?? 5} value={rating} onChange={handleRatingChange} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>{t("review.save")}</Button>
      </DialogActions>
    </Dialog>
  );
});
