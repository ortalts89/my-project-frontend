import { useEffect, useState } from 'react';
import NotificationBtn from "./NotificationBtn";
import NotificationsMenu from "./NotificationsMenu";
import { useFetch } from '../../store/fetch';
import { socket } from '../../socket';


export default function NotificationsContainer({isDisplayed}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsList, setNotificationsList] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(null);
    
    const open = Boolean(anchorEl);
    const fetch = useFetch();

    useEffect(() => {
        socket.on('get notification', () => {
            setUnreadNotifications(unreadNotifications + 1);
        })
    }, [unreadNotifications])

    useEffect(async () => {
        if(isDisplayed){
            const notifications = await fetch('/notifications', {}, 'GET');
            if(notifications) {
                setNotificationsList(notifications);
                const unread = notifications.reduce((counter, obj) => !obj.isReard ? counter += 1 : counter, 0);
                setUnreadNotifications(unread);
            }
        }
    }, [isDisplayed]);

    const handleClick = (event) => {
        if(notificationsList.length === 0){
            return;
        }
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if(!isDisplayed){
        return null;
    }

    return(
        <div className="notifications-container">
            <NotificationBtn open={open} unreadNotifications={unreadNotifications} handleClick={handleClick} />
            <NotificationsMenu anchorEl={anchorEl} open={open} handleClose={handleClose} notificationsList={notificationsList} />
        </div>
    )
}