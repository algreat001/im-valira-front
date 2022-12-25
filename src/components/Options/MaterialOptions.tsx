import React from "react";

import { Option } from "interfaces/ext";

import { OptionProps, Options } from "./Options";

export const MaterialOptions: React.FC<OptionProps> = ({ option, onSelect }) => {

  const MaterialItem = (option: Option) => <div
    style={{ backgroundColor: option?.value as string ?? "#fff" }}
    title={option.description}
  >
    {option.name}
  </div>;

  return <Options type="material" option={option} onSelect={onSelect} item={MaterialItem} />;
};

