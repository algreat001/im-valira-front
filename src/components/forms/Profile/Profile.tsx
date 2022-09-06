import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";

import { ProfileTextField } from "stores/ProfileStore";
import { useStores } from "stores/useStores";
import { t } from "res/i18n/i18n";

import { CloseButton } from "components/Bricks/CloseButton";
import { Password } from "components/Bricks/Password";
import { RolesList } from "components/RolesList/RolesList";
import { RoleDto } from "interfaces/ext";

export const Profile = observer(() => {
  const { profileStore } = useStores();
  const [ password, setPassword ] = useState("");
  const { isAdmin } = profileStore;

  useEffect(() => {
    if (profileStore.isShowProfileDlg) {
      setPassword("");
    }
  }, [ profileStore.isShowProfileDlg ]);

  const handleTextChange = (e: any) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
      return;
    }

    profileStore.changeTextField(e.target.id as ProfileTextField, e.target.value);
  };

  const handleSave = async () => {
    await profileStore.saveProfile(password);
  };

  const handleCancel = () => {
    profileStore.restoreFromCache();
  };

  const handleAddRole = (role: RoleDto) => {
    profileStore.addRole(role);
  };
  const handleDeleteRole = (role: string, e: any) => {
    profileStore.deleteRole(role);
  };


  return <Dialog open={profileStore.isShowProfileDlg} onClose={handleCancel}>
    <DialogTitle>
      {t("appbar.profile.profile")}
      <CloseButton onCLose={handleCancel} />
    </DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        id="email"
        label={t("appbar.profile.email")}
        type="email"
        fullWidth
        variant="outlined"
        value={profileStore.email}
      />
      <TextField
        margin="dense"
        id="firstName"
        label={t("appbar.profile.firstname")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profileStore.firstName}
      />
      <TextField
        margin="dense"
        id="lastName"
        label={t("appbar.profile.lastname")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profileStore.lastName}
      />
      {isAdmin
        ? <RolesList onAdd={handleAddRole} onDelete={handleDeleteRole} list={profileStore.roles} />
        : <RolesList list={profileStore.roles} />}
      <form>
        <Password
          fullWidth
          id="password"
          label={t("appbar.profile.password")}
          value={password}
          onChange={handleTextChange}
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSave}>{t("appbar.profile.save")}</Button>
    </DialogActions>
  </Dialog>;
});
