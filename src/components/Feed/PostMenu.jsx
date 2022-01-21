import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { isDeletePostPopupDisplayed } from '../../store/components'
import { postToDeleteState } from '../../store/posts'

export default function PostMenu() {
    const setIsDeletePostPopupDisplayed = useSetRecoilState(isDeletePostPopupDisplayed);
    const setPostToDelete = useSetRecoilState(postToDeleteState);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const onDeleteCLick = useCallback(() => {
        setPostToDelete(post._id);
        setIsDeletePostPopupDisplayed(true);
        setAnchorEl(null);
    },[]);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    })

    return(
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
    )
}