import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import ViewALl from './pages/ViewAll';
import EditLogin from './pages/EditLogin';


function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/add-new' element={<AddNew />}></Route>
      <Route path= '/view-all' element={<ViewALl />}></Route>
      <Route path= '/edit-login' element={<EditLogin />}></Route>
    </Routes>
  );
};


export default App;
