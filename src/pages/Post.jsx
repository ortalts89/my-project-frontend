import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostPopupContent from "../components/Feed/PostPopupContent";
import CircularProgress from '@mui/material/CircularProgress';
import { useFetch } from '../store/fetch';
import '../../dist/Post.css';


export default function Post() {
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState(null);
    const fetch = useFetch();

    useEffect(async () => {
        setIsLoading(true)
            const post = await fetch(`/posts/${postId}`,{}, 'GET');
            if(post){
                setPost(post);
                setIsLoading(false);
            }
    },[postId])

    return(
        <div className="post-page-container">
            {isLoading ? <CircularProgress /> : <PostPopupContent post={post}/>}
        </div>
    )
}