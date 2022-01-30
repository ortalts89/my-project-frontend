import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { useLogout } from '../../store/users';

export default function LogoutBtn({handleClose}) {
  const logout = useLogout();

  const onClick = useCallback(async () => {
    handleClose();
    logout();
  })
    return (
        <MenuItem onClick={onClick}>Logout</MenuItem>
    )
}