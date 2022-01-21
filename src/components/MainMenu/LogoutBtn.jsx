import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useLogout } from '../../store/users'

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