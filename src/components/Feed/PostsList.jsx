import {posts} from '../../mockups/posts'
import '../../../dist/PostsList.css'
import Grid from '@mui/material/Grid';
import Post from './Post';

export default function PostsList() {
    return(
        <div className="posts-list-container">
            <Grid container spacing={5}>
                {posts().map(post => <Post key={post.id} post={post}/> )}
            </Grid>
        </div>
    )
}