import React, { useState } from "react";
import { ImageCarousel } from "components/Bricks/ImageCarousel";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageZoom from "react-image-zooom";

import "./product.css";

export interface ProductImagesProps {
  images: string[];
}

export const ProductImages = ({ images }: ProductImagesProps) => {
  const [ active, setActive ] = useState<number>(0);

  const handleActivateImage = (index: number) => {
    setActive(index);
  };

  return <div className="product__images">
    {images.map((image, index) => {
      let style = "product__images__img";
      if (index !== active) {
        style = "product__images__img--none";
      }
      return <ImageZoom className={style} alt="big_image" src={image} key={image} />;
    })}
    <ImageCarousel className="product__carousel" images={images} setActive={handleActivateImage} />
  </div>;
};
