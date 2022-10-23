import React from "react";
import { ProductProps } from "./Product";
import { t } from "../../res/i18n/i18n";

export const ProductDescription: React.FC<ProductProps> = ({ product }) => {
  const { meta } = product;
  if (!meta?.description) {
    return <div>{t("product.info.missing.description")}</div>;
  }
  return <div>{meta.description}</div>;
};
