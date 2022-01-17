import { useCallback } from 'react'
import { Route, Switch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil'
import './App.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp'
import UserAccountPopup from './components/MainMenu/UserAccountPopup';
import AddNewPostPopup from './components/NewPost/AddNewPostPopup'
import Authorized from '../src/components/Authorized/Authorized'
import { isAddNewPostPopupDisplayed } from './store/components'
import Unauthorized from './components/Unauthorized/Unahuthorized'
import DeletePostPopup from './components/Feed/DeletePostPopup'


function App() {
  const SetIsAddNewPostDisplayed = useSetRecoilState(isAddNewPostPopupDisplayed);

  const onNewPostOpen = useCallback(() => {
    SetIsAddNewPostDisplayed(true);
  }, [])
  const onNewPostClose = useCallback(() => {
    SetIsAddNewPostDisplayed(false);
  }, [])

  return (
      <div className="app">
        <Header onNewPostOpen={onNewPostOpen}/>
        <AddNewPostPopup onClose={onNewPostClose} />
        <UserAccountPopup />
        <DeletePostPopup />
        <Switch>
          <Route exact path="/unauthorized">
            <Unauthorized />
          </Route>
          <Route path="/login">
          < Login />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Authorized />
          </Route>
        </Switch>
      </div>
  )
}

export default App
