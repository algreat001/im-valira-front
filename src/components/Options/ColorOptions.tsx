import React from "react";

import { OptionMeta, Option } from "interfaces/ext";
import { t } from "res/i18n/i18n";

import { Options } from "./Options";

import "./options.css";

interface OptionProps {
  option: OptionMeta;
  onSelect: (select: Option) => void;
}

export const ColorOptions = ({ option, onSelect }: OptionProps) => {

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

