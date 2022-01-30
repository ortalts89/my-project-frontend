import CardHeader from '@mui/material/CardHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isDeletePostPopupDisplayedState } from '../../store/components';
import { postToDeleteState } from '../../store/posts';

export default function PostHeader({userId, postId, avatarImage, authorFullname,location, itsMyPost}) {
    const setIsDeletePostPopupDisplayed = useSetRecoilState(isDeletePostPopupDisplayedState);
    const setPostToDelete = useSetRecoilState(postToDeleteState);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
      },[]);

      const onDeleteCLick = useCallback(() => {
          setPostToDelete(postId);
          setIsDeletePostPopupDisplayed(true);
          setAnchorEl(null);
      },[]);
  
      const handleClose = useCallback(() => {
          setAnchorEl(null);
      })
  
      
    return (
        <div>
            <CardHeader
                avatar={
                    <a href={`/profile/${userId}`}>
                        <Avatar src={avatarImage} aria-label="kuala" />
                    </a>
                }
                action={ itsMyPost &&
                <IconButton aria-label="settings" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                }
                title={
                    <a href={`/profile/${userId}`}>{authorFullname}</a>
                }
                subheader={location}
                subheaderTypographyProps={{noWrap: true}}
                />
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem onClick={onDeleteCLick}>Delete Post</MenuItem>
        </Menu>
        </div>
        
    )
}