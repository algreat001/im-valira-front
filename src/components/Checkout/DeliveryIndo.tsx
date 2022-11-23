import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutInfoProps } from "stores/CheckoutStore";

import "./checkout.css";


export const DeliveryInfo: React.FC<CheckoutInfoProps> = observer(({ checkout }) => {

  return <>
    {t("checkout.delivery.address")}: {checkout.deliveryForm.values.address}
  </>;
});
