import React from "react";
import { observer } from "mobx-react";

import { useNavigate } from "react-router-dom";
import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { Cart } from "components/Cart/Cart";
import { Button, Toolbar } from "@mui/material";

import "components/Cart/cart.css";

export const CartPage = observer(() => {
  const { cartStore } = useStores();
  const navigate = useNavigate();

  const handleDeleteAllFromCart = () => {
    cartStore.clear();
  };

  return <div className="cart__page">
    <Cart />
    <Toolbar className="cart__toolbar">
      <Button variant="contained" onClick={() => navigate(cartStore.exitLink)}>
        {t("cart.continue")}
      </Button>
      <Button
        variant="contained"
        disabled={!cartStore.isContainedProducts}
        onClick={handleDeleteAllFromCart}
      >
        {t("cart.clear")}
      </Button>
      <Button
        variant="contained"
        disabled={!cartStore.isContainedProducts}
        onClick={() => navigate("/checkout")}
      >
        {t("cart.checkout")}
      </Button>
    </Toolbar>
  </div>;
});
