import React, { useState } from "react";
import cx from "classnames";

import { OptionMeta, Option, OptionType } from "interfaces/ext";
import { t } from "res/i18n/i18n";

import { Card, CardContent, Typography } from "@mui/material";

import "./options.css";

export interface OptionProps {
  option: OptionMeta;
  onSelect: (select: Option) => void;
}

export interface OptionsProps {
  option: OptionMeta;
  type: OptionType;
  item: (option: Option) => React.ReactNode;
  onSelect: (option: Option) => void;
}

export const Options: React.FC<OptionsProps> = ({ option, type, item, onSelect }) => {
  const [ select, setSelect ] = useState<null | number>(null);

  if (option.type !== type) {
    return null;
  }

  const handleSelect = (index: number) => {
    onSelect(option.options[index]);
    setSelect(index);
  };

  const selected = select !== null
    ? (t("option." + option.type + "." + option.options[select].name) || option.options[select].name)
    : undefined;

  return <Card className="options" variant="outlined">
    <CardContent>
      <div className="options__params">
        <Typography color="text.secondary">
          {t(`option.${option.type}.type`)}
        </Typography>
        {!!selected && <Typography color="text.secondary">{`: ${selected}`}</Typography>}
      </div>
      <div className="options__wrapper">
        {option.options.map((option, index) => <div
            key={index}
            className={cx("options__item", { "options__item--active": select === index })}
            onClick={() => handleSelect(index)}
          >{item(option)}</div>
        )}
      </div>
    </CardContent>
  </Card>
    ;
};

