import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutInfoProps } from "stores/CheckoutStore";

import "./checkout.css";

export const CustomerInfo: React.FC<CheckoutInfoProps> = observer(({ checkout }) => {

  return <div className="checkout__customer__info">
    <div>{t("checkout.customer.name")}: {checkout.customerForm.values.name}</div>
    <div>{t("checkout.customer.email")}: {checkout.customerForm.values.email}</div>
    <div>{t("checkout.customer.phone")}: {checkout.customerForm.values.phone}</div>
  </div>;
});
