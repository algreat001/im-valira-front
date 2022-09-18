import { makeAutoObservable } from "mobx";
import { CatalogStore } from "./CatalogStore";
import { CatalogEditorProps } from "components/forms/CatalogEditor/CatalogEditor";

export class UIStore {

  isShowProfileDlg = false;

  isShowLoginDlg = false;

  isShowSignupDlg = false;

  catalogEdit: null | CatalogEditorProps = null;

  currentCatalogId: null | string = null;

  constructor() {
    makeAutoObservable(this);
  }

  hideAllDialogs = () => {
    this.isShowProfileDlg = false;
    this.isShowLoginDlg = false;
    this.isShowSignupDlg = false;
    this.catalogEdit = null;
  };

  showProfileDlg = () => {
    this.hideAllDialogs();
    this.isShowProfileDlg = true;
  };

  hideProfileDlg = () => {
    this.isShowProfileDlg = false;
  };

  showLoginDlg = () => {
    this.hideAllDialogs();
    this.isShowLoginDlg = true;
  };
  hideLoginDlg = () => {
    this.isShowLoginDlg = false;
  };

  showSignupDlg = () => {
    this.hideAllDialogs();
    this.isShowSignupDlg = true;
  };
  hideSignupDlg = () => {
    this.isShowSignupDlg = false;
  };

  showCatalogEditDlg = (edit: CatalogEditorProps) => {
    this.catalogEdit = edit;
  };

  hideCatalogEditDlg = () => {
    this.catalogEdit = null;
  };

  get isShowCatalogEditDlg() {
    return Boolean(this.catalogEdit);
  }

  setCurrentCatalogId(id: null | string) {
    this.currentCatalogId = id;
  }

  isCurrentCatalog(catalog: CatalogStore): boolean {
    return catalog.id === this.currentCatalogId;
  }

}
