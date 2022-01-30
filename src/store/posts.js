import { atom } from 'recoil'


const postsListState = atom({
    key: 'postsListState',
    default: []
})

const lastPostState = atom({ 
    key: 'lastPostState', 
    default: null,
})


const postToDeleteState = atom({
    key: 'postToDeleteState',
    default: ''
})

const postToAddIdState = atom({
    key: 'postToAddIdState',
    default: ''
})

const postToAddCaptionState = atom({
    key: 'postToAddCaptionState',
    default: ''
})

const postToAddLocationState = atom({
    key: 'postToAddLocationState',
    default: ''
})

const postToAddHashtagsState = atom({
    key: 'postToAddHashtagsState',
    default: ''
})

const addPostStepState = atom({
    key: 'addPostStepState',
    default: 1
})

const addPostImgPathState = atom({
    key: 'addPostImgPathState',
    default: ''
})

const shouldRefreshPostsListState = atom({
    key: 'shouldRefreshPostsListState',
    default: false
})


export {
    postsListState,
    postToDeleteState,
    postToAddIdState,
    postToAddCaptionState,
    postToAddLocationState,
    postToAddHashtagsState,
    addPostStepState,
    addPostImgPathState,
    lastPostState,
    shouldRefreshPostsListState
} 
