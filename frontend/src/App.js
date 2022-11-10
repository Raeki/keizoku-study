// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Topics from './components/Topics';

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Topics />} />
      <Route path='/topics' element={<Topics />} />
    </Routes>
  );
}
