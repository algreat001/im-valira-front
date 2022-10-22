import React from "react";

import { Option } from "interfaces/ext";

import { OptionProps, Options } from "./Options";

export const SizeOptions: React.FC<OptionProps> = ({ option, onSelect }) => {

  const SizeItem = (option: Option) => <div
    style={{ backgroundColor: option?.value as string ?? "#fff" }}
    title={option.description}
  >
    {option.name}
  </div>;

  return <Options type="size" option={option} onSelect={onSelect} item={SizeItem} />;
};

