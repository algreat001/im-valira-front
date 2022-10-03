import React from "react";
import { observer } from "mobx-react";

import { useStores } from "../../hooks/useStores";

import { Alert, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const Product = observer(() => {
  const { productRepository } = useStores();
  const navigate = useNavigate();

  const { productId } = useParams();

  if (!productId) {
    navigate("/");
    return null;
  }

  const product = productRepository.getProduct(productId);
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
