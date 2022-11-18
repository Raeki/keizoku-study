// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import SignupModal from './SignupModal';

// MUI imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// API fetch import
const { postSignin } = require('../../fetch/post');

export default function Login() {
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState();
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const data = await postSignin(email, password);
      if (data) {
        localStorage.setItem('token', data.token);
      } else {
        setPasswordError(true);
      }
      if (localStorage.getItem('token')) {
        navigate('/all-topics');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container spacing={2}>
        <Grid item md={12}>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Email'
              value={email}
              onChange={handleEmail}
            />
            <TextField
              required
              error={passwordError}
              id='outlined-required'
              label='Password'
              type='password'
              value={password}
              onChange={handlePassword}
            />
          </div>
        </Grid>
        <Grid item md={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant='contained' onClick={handleSignin}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <SignupModal />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
