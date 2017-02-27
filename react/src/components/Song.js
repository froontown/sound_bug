import React, { Component } from 'react';

class Song extends Component {
  constructor(props){
    super(props);
    this.state= {};
  }

  render(){

    let body = null;
    let upvote = null;
    let downvote = null;
    let edit = null;
    let destroy = null;

    if (this.props.body) {
      body = <span>{this.props.body}</span>;
    }

    if (this.props.currentUser) {
      upvote = <button className="upVote" onClick={this.props.handleUpvote}>Up</button>;
      downvote = <button className="downVote" onClick={this.props.handleDownvote}>Down</button>;
    }

    if (this.props.currentUser.id === this.props.user_id || this.props.currentUser.admin === true) {
      edit = <span> | <a href={`/songs/${this.props.id}/edit`}>Edit</a></span>;
      destroy = <span> | <a href="javascript:;" onClick={this.props.handleDelete} id={`destroy-${this.props.id}`}>Delete</a></span>;
    }

    let score = <span>{this.props.score}</span>;

    return(
      <div className="list-item">
        <a href={`songs/${this.props.id}`}>{this.props.song.name}</a>
        <p>{upvote} | Score: {score} | {downvote} {edit} {destroy}</p>
      </div>
    );
  }
}

export default Song;
