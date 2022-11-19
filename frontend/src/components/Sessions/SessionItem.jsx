// Dependencies
import React from 'react';

// Components
import EditSessionModal from './EditSessionModal';
import DeleteSessionModal from './DeleteSessionModal';

// MUI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SessionItem({
  date,
  time,
  sessionID,
  sessions,
  setSessions,
}) {
  function makeInfo(date, time) {
    return (
      <>
        {new Date(date).toString().substring(3, date.length - 8)} <br />
        Minutes: {time}
      </>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={makeInfo(date, time)} />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary={
            <EditSessionModal
              sessionID={sessionID}
              time={time}
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
