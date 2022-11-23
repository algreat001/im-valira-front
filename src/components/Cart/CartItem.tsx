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
  return <TableHead className="cart__header">
    <TableRow>
      <TableCell align="center" className="cart__header__number">{t("cart.header.number")}</TableCell>
      <TableCell align="center" className="cart__header__name">{t("cart.header.name")}</TableCell>
      <TableCell align="center" className="cart__header__amount">{t("cart.header.amount")}</TableCell>
      <TableCell align="center" className="cart__header__price">{t("cart.header.price")}</TableCell>
    </TableRow>
  </TableHead>;
};

export interface CartFooter {
  totalPrice: string;
}

export const CartFooter: React.FC<CartFooter> = observer(({ totalPrice }) => {
  const { uiStore } = useStores();

  return <TableFooter className="cart__footer">
    <TableRow>
      <TableCell
        align="right"
        colSpan={4}
        className="cart__footer__price"
      >
        {t("cart.footer.total")}: {totalPrice} {uiStore.currency.symbol}
      </TableCell>
    </TableRow>
  </TableFooter>;
});

export interface CartItemProps {
  product: ProductStore;
  number: number;
  readonly?: boolean;
}

export const CartItem: React.FC<CartItemProps> = observer(({ product, number, readonly }) => {
  const { cartStore, uiStore } = useStores();
  const navigate = useNavigate();

  const name = [ product.name, product.selectedOptionsToString() ].filter(v => !!v).join(",");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    product.setAmount(e.currentTarget.value);
    cartStore.save();
  };

  return <TableRow className="cart__item">
    <TableCell align="center">{number + 1}</TableCell>
    <TableCell>
      {!readonly && <a className="cart__item__link" onClick={() => navigate(`/product/${product.id}`)}>{name}</a>}
      {readonly && name}
    </TableCell>
    <TableCell align="center">
      <div className="cart__item__amount">
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
    </TableCell>
    <TableCell align="right">{cartStore.price(number)} {uiStore.currency.symbol}</TableCell>
  </TableRow>;
});
