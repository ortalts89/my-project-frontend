import FullName from "../GlobalFields/FullName"
import Email from "../GlobalFields/Email"
import Password from '../GlobalFields/Password'
import '../../../dist/ProfilePopup.css'
import { styled } from '@mui/material/styles';
import { useState, useCallback, useEffect } from "react";
import Button from '@mui/material/Button';

const ActionButton = styled(Button)({
    margin: '8px',
})

export default function UserProfilePopup({isDisplayed, onClose, data}) {
    if(!isDisplayed){
        return null;
    }
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setFullName(data.fullname);
        setEmail(data.email);
        setPassword(data.password);
    },[data])

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

    const onCancelClick = useCallback(() => {
        setIsDisabled(true)
        setIsEditDisplayed(true)
        setIsSaveDisplayed(false)
    }, [])

    return(
        <div className="full-screen-container">
            <div className="profile-popup-container">
                My Profile
                <form className="profile-form">
                    <FullName disabled={isDisabled} value={fullname} />
                    <Email disabled={isDisabled} value={email} />
                    <Password disabled={isDisabled} value={password} />
                    <div className='action-btn-container'>
                        {isEditDisplayed && <ActionButton variant="contained" onClick={onEditClick}>Edit</ActionButton>}
                        {isSaveDisplayed && <ActionButton variant="contained" onClick={onSaveClick}>Save</ActionButton>}
                        {isEditDisplayed && <ActionButton variant="contained" onClick={onClose}>Close</ActionButton>}
                        {isSaveDisplayed && <ActionButton variant="contained" onClick={onCancelClick}>Cancel</ActionButton>}
                    </div>
                </form>
            </div>
        </div>
    )
}