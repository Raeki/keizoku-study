// Dependencies
import React, { useState } from 'react';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// API fetch import
const { postNewTopic } = require('../../fetch/post');

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

export default function NewTopicModal({ topics, setTopics }) {
  // Modal states
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form states
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const handleName = e => {
    setName(e.target.value);
  };
  const handleGoal = e => {
    setGoal(e.target.value);
  };

  // submit API call
  function handleSubmit() {
    (async () => {
      try {
        setDisabled(true);
        const data = await postNewTopic(name, goal);
        setTopics([...topics, data]);
        setDisabled(false);
        setName('');
        handleClose();
      } catch (e) {
        console.error(e);
      }
    })();
  }

  return (
    <div>
      <Button onClick={handleOpen}>New Topic</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            label='Name'
            variant='outlined'
            value={name}
            onChange={handleName}
          />
          <TextField
            label='Goal'
            variant='outlined'
            value={goal}
            onChange={handleGoal}
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
