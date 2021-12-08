import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

export default function LogoutBtn({handleClose}) {
    return (
        <Link to='/'>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
    )
}