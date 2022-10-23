import React from "react";
import { observer } from "mobx-react";

import { ProductProps } from "./Product";
import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";

import { Button, Rating } from "@mui/material";
import { ReviewItem } from "components/Review/ReviewItem";
import { ReviewEditorDlg } from "../forms/ReviewEditor/ReviewEditor";

import "./product.css";

export const ProductReview: React.FC<ProductProps> = observer(({ product }) => {
  const { loginStore, uiStore } = useStores();

  const reviews = product.reviews;
  const isEmpty = !reviews || reviews.length === 0;

  const rating = product.calculateRating();

  const handleLogin = () => {
    uiStore.showLoginDlg();
  };

  const handleAddReview = () => {
    if (!reviews) {
      return;
    }
    uiStore.showReviewEditDlg({ store: reviews, mode: "new", params: {} });
  };

  return <>
    {isEmpty
      ? <div className="product__no-review">
        {t("product.info.missing.reviews")}
      </div>
      : <div className="product__review">
        <div className="product__rating">
          {t("product.overall")}<Rating name="half-rating" value={rating} readOnly />
        </div>
        {reviews?.meta?.map((review, index) => <ReviewItem
          key={index}
          reviews={reviews}
          index={index}
        />)}
      </div>}
    {loginStore.isLogined
      ? <Button variant="contained" size="large" onClick={handleAddReview}>
        {t("review.add")}
      </Button>
      : <Button variant="contained" size="large" onClick={handleLogin}>
        {t("review.login")}
      </Button>}
    {!!uiStore.reviewEdit && <ReviewEditorDlg {...uiStore.reviewEdit} />}
  </>;

});
