import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';


function App() {
  return (
    <div className="App">
      <Dashboard />
      <Nav />
      <Post />
      <Form />
      <Auth />
    </div>
  );
}

export default App;
