import { makeAutoObservable } from "mobx";

export class UIStore {

  isShowProfileDlg = false;

  isShowLoginDlg = false;

  isShowSignupDlg = false;

  constructor() {
    makeAutoObservable(this);
  }

  hideAllDialogs = () => {
    this.isShowProfileDlg = false;
    this.isShowLoginDlg = false;
    this.isShowSignupDlg = false;
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


}
