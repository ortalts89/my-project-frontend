import { useCallback, useState} from 'react'
import Button from '@mui/material/Button';
import '../../../dist/AddNewPostDetails.css'
import AutocompleteInput from '../shared/autocompleteInput';
import { useFetch } from '../../store/fetch'


export default function AddNewPostDetails({postId, setImagePath, imagePath, setCreatePostStep, onClose}){
    const [postCaption, setPostCaption] = useState('');
    const [postHashtags, setPostHashtags] = useState('');
    const [isShareDisabled, setIsShareDisabled] = useState(false);
    const [suggestedOptions, setSuggestedOptions] = useState([]);
    const [postLocation, setPostLocation] = useState(null);
    const fetchPut = useFetch();



    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const onBackClick = useCallback(() => {
        setCreatePostStep(1);
    }, [])

    const onCaptionChange = useCallback((event) => {
        setPostCaption(event.target.value)
    },[])

    const onLocationInputChange = useCallback(async (event, inputValue) => {
        await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=geocode&key=${googleKey}`)
        .then((res) => res.json())
        .then((data) => data.predictions.map(prediction => prediction.description))
        .then(newArr => setSuggestedOptions(newArr));

        setPostLocation(inputValue);
    },[]) 


    const onHashtagsChange = useCallback((event) => {
        setPostHashtags(event.target.value)
    },[])
    
    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsShareDisabled(true);
        const post = await fetchPut(`/posts/${postId}/update_post`,{
            caption: postCaption,
            location: postLocation,
            hashtags: postHashtags,
            published: true
        },
        'PUT' )

        if(post) {
            onClose();
            setImagePath('');
        }
    location.reload();
},[postCaption,postLocation,postHashtags])


    return (
        <form className="addNewPostDetails-container" onSubmit={onSubmit}>
            <div className="data-container">
                <div className="post-img">
                    <img src={imagePath} />
                </div>
                <div className="text-container">
                    <textarea className="post-caption" cols="30" rows="5" placeholder="Write a caption" onChange={onCaptionChange}/>
                    <AutocompleteInput suggestedOptions={suggestedOptions} onInputChange={onLocationInputChange}/>
                    <input className="post-hashtags" type="text" placeholder="Add hashtags" onChange={onHashtagsChange}/>
                </div>
            </div>
            <div className="buttons-container">
                <div className="back-btn">
                    <Button size="small" variant="contained" onClick={onBackClick}>Back</Button>
                </div>
                <div className="share-btn">
                    <Button size="small" variant="contained" type="submit" disabled={isShareDisabled}>Share</Button>
                </div>
            </div>
        </form>
    )
}