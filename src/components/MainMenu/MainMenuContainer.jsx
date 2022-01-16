import MainMenuBtn from './MainMenuBtn';
import MainMenuMenu from './MainMenuMenu';
import { useState, useCallback } from 'react';

export default function MainMenuContainer({isDisplayed, onAccountOpen}) {
  if(!isDisplayed){
    return null;
  }


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAccountCLick = useCallback(() => {
    handleClose();
    onAccountOpen();
  },[])

  return (
    <div className="main-menu-container">
      <MainMenuBtn open={open} handleClick={handleClick}/>
      <MainMenuMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleAccountCLick={handleAccountCLick}/>
    </div>
  );
}
