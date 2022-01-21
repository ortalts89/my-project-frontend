import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import Popup from '../Shared/Popup';
import '../../../dist/AddNewPostPopup.css';
import { isAddNewPostPopupDisplayed } from '../../store/components';
import { addPostStepState, addPostImgPathState } from '../../store/posts';
import AddNewPostUploadImg from './AddNewPostUploadImg';
import AddNewPostDetails from './AddNewPostDetails';

export default function AddNewPostPopUp() {
    const [addPostStep, setAddPostStep] = useRecoilState(addPostStepState);
    const setAddPostImgPathState = useSetRecoilState(addPostImgPathState)
    const isPopupDisplayed = useRecoilValue(isAddNewPostPopupDisplayed);
    const setIsAddNewPostPopupDisplayed = useSetRecoilState(isAddNewPostPopupDisplayed);
    
    if(!isPopupDisplayed){
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
            style={addPostStep === 1 ? style : {...style, width:700}}
            onClose={() => {setIsAddNewPostPopupDisplayed(false);
                             setAddPostImgPathState('');
                             setAddPostStep(1);}}
            isDisplayed={isPopupDisplayed}
            content= {addPostStep === 1 ? <AddNewPostUploadImg/> : <AddNewPostDetails />}
            title='Create Post'
        />
    )
}