import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { RoleDto } from "interfaces/ext";

import { useStores } from "../../hooks/useStores";
import { ListItemText, Menu, MenuItem } from "@mui/material";

export interface AddRoleListProps {
  anchorEl: any;
  onClose: () => void;
  onAdd: (role: RoleDto) => void;
}

export const AddRoleList: React.FC<AddRoleListProps> = observer(({ anchorEl, onAdd, onClose }) => {
  const { roleStore } = useStores();
  const isShow = Boolean(anchorEl);

  const handleClose = () => {
    onClose();
  };
  const handleAdd = (role: RoleDto) => () => {
    onAdd(role);
    onClose();
  };

  useEffect(() => {
    roleStore.loadAllRoles();
  }, []);

  return <Menu
    id="role-list-menu"
    anchorEl={anchorEl}
    open={isShow}
    onClose={handleClose}
    MenuListProps={{ "aria-labelledby": "basic-button" }}
  >
    {roleStore.roles.map((role) => <MenuItem key={role.role} onClick={handleAdd(role)}>
      <ListItemText
        primary={role.role}
        secondary={role.description}
      />
    </MenuItem>)}
  </Menu>;
});
