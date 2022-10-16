import React from "react";

import { OptionMeta, Option } from "interfaces/ext";

import { Options } from "./Options";

interface OptionProps {
  option: OptionMeta;
  onSelect: (select: Option) => void;
}

export const MaterialOptions = ({ option, onSelect }: OptionProps) => {

  const MaterialItem = (option: Option) => <div
    style={{ backgroundColor: option?.value as string ?? "#fff" }}
    title={option.description}
  >
    {option.name}
  </div>;

  return <Options type="material" option={option} onSelect={onSelect} item={MaterialItem} />;
};

