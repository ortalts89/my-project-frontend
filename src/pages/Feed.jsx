import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from '../components/Feed/PostsList';
import { postsListState } from '../store/posts';
import { useFetch } from '../store/fetch';
import { isPostPopupDisplayedState } from '../store/components';
import { shouldRefreshPostsListState } from '../store/posts';


export default function Feed() {
    const [postsList, setPostsList] = useRecoilState(postsListState);
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const isPostPopupDisplayed = useRecoilValue(isPostPopupDisplayedState);
    const [shouldRefreshPostsList, setShouldRefreshPostsList] = useRecoilState(shouldRefreshPostsListState)

    const fetch = useFetch();

    useEffect(async () => {
        if(isFirstLoad || shouldRefreshPostsList){
            setIsLoading(true);
            const posts = await fetch('/posts/feed');
            if(posts){
                setPostsList(posts);
                setIsLoading(false);
                setShouldRefreshPostsList(false);
                setIsFirstLoad(false);
            }
        }
    },[isPostPopupDisplayed])
    
    return(
        <div className="feed-container">
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} /> 
                        : <PostsList posts={postsList}/>}
        </div>
    )
}