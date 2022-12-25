import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";
import { CartHeader, CartFooter, CartItem } from "./CartItem";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";

import "./cart.css";

export interface CartProps {
  readonly?: boolean;
}

export const Cart: React.FC<CartProps> = observer(({ readonly }) => {
  const { cartStore } = useStores();

  if (cartStore.length === 0) {
    return <div className="cart__empty">
      {t("cart.empty")}
    </div>;
  }

  return <Paper className="cart">
    <CartHeader />
    <div className='cart__content'>
      {cartStore.products.map((item, index) => <CartItem
        key={index}
        product={item}
        number={index}
        readonly={readonly}
      />)}
    </div>
    <CartFooter totalPrice={cartStore.totalPrice} />
  </Paper>;
});
