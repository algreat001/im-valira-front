import React from "react";
import { observer } from "mobx-react";

import { useNavigate } from "react-router-dom";

import { Card } from "@mui/material";
import { PictureSlider } from "components/PictureSlider/PictureSlider";
import { ProductProps } from "components/Product/Product";
import { ProductPrice } from "components/Product/ProductPrice";

import "./search.css";


export const SearchCard: React.FC<ProductProps> = observer(({ product }) => {
  const navigate = useNavigate();
  const name = product.name;
  const description = product.meta?.description ?? "";
  const link = `/product/${product.id}`;
  const photos = product.meta?.photos;

  return <Card className="search__card" onClick={() => navigate(link)}>
    <div className="search__card__slider">
      <PictureSlider images={photos} />
    </div>
    <div className="search__card__info">
      <div className="search__card__name">
        {name}
      </div>
      <div className="search__card__description ellipsis-multiline">
        {description}
      </div>
      <div className="search__card__price">
        <ProductPrice product={product} className="search__card__price__text" />
      </div>
    </div>
  </Card>;
});
