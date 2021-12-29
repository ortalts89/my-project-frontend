import { useState, useCallback, useEffect } from "react";
import Button from '@mui/material/Button';
import '../../../dist/AddNewPostUploadingImg.css'


export default function AddNewPostUploadImg({setImagePath, imagePath}){
    const [images, setImages] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    useEffect(() =>{
        if(images.length > 0){
            setIsNextDisabled(false);
        }else{
            setIsNextDisabled(true);
        }
    }, [images])

    const onChange = useCallback((event) => {
        let files = [...images];
        files.push(event.target.files[0]);
        setImages(files)
        setImagePath(URL.createObjectURL(event.target.files[0]));
    })

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        let formToSend = new FormData();
        images.map(image => formToSend.append("images",image))

        await fetch('/api/posts/add_post',{
            method: 'POST',
            body: formToSend
            })
            .then(res => console.log(res.json()))
    ,[]});

    return (
        <div className="upload-form">
            <form onSubmit={onSubmit}>
                <div className="upload-btn">
                    <label>
                        Select Image
                        <input accept="image/*" onChange={onChange} name='files' type='file'/>
                    </label>
                </div>
                <div className="post-image">
                    <img src={imagePath}/>
                </div>
                <div className="next-btn">
                    <Button variant="text" type='submit' disabled={isNextDisabled}>Next</Button>
                </div>
            </form>
        </div>
    )
}