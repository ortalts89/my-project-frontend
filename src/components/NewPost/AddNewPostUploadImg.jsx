import { useState, useCallback, useEffect } from "react";
import Button from '@mui/material/Button';
import '../../../dist/AddNewPostUploadingImg.css'
import { useFetch } from '../../store/fetch'


export default function AddNewPostUploadImg({setPostId, setImagePath, imagePath, setCreatePostStep, images, setImages}){
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const fetchPost = useFetch();

    useEffect(() =>{
        if(images.length > 0){
            setIsNextDisabled(false);
        }else{
            setIsNextDisabled(true);
        }
    }, [images])

    const onChange = useCallback((event) => {
        let files = [...images];
        files.push(event.target.files[0]);
        setImages(files)
        setImagePath(URL.createObjectURL(event.target.files[0]));
    }, [images])

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsNextDisabled(true);
        let formToSend = new FormData();
        images.map(image => formToSend.append("images",image));

        const postId = await fetchPost('/posts/add_post', formToSend, 'POST');
        if(postId){
            setPostId(postId);
            setCreatePostStep(2);
            console.log(postId)
        }
    },[images])

    return (
        <form onSubmit={onSubmit}>
            <div  className="upload-form">
                <div className="post-image">
                    <img src={imagePath}/>
                </div>
                <div className={images.length === 0 ? 'upload-btn' : 'upload-btn-edit'}>
                    <label>
                        {images.length === 0 ? 'Select Image' : 'Change Image'}
                        <input accept="image/*" onChange={onChange} name='files' type='file'/>
                    </label>
                </div>
                <div className="next-btn">
                    <Button size='small' variant="contained" type='submit' disabled={isNextDisabled}>Next</Button>
                </div>
            </div>
        </form>
       
    )
}