import React, { useRef, useState } from "react";

import { toRange } from "helpers/helper";

import CameraIcon from "@mui/icons-material/Camera";
import SquareIcon from "@mui/icons-material/Square";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";

interface SliderProgressProps {
  className: string;
  value: number;
  max: number;
}

const SliderProgress: React.FC<SliderProgressProps> = ({ className, value, max }) => {
  const progress: boolean[] = [];
  for (let currenPos = 0; currenPos < max; currenPos++) {
    progress.push(currenPos < value);
  }
  return <div className={className}>
    {progress.map((item, index) => <React.Fragment key={index}>
      {item ? <SquareIcon /> : <SquareOutlinedIcon />}
    </React.Fragment>)}
  </div>;
};

interface PictureSliderProps {
  images: undefined | string[];
}

export const PictureSlider: React.FC<PictureSliderProps> = ({ images }) => {
  const [ currenImage, setCurrentImage ] = useState(0);
  const [ isInfluenced, setIsInfluenced ] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return <CameraIcon />;
  }

  const image = images[currenImage];
  const progress = (currenImage + 1);

  const handleEnter = () => {
    setIsInfluenced(true);
  };
  const handleLeave = () => {
    setIsInfluenced(false);
  };

  const calcNumberOfImage = (x: number) => {
    const clientRect = sliderRef.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 1, height: 1 };
    const progress = toRange((x - clientRect.x) / clientRect.width, 0, 1);
    setCurrentImage(Math.floor(progress * images.length));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    calcNumberOfImage(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    calcNumberOfImage(e.touches.item(0).clientX);
  };

  return <div
    ref={sliderRef}
    className="picture-slider"
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
    onMouseMove={handleMouseMove}
    onTouchMove={handleTouchMove}
    onTouchStart={handleEnter}
    onTouchEnd={handleLeave}
  >
    <img className="picture-slider__image" src={image} alt="image" />
    <SliderProgress
      className={`picture-slider__progress  ${isInfluenced ? "" : "picture-slider__progress--hide"}`}
      value={progress}
      max={images.length}
    />
  </div>;

};
