// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import SessionsDashboard from './SessionsDashboard';
import SessionItem from './SessionItem';

// MUI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

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
  }, [topicID, sessions]);

  return (
    <Box
      sx={{
        width: '90%',
        minWidth: 150,
        maxWidth: 400,
        bgcolor: 'background.paper',
        border: '1px dashed grey',
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
  );
}
