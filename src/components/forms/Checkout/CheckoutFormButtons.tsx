import React from "react";

import { t } from "res/i18n/i18n";

import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import SendIcon from "@mui/icons-material/Send";

export interface CheckoutFormButtonsProps {
  onNext: () => void;
  disableNext?: boolean;
  onBack: () => void;
  disableBack?: boolean;
  isBusy?: boolean;
}

export const CheckoutFormButtons: React.FC<CheckoutFormButtonsProps> = ({
  isBusy,
  onBack,
  onNext,
  disableNext,
  disableBack
}) => {

  const isLoading = isBusy ?? false;
  const icon = isBusy === undefined ? null : <SendIcon />;

  return <Box sx={{ mb: 2 }}>
    <div>
      <LoadingButton
        loading={isLoading}
        loadingPosition="end"
        endIcon={icon}
        variant="contained"
        disabled={disableNext ?? false}
        onClick={onNext}
        sx={{ mt: 1, mr: 1 }}
      >
        {t("checkout.next")}
      </LoadingButton>
      <Button
        disabled={disableBack ?? false}
        onClick={onBack}
        sx={{ mt: 1, mr: 1 }}
      >
        {t("checkout.back")}
      </Button>
    </div>
  </Box>;
};
