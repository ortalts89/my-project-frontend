import '../../../dist/PostsList.css'
import Post from './Post';


export default function PostsList({posts}) {

    if(posts.length === 0){
        return(
            <div className="posts-list-container">
                <div className="no-posts">No posts yet</div>
            </div>
        )
    }
    return(
        <div className="posts-list-container">
            {posts.map(post => <Post key={post._id} post={post} />)}
        </div>
    )
}