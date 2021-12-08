import '../../../dist/SearchBar.css'
import SearchBtn from './SearchBtn'
import { useHistory } from 'react-router-dom'

export default function SearchBar({isDisplayed}) {
    const history = useHistory();
    //const dispatch = useDispatch();

    function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('query');
        //dispatch(fetchPosts(query));
        query !== '' ? history.push(`/?q=${query}`) : history.push("/feed")
    }

    if(!isDisplayed){
        return null;
    }
    
    return(
        <form className='search-form' onSubmit={onSubmit}>
            <div className="search-container">
                <SearchBtn />
                <input name="query" className="search-input" type="text" placeholder="Search" />
            </div>
        </form>
    )
}