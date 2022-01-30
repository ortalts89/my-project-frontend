import Card from '@mui/material/Card';
import { useState, useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import '../../../dist/PostCard.css';
import { loggedInUserState } from '../../store/users';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostAddComment from './PostAddComment';
import { lastPostState } from '../../store/posts';
import { isPostPopupDisplayedState } from '../../store/components'
import { formatDate } from '../../compositions/date';


export default function Post({post}) {
    const [postComments, setPostComments] = useState(post.comments);
    const loggedInUser = useRecoilValue(loggedInUserState);
    const setLastPost = useSetRecoilState(lastPostState);
    const setIsPostPopupDisplayed = useSetRecoilState(isPostPopupDisplayedState);

    const postDate = useMemo(() => {
        return formatDate(post.createdAt);
    }, [post])

    const postCommentsLink = useMemo(() => {
        if(postComments.length === 1){
            return 'See 1 comment';
        } else if(postComments.length > 1) {
            return `see all ${postComments.length} comments `;
        }
    }, [postComments])

    const itsMyPost = useMemo(() => {
        if(loggedInUser.id === post.user._id) {
            return true;
        } else {
            return false;
        }
    }, [loggedInUser])

    const onClick = useCallback(() => {
        history.pushState({}, '', `/post/${post._id}`);
        setLastPost(post._id);
        setIsPostPopupDisplayed(true);
    },[post])

    return(
        <div className="post-card-container">
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <PostHeader userId={post.user._id} postId={post._id} avatarImage={post.user.img} location={post.location} authorFullname={post.user.fullname} itsMyPost={itsMyPost} />
                <PostMedia image={post.imgUrl} onImageClick={onClick} />
                <PostContent caption={post.caption} hashtags={post.hashtags} />
                <PostActions postId={post._id} postAuthor={post.user._id} likes={post.likes} isLikedByLoggedinUser={post.isLikedByCurrentUser} />
                <div className="post-footer">
                    <div className="post-go-to-comments" onClick={onClick}> {postCommentsLink}</div>
                    <div className="post-date">{postDate}</div>
                </div>
                <PostAddComment postId={post._id} postAuthor={post.user._id} comments={postComments} setPostComments={setPostComments} />
            </Card>
        </div>
    )
}