import { useCallback, useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import '../../../dist/SearchBar.css'

export default function SearchBar() {
    const [suggestedOptions, setSuggestedOptions] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(null);


    useEffect(() => {
        setSuggestedOptions([]);
        setInputValue('');
        setValue(null);
    }, [location])



    const onInputChange = useCallback(async (event, inputValue) => {
        setInputValue(inputValue);
        if(inputValue === ''){
            return;
        }
        
        await fetch(`/api/search/users?q=${inputValue}`)
            .then((res) => {
                if(res.status === 200){
                    
                    return res.json();
                }else{
                    throw new Error('Unauthorized');
                }
            })
            .then(dbUsers => dbUsers.map(user => Object.assign(user, {url: `/profiles/${user.id}`})))
            .then(users => {setSuggestedOptions(users)})
            .catch((err) => {
                logout();
            })
    },[value])


    return(
        <Autocomplete
            id="combo-box-demo"
            options={suggestedOptions}
            inputValue={inputValue}
            value={value}
            onChange={(event, value) => history.push(value.url)}
            sx={{ width: '300px',margin: 'auto' , outline: 'none'}}
            renderInput={(params) => <TextField {...params} placeholder='Search Profile' style={{padding: 0}} inputProps={{
                ...params.inputProps,
                style: {
                  maxHeight: '30px',
                  padding: 0
                },
            }}/>}
            getOptionLabel={(option) => option.fullname}
            isOptionEqualToValue={(option, value) => option.fullname === value.fullname}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: 0}} >
                        <Avatar alt="Remy Sharp" src="Kuala.png" sx={{mr: 2}} />
                        <span>{option.fullname}</span>
                    </div>
                </Box>
              )}
            onInputChange={onInputChange}
            />
    )
}