import React, { useState } from "react";

import { t } from "res/i18n/i18n";

import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "components/Bricks/TabPanel";
import { ProductProps } from "./Product";

import "./product.css";
import { ProductDescription } from "./ProductDescription";
import { ProductCharacteristics } from "./ProductCharacteristics";
import { ProductReview } from "./ProductReview";


export const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  const [ value, setValue ] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <>
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable product tabs"
    >
      <Tab label={t("product.info.tabs.description")} />
      <Tab label={t("product.info.tabs.characteristics")} />
      <Tab label={t("product.info.tabs.reviews")} />
    </Tabs>
    <TabPanel value={value} index={0}>
      <ProductDescription product={product} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <ProductCharacteristics product={product} />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <ProductReview product={product} />
    </TabPanel>
  </>;
};
