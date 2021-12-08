import FullName from "../GlobalFields/FullName"
import Email from "../GlobalFields/Email"
import Password from '../GlobalFields/Password'
import '../../../dist/ProfilePopup.css'
import { styled } from '@mui/material/styles';
import { useState, useCallback } from "react";
import Button from '@mui/material/Button';

const ActionButton = styled(Button)({
    margin: '8px',
})

export default function SettingsPopup({isDisplayed, onClose}) {
    if(!isDisplayed){
        return null;
    }
    
    const [isDisabled, setIsDisabled] = useState(true)
    const [isEditDisplayed, setIsEditDisplayed] = useState(true)
    const [isSaveDisplayed, setIsSaveDisplayed] = useState(false)

    const onEditClick = useCallback(() => {
        setIsDisabled(false)
        setIsEditDisplayed(false)
        setIsSaveDisplayed(true)
    }, [])

    const onSaveClick = useCallback(() => {
        setIsDisabled(true)
        setIsEditDisplayed(true)
        setIsSaveDisplayed(false)
    }, [])

    return(
        <div className="full-screen-container">
            <div className="profile-popup-container">
                My Profile
                <form className="profile-form">
                    <FullName disabled={isDisabled} />
                    <Email disabled={isDisabled}/>
                    <Password disabled={isDisabled}/>
                    <div className='action-btn-container'>
                        {isEditDisplayed && <ActionButton variant="contained" onClick={onEditClick}>Edit</ActionButton>}
                        {isSaveDisplayed && <ActionButton variant="contained" onClick={onSaveClick}>Save</ActionButton>}
                        <ActionButton variant="contained" onClick={onClose}>Close</ActionButton>
                    </div>
                </form>
            </div>
        </div>
    )
}