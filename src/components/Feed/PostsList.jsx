import '../../../dist/PostsList.css'
import Button from '@mui/material/Button';
import { useState, useCallback } from 'react'
import Post from './Post';


export default function PostsList({posts}) {
    const [singlePost, setSinglePost] = useState(false);

    const onViewClick = useCallback(() => {
        setSinglePost(singlePost => !singlePost)
    },[])

    if(posts.length === 0){
        return(
            <div className="posts-list-container">
                <div className="no-posts">No posts yet</div>
            </div>
        )
    }
    return(
        <div>
            <div className="view-btn-container">
                Change view:
                <Button onClick={onViewClick}>{singlePost? "Multi" : "Single"}</Button>
            </div>
            <div className="posts-list-container">
                {posts.map(post => 
                            <Post key={post.content._id}
                                    post={post.content}
                                    likes={post.likes}
                                    comments={post.comments}
                                    isLikedByLoggedinUser={post.isLikedByCurrentUser}
                                    view={!singlePost ? "multi" : "single"}/>
                    )}
            </div>
        </div>
    )
}