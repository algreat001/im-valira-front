import React, { useState } from "react";
import cx from "classnames";

import { OptionMeta, Option, OptionType } from "interfaces/ext";
import { t } from "res/i18n/i18n";

import { Card, CardContent, Typography } from "@mui/material";

import "./options.css";

export interface OptionsProps {
  option: OptionMeta;
  type: OptionType;
  item: (option: Option) => React.ReactNode;
  onSelect: (option: Option) => void;
}

export const Options = ({ option, type, item, onSelect }: OptionsProps) => {
  const [ select, setSelect ] = useState<null | number>(null);

  if (option.type !== type) {
    return null;
  }

  const handleSelect = (index: number) => {
    onSelect(option.options[index]);
    setSelect(index);
  };

  const selected = select !== null
    ? t("option." + option.type + "." + option.options[select].name) || option.options[select].name
    : undefined;

  return <Card className="options" variant="outlined">
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {t(`option.${option.type}.type`)}
        {!!selected && <div className="options__value">{`: ${selected}`}</div>}
      </Typography>
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

