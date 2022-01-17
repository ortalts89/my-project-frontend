import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import '../../../dist/PostCard.css'
import { loggedInUserState } from '../../store/users'
import { isDeletePostPopupDisplayed } from '../../store/components'
import { postToDeleteState } from '../../store/posts'



export default function Post({post}) {
    const loggedInUser = useRecoilValue(loggedInUserState);
    const setIsDeletePostPopupDisplayed = useSetRecoilState(isDeletePostPopupDisplayed);
    const setPostToDelete = useSetRecoilState(postToDeleteState);
    const { userId } = useParams();
    const [itsMyProfile, setItsMyProfile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if(loggedInUser.id === userId) {
            setItsMyProfile(true);
        } else {
            setItsMyProfile(false);
        }
    }, [userId, loggedInUser])

    const open = Boolean(anchorEl);

    const handleClick = useCallback((event) => {
      setAnchorEl(event.currentTarget);
    },[]);
    const onDeleteCLick = useCallback(() => {
        setPostToDelete(post._id);
        setIsDeletePostPopupDisplayed(true);
        setAnchorEl(null);
    },[]);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    })

    return(
        <Grid item xs={4} maxWidth={345} >
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent:'space-between'}}>
                <CardHeader
                    avatar={
                    <Avatar src={post.img} aria-label="kuala">
                        R
                    </Avatar>
                    }
                    action={ itsMyProfile &&
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={post.user.fullname}
                    subheader={post.location}
                    subheaderTypographyProps={{noWrap: true}}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={post.imgUrl}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.caption}
                        <br/>
                        {post.hashtags}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{}}> 
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="add comment">
                        <MapsUgcOutlinedIcon />
                    </IconButton>
                </CardActions>
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
            </Card>
        </Grid>
    )
}