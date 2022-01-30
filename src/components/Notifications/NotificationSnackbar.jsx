import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

export default function NotificationSnackbar({postId, isDisplayed, text, handleClose}) {
    const history = useHistory();

    const onClick = useCallback(() => {
        history.push(`/post/${postId}`)
    }, [postId])

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isDisplayed}
                onClose={handleClose}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}
                message={text}
                autoHideDuration={6000}
                onClick={onClick}
                sx={{cursor: 'pointer'}}
            />
        </div>
    )
}