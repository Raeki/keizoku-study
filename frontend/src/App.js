// Dependencies
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import AllTopics from './components/AllTopics/AllTopics';
import Topic from './components/Sessions/Sessions';

// MUI Components
import Container from '@mui/material/Container';

export default function App() {
  // useStates
  const [topicID, setTopicID] = useState();
  const [topicName, setTopicName] = useState();
  const [topicGoal, setTopicGoal] = useState();

  return (
    <Container>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <AllTopics
              setTopicID={setTopicID}
              setTopicName={setTopicName}
              setTopicGoal={setTopicGoal}
            />
          }
        />
        <Route
          path='/topic'
          element={
            <Topic
              topicID={topicID}
              topicName={topicName}
              topicGoal={topicGoal}
              setTopicGoal={setTopicGoal}
            />
          }
        />
      </Routes>
    </Container>
  );
}
