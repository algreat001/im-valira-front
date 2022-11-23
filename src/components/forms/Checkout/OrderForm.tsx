import React from "react";

React.useLayoutEffect = React.useEffect;
import { renderToString } from "react-dom/server";
import { BrowserRouter } from "react-router-dom";

import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { CheckoutFormProps } from "stores/CheckoutStore";
import { useStores } from "hooks/useStores";

import { Checkbox, FormControlLabel } from "@mui/material";

import { Cart } from "components/Cart/Cart";
import { CustomerInfo } from "components/Checkout/CustomerInfo";
import { PaymentInfo } from "components/Checkout/PaymentInfo";
import { DeliveryInfo } from "components/Checkout/DeliveryIndo";

import { CheckoutFormButtons } from "./CheckoutFormButtons";

import "components/Checkout/checkout.css";


export const OrderForm: React.FC<CheckoutFormProps> = observer(({ checkout, onBack, onSubmit }) => {

  const { cartStore } = useStores();

  const handleApprove = () => {
    checkout.setOrderInfo({
      approve: !checkout.orderForm.values.approve
    });
  };
  const handleSubmit = () => {
    checkout.setOrderHtml(renderToString(<BrowserRouter>{order}</BrowserRouter>)).then(res => {
      onSubmit();
      if (!res) {
        console.log("error send order");
        return;
      }
      cartStore.clear();
    });
  };

  const handleBack = () => {
    onBack();
  };

  const order = <>
    <CustomerInfo checkout={checkout} />
    <DeliveryInfo checkout={checkout} />
    <Cart readonly />
    <PaymentInfo checkout={checkout} />
  </>;

  return <div className="checkout__customer">
    {order}
    <form className="checkout__customer__from">
      <FormControlLabel
        control={<Checkbox
          value={checkout.orderForm.values.approve}
          onChange={handleApprove}
          color={checkout.orderForm.errors.approve ? "error" : "default"}
        />}
        label={t("checkout.order.approve")}
        color={checkout.orderForm.errors.approve ? "error" : "default"}
      />
      <CheckoutFormButtons isBusy={checkout.isSendOrder} onNext={handleSubmit} onBack={handleBack} />
    </form>

  </div>;
});
