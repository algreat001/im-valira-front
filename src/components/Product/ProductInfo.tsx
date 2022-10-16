import React, { useState } from "react";
import { ProductStore } from "stores/ProductStore";

import { Box, Tab, Tabs } from "@mui/material";

import "./product.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

interface ProductDescriptionProps {
  product: ProductStore;
}

export const ProductInfo = ({ product }: ProductDescriptionProps) => {
  const [ value, setValue ] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { meta } = product;

  return <>
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable product tabs"
    >
      <Tab label="Описание" />
      <Tab label="Характеристики" />
      <Tab label="Отзывы" />
    </Tabs>
    <TabPanel value={value} index={0}>
      {meta?.description}
    </TabPanel>
    <TabPanel value={value} index={1}>
      Характеристики
    </TabPanel>
    <TabPanel value={value} index={2}>
      Отзывы
    </TabPanel>
  </>;
};
