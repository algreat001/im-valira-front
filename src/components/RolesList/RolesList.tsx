import React, { useState } from "react";
import { RoleDto } from "interfaces/ext";
import { Chip, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { AddRoleList } from "./AddRoleList";

export interface RolesListProps {
  list: RoleDto[];
  onClick?: (role: string, event: any) => void;
  onDelete?: (role: string, event: any) => void;
  onAdd?: (role: RoleDto) => void;
}

export const RolesList = ({ list, onClick, onDelete, onAdd }: RolesListProps) => {
  const isShowAddButton = !!onAdd;

  const [ addMenuAnchorEl, setAddMenuAnchorEl ] = useState<null | HTMLElement>(null);

  const handleClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleCloseAddMenu = () => {
    setAddMenuAnchorEl(null);
  };

  const handleAddRole = (role: RoleDto) => {
    if (onAdd) {
      onAdd(role);
    }
  };

  const handleClick = (role: string) => (e: any) => {
    if (onClick) {
      onClick(role, e);
    }
  };
  const handleDelete = (role: string) => (e: any) => {
    if (onDelete) {
      onDelete(role, e);
    }
  };
  return <div className="profile__panel__roles">
    {isShowAddButton && <>
      <IconButton onClick={handleClickAdd}><AddIcon /></IconButton>
      <AddRoleList anchorEl={addMenuAnchorEl} onClose={handleCloseAddMenu} onAdd={handleAddRole} />
    </>}
    {list.map(role => <Chip
      key={role.role}
      label={role.role}
      variant="outlined"
      onClick={onClick ? handleClick(role.role) : undefined}
      onDelete={onDelete ? handleDelete(role.role) : undefined}
    />)}
  </div>;
};
