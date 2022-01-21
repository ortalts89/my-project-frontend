import Card from '@mui/material/Card';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilValue,  } from 'recoil'
import '../../../dist/PostCard.css'
import { loggedInUserState } from '../../store/users'
import PostHeader from './PostHeader'
import PostMedia from './PostMedia'
import PostContent from './PostContent'
import PostActions from './PostActions'
import PostMenu from './PostMenu'
import PostComments from './PostComments'


export default function Post({post, likes, comments, isLikedByLoggedinUser}) {
    const loggedInUser = useRecoilValue(loggedInUserState);
    const { userId } = useParams();
    const [itsMyProfile, setItsMyProfile] = useState(null);
    
    useEffect(() => {
        if(loggedInUser.id === userId) {
            setItsMyProfile(true);
        } else {
            setItsMyProfile(false);
        }
    }, [userId, loggedInUser])
    
    return(
        <div className="post-card-container" >
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <PostHeader avatarImage={post.user.img} location={post.location} authorFullname={post.user.fullname} itsMyProfile={itsMyProfile} />
                <PostMedia image={post.imgUrl} />
                <PostContent caption={post.caption} hashtags={post.hashtags} />
                <PostActions postId={post._id} likes={likes} isLikedByLoggedinUser={isLikedByLoggedinUser} />
                <PostComments postId={post._id} comments={comments} />
                <PostMenu />
            </Card>
        </div>
    )
}