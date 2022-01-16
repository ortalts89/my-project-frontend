import '../../../dist/Logo.css';
import { Link } from 'react-router-dom';

export default function Logo({nextPage}) {
    return(
        <div className="logo-container">
            <Link to={nextPage}>
                <img src="/myFeedLogo.png" />
            </Link>
        </div>
    )
}