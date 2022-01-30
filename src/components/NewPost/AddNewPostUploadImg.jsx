import { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPostImgPathState, postToAddIdState, addPostStepState } from '../../store/posts';
import '../../../dist/AddNewPostUploadingImg.css';
import { useFetch } from '../../store/fetch';


export default function AddNewPostUploadImg(){
    const [imagePath, setImagePath] = useRecoilState(addPostImgPathState);
    const setPostId = useSetRecoilState(postToAddIdState);
    const setAddPostStep = useSetRecoilState(addPostStepState);
    const [showSelectBtn, setShowSelectBtn] = useState(true);
    const fetchPost = useFetch();

    const onChange = useCallback(async(event) => {
        setShowSelectBtn(false);
        const imagePath = event.target.files[0];
        setImagePath(URL.createObjectURL(imagePath));
        let formToSend = new FormData();
        formToSend.append("images",imagePath);

        const postId = await fetchPost('/posts', formToSend, 'POST');
        if(postId){
            setPostId(postId);
        }
        setAddPostStep(2);
    }, []);

    return (
        <form>
            <div  className="upload-form">
                <div className="post-image">
                    <img src={imagePath}/>
                </div>
                <div className={showSelectBtn ? "upload-btn" : "upload-btn-hidden"}>
                    <label>
                        {showSelectBtn? "Select Image" : ''}
                        <input accept="image/*" onChange={onChange} name="files" type="file"/>
                    </label>
                </div>
            </div>
        </form>
       
    )
}