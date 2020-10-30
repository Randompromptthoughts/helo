import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Nav = props => {
  console.log(props)

  // if (props.location.pathname === '/') {
  //   return null
  // } 
    return(
        <section className='nav-bar'>
          <h4>{props.username}</h4>
            <div className='profile-pic'>
              {props.profilePicture}
            </div>
              <button className='dash-button'>
                <Link className='link' to='/dashboard'>Home Page</Link></button>
                {props.location.pathname !== '/'
            ? (<button className='logout-button'>
                <Link className='link-logout' to='/'>Logout</Link></button>)
            : null}  
        </section>
    );
  
}

const mapStateToProps = reduxState => {
    return {
      id: reduxState.id,
      username: reduxState.username,
      profilePicture: reduxState.profilePicture,
    }
}

// export default withRouter(Nav);
export default withRouter(connect(mapStateToProps)(Nav));