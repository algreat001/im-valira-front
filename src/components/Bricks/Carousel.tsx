import React, { useEffect, useState } from "react";
import cx from "classnames";
import {
  animate,
  AnimationOptions,
  motion,
  PanInfo,
  useMotionValue
} from "framer-motion";

import { IconButton } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./carousel.css";


const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0
};

export interface ArrowProps {
  onClick: () => void;
  left?: boolean;
}

const Arrow = ({ left = false, onClick }: ArrowProps) => (
  <IconButton
    onClick={onClick}
    className={cx("carousel__arrow", { "carousel__arrow--left": left })}
  >
    {left ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
  </IconButton>
);

export interface DotProps {
  length: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Dots = ({ length, activeIndex, setActiveIndex }: DotProps) => {
  return (
    <div className="carousel__dot__wrap">
      {new Array(length).fill("").map((_, i) => (
        <span
          className={cx("carousel__dot__item", { "carousel__dot__item--active": activeIndex === i })}
          onClick={() => setActiveIndex(i)}
          key={i}
        />
      ))}
    </div>
  );
};

export interface CarouselProps {
  children: React.ReactNode;
  numberPerSlide?: number;
  autoPlay?: boolean;
  interval?: number;
  setActive?: (index: number) => void;
  loop?: boolean;
}

export const Carousel = ({
                           children,
                           numberPerSlide = 4,
                           autoPlay = true,
                           interval = 2000,
                           loop = true,
                           setActive
                         }: CarouselProps) => {

  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [ index, setIndex ] = useState(0);
  const [ currentItem, setCurrentItem ] = useState(0);
  const [ clientWidth, setClientWidth ] = useState(0);

  useEffect(() => {
    setClientWidth(containerRef.current?.clientWidth || 0);
  }, [ containerRef.current?.clientWidth ]);

  const items = React.Children.toArray(children);

  const width = (clientWidth / numberPerSlide) - 12;
  const length = items.length - numberPerSlide + 1;

  const calculateNewX = () => -index * (width + 12);

  const toRange = (inx: number, loop: boolean): number => {
    if (!loop) {
      return inx >= length ? length - 1 : (inx < 0 ? 0 : inx);
    } else {
      return inx >= length ? 0 : (inx < 0 ? length - 1 : inx);
    }
  };

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const { offset } = dragProps;

    const inx = index - Math.round(offset.x / width);
    const newIndex = toRange(inx, false);
    if (newIndex !== index) {
      setIndex(newIndex);
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  const handleNext = () => {
    setIndex(toRange(index + 1, loop));
  };

  const handlePrev = () => {
    setIndex(toRange(index - 1, loop));
  };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [ index ]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [ handleNext, interval ]);

  useEffect(() => {
    if (setActive) {
      setActive(currentItem);
    }
  }, [ currentItem ]);

  return (
    <div ref={containerRef} className="carousel__container">
      <motion.div
        style={{ x }}
        drag="x"
        dragElastic={0.3}
        onDragEnd={handleEndDrag}
        className="carousel__line"
      >
        {items.map((item, i) => <div
          key={i}
          onClick={() => setCurrentItem(i)}
          className={cx("carousel__slide", { "carousel__slide--active": currentItem === i })}
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {item}
        </div>)}
      </motion.div>

      <Arrow left onClick={handlePrev} />
      <Arrow onClick={handleNext} />
      <Dots length={length} setActiveIndex={setIndex} activeIndex={index} />

    </div>
  );
};
