import React from "react";
import { observer } from "mobx-react";

import { ProductStore } from "stores/ProductStore";

import { Alert, Skeleton } from "@mui/material";

import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductBuyInfo } from "./ProductBuyInfo";

import "./product.css";

export interface ProductProps {
  product: ProductStore;
}

export const Product = observer(({ product }: ProductProps) => {

  if (product.isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }
  if (product.isError) {
    return <Alert severity="error">Error loading product</Alert>;
  }


  const meta = product.meta;

  const photos = meta?.photos;
  const isContainsPhoto = !!photos && photos.length > 0;


  return <>
    <h2>{product.name}</h2>
    <div className="product__info__stack">
      {isContainsPhoto && <ProductImages images={photos} />}
      <ProductBuyInfo product={product} />
    </div>
    <ProductInfo product={product} />
  </>;
});
