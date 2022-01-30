import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFetch } from '../../store/fetch';
import { shouldRefreshPostsListState } from '../../store/posts';
import { socket } from '../../socket';



export default function postAddComment({postId, postAuthor, comments, setPostComments}) {
    const [commentValue, setCommentValue] = useState('');
    const setShouldRefreshPostsList = useSetRecoilState(shouldRefreshPostsListState);
    const fetch = useFetch();

    const onCommentChange = useCallback((event) => {
        setCommentValue(event.target.value);
    }, [])

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const comment = await fetch(`/posts/${postId}/comments`,{text: commentValue}, 'POST');
        if(comment) {
            const newArr = [...comments]
            newArr.push(comment)
            setPostComments(newArr);
            setCommentValue('');
            setShouldRefreshPostsList(true);
            socket.emit('send notification', {content: 'comment', to: postAuthor, postId: postId})
        }
    }, [postId, commentValue])

    const handleKeyPress = useCallback((event) => {
        if(event.key === "Enter" && event.shiftKey){
            console.log("ctrl + enter")
            setCommentValue(commentValue + "\n");
        }
        else if(event.key === "Enter" && !event.shiftKey){
            event.preventDefault();
            onSubmit(event);
        } 
    },[commentValue])

    return(
            <div className="add-comment-container">
                <form onSubmit={onSubmit}>
                    <textarea value={commentValue} onChange={onCommentChange} onKeyPress={handleKeyPress} type="text" placeholder="Add a comment..." rows="10" cols="12"/>
                    <Button disabled={commentValue === '' ? true : false} variant="text" size="small" type="submit">Post</Button>
                </form>
            </div>
    )
}