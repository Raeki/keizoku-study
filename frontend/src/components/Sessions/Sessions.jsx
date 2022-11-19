// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import SessionsDashboard from './SessionsDashboard';
import SessionItem from './SessionItem';

// MUI
import Box from '@mui/material/Box';
import List from '@mui/material/List';

// API fetch import
const { getAllSessions } = require('../../fetch/get');

export default function Sessions({
  topicID,
  setTopicID,
  topicGoal,
  setTopicGoal,
  topicName,
  setTopicName,
  limit,
}) {
  // useStates
  const [sessions, setSessions] = useState([]);

  // fetch all sessions with topicID
  useEffect(() => {
    (async () => {
      try {
        const id = topicID || localStorage.getItem('topicID');
        if (id) {
          const data = await getAllSessions(id);
          setSessions(data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [setSessions]);

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
            topicID={topicID || localStorage.getItem('topicID')}
            setTopicID={setTopicID}
            topicName={topicName || localStorage.getItem('topicName')}
            setTopicName={setTopicName}
            topicGoal={topicGoal || localStorage.getItem('topicGoal')}
            setTopicGoal={setTopicGoal}
            sessions={sessions}
            setSessions={setSessions}
          />
          {sessions
            .sort((a, b) => {
              return b.id - a.id;
            })
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .slice(0, limit)
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
