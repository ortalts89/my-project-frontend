import Username from '../components/GlobalFields/Username'
import Password from '../components/GlobalFields/Password'
import '../../dist/Login.css'
import { validateUsername, validatePassword } from '../compositions/Validations'
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@mui/material/Button';


export default function Login(){
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const usernameChanged = useRef(false);
    const passwordChanged = useRef(false);
    let history = useHistory();

    const onChange = useCallback((event) => {
        event.preventDefault();
        if(event.target.name === 'username'){
            setIsUsernameValid(validateUsername(event));
            usernameChanged.current = true;
        }else if(event.target.name === 'password'){
            setIsPasswordValid(validatePassword(event));
            passwordChanged.current = true;
        }
    })

    useEffect(() => {
        if(isUsernameValid && isPasswordValid){
            setIsSubmitDisabled(false);
        }
        else{
            setIsSubmitDisabled(true);
        }
    },[isUsernameValid, isPasswordValid])

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        await fetch('http://localhost:4000/api/login',{
            headers: {
                'username': formData.get('username'),
                'password': formData.get('password')
            }
        }).then((res) => {
            if(res.status === 200) {
                history.push('/feed');
            }
            else(console.log("Wrong username or password"));
        });
    }, [])

    return (
        <div>
            <div className="login-background"></div>
            <div className="login-foreground">
                <div className="login-container">
                    <div className="title">MyFeed</div>
                    <form onSubmit={onSubmit}>
                        <Username onChange={onChange}/>
                        <Password onChange={onChange}/>
                        <Button variant="contained" className="submit-button" type="submit" disabled={isSubmitDisabled}>Log In</Button>
                    </form>
                    <div className="reset-password">
                        <Link to='/reset-password'>
                            <span>Forgot Password?</span>
                        </Link>
                    </div>
                    <div className="sign-up">
                        New User?&nbsp; 
                        <a href="/signUp"><span>Sign Up</span></a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}