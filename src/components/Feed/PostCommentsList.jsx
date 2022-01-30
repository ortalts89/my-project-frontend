import PostComment from './PostComment';
import '../../../dist/CommentsList.css';


export default function PostCommentsList({onDeleteComment, comments, elementRef}) {
    return (
        <div className="post-comments-list-container" ref={elementRef}>
            <div>
                {comments.map( comment => <PostComment key={comment._id} comment={comment} onDeleteComment={onDeleteComment}/>)}
            </div>
        </div>
    )
}