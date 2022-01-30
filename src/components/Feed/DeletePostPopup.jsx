import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { isDeletePostPopupDisplayedState } from '../../store/components';
import { useFetch } from '../../store/fetch'
import '../../../dist/DeletePostPopup.css'
import { postToDeleteState } from '../../store/posts'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '15px'
  };

export default function DeletePostPopup() {
    const [isPopupOpen, setIsPopupOpen] = useRecoilState(isDeletePostPopupDisplayedState);
    const [postToDelete, setPostToDelete] = useRecoilState(postToDeleteState);
    const onClose = useCallback(() => setIsPopupOpen(false), []);
    const fetchPut = useFetch();
    
    const deletePost = useCallback(async () => {
        const postId = await fetchPut(`/posts/${postToDelete}`,{}, 'DELETE');
        if(postId){
            setIsPopupOpen(false);
            setPostToDelete('');
            location.reload();
        }
       
    }, [postToDelete])

    return(
        <div className="delete-post-container">
            <Modal
                open={isPopupOpen}
                onClose={(event, reason) => {
                    if(reason !== 'backdropClick'){
                        onClose();
                    }
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                    >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Warning
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this post?
                </Typography>
                <div className='buttons-container'>
                    <div className='yes-btn-container'>
                        <Button onClick={deletePost}>Yes</Button>
                    </div>
                    <div className='no-btn-container'>
                        <Button onClick={onClose}>No</Button>
                    </div>
                </div>
                </Box>
            </Modal>
        </div>
    )
}