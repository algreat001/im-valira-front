import * as React from "react";
import { observer } from "mobx-react";

import { useStores } from "stores/useStores";
import { t } from "res/i18n/i18n";

import { CatalogStore } from "stores/CatalogStore";

import { Tooltip, List, ListSubheader, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { CatalogEditorToolbar } from "components/Catalog/CatalogEditorToolbar/CatalogEditorToolbar";
import { Loader } from "components/Loader/Loader";

import { ExpandLess } from "@mui/icons-material";

interface MenuItemProps {
  catalog: CatalogStore;
  isEditor: boolean;
  level: number;
}

const MenuItem = observer(({ catalog, level, isEditor }: MenuItemProps) => {
  const { uiStore } = useStores();

  const handleClick = () => {
    catalog.select();
    uiStore.setCurrentCatalogId(catalog.id);
  };

  return <>
    <ListItemButton selected={uiStore.isCurrentCatalog(catalog)} onClick={handleClick}>
      {isEditor && <CatalogEditorToolbar catalog={catalog} />}
      <Tooltip title={catalog.description ?? ""} placement="right">
        <ListItemText primary={catalog.name} sx={{ paddingLeft: `${level * 0.5}em` }} />
      </Tooltip>
      {catalog.hasChildren && (
        <div className={`menu__item__expand ${catalog.isExpand && "menu__item__expand--expand"}`}>
          <ExpandLess />
        </div>)}
    </ListItemButton>
    {catalog.hasChildren && <Collapse in={catalog.isExpand} timeout="auto" unmountOnExit>
      <Loader show={!catalog.isChildrenLoaded} />
      {catalog.children.map(child => <MenuItem
        key={child.id}
        catalog={child}
        isEditor={isEditor}
        level={level + 1}
      />)}
    </Collapse>
    }
  </>;
});

export const CatalogMenu = observer(() => {
  const { catalogStore, profileManagerStore } = useStores();
  const isEditor = profileManagerStore.viewer.hasRole("editor");
  return <List
    className="menu"
    component="div"
    subheader={
      <ListSubheader component="div" className="menu__header">
        {isEditor && <CatalogEditorToolbar catalog={catalogStore} />}
        <h2>{t("menu.main.title")}</h2>
      </ListSubheader>
    }
  >
    {catalogStore.children.map(catalog => <MenuItem
      catalog={catalog}
      key={catalog.id}
      isEditor={isEditor}
      level={0}
    />)}
  </List>;
});
