import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

export default function Notification({notification, handleClose}) {
    return (
        <MenuItem>
            <a href={`/profile/${notification.createdBy}`}>
                <Avatar src={notification.img} alt={notification.text} sx={{marginRight:'10px'}}/>
            </a>
            <a href={notification.url}>
                <div onClick={handleClose} className="notification-text">{notification.text}</div>
            </a>
        </MenuItem>
    )
}