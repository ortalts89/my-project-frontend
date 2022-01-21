import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useSetRecoilState } from 'recoil'
import { isAddNewPostPopupDisplayed } from '../../store/components';


export default function AddNewPostBtn({isDisplayed}) {
    const setIsAddNewPostPopupDisplayed = useSetRecoilState(isAddNewPostPopupDisplayed);
    if(!isDisplayed){
        return null
    }

    return(
        <AddBoxOutlinedIcon sx={{color:'text.secondary', marginRight:'15px', cursor:'pointer'}} onClick={() => setIsAddNewPostPopupDisplayed(true)} />
    )
}