import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useCallback } from 'react'

export default function PostHeader({avatarImage, authorFullname,location, itsMyProfile}) {
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
      },[]);
      
    return (
        <CardHeader
            avatar={
            <Avatar src={avatarImage} aria-label="kuala">
                R
            </Avatar>
            }
            action={ itsMyProfile &&
            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            }
            title={authorFullname}
            subheader={location}
            subheaderTypographyProps={{noWrap: true}}
        />
    )
}