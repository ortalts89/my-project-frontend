import MyPageBtn from './MyPageBtn';
import LogoutBtn from './LogoutBtn';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MainMenuMenu({anchorEl, open, handleClose, handleProfileCLick}) {
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
        <MyPageBtn handleClose={handleClose}/>
        <MenuItem onClick={handleProfileCLick}>Profile</MenuItem>
        <LogoutBtn handleClose={handleClose}/>
      </Menu>
    )
}