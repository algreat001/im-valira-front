import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface ScrollableDialogProps {
  closeText: string;
  onClose: () => void;
  articleTitle: string;
  articleText: string;
  open: boolean;
}

export const ScrollableDialog: React.FC<ScrollableDialogProps> = ({
  onClose,
  closeText,
  articleTitle,
  articleText,
  open
}) => {
  const descriptionElementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const { current } = descriptionElementRef;
    if (current !== null) {
      current.focus();
    }
  }, [ open ]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{articleTitle}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          <div dangerouslySetInnerHTML={{ __html: articleText }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {closeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
