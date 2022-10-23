import React from "react";
import { observer } from "mobx-react";

import { dateToString } from "helpers/helper";

import { Paper, Rating, Typography } from "@mui/material";

import { ReviewStore } from "stores/ReviewStore";
import { ReviewEditorToolbar } from "./ReviewEditorToolbar";

export interface ReviewItemProps {
  reviews: ReviewStore;
  index: number;
}

export const ReviewItem: React.FC<ReviewItemProps> = observer(({ reviews, index }) => {
  const meta = reviews.get(index);

  if (!meta) {
    return null;
  }

  return <Paper className="product__review__item">
    {meta.rating && <Rating value={meta.rating} readOnly />}
    <Typography variant="body1">
      {meta.text}
    </Typography>
    <div className="product__review__item__footer">
      <Typography variant="body2" align="right">
        {`${meta.author}, ${dateToString(meta?.dataUpdate ?? new Date())}`}
      </Typography>
      <ReviewEditorToolbar reviews={reviews} index={index} />
    </div>
  </Paper>;
});
