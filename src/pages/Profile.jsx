import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from '../components/Feed/PostsList'
import { postsListState } from '../store/posts'
import ProfileInfo from '../components/Profile/ProfileInfo'
import '../../dist/Profile.css'
import { useFetch } from '../store/fetch'


export default function Profile() {
    const [postsList, setPostsList] = useRecoilState(postsListState);
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const fetchGet = useFetch();
    const location = useLocation();
    
    useEffect(async () => {
        setIsLoading(true);
        const userPosts = await fetchGet(`/posts/${userId}`);
        if(userPosts){
            setPostsList(userPosts);
            setIsLoading(false);
        }

    }, [location.pathname])

    return(
        <div>
            <ProfileInfo numOfPosts={postsList.length} />
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} /> 
                : <PostsList posts={postsList}/>}
        </div>
    )
}