import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from '../components/Feed/PostsList'
import { postsListState } from '../store/posts'

export default function Feed() {
    const [postsList, setPostsList] = useRecoilState(postsListState);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(async () => {
        await fetch('/api/posts')
        .then((res) => {
            if(res.status === 200){
                
                return res.json();
            }else{
                throw new Error('Unauthorized');
            }
            })
        .then((posts) => {
            setIsLoading(false);
            setPostsList(posts);
        })
        .catch((err) => {console.log(err); history.push('/login')})
    },[])

   
    return(
        <div className="feed-container">
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} /> 
                        : <PostsList posts={postsList}/>}
        </div>
    )
}