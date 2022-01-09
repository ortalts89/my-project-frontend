import { atom } from 'recoil'

const postsListState = atom({
    key: 'postsListState',
    default: []
})

export {postsListState} ;