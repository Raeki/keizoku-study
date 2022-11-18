// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import NewTopicModal from './NewTopicModal';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// API fetch import
const { getAllTopics } = require('../../fetch/get');

export default function AllTopics({ setTopicID, setTopicName, setTopicGoal }) {
  // useStates
  const [topics, setTopics] = useState([]);

  // react-router-dom navigator
  const navigate = useNavigate();

  // Fetch topics from API
  useEffect(() => {
    (async () => {
      const data = await getAllTopics();
      setTopics(data);
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
                  setTopicName(obj.name);
                  setTopicGoal(obj.goal);
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
