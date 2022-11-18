// Dependencies
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function NavigationBar({ categoryName, setCategoryName }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  function handleTop() {
    setCategoryName('');
    navigate('/categories');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Container>
            <Button color='inherit' onClick={handleTop}>
              <Typography variant='h6'>Top</Typography>
            </Button>
            <Button color='inherit' onClick={handleTop}>
              <Typography variant='h6'>{categoryName}</Typography>
            </Button>
          </Container>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
