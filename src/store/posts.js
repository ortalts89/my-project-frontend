import { atom } from 'recoil'

const postsListState = atom({
    key: 'postsListState',
    default: []
})


const postToDeleteState = atom({
    key: 'postToDeleteState',
    default: ''
})

export {
    postsListState,
    postToDeleteState
} 
