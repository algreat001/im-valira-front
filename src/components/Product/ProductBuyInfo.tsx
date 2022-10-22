import { observer } from "mobx-react";
import React from "react";
import { ProductStore } from "stores/ProductStore";

import "./product.css";
import { ProductAmount } from "./ProductAmount";
import { ProductOptions } from "./ProductOptions";
import { ProductPrice } from "./ProductPrice";
import { ProductAddCart } from "./ProductAddCart";

interface ProductBuyInfoProps {
  product: ProductStore;
}

export const ProductBuyInfo: React.FC<ProductBuyInfoProps> = observer(({ product }) => {
  return <div className="product__info__buy">
    <ProductOptions product={product} />
    <ProductAmount product={product} />
    <ProductPrice product={product} />
    <ProductAddCart product={product} />
  </div>;
});
