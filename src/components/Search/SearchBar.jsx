import { useHistory } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../../../dist/SearchBar.css'

export default function SearchBar() {
    const [suggestedOptions, setSuggestedOptions] = useState([]);

    const onInputChange = useCallback(async (event, inputValue) => {
        await fetch(`/api/search/users?q=${inputValue}`)
        .then(res => res.json())
        .then(data => data.map(user => user.fullname))
        .then(users => setSuggestedOptions(users))
    },[])


    return(
        <Autocomplete
            id="combo-box-demo"
            options={suggestedOptions}
            sx={{ width: '300px',margin: 'auto' , outline: 'none'}}
            renderInput={(params) => <TextField {...params} placeholder='Search Profile' style={{padding: 0}} inputProps={{
                ...params.inputProps,
                style: {
                  maxHeight: '30px',
                  padding: 0
                },
            }}/>}
            onInputChange={onInputChange}
            />
    )
}