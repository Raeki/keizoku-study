// Dependencies
import React, { useState } from 'react';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// API URL import
const API_URL = process.env.REACT_APP_API_URL;

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

export default function NewSessionModal({ sessions, setSessions, topicID }) {
  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form states
  const [minutes, setMinutes] = useState('');
  const handleMinutes = e => {
    setMinutes(e.target.value);
  };

  // submit API call
  function handleSubmit() {
    let date = new Date();
    // date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    (async () => {
      const body = {
        date,
        time: Number.parseInt(minutes),
        topicID,
      };
      try {
        const rawData = await fetch(`${API_URL}/sessions`, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const data = await rawData.json();
        setSessions([data, ...sessions]);
        handleClose();
      } catch (e) {
        console.error(e);
      }
    })();
  }

  return (
    <div>
      <Button onClick={handleOpen}>New Session</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            label='Minutes'
            variant='outlined'
            value={minutes}
            onChange={handleMinutes}
          />
          <div>
            <Button variant='contained' onClick={handleSubmit}>
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
