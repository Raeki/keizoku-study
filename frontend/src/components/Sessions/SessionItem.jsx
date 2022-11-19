// Dependencies
import React from 'react';

// Components
import EditSessionModal from './EditSessionModal';
import DeleteSessionModal from './DeleteSessionModal';

// MUI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// List item definition TURN INTO A COMPONENT
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
    <ListItem disablePadding key={sessionID}>
      <ListItemButton>
        <ListItemText primary={makeInfo(date, time)} />
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
