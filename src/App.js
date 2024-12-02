import './App.css';
import { Routes,Route } from 'react-router';
import Login from './pages/Login';
import React from 'react';
import AppState from './context/AppState';

// import Users from './pages/User';
import AddUser from './components/Users/AddUser';
import ViewUser from './components/Users/ViewUser';


function App() {
  return (
   <AppState>        
  
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        {/* <Route path="/users" element={<Users/>}></Route> */}
        <Route path="/users/add" element={<AddUser/>}></Route>
        <Route path="/users/:id" element={<ViewUser/>}></Route>
        </Routes>
  
    </AppState>
  );
}

export default App;
