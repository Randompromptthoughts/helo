import React, { Component } from 'react';
import Post from '../../Components/Post/Post';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return(
        <div className='dashboard'>
          Dashboard
          <Post></Post>
        </div>
    );
  }
}

export default Dashboard;