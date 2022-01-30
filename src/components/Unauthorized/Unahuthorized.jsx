import Button from '@mui/material/Button';
import { useCallback} from 'react';
import { useLogout } from '../../store/users';
import '../../../dist/Unauthorized.css';

export default function Unauthorized() {
    const logout = useLogout();

    const onOkClick = useCallback(() => {
        logout();
    }, [])

    return(
        <div className="unauthorized-container">
            <div className="unauthorized-title">You are not authorized to view this page</div>
            <div className="unauthorized-ok-btn">
                <Button onClick={onOkClick}>Ok</Button>
            </div>
        </div>
    )
}