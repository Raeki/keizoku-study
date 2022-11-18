// Dependencies
import React, { useState } from 'react';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// API fetch import
const { editSession } = require('../../fetch/patch');

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

export default function NewSessionModal({
  sessionID,
  date,
  sessions,
  setSessions,
}) {
  // Modal states
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form states
  const [minutes, setMinutes] = useState('');
  const [newDate, setNewDate] = useState(date);

  // State handlers
  const handleMinutes = e => {
    setMinutes(e.target.value);
  };
  const handleNewDate = e => {
    setNewDate(e.target.value);
  };

  // submit API call
  function handleSubmit() {
    (async () => {
      setDisabled(true);
      try {
        const data = await editSession(newDate, minutes, sessionID);
        const newSessions = [...sessions];
        newSessions[0] = data;
        setSessions(newSessions);
        setDisabled(false);
        handleClose();
      } catch (e) {
        console.error(e);
      }
    })();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
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
          <TextField
            label='yyyy-mm-dd'
            variant='outlined'
            value={newDate}
            onChange={handleNewDate}
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
