import Form from "../Form/Form";
import React, { Component } from 'react';
import axios from 'axios';
import PostIn from '../PostIn';
import { connect } from 'react-redux';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postImage: '',
      content: ''
    }
  }

  componentDidMount() {
    this.getUserPost();
  }

  handleInput = (val) => {
    this.setState({ content: val })
  }

  getUserPost = () => {
    axios.get('/api/posts')
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  createPost = () => {
    axios.post('/api/posts', { content: this.state.content })
      .then(() => {
        this.getUserPost();
        this.setState({ ...this.state, content: '' })
      })
      .catch(err => console.log(err));
  }

  deletePost = (id) => {
    console.log(id)
    axios.delete(`/api/posts/${id}`)
      .then(() => {
        this.getUserPost();
      })
      .catch(err => console.log(err));
  }

  updatePost = (content,id) => {
    axios.put(`/api/post/${id}`, {content})
      .then(() => {
        this.getUserPost();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className='post'>
        <h2>Post Some Stuff!</h2>
          {this.state.posts.map((post) => {
            return <PostIn deletePost={this.deletePost} updatePost={this.updatePost} post={post}/>
            
          })}
        <input className='post-input'
          type='text'
          placeholder='Share your thoughts...'
          value={this.state.content}
          onChange={ (e) => this.handleInput(e.target.value)} />
        <button className='share-button'
          onClick={this.createPost}
        >Share</button>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {id: state.id};
}

export default connect(mapStateToProps)(Post);