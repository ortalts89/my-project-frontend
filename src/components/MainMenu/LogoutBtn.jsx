import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { postsListState } from '../../store/posts'

export default function LogoutBtn({handleClose}) {
  const resetStore = useResetRecoilState(postsListState)
  const history = useHistory();
  const onClick = useCallback(async () => {
    handleClose();
    await fetch('/api/logout');
    history.push('/login');
    localStorage.removeItem('isUserLoggedIn');
    resetStore();
  })
    return (
        <Link to='/'>
          <MenuItem onClick={onClick}>Logout</MenuItem>
        </Link>
    )
}