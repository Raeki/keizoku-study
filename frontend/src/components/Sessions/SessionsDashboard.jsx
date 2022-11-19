// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import NewSessionModal from './NewSessionModal';
import EditGoalModal from './EditGoalModal';

// MUI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

// API fetch import
const { getAllSessions } = require('../../fetch/get');

export default function SessionsDashboard({
  topicID,
  setTopicID,
  topicName,
  setTopicName,
  topicGoal,
  setTopicGoal,
  sessions,
  setSessions,
}) {
  // Avg Minutes Logic
  function getAvgMinutes(sessions) {
    if (sessions.length) {
      const max =
        Math.max(...sessions.map(obj => new Date(obj.date).valueOf())) /
        1000 /
        60 /
        60 /
        24;
      const min =
        Math.min(...sessions.map(obj => new Date(obj.date).valueOf())) /
        1000 /
        60 /
        60 /
        24;
      const minutes = sessions
        .map(obj => {
          return obj.time;
        })
        .reduce((a, b) => {
          return a + b;
        });

      let days = Math.ceil(max - min) + 1;
      const average = (minutes / days).toFixed(2);
      return average;
    }
  }

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item md={12}>
        <Button
          variant='contained'
          onClick={() => {
            setTopicID(topicID);
            localStorage.setItem('topicID', topicID);
            setTopicName(topicName);
            localStorage.setItem('topicName', topicName);
            setTopicGoal(topicGoal);
            localStorage.setItem('topicGoal', topicGoal);
            navigate('/topic');
          }}
        >
          {topicName}
        </Button>
      </Grid>
      <Grid item md={12}>
        <EditGoalModal
          topicID={topicID}
          goal={topicGoal}
          setTopicGoal={setTopicGoal}
          avgMinutes={getAvgMinutes(sessions)}
        />
      </Grid>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary={
              <NewSessionModal
                sessions={sessions}
                setSessions={setSessions}
                topicID={topicID}
              />
            }
          />
        </ListItemButton>
      </ListItem>
    </Grid>
  );
}
