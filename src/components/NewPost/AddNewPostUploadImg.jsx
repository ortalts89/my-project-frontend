import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addPostImgPathState, postToAddIdState, addPostStepState } from '../../store/posts';
import '../../../dist/AddNewPostUploadingImg.css';
import { useFetch } from '../../store/fetch';


export default function AddNewPostUploadImg(){
    const [imagePath, setImagePath] = useRecoilState(addPostImgPathState);
    const setPostId = useSetRecoilState(postToAddIdState);
    const setAddPostStep = useSetRecoilState(addPostStepState);
    const fetchPost = useFetch();

    const onChange = useCallback(async(event) => {
        const imagePath = event.target.files[0];
        setImagePath(URL.createObjectURL(imagePath));
        let formToSend = new FormData();
        formToSend.append("images",imagePath);

        const postId = await fetchPost('/posts/add_post', formToSend, 'POST');
        if(postId){
        setPostId(postId);
        setAddPostStep(2);
        }
    }, []);

    return (
        <form>
            <div  className="upload-form">
                <div className="post-image">
                    <img src={imagePath}/>
                </div>
                <div className="upload-btn">
                    <label>
                        Select Image
                        <input accept="image/*" onChange={onChange} name='files' type='file'/>
                    </label>
                </div>
            </div>
        </form>
       
    )
}