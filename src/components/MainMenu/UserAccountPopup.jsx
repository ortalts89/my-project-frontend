import { useState, useCallback, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useRecoilValue, useRecoilState } from 'recoil'
import FullName from "../GlobalFields/FullName"
import Email from "../GlobalFields/Email"
import Password from '../GlobalFields/Password'
import '../../../dist/ProfilePopup.css'
import { isAccountPopupDisplayed} from '../../store/components'
import { accountDataState } from '../../store/users'


const ActionButton = styled(Button)({
    margin: '8px',
})

export default function UserAccountPopup() {
    const [isPopupDisplayed, setIsPopupDisplayed] = useRecoilState(isAccountPopupDisplayed);
    const accountData = useRecoilValue(accountDataState);
    
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

    if(!isPopupDisplayed){
        return null;
    }

    return(
        <div className="full-screen-container">
            <div className="profile-popup-container">
                My Profile
                <form className="profile-form">
                    <FullName disabled={isDisabled} value={accountData.fullname} />
                    <Email disabled={isDisabled} value={accountData.email} />
                    <Password disabled={isDisabled} value={accountData.password} />
                    <div className='action-btn-container'>
                        {isEditDisplayed && <ActionButton variant="contained" onClick={onEditClick}>Edit</ActionButton>}
                        {isSaveDisplayed && <ActionButton variant="contained" onClick={onSaveClick}>Save</ActionButton>}
                        {isEditDisplayed && <ActionButton variant="contained" onClick={() => setIsPopupDisplayed(false)}>Close</ActionButton>}
                        {isSaveDisplayed && <ActionButton variant="contained" onClick={onCancelClick}>Cancel</ActionButton>}
                    </div>
                </form>
            </div>
        </div>
    )
}