// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import NewSessionModal from './NewSessionModal';
import EditGoalModal from './EditGoalModal';

// MUI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarIcon from '@mui/icons-material/CalendarTodayTwoTone';

// API fetch import
const { getAllSessions } = require('../../fetch/get');

export default function SessionsDashboard({
  topicID,
  topicGoal,
  setTopicGoal,
}) {
  // useStates
  const [sessions, setSessions] = useState([]);

  // fetch all sessions with topicID
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSessions(topicID);
        setSessions(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [topicID]);

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

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
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
  );
}
