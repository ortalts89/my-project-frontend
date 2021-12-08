import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

export default function Notification({notification}) {
    return (
        <MenuItem>
            <Avatar src={notification.img} alt={notification.text} sx={{marginRight:'10px'}}/>
            <div className="notification-text">{notification.text}</div>
        </MenuItem>
    )
}