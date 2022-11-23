import React from "react";
import { observer } from "mobx-react";

import { useNavigate } from "react-router-dom";
import { useStores } from "hooks/useStores";
import { t } from "res/i18n/i18n";

import { SearchCard } from "components/Search/SearchCard";

import "components/Search/search.css";

export const SearchPage = observer(() => {
  const { searchStore } = useStores();
  const { isContainedSearchItems, searchLine } = searchStore;

  return <div className="search__page">
    {!isContainedSearchItems && <div>{t("search.notFound")} '{searchLine}'</div>}
    {isContainedSearchItems && <div>{t("search.found")} '{searchLine}'</div>}
    {isContainedSearchItems && searchStore.getSearchProductList().map(product => <SearchCard
      key={product.id}
      product={product}
    />)}
  </div>;
});
