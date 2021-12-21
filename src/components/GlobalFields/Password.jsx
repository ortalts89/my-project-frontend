import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState, useEffect} from 'react';


export default function Password({disabled, onChange, value=''}){
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });

      useEffect(() => {
        setValues({...values, password: value});
      },[value])


      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        onChange(event);
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <div>
          <FormControl sx={{width: '70%', margin: '10px'}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password" disabled={disabled} >Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onChange={handleChange('password')}
              disabled={disabled}
              autoComplete='false'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    disabled={disabled}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
    )
}