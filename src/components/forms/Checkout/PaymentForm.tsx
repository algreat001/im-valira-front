import React, { useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutFormProps, PaymentType } from "stores/CheckoutStore";

import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { CheckoutFormButtons } from "./CheckoutFormButtons";

import "components/Checkout/checkout.css";

export const PaymentForm: React.FC<CheckoutFormProps> = observer(({ checkout, onBack, onSubmit }) => {

  const [ paymentType, setPaymentType ] = useState<PaymentType>("20/80");

  const handleSubmit = () => {
    checkout.setPaymentInfo({
      typePayment: paymentType
    });
    onSubmit();
  };

  const handleBack = () => {
    onBack();
  };

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setPaymentType(value as PaymentType);
  };


  return <>
    <form className="checkout__customer">
      <FormLabel id="demo-radio-buttons-group-label">{t("checkout.payment.type")}</FormLabel>
      <RadioGroup
        onChange={handleChangePayment}
        aria-labelledby="payment-radio-buttons-group-label"
        value={paymentType}
        name="radio-buttons-group"
      >
        <FormControlLabel value="20/80" control={<Radio />} label={t("checkout.payment.20/80")} />
      </RadioGroup>
      <CheckoutFormButtons onNext={handleSubmit} onBack={handleBack} />
    </form>

  </>;
});
