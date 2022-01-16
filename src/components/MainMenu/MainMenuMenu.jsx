import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {isAccountPopupDisplayed} from '../../store/components'
import { useSetRecoilState } from 'recoil'
import ProfileBtn from './ProfileBtn';
import LogoutBtn from './LogoutBtn';



export default function MainMenuMenu({anchorEl, open, handleClose}) {
  const setIsAccountPopupDisplayed = useSetRecoilState(isAccountPopupDisplayed);
  
    return (
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ProfileBtn handleClose={handleClose}/>
        <MenuItem onClick={() => setIsAccountPopupDisplayed(true)}>Account</MenuItem>
        <LogoutBtn handleClose={handleClose}/>
      </Menu>
    )
}