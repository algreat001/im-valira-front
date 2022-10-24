import React from "react";
import { CharacteristicMeta } from "interfaces/ext";
import { t } from "res/i18n/i18n";

import { ProductProps } from "./Product";

interface ProductCharacteristicItemProps {
  characteristic: CharacteristicMeta;
}

const ProductCharacteristicItem: React.FC<ProductCharacteristicItemProps> = ({ characteristic }) => {
  // name и unit - в один массив, value убрать от сюда!!!
  return <>
    <div>{t(`char.name.${characteristic.name}`)}</div>
    <div>{t(`char.value.${characteristic.value}`)}</div>
    <div>{t(`chat.unit.${characteristic.unitOfMeasurement}`)}</div>
  </>;
};

const ProductCharacteristicHeader = () => {
  return <>
    <div>{t("char.name.header")}</div>
    <div>{t("char.value.header")}</div>
    <div>{t("chat.unit.header")}</div>
  </>;
};

export const ProductCharacteristics: React.FC<ProductProps> = ({ product }) => {
  const { meta } = product;
  if (!meta?.characteristics) {
    return <div>{t("product.info.missing.characteristics")}</div>;
  }
  return (
    <div className="product__characteristics">
      <ProductCharacteristicHeader />
      {meta.characteristics.map((char, index) => <ProductCharacteristicItem key={index} characteristic={char} />)}
    </div>
  );
};
