import { useRecoilState} from 'recoil'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from '../components/Feed/PostsList'
import { postsListState } from '../store/posts'
import { useFetch } from '../store/fetch'


export default function Feed() {
    const [postsList, setPostsList] = useRecoilState(postsListState);
    const [isLoading, setIsLoading] = useState(true);
    const fetch = useFetch();

    useEffect(async () => {
        const posts = await fetch('/feed');
        if(posts){
            setIsLoading(false);
            setPostsList(posts);
        }
    },[])
    
    return(
        <div className="feed-container">
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} /> 
                        : <PostsList posts={postsList}/>}
        </div>
    )
}