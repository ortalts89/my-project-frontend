import { useCallback, useState} from 'react'
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../../../dist/AddNewPostDetails.css'


export default function AddNewPostDetails({postId, setImagePath, imagePath, setCreatePostStep, onClose}){
    const [postCaption, setPostCaption] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postHashtags, setPostHashtags] = useState('');
    const [isShareDisabled, setIsShareDisabled] = useState(false);
    const [suggestedOptions, setSuggestedOptions] = useState([]);

    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const onBackClick = useCallback(() => {
        setCreatePostStep(1);
    }, [])

    const onCaptionChange = useCallback((event) => {
        setPostCaption(event.target.value)
    },[])

    const onLocationChange = useCallback(async (event) => {
        await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${event.target.value}&types=geocode&key=${googleKey}`)
        .then((res) => res.json())
        .then((data) => data.predictions.map(prediction => ({label : prediction.description})))
        .then(newArr => setSuggestedOptions(newArr));

        setPostLocation(event.target.value);
    },[]) 

    const onHashtagsChange = useCallback((event) => {
        setPostHashtags(event.target.value)
    },[])
    
    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsShareDisabled(true);

        await fetch(`/api/posts/update_post/${postId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                caption: postCaption,
                location: postLocation,
                hashtags: postHashtags,
                published: true
            })
        }).then((res) => {
            if(res.status === 200) 
            {
                onClose();
                setImagePath('');
            }
            else{
               setLoginError('Post sharing failed');
            }
    }) 

},[postCaption,postLocation,postHashtags])


    return (
        <form className="addNewPostDetails-container" onSubmit={onSubmit}>
            <div className="data-container">
                <div className="post-img">
                    <img src={imagePath} />
                </div>
                <div className="text-container">
                    <textarea className="post-caption" cols="30" rows="5" placeholder="Write a caption" onChange={onCaptionChange}/>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={suggestedOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} onChange={onLocationChange} />}
                        />
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