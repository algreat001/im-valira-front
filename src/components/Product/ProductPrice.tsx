import React from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { ProductProps } from "./Product";

export const ProductPrice: React.FC<ProductProps> = observer(({ product }) => {
  const { uiStore: { currency } } = useStores();

  const price = product.calculatePrice(true) * currency.coefficient * product.amount;
  const priceWithoutActions = product.calculatePrice(false) * currency.coefficient * product.amount;
  const isActions = price !== priceWithoutActions;
  const { hasUndefinedOptions } = product;

  return <div className="product__price">
    {isActions && <div>{`${priceWithoutActions} ${currency.symbol}`}</div>}
    {t("price.title")}
    {": "}
    {hasUndefinedOptions && `${t("price.from")} `}
    {`${price} ${currency.symbol}`}
  </div>;
});
