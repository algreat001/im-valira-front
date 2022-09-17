import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { useStores } from "stores/useStores";

import { Alert, Skeleton } from "@mui/material";

export interface ProductProps {
  id: string;
}

export const Product = observer(({ id }: ProductProps) => {
  const { productManagerStore } = useStores();

  const product = productManagerStore.getProduct(id);
  if (!product) {
    return null;
  }
  if (product.isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }
  if (product.isError) {
    return <Alert severity="error">Error loading product</Alert>;
  }

  const meta = product.meta;

  return <div>
    <h2>{product.name}</h2>
    <div>{meta?.description}</div>
    {!!product.meta?.price && <div>productStore.meta.price</div>}
  </div>;
});
