import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { ProductStore } from "stores/ProductStore";

import { Button } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ProductAmountProps {
  product: ProductStore;
}

export const ProductAddCart = observer(({ product }: ProductAmountProps) => {

  const disabled = product.hasUndefinedOptions;

  return <Button
    className="product__add-cart-button"
    disabled={disabled}
    variant="contained"
    size="large"
    startIcon={<ShoppingCartIcon />}
  >
    {t("cart.addButton")}
  </Button>;
});
