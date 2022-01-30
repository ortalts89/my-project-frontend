import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loggedInUserState } from '../../store/users';
import { useFetch } from '../../store/fetch';
import { shouldRefreshPostsListState } from '../../store/posts';
import { socket } from '../../socket';


export default function PostActions({postId, postAuthor, likes, isLikedByLoggedinUser}) {
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(isLikedByLoggedinUser);
    const [postLikes, setPostLikes] = useState(likes.map(like => like.user));
    const [likesTitle, setLikesTitle] = useState('');
    const loggedInUser = useRecoilValue(loggedInUserState);
    const fetch = useFetch();
    const setShouldRefreshPostsList = useSetRecoilState(shouldRefreshPostsListState);

    useEffect(() => {
        if(postLikes.length === 0){
            setLikesTitle('');
        } else if(postLikes.length === 1){
            setLikesTitle(postLikes.length + ' ' + 'like')
        } else {
            setLikesTitle(postLikes.length + ' ' + 'likes')
        }
        
    },[isLikedByCurrentUser, postLikes])

    const onLikeClick = useCallback(async () => {
        if(isLikedByCurrentUser){
            await fetch(`/posts/${postId}/likes`, {}, 'DELETE');
            const newLikesArr = postLikes.filter(like => like !== loggedInUser.id);
            setPostLikes(newLikesArr);
        } else {
            await fetch(`/posts/${postId}/likes`, {} , 'POST');
            const newArr = [...postLikes];
            newArr.push(loggedInUser.id);
            setPostLikes(newArr);
            socket.emit('send notification', {content: 'like', to: postAuthor, postId: postId});
        }
        setShouldRefreshPostsList(true);
        setIsLikedByCurrentUser(isLikedByCurrentUser => !isLikedByCurrentUser);
    },[isLikedByCurrentUser, postLikes, loggedInUser])


    return (
        <CardActions disableSpacing className="card-actions"> 
            <IconButton aria-label="like" onClick={onLikeClick}>
                <FavoriteIcon sx={isLikedByCurrentUser ? {color: 'red'} : {} }/>
            </IconButton>
            <div className="post-likes">{likesTitle}</div>
        </CardActions>
    )
}