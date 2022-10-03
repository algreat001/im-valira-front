import { makeAutoObservable, runInAction } from "mobx";
import { CatalogStore } from "./CatalogStore";
import { CatalogEditorProps } from "components/forms/CatalogEditor/CatalogEditor";
import { ProductRepositoryStore } from "./ProductRepositoryStore";
import { CatalogRepositoryStore } from "./CatalogRepositoryStore";

export class UIStore {

  isShowProfileDlg = false;

  isShowLoginDlg = false;

  isShowSignupDlg = false;

  isShowSelectProductDlg = false;

  cancelProductIds: string[] = [];

  catalogEdit: null | CatalogEditorProps = null;

  currentCatalogId: null | string = null;

  constructor(private productRepository: ProductRepositoryStore, private catalogRepository: CatalogRepositoryStore) {
    makeAutoObservable(this);
  }

  private hideAllDialogs = () => {
    this.isShowSelectProductDlg = false;
    this.isShowProfileDlg = false;
    this.isShowLoginDlg = false;
    this.isShowSignupDlg = false;
    this.catalogEdit = null;
  };

  showProfileDlg = () => {
    runInAction(() => {
      this.hideAllDialogs();
      this.isShowProfileDlg = true;
    });
  };

  hideProfileDlg = () => {
    runInAction(() => {
      this.isShowProfileDlg = false;
    });
  };

  showLoginDlg = () => {
    runInAction(() => {
      this.hideAllDialogs();
      this.isShowLoginDlg = true;
    });
  };
  hideLoginDlg = () => {
    runInAction(() => {
      this.isShowLoginDlg = false;
    });
  };

  showSignupDlg = () => {
    runInAction(() => {
      this.hideAllDialogs();
      this.isShowSignupDlg = true;
    });
  };
  hideSignupDlg = () => {
    runInAction(() => {
      this.isShowSignupDlg = false;
    });
  };

  showSelectProductDlg = () => {
    runInAction(() => {
      this.hideAllDialogs();
      this.isShowSelectProductDlg = true;
      this.cancelProductIds = this.productRepository.getProductIdsForCatalog(this.currentCatalogId);
    });
  };

  hideSelectProductDlg = () => {
    runInAction(() => {
      this.isShowSelectProductDlg = false;
    });
  };

  showCatalogEditDlg = (edit: CatalogEditorProps) => {
    runInAction(() => {
      this.catalogEdit = edit;
    });
  };

  hideCatalogEditDlg = () => {
    runInAction(() => {
      this.catalogEdit = null;
    });
  };

  get isShowCatalogEditDlg() {
    return Boolean(this.catalogEdit);
  }

  setCurrentCatalogId(id: null | string) {
    runInAction(() => {
      this.currentCatalogId = id;
    });
  }

  isCurrentCatalog(catalog: CatalogStore): boolean {
    return catalog.id === this.currentCatalogId;
  }

}
