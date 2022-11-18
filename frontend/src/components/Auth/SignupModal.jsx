// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// API fetch import
const { postSignup } = require('../../fetch/post');

// Default MUI styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewSessionModal({ topicID, setTopicGoal, goal }) {
  // Modal states
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // State handlers
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
    setConfirmPasswordError(false);
  };
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
  };

  const navigate = useNavigate();

  // submit API call
  function handleSubmit() {
    if (password === confirmPassword) {
      (async () => {
        setDisabled(true);
        try {
          const data = await postSignup(email, password);
          localStorage.setItem('token', data.token);
          if (localStorage.getItem('token')) {
            navigate('/all-topics');
          }
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setConfirmPasswordError(true);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Signup</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            label='Email'
            variant='outlined'
            value={email}
            onChange={handleEmail}
          />
          <TextField
            error={confirmPasswordError}
            type='password'
            label='Password'
            variant='outlined'
            value={password}
            onChange={handlePassword}
          />
          <TextField
            error={confirmPasswordError}
            type='password'
            label='Confirm Password'
            variant='outlined'
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <div>
            <Button
              variant='contained'
              disabled={disabled}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant='contained' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
