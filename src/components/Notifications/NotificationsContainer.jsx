import NotificationBtn from "./NotificationBtn";
import NotificationsMenu from "./NotificationsMenu";
import { notifications } from '../../mockups/notifications'
import { useState } from 'react'

export default function NotificationsContainer({isDisplayed}) {
    if(!isDisplayed){
        return null;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsList, setNotifications] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNotifications(notifications());
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div className="notifications-container">
            <NotificationBtn open={open} handleClick={handleClick} />
            <NotificationsMenu anchorEl={anchorEl} open={open} handleClose={handleClose} notificationsList={notificationsList} />
        </div>
    )
}