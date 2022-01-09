import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import PostsList from '../components/Feed/PostsList'
import { postsListState } from '../store/posts'

export default function MyPage() {
    const [postsList, setPostsList] = useRecoilState(postsListState);

    useEffect(async () => {
        await fetch('/api/posts')
        .then((res) => res.json())
        .then((posts) => setPostsList(posts))
    },[])

    return(
        <div>
            <PostsList posts={postsList}/>
        </div>
    )
}