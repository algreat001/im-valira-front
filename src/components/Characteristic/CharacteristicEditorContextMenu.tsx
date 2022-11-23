import * as React from "react";
import { observer } from "mobx-react";

import { MenuItemProps, CharacteristicEditorMenuProps } from "interfaces/menu";

import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { ContextMenu } from "components/ContextMenu/ContextMenu";

export const characteristicEditorMenuId = "characteristic-editor-menu";

export const CharacteristicEditorContextMenu: React.FC<CharacteristicEditorMenuProps> = observer(({
  anchorEl,
  characteristic,
  name,
  onClose
}) => {
  const { uiStore } = useStores();

  const handleEditCharacteristic = () => {
    if (!name) {
      return;
    }
    uiStore.showCharacteristicEditDlg({ store: characteristic, mode: "edit", params: { name } });
  };
  const handleAddCharacteristic = () => {
    uiStore.showCharacteristicEditDlg({ store: characteristic, mode: "new", params: {} });
  };
  const handleDeleteCharacteristic = () => {
    if (!name) {
      return;
    }
    characteristic.delete(name);
  };

  const items: MenuItemProps[] = [ {
    text: t("menu.editor.characteristic.edit"),
    onClick: handleEditCharacteristic,
    condition: () => Boolean(name)
  }, {
    text: t("menu.editor.characteristic.delete"),
    onClick: handleDeleteCharacteristic,
    condition: () => Boolean(name)
  }, {
    text: t("menu.editor.characteristic.add"),
    onClick: handleAddCharacteristic,
    condition: () => true
  } ];


  return <ContextMenu
    anchorEl={anchorEl}
    menuId={characteristicEditorMenuId + name ?? "0"}
    onClose={onClose}
    items={items}
  />;
});
