import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useLogout } from '../../store/users'

export default function LogoutBtn({handleClose}) {
  const history = useHistory();
  const logout = useLogout();

  const onClick = useCallback(async () => {
    handleClose();
    logout();
  })
    return (
        <Link to='/'>
          <MenuItem onClick={onClick}>Logout</MenuItem>
        </Link>
    )
}