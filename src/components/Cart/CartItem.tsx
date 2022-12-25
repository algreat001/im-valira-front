import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { useNavigate } from "react-router-dom";
import { t } from "res/i18n/i18n";
import { ProductStore } from "stores/ProductStore";

import { TableFooter, TableHead, TableRow, TableCell, TextField, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import "./cart.css";

export const CartHeader = () => {
  return <div className="cart__header">
    <div className="cart__header__number">{t("cart.header.number")}</div>
    <div className="cart__header__name">{t("cart.header.name")}</div>
    <div className="cart__header__amount">{t("cart.header.amount")}</div>
    <div className="cart__header__price">{t("cart.header.price")}</div>
  </div>;
};

export interface CartFooter {
  totalPrice: string;
}

export const CartFooter: React.FC<CartFooter> = observer(({ totalPrice }) => {
  const { uiStore } = useStores();

  return <div className="cart__footer">
    <div className="cart__footer__price">
      {t("cart.footer.total")}: {totalPrice} {uiStore.currency.symbol}
    </div>
  </div>;
});

export interface CartItemProps {
  product: ProductStore;
  number: number;
  readonly?: boolean;
}

export const CartItem: React.FC<CartItemProps> = observer(({ product, number, readonly }) => {
  const { cartStore, uiStore } = useStores();
  const navigate = useNavigate();

  const name = [product.name, product.selectedOptionsToString()].filter(v => !!v).join(",");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    product.setAmount(e.currentTarget.value);
    cartStore.save();
  };

  return <div className="cart__item">
    <div className="cart__item__number">
      <div className="cart__subheader__number">{t("cart.header.number")}</div>
      {number + 1}
    </div>
    <div className="cart__item__name">
      <div className="cart__subheader__name">{t("cart.header.name")}:</div>
      {!readonly && <a className="cart__item__link" onClick={() => navigate(`/product/${product.id}`)}>{name}</a>}
      {readonly && name}
    </div>
    <div className="cart__item__amount">
      <div className="cart__subheader__amount">{t("cart.header.amount")}:</div>
      {!readonly && <>
        <TextField
          type="number"
          inputProps={{ min: 1, max: 10 }}
          value={product.amount}
          onChange={handleChangeAmount}
        />
        <IconButton onClick={() => cartStore.delete(number)}><DeleteIcon /></IconButton>
      </>
      }
      {readonly && product.amount}
    </div>
    <div className="cart__item__price">
      <div className="cart__subheader__price">{t("cart.header.price")}:</div>
      {cartStore.price(number)} {uiStore.currency.symbol}
    </div>
  </div>;
});
