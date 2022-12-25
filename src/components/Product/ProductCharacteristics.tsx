import React, { useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { useStores } from "hooks/useStores";

import { EnhancedTable, HeadCell } from "components/Bricks/Table";
import { CharacteristicEditorContextMenu } from "components/Characteristic/CharacteristicEditorContextMenu";
import { ProductProps } from "./Product";
import { MoreButton } from "../Bricks/MoreButton";

const header: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: t("char.header.name")
  },
  {
    id: "value",
    numeric: false,
    label: t("char.header.value")
  },
  {
    id: "unit",
    numeric: false,
    label: t("char.header.unit")
  }
];

interface ContextMenuParams {
  name: null | string;
  anchorEl: null | HTMLElement;
}

export const ProductCharacteristics: React.FC<ProductProps> = observer(({ product }) => {
  const [ menuParams, setMenuParams ] = useState<ContextMenuParams>({ name: null, anchorEl: null });

  const { profileManagerStore: { viewer: { isAdmin } } } = useStores();
  const { characteristics } = product;

  if (characteristics === null) {
    console.log('characteristics error');
    return null;
  }

  const findName = (translationName: null | string): null | string => {
    if (!translationName || !characteristics.meta) {
      return null;
    }
    return characteristics.meta.find(char => t(`char.${char.name}.name`) === translationName)?.name ?? null;
  }

  const handleAdminItem = (event: React.MouseEvent<HTMLElement, MouseEvent>, name: null | string) => {
    setMenuParams({ name: findName(name), anchorEl: event.currentTarget });
  };
  const handleClickItem = (event: React.MouseEvent<HTMLElement, MouseEvent>, name: string) => {
    console.log(findName(name));
  };

  const contextMenu = (
    <CharacteristicEditorContextMenu
      characteristic={characteristics}
      name={menuParams.name}
      anchorEl={menuParams.anchorEl}
      onClose={() => setMenuParams({ name: null, anchorEl: null })}
    />
  );

  if (characteristics.meta === null || characteristics?.length === 0) {
    return <>
      <div>
        {isAdmin && <MoreButton onClick={(event) => handleAdminItem(event, null)} />}
        {t("product.info.missing.characteristics")}
      </div>
      {contextMenu}
    </>;
  }

  return <>
    <div className="product__characteristics">
      <EnhancedTable
        onClick={handleClickItem}
        onAdmin={handleAdminItem}
        isAdmin={isAdmin}
        header={header}
        rows={characteristics.meta.map(char => ({
          name: t(`char.${char.name}.name`),
          value: char.value,
          unit: t(`char.${char.name}.unit`)
        }))}
      />
    </div>
    {contextMenu}
  </>;
});
