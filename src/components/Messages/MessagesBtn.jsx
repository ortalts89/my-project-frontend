import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom'

export default function MessagesBtn({isDisplayed}) {
    if(!isDisplayed){
        return null;
    }
    
    return(
        <Link to='/messages'> 
            <div className='messageButton'>
                <Badge badgeContent={100} color="primary">
                    <EmailOutlinedIcon sx={{color:'text.secondary'}}/>
                </Badge>
            </div>
        </Link>
    )
}