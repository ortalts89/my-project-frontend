import Avatar from '@mui/material/Avatar';
import { useMemo, useState, useCallback, useRef } from 'react'
import '../../../dist/PostPopupContent.css';
import PostActions from './PostActions';
import PostCommentsList from './PostCommentsList';
import PostAddComment from './PostAddComment';
import { formatDate } from '../../compositions/date';
import { useFetch } from '../../store/fetch';

export default function PostPopupContent({post}) {
    const [postComments, setPostComments] = useState(post.comments);
    const commentsListElem = useRef(null)
    const fetch = useFetch();

    const postDate = useMemo(() => {
        return formatDate(post.createdAt);
    }, [post])

    const onAddComment = useCallback((commentsList) => {
        setPostComments(commentsList);
        commentsListElem.current.scrollTop = commentsListElem.current.scrollHeight;
    },[commentsListElem])

    const onDeleteComment = useCallback(async (commentId) => {
        const comment = await fetch(`/posts/${post._Id}/comments/${commentId}`,{}, 'DELETE');
        if(comment){
            const newCommentsList = postComments.filter(comment => comment._id !== commentId);
            setPostComments(newCommentsList);
        }
    }, [post])
    return(
            <div className="post-popup-container">
                <div className="post-popup-img-container">
                    <img className="post-popup-img" src={post.imgUrl}/>
                </div>
                <div className="post-popup-details">
                    <div className="post-popup-header">
                        <a href={`/profile/${post.user._id}`}>
                        <Avatar aria-label="kuala" />
                        </a>
                        <div className="post-popup-header-text">
                            <a href={`/profile/${post.user._id}`}>
                                <div className="post-author-fullname">{post.user.fullname}</div>
                            </a>
                            <div className="post-popup-location">{post.location}</div>
                        </div>
                    </div>
                    <PostCommentsList comments={postComments} elementRef={commentsListElem} onDeleteComment={onDeleteComment}/>
                    <PostActions  postId={post._id} likes={post.likes} isLikedByLoggedinUser={post.isLikedByCurrentUser} />
                    <div className="post-popup-created">{postDate}</div>
                    <PostAddComment postId={post._id} comments={postComments} setPostComments={onAddComment}/>
                </div>
            </div>
    )
}