// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import NewSessionModal from './NewSessionModal';

// MUI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarIcon from '@mui/icons-material/CalendarTodayTwoTone';

// API URL import
const API_URL = process.env.REACT_APP_API_URL;

// List item definition

function Item({ date, time }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText
          primary={`${new Date(date)
            .toUTCString()
            .substring(0, date.length - 13)} minutes: ${time}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function Sessions({ topicID }) {
  // useStates
  const [sessions, setSessions] = useState([]);

  // fetch all sessions with topicID
  useEffect(() => {
    (async () => {
      try {
        const rawData = await fetch(`${API_URL}/sessions/${topicID}`);
        const data = await rawData.json();
        console.log(data);
        setSessions(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [topicID]);

  return (
    <Container>
      <NewSessionModal
        sessions={sessions}
        setSessions={setSessions}
        topicID={topicID}
      />
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label='sessions'>
          <List>
            {sessions.map(obj => {
              return <Item date={obj.date} time={obj.time} />;
            })}
          </List>
        </nav>
      </Box>
    </Container>
  );
}
