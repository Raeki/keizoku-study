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
      const max = Math.max(
        ...sessions.map(obj => new Date(obj.date).valueOf())
      );
      const min = Math.min(
        ...sessions.map(obj => new Date(obj.date).valueOf())
      );
      const minutes = sessions
        .map(obj => {
          return obj.time;
        })
        .reduce((a, b) => {
          return a + b;
        });
      let days = Math.ceil((max - min) / 1000 / 60 / 60 / 24);
      days = days === 0 ? 1 : days;
      const average = minutes / days;
      return average;
    }
  }

  const navigate = useNavigate();

  return (
    <>
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
        <ListItemButton>
          <ListItemText primary={`Min/Day: ${getAvgMinutes(sessions)}`} />
        </ListItemButton>
        <ListItemButton>
          <ListItemText
            primary={
              <EditGoalModal
                topicID={topicID}
                goal={`mins/day: ${topicGoal}`}
                setTopicGoal={setTopicGoal}
              />
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
