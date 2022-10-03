import { useState } from "react";
import { observer } from "mobx-react";

import { useStores } from "hooks/useStores";
import { loadSearchProduct } from "services/api";

import { Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper } from "@mui/material";

import { SearchBar } from "components/SearchBar/SearchBar";

function not(a: string[], b: string[]): string[] {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]): string[] {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export interface EditProductsCatalogListProps {
  setProductIds: (ids: string[]) => void;
}

export const EditProductsCatalogList = observer(({ setProductIds }: EditProductsCatalogListProps) => {
  const { uiStore, productRepository } = useStores();

  const [ checked, setChecked ] = useState<string[]>([]);
  const [ left, setLeft ] = useState<string[]>([]);
  const [ right, setRight ] = useState<string[]>(productRepository.getProductIdsForCatalog(uiStore.currentCatalogId));

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleLoadLeft = (search: string) => {
    const loadSearch = async (): Promise<void> => {
      const productIds = await loadSearchProduct(search);
      if (productIds && productIds.length > 0) {
        setLeft(not(productIds, right));
      }
    };
    loadSearch();
  };

  const handleSetRight = (newProducts: string[]) => {
    setRight(newProducts);
    setProductIds(newProducts);
  };

  const handleCheckedRight = () => {
    handleSetRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    handleSetRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const CustomList = (items: string[]) => (
    <Paper className="product__custom-list">
      <List dense component="div" role="list">
        {items.map((id) => {
          const labelId = `transfer-list-item-${id}-label`;

          return (
            <ListItem
              key={id}
              role="listitem"
              onClick={handleToggle(id)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText
                className="product__custom-list__item-name ellipsis"
                id={labelId}
                primary={productRepository.getProduct(id)?.name}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item><SearchBar onSearch={handleLoadLeft} />{CustomList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{CustomList(right)}</Grid>
    </Grid>
  );
});
