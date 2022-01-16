import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useRecoilValue } from 'recoil'
import { loggedInUserState } from '../../store/users'

export default function ProfileBtn({handleClose}) {
  const loggedInUser = useRecoilValue(loggedInUserState);
    return(
        <Link to={`/Profiles/${loggedInUser.id}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
    )
}