import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AddPerson from './components/AddPerson';
import RetrieveInfo from './components/RetrieveInfo';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/">Add New Person</NavLink>
          <NavLink to="/retrieve">Retrieve Information</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<AddPerson />} />
          <Route path="/retrieve" element={<RetrieveInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
