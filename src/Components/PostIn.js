import React, { Component } from 'react';

class PostIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content,
      editing: false
    }
  }

  toggleEdit = () => {
    this.setState({
      editing: ! this.state.editing
    })
  }

  handleSave = () => {
    console.log(this.props)
    this.props.updatePost(this.state.content, this.props.post.id)
    this.toggleEdit()
  }

  handleInput = (val) => {
    this.setState({
      content: val
    })
  }

  render() {
    return (
      <div>
        {this.state.editing ? (
          <div>
            <input 
            type='text'
            value={this.state.content}
            onChange={e => this.handleInput(e.target.value)} />
            <button onClick={() => this.handleSave()}>
              Save
          </button>
          </div>)
          : (<div className='post-box'>
          <h4>{this.props.post.content}</h4>
          <button className='edit-button-2'
          onClick= {this.toggleEdit}
          >edit</button>
          <button className='delete-button-2'
          onClick={() => {this.props.deletePost(this.props.post.id)}}
          >Delete</button>
        </div>)}


      </div>
    )
  }

}

export default PostIn;