// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import NewTopicModal from './NewTopicModal';
import Sessions from '../Sessions/Sessions';

// MUI
import Grid from '@mui/material/Grid';

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
              <Sessions
                topicID={obj.id}
                setTopicID={setTopicID}
                topicName={obj.name}
                setTopicName={setTopicName}
                topicGoal={obj.goal}
                setTopicGoal={setTopicGoal}
                limit={5}
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
