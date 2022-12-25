import { observer } from "mobx-react";
import React from "react";

import "./product.css";
import { ProductAmount } from "./ProductAmount";
import { ProductOptions } from "./ProductOptions";
import { ProductPrice } from "./ProductPrice";
import { ProductAddCart } from "./ProductAddCart";
import { ProductProps } from "./Product";


export const ProductBuyInfo: React.FC<ProductProps> = observer(({ product }) => {
  return <div className="product__info__buy">
    <ProductOptions product={product} />
    <ProductAmount product={product} />
    <ProductPrice product={product} />
    <ProductAddCart product={product} />
  </div>;
});
