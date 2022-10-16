import { useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { useStores } from "../../hooks/useStores";
import { ProductStore } from "stores/ProductStore";

import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Rating, Typography } from "@mui/material";
import { PictureSlider } from "components/PictureSlider/PictureSlider";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

import "./product.css";

interface ProductCardBodyProps {
  product: ProductStore;
}

const ProductCardBody = observer(({ product }: ProductCardBodyProps) => {

  return <>
    <CardMedia component="div" className="product__card__image">
      <PictureSlider images={product.meta?.photos} />
    </CardMedia>
    <CardContent className="product__card__content">

      <Typography
        className="product__card__header ellipsis"
        variant="h3"
        color="text.primary"
      >
        {product.name}
      </Typography>
      <Typography
        className="product__card__price"
        variant="h4"
        color="text.primary"
      >
        {product.meta?.price} ₽
      </Typography>
      <Typography
        className="product__card__description ellipsis-multiline hyphens"
        variant="body1"
        color="text.secondary"
      >
        {product.meta?.description}
      </Typography>
      <Rating className="product__card__rating" defaultValue={product.meta?.rating} size="small" readOnly />
    </CardContent>
    <CardActions className="product__card__action">
      <Button variant="contained" size="medium" startIcon={<AddShoppingCartIcon />}>{t("cart.add")}</Button>
    </CardActions>
  </>;
});

const ProductCardLoader = () => {
  return <CardContent><CircularProgress disableShrink /></CardContent>;
};


export interface ProductCardProps {
  productId: string;
}

export const ProductCard = observer(({ productId }: ProductCardProps) => {
  const { productRepository } = useStores();
  const [ isHover, setIsHover ] = useState(false);
  const navigate = useNavigate();

  const product = productRepository.getProduct(productId);
  const { isLoading } = product;

  return <Card
    elevation={isHover ? 3 : 1}
    className="product__card"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    onClick={() => navigate(`/product/${productId}`)}
  >
    {isLoading ? <ProductCardLoader /> : <ProductCardBody product={product} />}
  </Card>;
});
