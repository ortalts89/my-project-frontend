import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import '../../dist/SignUp.css'
import Username from '../components/GlobalFields/Username'
import Password from '../components/GlobalFields/Password'
import Email from '../components/GlobalFields/Email'
import FullName from '../components/GlobalFields/FullName'
import { useCallback } from 'react';

const ActionButton = styled(Button)({
    margin: '8px',
    marginTop: '30px'
})

export default function SignUp(){

    const onChange = useCallback((event) => {
       console.log('good');
    })

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const form = new FormData(event.target)

        await fetch('http://localhost:4000/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: form.get('full-name'),
                email: form.get('email'),
                username: form.get('username'),
                password: form.get('password')
            })
        }).then(console.log('successfully registered'))
    })

    return(
        <div className="sign-up-container">
            <form onSubmit={onSubmit}>
                <div className="title">MyFeed</div>
                <div className="sub-title">Sign up</div>
                <FullName />
                <Email />
                <Username />
                <Password onChange={onChange}/>
                <ActionButton type="submit" variant="contained">Sign Up</ActionButton>
                <Link to='/'>
                    <ActionButton variant="contained">Cancel</ActionButton>
                </Link>
            </form>
        </div>
    )
}