import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";

import { Button } from "@mui/material";
import { ProductProps } from "./Product";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const ProductAddCart: React.FC<ProductProps> = observer(({ product }) => {

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
