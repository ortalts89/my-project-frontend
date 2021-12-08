import '../../../dist/MainMenuBtn.css'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

export default function MainMenuBtn({open, handleClick}) {
    return(
        <IconButton
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <Avatar alt="Kuala" src="Kuala.png" variant="circular" />
        </IconButton>
    )
}