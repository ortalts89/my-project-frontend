import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

export default function NotificationBtn({open, unreadNotifications, handleClick}) {
    return(
        <div className='notificationButton'>
            <Badge badgeContent={unreadNotifications} color="primary">
                <NotificationsNoneOutlinedIcon 
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{color:'text.secondary', cursor:'pointer'}}/>
            </Badge>
        </div>
    )
   
}