// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// API fetch import
const { postSignin } = require('../../fetch/post');

export default function Login() {
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const data = await postSignin(email, password);
      localStorage.setItem('token', data.token);
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
          id='outlined-required'
          label='Password'
          type='password'
          value={password}
          onChange={handlePassword}
        />
      </div>
      <Button variant='contained' onClick={handleSignin}>
        Login
      </Button>
    </Box>
  );
}
