import { useState } from 'react'
import '../../../dist/AddNewPostPopup.css'
import AddNewPostUploadImg from './AddNewPostUploadImg';
import AddNewPostDetails from './AddNewPostDetails'
import ClosePopupBtn from '../ClosePopupBtn'


export default function AddNewPostPopUp({isDisplayed, onClose}) {
    const [imagePath, setImagePath] = useState("");
    if(!isDisplayed){
        return null;
    }

    return(
        <div className="full-screen-container">
            <div className="new-post-popup-container">
                <ClosePopupBtn onClick={onClose}/>
                <div className="title">Add Post</div>
                <AddNewPostUploadImg setImagePath={setImagePath} imagePath={imagePath}/>
                <AddNewPostDetails imagePath={imagePath}/>
            </div>
        </div>
    )
}