import React from "react";
import { observer } from "mobx-react";

import { Option, OptionType } from "interfaces/ext";

import { ProductStore } from "stores/ProductStore";

import { ColorOptions } from "components/Options/ColorOptions";
import { SizeOptions } from "components/Options/SizeOptions";
import { MaterialOptions } from "components/Options/MaterialOptions";

interface ProductOptionsProps {
  product: ProductStore;
}

export const ProductOptions = observer(({ product }: ProductOptionsProps) => {

  const { meta } = product;
  const options = meta?.options;

  if (!options) {
    return null;
  }

  const handleSelect = (type: OptionType) => (option: Option) => {
    product.setOptions(type, option);
  };

  return <div className="product__options">{options.map(option => {
    switch (option.type) {
      case "color":
        return <ColorOptions key={option.type} option={option} onSelect={handleSelect("color")} />;
      case "size":
        return <SizeOptions key={option.type} option={option} onSelect={handleSelect("size")} />;
      case "material":
        return <MaterialOptions key={option.type} option={option} onSelect={handleSelect("material")} />;
    }
  })}</div>;
});
