// Dependencies
import React, { useState } from 'react';

// Components
import GoalBar from './GoalBar';

// MUI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// API fetch import
const { editGoal } = require('../../fetch/patch');

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
  topicID,
  setTopicGoal,
  goal,
  avgMinutes,
}) {
  // Modal states
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form states
  const [minutes, setMinutes] = useState(String(goal));

  // State handlers
  const handleMinutes = e => {
    setMinutes(e.target.value);
  };

  // submit API call
  function handleSubmit() {
    (async () => {
      setDisabled(true);
      try {
        const data = await editGoal(minutes, topicID);
        setTopicGoal(data.goal);
        setDisabled(false);
        handleClose();
      } catch (e) {
        console.error(e);
      }
    })();
  }

  return (
    <div>
      <Button sx={{ width: '100%' }} onClick={handleOpen}>
        <GoalBar avgMinutes={avgMinutes} goal={goal} />
      </Button>
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
