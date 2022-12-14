import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";

import { ProfileStore, ProfileTextField } from "stores/ProfileStore";

import { useStores } from "../../../hooks/useStores";
import { t } from "res/i18n/i18n";
import { RoleDto } from "interfaces/ext";

import { CloseButton } from "components/Bricks/CloseButton";
import { Password } from "components/Bricks/Password";
import { RolesList } from "components/RolesList/RolesList";
import { AdminSelectUser } from "components/Admins/SelectUser/AdminSelectUser";

import SaveIcon from "@mui/icons-material/Save";

export interface ProfileProps {
  profile: ProfileStore;
}

export const Profile: React.FC<ProfileProps> = observer(({ profile }) => {
  const { uiStore, profileManagerStore } = useStores();
  const [ password, setPassword ] = useState("");
  const { isAdmin } = profileManagerStore.viewer;
  const isMyProfile = profileManagerStore.isProfileEqualViewer(profile);

  useEffect(() => {
    if (uiStore.isShowProfileDlg) {
      setPassword("");
      profile.saveToCache();
    }
  }, [ uiStore.isShowProfileDlg ]);

  const handleTextChange = (e: any) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
      return;
    }

    profile.changeTextField(e.target.id as ProfileTextField, e.target.value);
  };

  const handleSave = async () => {
    await profile.saveProfile(password);
    uiStore.hideProfileDlg();
  };

  const handleCancel = () => {
    profile.restoreFromCache();
    uiStore.hideProfileDlg();
  };

  const handleAddRole = (role: RoleDto) => {
    profile.addRole(role);
  };
  const handleDeleteRole = (role: string) => {
    profile.deleteRole(role);
  };


  return <Dialog open={uiStore.isShowProfileDlg} onClose={handleCancel}>
    <DialogTitle>
      {isMyProfile
        ? t("appbar.profile.profile")
        : t("admin.profiles.title")}
      <CloseButton onClose={handleCancel} />
    </DialogTitle>
    <DialogContent>
      {isAdmin
        ? <AdminSelectUser />
        : <TextField
          margin="dense"
          id="email"
          label={t("appbar.profile.email")}
          type="email"
          fullWidth
          variant="outlined"
          value={profile.email}
        />}
      <TextField
        margin="dense"
        id="firstName"
        label={t("appbar.profile.firstname")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profile.firstName}
      />
      <TextField
        margin="dense"
        id="lastName"
        label={t("appbar.profile.lastname")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profile.lastName}
      />
      <TextField
        margin="dense"
        id="phone"
        label={t("appbar.profile.phone")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profile.phone}
      />
      <TextField
        margin="dense"
        id="address"
        label={t("appbar.profile.address")}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleTextChange}
        value={profile.address}
        multiline
        rows={5}
      />
      {isAdmin
        ? <RolesList onAdd={handleAddRole} onDelete={handleDeleteRole} list={profile.roles} />
        : <RolesList list={profile.roles} />}
      <form>
        <Password
          fullWidth
          id="password"
          label={t("appbar.profile.password")}
          value={password}
          disabled={!profileManagerStore.isProfileEqualViewer(profile)}
          onChange={handleTextChange}
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>{t("appbar.profile.save")}</Button>
    </DialogActions>
  </Dialog>;
});
