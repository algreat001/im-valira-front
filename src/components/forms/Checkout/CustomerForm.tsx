import React, { useRef } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutFormProps } from "stores/CheckoutStore";

import { TextField } from "@mui/material";
import { CheckoutFormButtons } from "./CheckoutFormButtons";

import "components/Checkout/checkout.css";


export const CustomerForm: React.FC<CheckoutFormProps> = observer(({ checkout, onBack, onSubmit }) => {

  const refName = useRef<any>();
  const refEmail = useRef<any>();
  const refPhone = useRef<any>();

  const handleSubmit = () => {
    checkout.setCustomerInfo({
      email: refEmail?.current.value,
      name: refName?.current.value,
      phone: refPhone?.current.value
    });
    onSubmit();
  };

  const handleBack = () => {
    onBack();
  };


  return <>
    <form className="checkout__customer">
      <TextField
        inputRef={refName}
        label={t("checkout.customer.name")}
        variant="outlined"
        defaultValue={checkout.customerForm.values.name}
        error={checkout.customerForm.errors.name}
      />
      <TextField
        inputRef={refEmail}
        label={t("checkout.customer.email")}
        variant="outlined"
        defaultValue={checkout.customerForm.values.email}
        error={checkout.customerForm.errors.email}
      />
      <TextField
        inputRef={refPhone}
        label={t("checkout.customer.phone")}
        variant="outlined"
        defaultValue={checkout.customerForm.values.phone}
        error={checkout.customerForm.errors.phone}
      />
      <CheckoutFormButtons onNext={handleSubmit} onBack={handleBack} disableBack />
    </form>

  </>;
});
