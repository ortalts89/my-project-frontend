import { atom } from 'recoil'

const loggedInUserState = atom({
    key: 'loggedInUser',
    default: null
})

export {loggedInUserState} ;