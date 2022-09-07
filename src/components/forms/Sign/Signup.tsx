import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useFormik } from "formik";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";

import { useStores } from "stores/useStores";
import { t } from "res/i18n/i18n";

import { CloseButton } from "components/Bricks/CloseButton";
import { Password } from "components/Bricks/Password";
import { validate } from "./Signin";


export const Signup = observer(() => {
  const { loginStore, uiStore } = useStores();
  const [ error, setError ] = useState<null | string>(null);

  useEffect(() => {
    setError(null);
  }, [ uiStore.isShowSignupDlg ]);

  const formik = useFormik({
    initialValues: {
      email: loginStore.email || "",
      password: ""
    },
    validate,
    onSubmit: async (values) => {
      if (!(await loginStore.signup(values.email, values.password))) {
        setError(t("appbar.profile.error.signup"));
        console.log(t("appbar.profile.error.signup"));
      } else {
        uiStore.hideSignupDlg();
      }
    }

  });

  return <Dialog open={uiStore.isShowSignupDlg} onClose={uiStore.hideSignupDlg}>
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>
        {t("appbar.profile.register")}
        <CloseButton onCLose={uiStore.hideSignupDlg} />
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
          onChange={(e) => {
            formik.handleChange(e);
            setError(null);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={!!error}
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
      </DialogContent>
      <DialogActions>
        <Button type="submit">{t("appbar.profile.signup")}</Button>
      </DialogActions>
    </form>
  </Dialog>;
});
