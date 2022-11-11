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

  return (
    <Container>
      <Routes>
        <Route exact path='/' element={<AllTopics setTopicID={setTopicID} />} />
        <Route
          path='/all-topics'
          element={<AllTopics setTopicID={setTopicID} />}
        />
        <Route path='/topic' element={<Topic topicID={topicID} />} />
      </Routes>
    </Container>
  );
}
