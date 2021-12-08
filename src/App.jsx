import './App.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import SettingsPopup from './components/MainMenu/SettingsPopup';
import AddNewPostPopup from './components/NewPost/AddNewPostPopup'
import { useState, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)
  const [isAddNewPostDisplayed, SetIsAddNewPostDisplayed] = useState(false)

  const onSettingsOpen = useCallback(() => {
    setIsSettingsDisplayed(true);
  }, [])
  const onSettingsClose = useCallback(() => {
    setIsSettingsDisplayed(false);
  }, [])
  const onNewPostOpen = useCallback(() => {
    SetIsAddNewPostDisplayed(true);
  }, [])
  const onNewPostClose = useCallback(() => {
    SetIsAddNewPostDisplayed(false);
  }, [])


  return (
    <div className="app">
      <Router>
        <Header onSettingsOpen={onSettingsOpen} onNewPostOpen={onNewPostOpen}/>
        <AddNewPostPopup isDisplayed={isAddNewPostDisplayed} onClose={onNewPostClose} />
        <SettingsPopup isDisplayed={isSettingsDisplayed} onClose={onSettingsClose} />
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
