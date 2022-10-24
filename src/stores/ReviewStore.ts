import { makeAutoObservable, runInAction } from "mobx";

import { ProductReviewMeta } from "interfaces/ext";
import { addReview, deleteReview, updateReview } from "services/api";

import { ProductStore } from "./ProductStore";

export class ReviewStore {
  meta: null | ProductReviewMeta[] = null;

  product: null | ProductStore = null;

  constructor(product: ProductStore) {
    makeAutoObservable(this);
    this.product = product;
    if (product.meta?.reviews) {
      this.meta = product.meta.reviews;
    } else {
      this.meta = [];
      product.initReviews(this.meta);
    }
  }

  get(index: null | number): null | ProductReviewMeta {
    if (index === null || !this.meta || this.meta.length < index) {
      return null;
    }
    return this.meta[index];
  }

  get length(): number {
    return this.meta?.length ?? 0;
  }

  async add(review: ProductReviewMeta): Promise<void> {
    if (!this.product?.id) {
      return;
    }

    const savedMeta = await addReview(this.product.id, review);
    if (!savedMeta) {
      return;
    }
    runInAction(() => {
      if (!this.meta) {
        this.meta = [ savedMeta ];
      } else {
        this.meta.push(savedMeta);
      }
    });
  }

  async update(index: number, review: ProductReviewMeta): Promise<void> {
    if (!this.product?.id) {
      return;
    }
    if (!this.meta || !this.meta[index] || !review) {
      return;
    }
    const resultUpdate = await updateReview(this.product.id, review);
    if (resultUpdate) {
      this.meta[index] = resultUpdate;
    }
  }

  async delete(index: number): Promise<void> {
    if (!this.product?.id) {
      return;
    }
    if (!this.meta || !this.meta[index]) {
      return;
    }
    const deleteSuccess = await deleteReview(this.product.id, this.meta[index]);
    if (deleteSuccess) {
      runInAction(() => {
        if (!this.meta) {
          return;
        }
        this.meta = this.meta.filter((item, _index) => index !== _index);
      });
    }

  }

}
