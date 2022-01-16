import { Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Feed from '../../pages/Feed'
import Profile from '../../pages/Profile'
import { loggedInUserState } from '../../store/users'


export default function Authorized() {
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  useEffect(() => {
    const isUserLoggedIn = true;
    if (isUserLoggedIn) {
      fetch('/api/me')
      .then((res) => {
        if(res.status === 200){
          return res.json()
        }else{
          throw new Error('User not found')
        }
      })
      .then((user) => setLoggedInUser({id: user.id, fullname: user.fullname, thumbnail: user.thumbnail}))
      .catch((err) => console.log(err))
    }
  },[])

    return(
        <div>
            <Switch>
                <Route exact path="/">
                    <Feed />
                </Route>
                <Route path="/profiles/:userId">
                    <Profile />
                </Route>
            </Switch>
        </div>
    )
}