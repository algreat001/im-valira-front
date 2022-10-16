import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";

import { CatalogPage } from "components/CatalogPage/CatalogPage";
import { Product } from "components/Product/Product";

export const ProductPage = observer(() => {
  const { productRepository } = useStores();
  const navigate = useNavigate();
  const { productId } = useParams();

  if (!productId) {
    navigate("/");
    return null;
  }

  const product = productRepository.getProduct(productId);
  if (!product) {
    navigate("/");
    return null;
  }

  return <CatalogPage>
    <Product product={product} />
  </CatalogPage>;
});
