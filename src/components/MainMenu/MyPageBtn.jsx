import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

export default function MyPageBtn({handleClose}) {
    return(
        <Link to='/my-page'>
          <MenuItem onClick={handleClose}>My page</MenuItem>
        </Link>
    )
}