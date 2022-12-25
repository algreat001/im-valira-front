import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";

import { Button } from "@mui/material";
import { ProductProps } from "./Product";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export const ProductAddCart: React.FC<ProductProps> = observer(({ product }) => {
  const { cartStore } = useStores();

  const disabled = product.hasUndefinedOptions;

  const handlerAddToCart = () => {
    cartStore.add(product);
    product.resetAmount();
  };

  return <Button
    className="product__add-cart-button"
    disabled={disabled}
    variant="contained"
    size="large"
    startIcon={<ShoppingCartIcon />}
    onClick={handlerAddToCart}
  >
    {t("cart.addButton")}
  </Button>;
});
