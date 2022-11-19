// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import NewTopicModal from './NewTopicModal';
import Sessions from '../Sessions/Sessions';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// API fetch import
const { getAllTopics } = require('../../fetch/get');

export default function AllTopics({
  setTopicID,
  setTopicName,
  setTopicGoal,
  categoryID,
}) {
  // useStates
  const [topics, setTopics] = useState([]);

  // react-router-dom navigator
  const navigate = useNavigate();

  // Fetch topics from API
  useEffect(() => {
    (async () => {
      const id = categoryID || localStorage.getItem('categoryID');
      if (id) {
        const data = await getAllTopics(id);
        setTopics(data);
      }
    })();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        {topics.map(obj => {
          return (
            <Grid item md={4} key={obj.id}>
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
              <Sessions
                topicID={obj.id}
                topicGoal={obj.goal}
                setTopicGoal={setTopicGoal}
              />
            </Grid>
          );
        })}
      </Grid>
      <NewTopicModal
        topics={topics}
        setTopics={setTopics}
        categoryID={categoryID}
      />
    </>
  );
}
