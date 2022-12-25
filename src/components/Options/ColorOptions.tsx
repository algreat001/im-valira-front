import React from "react";

import { Option } from "interfaces/ext";
import { t } from "res/i18n/i18n";

import { OptionProps, Options } from "./Options";

import "./options.css";

export const ColorOptions: React.FC<OptionProps> = ({ option, onSelect }) => {

  const ColorItem = (option: Option) => <div
    className="options__item__color"
    style={{ backgroundColor: option?.value as string ?? "#fff" }}
    title={option.description}
  >
    <div className="options__item__color__text">
      {t(`option.color.${option.name}`)}
    </div>
  </div>;

  return <Options type="color" option={option} onSelect={onSelect} item={ColorItem} />;
};

