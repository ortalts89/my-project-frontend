import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { isPostPopupDisplayedState } from '../../store/components';
import PostPopupContent from './PostPopupContent';
import Popup from '../Shared/Popup';
import { lastPostState } from '../../store/posts';
import { useFetch } from '../../store/fetch';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '70%',
    width: '50%',
    minHeight: '400px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    padding: '0 32px 0 32px',
    textAlign: 'center'
  };

export default function PostPopup() {
    const [isPostPopupDisplayed, setIsPostPopupDisplayed] = useRecoilState(isPostPopupDisplayedState);
    const [postId, setPostId] = useRecoilState(lastPostState);
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetch = useFetch();
    
    useEffect(async () => {
        if(isPostPopupDisplayed){
            setIsLoading(true)
            const post = await fetch(`/posts/${postId}`,{}, 'GET');
            if(post){
                setPost(post);
                setIsLoading(false);
            }
        } else {
            setPostId(null);
        }
    },[isPostPopupDisplayed, postId])

    if(!isPostPopupDisplayed){
        return null;
    }
    
    return (
        <Popup
            style={style}
            title=''
            isDisplayed={isPostPopupDisplayed}
            onClose={() => {
                setIsPostPopupDisplayed(false);
                history.back();
            }}
            content={isLoading ? <CircularProgress/> : <PostPopupContent post={post} />} 
        />
    )
}