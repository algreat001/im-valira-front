import React from "react";
import { Slide, useScrollTrigger } from "@mui/material";

export interface HideOnScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

export const HideOnScroll: React.FC<HideOnScrollProps> = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
