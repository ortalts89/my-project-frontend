import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import ClosePopupBtn from './ClosePopupBtn'


export default function Popup({isDisplayed, onClose, title, style, content}) {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if(isDisplayed && !isFirstLoad){
        onClose();
      }
    setIsFirstLoad(false);
  },[location])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDisplayed}
        overflow = 'scroll'
        onClose={(event, reason) => {
            if(reason !== 'backdropClick'){
                onClose(event, reason);
            }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDisplayed}>
          <Box sx={style}>
            <div className="popup-title">{title}</div>
            <ClosePopupBtn onClick={onClose}/>
            <div className='post-container'>
              {content}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
