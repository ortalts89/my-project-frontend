import CloseIcon from '@mui/icons-material/Close';
import '../../dist/ClosePopupBtn.css'

export default function ClosePopupBtn({onClick}) {
    return (
        <div className="btn-container">
            <CloseIcon onClick={onClick} fontSize={'small'}/>
        </div>
    )
}