import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
import { isAccountPopupDisplayed } from '../../store/components'
import { useFetch } from '../../store/fetch'
import { loggedInUserState } from '../../store/users'
import styled from 'styled-components'

const UnfollowBtn = styled(Button)`
    color: black;
    border: 1px solid black;
    &:hover {
    background-color: #eeeeee;
    border: 1px solid black;
  }
`
export default function ProfileInfo({numOfPosts}) {
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [profileInfo, setProfileInfo] = useState({});
    const [isFollowing, setIsFollowing] = useState(undefined);
    const [profileFollowing, setProfileFollowing] = useState([]);
    const [profileFollowers, setProfileFollowers] = useState([]);
    const setIsAccountDisplayed = useSetRecoilState(isAccountPopupDisplayed);
    const loggedInUser = useRecoilValue(loggedInUserState);
    const { userId } = useParams();
    const fetch = useFetch();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(async () => {
        if(loggedInUser.id === '' ) {
            return;
        }
        setIsLoading(true);
        const profileInfo = await fetch(`/users/${userId}/profile_info`)
        if(profileInfo){
            setProfileInfo(profileInfo);
            if(userId === loggedInUser.id) {
                setIsCurrentUserProfile(true);
            } else{
                setIsCurrentUserProfile(false);
            }
        }

        const profileFollowing = await fetch(`/follow/${userId}/following`);
        if(profileFollowing){
            setProfileFollowing(profileFollowing);
        }
        const profileFollowers = await fetch(`/follow/${userId}/followers`);
        if(profileFollowers){
            setProfileFollowers(profileFollowers);
            if(profileFollowers.includes(loggedInUser.id)){
                setIsFollowing(true);
            }else {
                setIsFollowing(false);
            }
            setIsLoading(false);
        }
    },[userId,loggedInUser]);

    const onFollowClick = useCallback(async () => {
        let result;
        if(isFollowing){
            result = await fetch(`/follow/unfollow/${userId}`,{}, 'POST');
            const newArr = profileFollowers.filter(follower => follower !== loggedInUser.id);
            setProfileFollowers(newArr);
        }else{
            result = await fetch(`/follow/follow/${userId}`,{}, 'POST');
            profileFollowers.push(loggedInUser.id);
            setProfileFollowers(profileFollowers);
        }
        if(result){
            setIsFollowing(!isFollowing);
        }
    }, [userId, isFollowing]);

    const onAccountClick = useCallback(() => {
        setIsAccountDisplayed(true);
    }, [loggedInUser])

    return(
        <div>
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginTop: '30px'}} />
                :<div className="profile-info-container">
                    <div className="profile-image-container">
                        <Button 
                            className='profile-image'
                            startIcon={<Avatar alt="Remy Sharp" src="/Kuala.png" sx={{width:'150px', height:'150px'}} />}
                            variant="outlined" sx={{width:'150px', height:'150px', borderRadius:'50%', margin:0}}>
                        </Button>
                    </div>
                    <div className='profile-data-container'>
                        <div className="profile-header">
                            <div className="profile-name">{profileInfo.fullname}</div>
                            {isCurrentUserProfile && 
                                <div className="profile-edit-btn">
                                    <IconButton onClick={onAccountClick}>
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                        </div>}
                            {!isCurrentUserProfile && 
                                <div className="profile-follow-container">
                                    {!isFollowing && <Button variant='contained' onClick={onFollowClick}>Follow</Button>}
                                    {isFollowing && <UnfollowBtn variant='outlined' onClick={onFollowClick}>Unfollow</UnfollowBtn>}
                                </div>}
                        </div>
                        <div className="profile-sub-header">
                            <div className='profile-posts-counter'>{numOfPosts} posts</div>
                            <div className='profile-followers counter'>{profileFollowers.length} followers</div>
                            <div className='profile-following-counter'>{profileFollowing.length} following</div>
                        </div>
                    </div>
                    
                </div>
                }
        </div>
        
    )
}