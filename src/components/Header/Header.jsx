import '../../../dist/Header.css'
import Logo from './Logo'
import MainMenuContainer from '../MainMenu/MainMenuContainer'
import SearchBar from '../Search/SearchBar'
import NotificationsContainer from '../Notifications/NotificationsContainer'
import MessagesBtn from '../Messages/MessagesBtn'
import AddNewPostBtn from '../NewPost/AddNewPostBtn'
import { useLocation } from 'react-router-dom'


export default function Header({onSettingsOpen, onNewPostOpen}) {
    let currentLocation = useLocation().pathname;
    let isDisplayed = true;
    let nextPage = '/'; 

    if (currentLocation === '/' ||
         currentLocation === '/reset-password' || 
         currentLocation === '/signUp') {
        isDisplayed = false;
    }

    if(currentLocation !== '/'){
        nextPage = '/feed';
    }

    return (
        <div className='header-container'>
            <Logo nextPage={nextPage} />
            <SearchBar isDisplayed={isDisplayed} />
            <AddNewPostBtn isDisplayed={isDisplayed} onClick={onNewPostOpen}/>
            <NotificationsContainer isDisplayed={isDisplayed}/>
            <MessagesBtn isDisplayed={isDisplayed} />
            <MainMenuContainer isDisplayed={isDisplayed} onSettingsOpen={onSettingsOpen} />
        </div>
    )
}