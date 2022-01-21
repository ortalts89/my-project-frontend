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
import Unauthorized from './components/Unauthorized/Unahuthorized'
import DeletePostPopup from './components/Feed/DeletePostPopup'


function App() {


  return (
      <div className="app">
        <Header />
        <AddNewPostPopup />
        <UserAccountPopup />
        <DeletePostPopup />
        <Switch>
          <Route exact path="/unauthorized">
            <Unauthorized />
          </Route>
          <Route exact path="/login">
          < Login />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/signup">
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
