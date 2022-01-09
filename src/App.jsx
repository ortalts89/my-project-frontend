import { useState, useCallback, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useSetRecoilState } from 'recoil'
import './App.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import MyPage from './pages/MyPage'
import UserProfilePopup from './components/MainMenu/UserProfilePopup';
import AddNewPostPopup from './components/NewPost/AddNewPostPopup'
import { loggedInUserState } from './store/users'


function App() {
  const [isProfileDisplayed, setIsProfileDisplayed] = useState(false);
  const [isAddNewPostDisplayed, SetIsAddNewPostDisplayed] = useState(false);
  const [profileData, setProfileData] = useState({});
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    if (isUserLoggedIn) {
      fetch('/api/me')
      .then((res) => {
        if(res.status === 200){
          return res.json()
        }else{
          throw new Error('User not found')
        }
      })
      .then((userId) => setLoggedInUser(userId))
      .catch((err) => console.log(err))
    }
  },[])

  const onProfileOpen = useCallback(async () => {
    await fetch('api/profile')
    .then((res) => res.json())
    .then((data) => {
      setProfileData(data)});
    setIsProfileDisplayed(true);
  }, [])

  const onProfileClose = useCallback(() => {
    setIsProfileDisplayed(false);
  }, [])
  const onNewPostOpen = useCallback(() => {
    SetIsAddNewPostDisplayed(true);
  }, [])
  const onNewPostClose = useCallback(() => {
    SetIsAddNewPostDisplayed(false);
  }, [])

  return (
      <div className="app">
        <Header onProfileOpen={onProfileOpen} onNewPostOpen={onNewPostOpen}/>
        <AddNewPostPopup isDisplayed={isAddNewPostDisplayed} onClose={onNewPostClose} />
        <UserProfilePopup isDisplayed={isProfileDisplayed} onClose={onProfileClose} data={profileData} />
        <Switch>
          <Route path="/login">
          < Login/>
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Feed />
          </Route>
          <Route path="/my-page">
            <MyPage />
          </Route>
        </Switch>
      </div>
  )
}

export default App
