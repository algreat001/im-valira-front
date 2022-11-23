import React from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";

import { TextField, Typography } from "@mui/material";
import { ProductProps } from "./Product";

interface ProductAmountProps extends ProductProps {
  onChange?: () => void;
}

export const ProductAmount: React.FC<ProductAmountProps> = observer(({ product, onChange }) => {

  const { amount } = product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    product.setAmount(e.currentTarget.value);
    if (onChange) {
      onChange();
    }
  };

  return <div className="product__amount">
    <Typography color="text.secondary">
      {t("amount.title")}
    </Typography>
    <TextField type="number"
               inputProps={{ min: 1, max: 10 }}
               value={amount}
               onChange={handleChange}
    />
  </div>;
});
