import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/useStores";

import { Skeleton, Stack, Typography } from "@mui/material";
import { CatalogEditorToolbar } from "../Catalog/CatalogEditorToolbar";
import { CatalogStore } from "stores/CatalogStore";
import { ProductCard } from "./ProductCard";

import "./product.css";

interface ProductItem {
  product: React.ReactNode;
  id: string;
}

interface LineWrapperProps {
  items: ProductItem[];
  isLoading?: boolean;
}

const ProductLoading = () => {
  return <>
    <Skeleton variant="rectangular" className="product__card" />
    <Skeleton variant="rectangular" className="product__card" />
    <Skeleton variant="rectangular" className="product__card" />
  </>;
};

const ProductLineWrapper: React.FC<LineWrapperProps> = ({ items, isLoading }) => (
  <Stack overflow="auto" direction="row" spacing={2} className={"landing__item__line"}>
    {isLoading && <ProductLoading />}
    {items.map(item => <React.Fragment key={item.id}>{item.product}</React.Fragment>)}
  </Stack>
);

const ProductGridWrapper: React.FC<LineWrapperProps> = ({ items, isLoading }: LineWrapperProps) => (
  <div className={"landing__item__wrap"}>
    {isLoading && <ProductLoading />}
    {items.map(item => <div key={item.id}>{item.product}</div>)}
  </div>
);


export interface ProductCardHolderProps {
  catalog: CatalogStore;
  title: null | string;
  type: "line" | "wrap";
}


export const ProductCardHolder: React.FC<ProductCardHolderProps> = observer(({
                                                                               catalog,
                                                                               title,
                                                                               type
                                                                             }: ProductCardHolderProps) => {
  const { productRepository, profileManagerStore } = useStores();
  const isEditor = profileManagerStore.viewer.hasRole("editor");

  const productIds = productRepository.getProductIdsForCatalog(catalog.id ?? "0");

  const isLoading = productIds.length === 0;

  const isLine = type === "line";
  const isWrap = type === "wrap";

  const items = productIds.map(id => ({ id: title + id, product: <ProductCard productId={id} /> }));

  return <>
    <Typography variant="h2">{isEditor && <CatalogEditorToolbar catalog={catalog} />}{title}</Typography>
    {isLine && <ProductLineWrapper items={items} isLoading={isLoading} />}
    {isWrap && <ProductGridWrapper items={items} isLoading={isLoading} />}
  </>;
});
