import './App.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import UserProfilePopup from './components/MainMenu/UserProfilePopup';
import AddNewPostPopup from './components/NewPost/AddNewPostPopup'
import { useState, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useEffect } from 'react'

function App() {
  const [isProfileDisplayed, setIsProfileDisplayed] = useState(false)
  const [isAddNewPostDisplayed, SetIsAddNewPostDisplayed] = useState(false)
  const [profileData, setProfileData] = useState({});
  const [currentUser, setCurrentUser] = useState('');

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

  useEffect(async () => {
  await fetch('/api/me')
    .then((res) => res.json())
    .then((data) => setCurrentUser(data.id))
  },[])

  return (
    <div className="app">
      <Router>
        <Header onProfileOpen={onProfileOpen} onNewPostOpen={onNewPostOpen}/>
        <AddNewPostPopup isDisplayed={isAddNewPostDisplayed} onClose={onNewPostClose} />
        <UserProfilePopup isDisplayed={isProfileDisplayed} onClose={onProfileClose} data={profileData} />
        <Switch>
          <Route exact path="/">
           <Login />
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
      </Router>
    </div>
  )
}

export default App
