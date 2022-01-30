import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Feed from '../../pages/Feed';
import Profile from '../../pages/Profile';
import Post from '../../pages/Post';
import { loggedInUserState } from '../../store/users';
import { socket } from '../../socket';
import NotificationSnackbar from '../Notifications/NotificationSnackbar';
import { isLoggedInState } from '../../store/users';


export default function Authorized() {
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [notificationPostId, setNotificationPostId] = useState('');
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if(isLoggedIn !== undefined){
      setIsLoading(false)
    }
  }, [isLoggedIn])

  const handleClose = () => {
    setIsSnackbarOpen(false);
    };

  useEffect(() => {
    socket.on('get notification', (data) => {
        setSnackbarText(data.text);
        setNotificationPostId(data.postId);
        setIsSnackbarOpen(true);
    })
}, [])

useEffect(() => {
  socket.on('connect', () => {
    console.log('connected to server');
})
}, [])

  useEffect(() => {
    socket.on('disconnect', () => {
      socket.socket.reconnect();
  })
  }, [])

  useEffect(() => {
      fetch('/api/me')
      .then((res) => {
        if(res.status === 200){
          setIsLoggedIn(true);
          return res.json()
        }else{
          throw new Error('User not found')
        }
      })
      .then((user) => {setLoggedInUser({id: user.id, fullname: user.fullname, thumbnail: user.thumbnail})})
      .catch(() => setIsLoggedIn(false))
  },[])

    return(
      <div>
        {isLoading ? null :
            <div className="page-container">
            <NotificationSnackbar postId={notificationPostId} isDisplayed={isSnackbarOpen} text={snackbarText} handleClose={handleClose} />
              <Switch>
                  <Route exact path="/">
                    {isLoggedIn ? <Feed /> : <Redirect to='/login' />}
                  </Route>
                  <Route path="/profile/:userId">
                      <Profile />
                  </Route>
                  <Route path="/post/:postId">
                      <Post />
                  </Route>
              </Switch>
          </div>
        }
      </div>
        
    )
}