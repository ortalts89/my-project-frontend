import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function AutocompleteInput({suggestedOptions, onInputChange}) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={suggestedOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            onInputChange={onInputChange}
            />
    )
}