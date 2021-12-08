import TextField from '@mui/material/TextField';

export default function FullName({disabled}){
    return (
        <div>
            <TextField 
                sx={{width: '70%', margin: '10px'}}
                name="full-name"
                id="full-name"
                label="Full Name"
                variant="standard"
                autoComplete="off"
                disabled={disabled}
            />
        </div>
    )
}