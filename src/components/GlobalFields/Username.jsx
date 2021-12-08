import TextField from '@mui/material/TextField';

export default function Username({onChange}){
    return (
        <div>
            <TextField 
                sx={{width: '70%', margin: '10px'}}
                name="username"
                id="username"
                label="Username"
                variant="standard"
                autoComplete="off"
                onChange={onChange}
            />
        </div>
    )
}