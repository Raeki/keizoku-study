// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports
import NewCategoryModal from './NewCategoryModal';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// API fetch import
const { getAllCategories } = require('../../fetch/get');

export default function Categories({
  setCategoryID,
  setCategoryName,
  setCategoryGoal,
}) {
  // useStates
  const [categories, setCategories] = useState([]);

  // react-router-dom navigator
  const navigate = useNavigate();

  // Fetch topics from API
  useEffect(() => {
    (async () => {
      const data = await getAllCategories();
      setCategories(data);
    })();
  }, [navigate]);

  return (
    <Container>
      <Grid container spacing={1}>
        {categories.map(obj => {
          return (
            <Grid item m key={obj.id}>
              <Button
                variant='contained'
                onClick={() => {
                  setCategoryID(obj.id);
                  setCategoryName(obj.name);
                  setCategoryGoal(obj.goal);
                  navigate('/all-topics');
                }}
              >
                {obj.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <NewCategoryModal topics={categories} setTopics={setCategories} />
    </Container>
  );
}
