import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, setUser } from '../../ducks/reducer';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verPassword: '',
      picture: '',
      registerView: false
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/dashboard')   //Mount
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleToggle = () => {
    this.setState({ registerView: !this.state.registerView })
  }

  handleRegister = () => {
    const { username, password, verPassword, picture } = this.state;

    axios.post('/auth/register', { username, password, profilePicture: picture }) //api
      .then(res => {
        this.props.setUser(res.data); //Redux function goes here buddy
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        if (err.statusCode == 409) {
          alert("User already exists");
        } else {
          alert(`Couldn't register try again later`);
        }
      });
    
  }

  handleLogin = () => {
    const { username, password } = this.state;
    axios.post('/auth/login', { username, password }) //api
      .then(res => {
        this.props.setUser(res.data); //Redux function goes here as well
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props)
    return (
      <div className='login-page'>
        <h1 className='helo-text'>
          Helo
          </h1>
        <h3 className='username'>Username</h3>
        <h3 className='password'>Password</h3>
        <input
          onChange={(e) => this.handleInput(e)}
          value={this.state.username} type='text'
          name='username'
          placeholder='Username'
        />
        <input
          onChange={(e) => this.handleInput(e)}
          value={this.state.password} type='password'
          name='password'
          placeholder='Password'
        />
        <button
          onClick={this.handleLogin}
          className='register-buttons'
        >Login</button>
        <button
          onClick={this.handleRegister}
          className='register-buttons'
        >Register</button>
      </div>
    );
  }
}

export default connect(null, {getUser, setUser})(Auth);