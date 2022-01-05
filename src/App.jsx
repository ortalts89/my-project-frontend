import { useState, useCallback, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import UserProfilePopup from './components/MainMenu/UserProfilePopup';
import AddNewPostPopup from './components/NewPost/AddNewPostPopup'

function App() {
  const [isProfileDisplayed, setIsProfileDisplayed] = useState(false);
  const [isAddNewPostDisplayed, SetIsAddNewPostDisplayed] = useState(false);
  const [profileData, setProfileData] = useState({});

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
           <Login/>
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
        </Switch>
    </div>
  )
}

export default App
