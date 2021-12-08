import TextField from '@mui/material/TextField';

export default function Email({onChange, disabled}) {
    return (
        <div className="email-field">
            <TextField sx={{width: '70%', margin: '10px'}}
                id="standard-basic"
                label="Email"
                name="email"
                variant="standard"
                placeholder="Enter your email address"
                onChange={onChange}
                type="email"
                autoComplete="off"
                disabled={disabled}
            />
        </div>
    )
}