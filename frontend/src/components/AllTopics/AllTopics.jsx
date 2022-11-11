// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import NewTopicModal from './NewTopicModal';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// API URL import
const API_URL = process.env.REACT_APP_API_URL;

export default function AllTopics({ setTopicID }) {
  // useStates
  const [topics, setTopics] = useState([]);

  // react-router-dom navigator
  const navigate = useNavigate();

  // Fetch topics from API
  useEffect(() => {
    (async () => {
      try {
        const rawData = await fetch(`${API_URL}/topics`);
        const data = await rawData.json();
        setTopics(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Container>
      <Grid container spacing={1}>
        {topics.map(obj => {
          return (
            <Grid item m key={obj.id}>
              <Button
                variant='contained'
                onClick={() => {
                  setTopicID(obj.id);
                  navigate('/topic');
                }}
              >
                {obj.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <NewTopicModal topics={topics} setTopics={setTopics} />
    </Container>
  );
}
