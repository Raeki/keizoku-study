// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import NewSessionModal from './NewSessionModal';
import EditSessionModal from './EditSessionModal';
import DeleteSessionModal from './DeleteSessionModal';
import EditGoalModal from './EditGoalModal';
import SessionsDashboard from './SessionsDashboard';
import SessionItem from './SessionItem';

// MUI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarIcon from '@mui/icons-material/CalendarTodayTwoTone';

// API fetch import
const { getAllSessions } = require('../../fetch/get');

export default function Sessions({ topicID, topicGoal, setTopicGoal }) {
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
    <Container>
      <Box
        sx={{
          width: '100%',
          minWidth: 250,
          maxWidth: 400,
          bgcolor: 'background.paper',
        }}
      >
        <nav aria-label='sessions'>
          <List>
            <SessionsDashboard
              topicID={topicID}
              topicGoal={topicGoal}
              setTopicGoal={setTopicGoal}
            />
            {sessions
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map(obj => {
                return (
                  <SessionItem
                    key={obj.id}
                    date={obj.date}
                    time={obj.time}
                    sessionID={obj.id}
                    sessions={sessions}
                    setSessions={setSessions}
                  />
                );
              })}
          </List>
        </nav>
      </Box>
    </Container>
  );
}
