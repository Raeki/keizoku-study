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
  return (
    <ListItem disablePadding key={sessionID}>
      <ListItemButton>
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
