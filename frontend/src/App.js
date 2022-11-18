// Dependencies
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import AllTopics from './components/AllTopics/AllTopics';
import Topic from './components/Sessions/Sessions';
import Login from './components/Auth/Login';

// MUI Components
import Container from '@mui/material/Container';

export default function App() {
  // useStates
  const [topicID, setTopicID] = useState();
  const [topicName, setTopicName] = useState();
  const [topicGoal, setTopicGoal] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/all-topics');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Routes>
        <Route
          path='/all-topics'
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
        <Route path='/login' element={<Login />} />
      </Routes>
    </Container>
  );
}
