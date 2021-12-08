import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

export default function ProfileBtn({handleClose}) {
    return(
        <Link to='/profile'>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
    )
}