import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { ProductStore } from "stores/ProductStore";

import { TextField, Typography } from "@mui/material";

interface ProductAmountProps {
  product: ProductStore;
}

export const ProductAmount: React.FC<ProductAmountProps> = observer(({ product }) => {

  const { amount } = product;

  return <div className="product__amount">
    <Typography color="text.secondary">
      {t("amount.title")}
    </Typography>
    <TextField type="number"
               inputProps={{ min: 1, max: 10 }}
               value={amount}
               onChange={(e) => product.setAmount(e.currentTarget.value)}
    />
  </div>;
});
