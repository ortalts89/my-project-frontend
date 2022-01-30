import Menu from '@mui/material/Menu';
import Notification from './Notification'

export default function NotificationMenu({anchorEl, open, handleClose, notificationsList}) {
    return(
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
           }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center" }}
            sx={{
              margin: '10px'
            }}
          >
        {notificationsList ? notificationsList.map(notification => 
          <Notification key={notification._id} notification={notification} onCLick={handleClose}/>)
            : null
        }
      </Menu>
    )
}