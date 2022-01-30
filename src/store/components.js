import { atom } from 'recoil'
import { useFetch } from './fetch'
import { accountDataState } from './users'
import { useSetRecoilState } from 'recoil'


const isAccountPopupDisplayed = atom({
    key: 'isAccountPopupDisplayed',
    default: false,
    effects_UNSTABLE: [
        ({onSet}) => {
        const fetchGet = useFetch();
        const setAccount = useSetRecoilState(accountDataState)
          onSet(async newValue => {
            if(newValue){
                const accountData = await fetchGet('/users/account');
                if(accountData){
                    setAccount(accountData);
                }
            }
          });
        },
      ],
})

const isAddNewPostPopupDisplayed = atom({
    key: 'isAddNewPostPopupDisplayed',
    default: false
})

const isDeletePostPopupDisplayedState = atom({
  key: 'isDeletePostPopupDisplayedState',
  default: false
})

const isPostPopupDisplayedState = atom({
  key: 'isPostPopupDisplayedState',
  default: false
})


export {
    isAccountPopupDisplayed,
    isAddNewPostPopupDisplayed,
    isDeletePostPopupDisplayedState,
    isPostPopupDisplayedState,
} 