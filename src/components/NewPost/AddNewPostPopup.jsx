import { useState } from 'react'
import AddNewPostContainer from './AddNewPostContainer'
import Popup from '../Popup'
import '../../../dist/AddNewPostPopup.css'


export default function AddNewPostPopUp({isDisplayed, onClose}) {
    const [createPostStep, setCreatePostStep] = useState(1);
    const [imagePath, setImagePath] = useState("");
    
    if(!isDisplayed){
        return null;
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        padding: '4px 32px 32px 32px',
        textAlign: 'center'
      };

    return(
        <Popup 
            style={createPostStep === 1 ? style : {...style, width:700}}
            onClose={() => {onClose(); setImagePath(''); setCreatePostStep(1);}}
            isDisplayed={isDisplayed}
            content= {<AddNewPostContainer
                         imagePath={imagePath}
                         setImagePath={setImagePath}
                         onClose={onClose}
                         createPostStep={createPostStep}
                         setCreatePostStep={setCreatePostStep}
                         />}
            title='Create Post'
        />
    )
}