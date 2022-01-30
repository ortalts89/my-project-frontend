import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from '../components/Feed/PostsList'
import { postsListState } from '../store/posts'
import ProfileInfo from '../components/Profile/ProfileInfo'
import '../../dist/Profile.css'
import { useFetch } from '../store/fetch'
import { isPostPopupDisplayedState } from '../store/components'
import { shouldRefreshPostsListState } from '../store/posts'



export default function Profile() {
    const [postsList, setPostsList] = useRecoilState(postsListState);
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [previouseUser, setPreviouseUser] = useState('');
    const isPostPopupDisplayed = useRecoilValue(isPostPopupDisplayedState);
    const [shouldRefreshPostsList, setShouldRefreshPostsList] = useRecoilState(shouldRefreshPostsListState)
    const fetch = useFetch();

    useEffect(async () => {
        if(userId !== previouseUser || shouldRefreshPostsList){
            setIsLoading(true);
            const userPosts = await fetch(`/posts/${userId}/profile`);
            if(userPosts){
                setPostsList(userPosts);
                setIsLoading(false);
                setPreviouseUser(userId);
                setShouldRefreshPostsList(false);
            }
        }
    }, [isPostPopupDisplayed, userId])

    return(
        <div>
            <ProfileInfo numOfPosts={postsList.length} />
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} /> 
                : <PostsList posts={postsList}/>}
        </div>
    )
}