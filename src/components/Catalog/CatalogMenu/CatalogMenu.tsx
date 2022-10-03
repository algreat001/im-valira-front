import * as React from "react";
import { observer } from "mobx-react";

import { useStores } from "../../../hooks/useStores";
import { useNavigate } from "react-router-dom";

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
  const { catalogRepository, uiStore } = useStores();
  const navigate = useNavigate();

  const handleClick = () => {
    catalog.select();
    uiStore.setCurrentCatalogId(catalog.id);
    navigate("catalog/" + catalog.id);
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
      {catalog.children.map(childId => <MenuItem
        key={childId}
        catalog={catalogRepository.getCatalog(childId)}
        isEditor={isEditor}
        level={level + 1}
      />)}
    </Collapse>
    }
  </>;
});

export interface CatalogMenuProps {
  nop?: null;
}

export const CatalogMenu = observer(({}: CatalogMenuProps) => {
  const { catalogRepository, profileManagerStore } = useStores();

  const rootCatalog = catalogRepository.getRoot();

  const isEditor = profileManagerStore.viewer.hasRole("editor");
  return <List
    className="menu"
    component="div"
    subheader={
      <ListSubheader component="div" className="menu__header">
        {isEditor && <CatalogEditorToolbar catalog={rootCatalog} />}
        <h2>{t("menu.main.title")}</h2>
      </ListSubheader>
    }
  >
    {rootCatalog.children.map(catalogId => <MenuItem
      catalog={catalogRepository.getCatalog(catalogId)}
      key={catalogId}
      isEditor={isEditor}
      level={0}
    />)}
  </List>;
});
