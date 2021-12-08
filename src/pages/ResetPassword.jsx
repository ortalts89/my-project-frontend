import Email from '../components/GlobalFields/Email';
import {validateEmail} from '../compositions/Validations'
import '../../dist/ResetPassword.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useState} from 'react'

const ActionButton = styled(Button)({
    margin: '8px',
})

export default function ResetPassword(){
    const [isContinueDisabled, setIsContinueDisabled] = useState(true)

    function onChange(event) {
        if(!validateEmail(event.target.value) || event.target.value.length === 0) {
            setIsContinueDisabled(true);
        } else {
            setIsContinueDisabled(false);
        }
    }

    return(
        <div className="reset-container">
            Rest Your Pasword
            <Email onChange={onChange}/>
            <div className="action-btn-container">
                <ActionButton variant="contained" disabled={isContinueDisabled}>Continue</ActionButton>
                <Link to='/'>
                    <ActionButton variant="contained">Cancel</ActionButton>
                </Link>
            </div>
        </div>
    )
}