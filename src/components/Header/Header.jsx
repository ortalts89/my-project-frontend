import { useLocation } from 'react-router-dom'
import '../../../dist/Header.css'
import Logo from './Logo'
import MainMenuContainer from '../MainMenu/MainMenuContainer'
import SearchBar from '../Search/SearchBar'
import NotificationsContainer from '../Notifications/NotificationsContainer'
import MessagesBtn from '../Messages/MessagesBtn'
import AddNewPostBtn from '../NewPost/AddNewPostBtn'


export default function Header({onAccountOpen, onNewPostOpen}) {
    let currentLocation = useLocation().pathname;
    let isDisplayed = true;
    let nextPage = '/'; 

    if (currentLocation === '/login' ||
         currentLocation === '/reset-password' || 
         currentLocation === '/signUp'||
         currentLocation === '/unauthorized') {
        isDisplayed = false;
    }

    if(currentLocation === '/login'){
        nextPage = '/login';
    }

    return (
        <div className='header-container'>
            <Logo nextPage={nextPage} />
            {isDisplayed && <SearchBar/>}
            <AddNewPostBtn isDisplayed={isDisplayed} onClick={onNewPostOpen}/>
            <NotificationsContainer isDisplayed={isDisplayed}/>
            <MessagesBtn isDisplayed={isDisplayed} />
            <MainMenuContainer isDisplayed={isDisplayed} onAccountOpen={onAccountOpen} />
        </div>
    )
}