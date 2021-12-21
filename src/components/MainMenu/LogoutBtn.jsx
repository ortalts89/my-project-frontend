import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export default function LogoutBtn({handleClose}) {
  const history = useHistory();
  const onClick = useCallback(async () => {
    handleClose();
    await fetch('/api/logout');
    history.push('/');
  })
    return (
        <Link to='/'>
          <MenuItem onClick={onClick}>Logout</MenuItem>
        </Link>
    )
}