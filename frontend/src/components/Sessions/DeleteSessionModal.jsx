// Dependencies
import React, { useState } from 'react';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

// API fetch import
const { deleteSession } = require('../../fetch/delete');

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

export default function NewSessionModal({ sessionID, sessions, setSessions }) {
  // Modal states
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // submit API call
  function handleSubmit() {
    (async () => {
      try {
        setDisabled(true);
        const data = await deleteSession(sessionID);
        const newSessions = [...sessions].filter(obj => {
          return obj.id !== data.id;
        });
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
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
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
