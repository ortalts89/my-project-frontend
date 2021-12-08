import ProfileBtn from './ProfileBtn';
import LogoutBtn from './LogoutBtn';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MainMenuMenu({anchorEl, open, handleClose, handleSettingsCLick}) {
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
        <MenuItem onClick={handleSettingsCLick}>Settings</MenuItem>
        <LogoutBtn handleClose={handleClose}/>
      </Menu>
    )
}