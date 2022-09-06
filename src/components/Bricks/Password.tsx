import React, { useState } from "react";

import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordProps {
  id?: string;
  label?: null | string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  fullWidth?: boolean;
  error?: boolean;
}

export const Password = ({ id, label, value, onChange, fullWidth, error }: PasswordProps) => {
  const [ showPassword, setShowPassword ] = useState<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return <FormControl fullWidth={fullWidth} sx={{ marginTop: 1 }} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    <OutlinedInput
      error={error}
      autoComplete="on"
      id={id ?? "outlined-adornment-password"}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label={label}
    />
  </FormControl>;
};
