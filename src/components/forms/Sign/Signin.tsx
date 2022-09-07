import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "stores/useStores";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useFormik } from "formik";

import { t } from "res/i18n/i18n";
import { Social } from "interfaces/profile";

import { CloseButton } from "components/Bricks/CloseButton";
import { Password } from "../../Bricks/Password";

const social: Social[] = [];

export const validate = (values: any) => {
  const errors: any = {};

  if (!values.password) {
    errors.password = t("appbar.profile.error.required");
  } else if (values.password.length < 4) {
    errors.password = t("appbar.profile.error.password");
  }

  if (!values.email) {
    errors.email = t("appbar.profile.error.required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t("appbar.profile.error.email");
  }

  return errors;
};

export const Signin = observer(() => {
  const { loginStore, uiStore } = useStores();
  const [ error, setError ] = useState<null | string>(null);

  useEffect(() => {
    setError(null);
  }, [ uiStore.isShowLoginDlg ]);

  const formik = useFormik({
    initialValues: {
      email: loginStore.email || "",
      password: ""
    },
    validate,
    onSubmit: async (values) => {
      if (!await loginStore.login(values.email, values.password)) {
        setError(t("appbar.profile.error.signin"));
      } else {
        uiStore.hideLoginDlg();
      }
    }
  });

  const handleSignup = () => {
    uiStore.showSignupDlg();
  };

  return (
    <Dialog open={uiStore.isShowLoginDlg} onClose={uiStore.hideLoginDlg}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {t("appbar.profile.signin")}
          <CloseButton onCLose={uiStore.hideLoginDlg} />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label={t("appbar.profile.email")}
            type="email"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!formik.errors.email}
          />
          <Password
            fullWidth
            id="password"
            label={t("appbar.profile.password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.errors.password}
          />
          {!!error && <div className="login__panel__error">{error}</div>}
          {social.length > 0 &&
            <div className="login__panel__social">
              {social.map(net => <div key={net.name}>{net.name}</div>
              )}
            </div>}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleSignup}>{t("appbar.profile.signup")}</Button>
          <Button type="submit">{t("appbar.profile.login")}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
