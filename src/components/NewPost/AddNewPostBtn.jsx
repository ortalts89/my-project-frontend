import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export default function AddNewPostBtn({isDisplayed, onClick}) {
    if(!isDisplayed){
        return null
    }

    return(
        <AddBoxOutlinedIcon sx={{color:'text.secondary', marginRight:'15px', cursor:'pointer'}} onClick={onClick} />
    )
}