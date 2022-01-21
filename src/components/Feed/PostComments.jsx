import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { useFetch } from '../../store/fetch'


export default function postComments({postId, comments}) {
    const [postComments, setPostComments] = useState(comments);
    const [commentValue, setCommentValue] = useState('');
    const fetch = useFetch();

    const onCommentChange = useCallback((event) => {
        setCommentValue(event.target.value);
    }, [])

    const onPostCommentClick = useCallback(async () => {
        const comment = await fetch(`/posts/${postId}/add_comment`,{text: commentValue}, 'POST');
        if(comment) {
            const newArr = [...postComments]
            newArr.push(comment)
            setPostComments(newArr);
            setCommentValue('');
        }
    })

    return(
        <div>
            <div className="post-go-to-comments">
                {postComments.length > 3 ? <a href=''>See all {postComments.length} comments</a> : ''}
            </div>
            <div className="add-comment-container">
                <textarea value={commentValue} onChange={onCommentChange} type="text" placeholder="Add a comment..." rows="10" cols="12"/>
                <Button disabled={commentValue === '' ? true : false} variant="text" size="small" onClick={onPostCommentClick}>Post</Button>
            </div>
        </div>
    )
}