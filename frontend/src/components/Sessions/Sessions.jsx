// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import NewSessionModal from './NewSessionModal';
import EditSessionModal from './EditSessionModal';
import DeleteSessionModal from './DeleteSessionModal';

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
function Item({ date, time, sessionID, sessions, setSessions }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText
          primary={`${new Date(date)
            .toString()
            .substring(0, date.length - 8)} Minutes: ${time}`}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary={
            <EditSessionModal
              sessionID={sessionID}
              date={date}
              sessions={sessions}
              setSessions={setSessions}
            />
          }
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary={
            <DeleteSessionModal
              sessionID={sessionID}
              sessions={sessions}
              setSessions={setSessions}
            />
          }
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
        setSessions(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [topicID]);

  return (
    <Container>
      <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <nav aria-label='sessions'>
          <List>
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
            </ListItem>
            {sessions
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map(obj => {
                return (
                  <Item
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
