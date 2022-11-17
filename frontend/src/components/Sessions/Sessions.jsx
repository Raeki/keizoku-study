// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import NewSessionModal from './NewSessionModal';
import EditSessionModal from './EditSessionModal';
import DeleteSessionModal from './DeleteSessionModal';
import EditGoalModal from './EditGoalModal';

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

// List item definition TURN INTO A COMPONENT
function Item({ date, time, sessionID, sessions, setSessions }) {
  return (
    <ListItem disablePadding key={sessionID}>
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
