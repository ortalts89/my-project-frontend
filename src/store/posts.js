import { atom } from 'recoil'

const postsListState = atom({
    key: 'postsListState',
    default: []
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

export {
    postsListState,
    postToDeleteState,
    postToAddIdState,
    postToAddCaptionState,
    postToAddLocationState,
    postToAddHashtagsState,
    addPostStepState,
    addPostImgPathState
} 
