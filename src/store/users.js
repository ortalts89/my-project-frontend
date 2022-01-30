import { atom, useSetRecoilState } from 'recoil';
import { postsListState } from './posts';
import { useHistory } from 'react-router-dom';
import { socket } from '../socket';


const loggedInUserState = atom({
    key: 'loggedInUserIdState',
    default: {id: '', fullname: '', thumbnail: ''},
})

const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: undefined
})

const accountDataState = atom({
    key: 'accountDataState',
    default: {fullname: '', email: '', password: ''},
})

const useLogout = () => {
    const setLoggedInUser = useSetRecoilState(loggedInUserState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);

    const setPostsList = useSetRecoilState(postsListState);
    const history = useHistory();

    return async () => {
        await fetch('/api/logout');
        history.push('/login');
        socket.emit('logout');
        setLoggedInUser({id: '', fullname: '', thumbnail: ''});
        setPostsList([]);
        setIsLoggedIn(false);
    }
}


export {
    loggedInUserState,
    isLoggedInState,
    useLogout,
    accountDataState
} 