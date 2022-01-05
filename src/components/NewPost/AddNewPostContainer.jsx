import { useState } from 'react'
import AddNewPostUploadImg from './AddNewPostUploadImg'
import AddNewPostDetails from './AddNewPostDetails'

export default function AddNewPostContainer({imagePath, setImagePath, onClose, createPostStep, setCreatePostStep}){
    const [images, setImages] = useState([]);
    const [postId, setPostId] = useState(null);


    return(
        <div className='post-container'>
            {createPostStep === 1 && 
                <AddNewPostUploadImg 
                    setPostId={setPostId}
                    imagePath={imagePath} 
                    setImagePath={setImagePath} 
                    setCreatePostStep={setCreatePostStep}
                    images={images}
                    setImages={setImages}
                    />}
            {createPostStep === 2 && 
                <AddNewPostDetails 
                postId={postId}
                setImagePath={setImagePath}
                imagePath={imagePath}
                setCreatePostStep={setCreatePostStep}
                onClose={onClose}
                />}
        </div>
        
    )
}