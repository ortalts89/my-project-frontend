import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import '../../../dist/Header.css';
import Logo from './Logo';
import MainMenuContainer from '../MainMenu/MainMenuContainer';
import SearchBar from '../Search/SearchBar';
import NotificationsContainer from '../Notifications/NotificationsContainer';
import AddNewPostBtn from '../NewPost/AddNewPostBtn';
import { loggedInUserState, isLoggedInState } from '../../store/users';
import { isLocationAuthorized } from '../../compositions/unauthorizedLocations';


export default function Header() {
    let currentLocation = useLocation().pathname;
    const loggedInUser = useRecoilValue(loggedInUserState);
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [nextPage, setNextPage] = useState('/');
    
    useEffect(() => {
        if (!isLocationAuthorized(currentLocation) || !isLoggedIn) {
            setIsDisplayed(false);
        }
        else {
            setIsDisplayed(true);
        }

        if(currentLocation === '/login'){
            setNextPage('/login');
        }
        else {
            setNextPage('/');
        }

    }, [currentLocation, isLoggedIn]);

    return (
        <div className='header-container'>
            <Logo nextPage={nextPage} />
            {isDisplayed && <SearchBar/>}
            <AddNewPostBtn isDisplayed={isDisplayed} />
            <NotificationsContainer isDisplayed={isDisplayed}/>
            <div className="user-fullname">{loggedInUser.fullname}</div>
            <MainMenuContainer isDisplayed={isDisplayed} />
        </div>
    )
}