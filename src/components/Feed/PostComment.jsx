import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUserState } from '../../store/users';
import { shouldRefreshPostsListState } from '../../store/posts'

export default function PostComment({comment, onDeleteComment}) {
    const [postComment, setPostComment] = useState(comment);
    const loggedInUser = useRecoilValue(loggedInUserState);
    const [isCurrentUserComment, setIsCurrentUserComment] = useState(null);
    const setShouldRefreshPostsList = useSetRecoilState(shouldRefreshPostsListState);


    useEffect(() => {
        if(loggedInUser.id === comment.user._id){
            setIsCurrentUserComment(true);
        } else {
            setIsCurrentUserComment(false);
        }
    }, [comment._id, loggedInUser])

    const onDeleteCommentClick = useCallback(async () => {
        onDeleteComment(postComment._id);
        setShouldRefreshPostsList(true);
    })

    return(
        <div className="post-comment-container">
            <Avatar src={postComment.user.thumbnail} sx={{width: 24, height: 24}} aria-label="kuala"> R </Avatar>
            <div className="post-comment-fullname">
                <a href={`/profile/${postComment.user._id}`}>
                    {postComment.user.fullname}
                </a>
            </div>
            <div className="post-comment-text" title={postComment.text}>{postComment.text}</div>
            {isCurrentUserComment ? 
                <IconButton aria-label="delete" size="small" sx={{marginLeft: "10px"}} onClick={onDeleteCommentClick}>
                    <CloseIcon fontSize={'12px'} />
                </IconButton> :
                <span></span>
            }
            <br/>
        </div>
    )
}