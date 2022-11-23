import React, { useRef } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutFormProps } from "stores/CheckoutStore";

import { TextField } from "@mui/material";
import { CheckoutFormButtons } from "./CheckoutFormButtons";

import "components/Checkout/checkout.css";


export const DeliveryForm: React.FC<CheckoutFormProps> = observer(({ checkout, onBack, onSubmit }) => {

  const refAddr = useRef<any>();

  const handleSubmit = () => {
    checkout.setDeliveryInfo({
      address: refAddr?.current.value
    });
    onSubmit();
  };

  const handleBack = () => {
    onBack();
  };


  return <>
    <form className="checkout__customer">
      <TextField
        rows={5}
        multiline
        inputRef={refAddr}
        label={t("checkout.delivery.address")}
        variant="outlined"
        defaultValue={checkout.deliveryForm.values.address}
        error={checkout.deliveryForm.errors.address}
      />
      <CheckoutFormButtons onNext={handleSubmit} onBack={handleBack} />
    </form>

  </>;
});
