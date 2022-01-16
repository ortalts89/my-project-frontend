import { atom, useSetRecoilState } from 'recoil'
import { postsListState } from './posts'
import { useHistory } from 'react-router-dom'



const loggedInUserState = atom({
    key: 'loggedInUserIdState',
    default: {id: '', fullname: '', thumbnail: ''},
})

const accountDataState = atom({
    key: 'accountDataState',
    default: {fullname: '', email: '', password: ''},
})

const useLogout = () => {
    const setUser = useSetRecoilState(loggedInUserState);
    const setPostsList = useSetRecoilState(postsListState);
    const history = useHistory();

    return async () => {
        setUser({id: '', fullname: '', thumbnail: ''});
        setPostsList([]);
        await fetch('/api/logout');
        history.push('/login');
    }
}


export {
    loggedInUserState,
    useLogout,
    accountDataState
} 