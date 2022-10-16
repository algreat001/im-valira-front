import React from "react";
import { Carousel } from "components/Bricks/Carousel";

export interface ImageCarouselProps {
  images: string[];
  className?: string;
  setActive?: (index: number) => void;
}

export const ImageCarousel = ({ images, className, setActive }: ImageCarouselProps) => {

  const handleActivate = (index: number) => {
    if (setActive) {
      setActive(index);
    }
  }

  return <div className={className}>
    <Carousel autoPlay={false} interval={4000} loop setActive={handleActivate}>
      {images.map((item, i) => (
        <img
          draggable="false"
          src={item}
          key={i}
          alt=""
        />
      ))}
    </Carousel>
  </div>;
};
