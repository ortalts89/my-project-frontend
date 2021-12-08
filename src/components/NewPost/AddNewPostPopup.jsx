import '../../../dist/AddNewPostPopup.css'
import { styled } from '@mui/material/styles';
import { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import ImageUploading from "react-images-uploading";


const UploadButton = styled(Button)({
    margin: '0 auto'
})

export default function AddNewPostPopUp({isDisplayed, onClose}) {
    if(!isDisplayed){
        return null;
    }
    const [images, setImages] = useState([]);
    const [imagePath, setImagePath] = useState("");

    const onChange = useCallback((event) => {
        let files = [...images];
        files.push(event.target.files[0]);
        setImages(files)
        setImagePath(URL.createObjectURL(event.target.files[0]));
    })
    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        const formToSend = new FormData();
        images.map(image => formToSend.append("files", image))
        console.log(images);
    })
  
    return(
        <div className="full-screen-container">
            <div className="profile-popup-container">
                <div>Add Post</div>
                <form onSubmit={onSubmit}>
                    <div className="upload-btn">
                        <label>
                            <input accept="image/*" onChange={onChange} name='files' type='file'/>
                        </label>
                    </div>
                    <img src={imagePath}/>
                    <button type='submit'>Next</button>
                </form>
                </div>
            </div>
    )
}