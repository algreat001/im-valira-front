import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useStores } from "stores/useStores";


export const AdminSelectUser = observer(() => {
  const { profileManagerStore } = useStores();
  const [ currentProfileIndex, setCurrentProfileIndex ] = useState<null | number>(null);
  if (!profileManagerStore.viewer.isAdmin) {
    return null;
  }
  const isProfilesLoaded = currentProfileIndex !== null;

  const setCurrentProfile = (index: number) => {
    setCurrentProfileIndex(index);
    profileManagerStore.setCurrentProfile(index);
  };

  useEffect(() => {
    const loadFunction = async () => {
      await profileManagerStore.loadProfiles();
      setCurrentProfile(0);
    };
    loadFunction();
  }, []);

  const handleChange = (index: number) => {
    setCurrentProfile(index);
  };


  return <FormControl margin="normal" fullWidth variant="outlined">
    {isProfilesLoaded
      ? <>
        <InputLabel id="admin-profiles-select-label">{t("admin.profiles.label")}</InputLabel>
        <Select
          labelId="admin-profiles-select-label"
          id="admin-profile-select"
          value={currentProfileIndex}
          label={t("admin.profiles")}
          onChange={(e) => handleChange(e.target.value as number)}
        >
          {profileManagerStore.profiles.map((profile, index) => <MenuItem key={profile.email} value={index}>
            {profile.email}
          </MenuItem>)}
        </Select>
      </>
      : <ListItemButton>
        <ListItemIcon>
          <CircularProgress />
        </ListItemIcon>
        <ListItemText primary={t("admin.profiles.load")} />
      </ListItemButton>}
  </FormControl>;
});
