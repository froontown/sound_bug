import React, {Component} from 'react';
import Song from './Song';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null;
      users: [];
      songs: [];
      songId: null;
    }
    this.handleVote = this.handleVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleVote(type, review) {
    let data = {
      song_id: song.id,
    }
    let jSonStringData = JSON.stringify(data);
    fetch(`api/v1/songs/${this.state.songId}`, {
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: jSonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${responseStatusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      fetch(`api/v1/songs/${this.state.songId}`, {
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${responseStatusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let newSongs = body.songs;
        let newUsers = body.users;
        this.setState({
          songs: newSongs,
          users: newUsers,
        });
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(songId) {
    fetch(`/api/v1/bars/${this.state.barId}`, {
      method: 'delete',
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      fetch(`/api/v1/songs/${this.state.songId}`,{
        credentials: 'same-origin'
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status}, (${response.statusText})`;
            let error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          let newSongs = body.songs;
          let newUsers = body.users;
          this.setState({
            songs: newSongs,
            users: newUsers,
          });
        });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    let url = window.location.href.split("/");
    let newSongId = url[url.length - 1];

    fetch(`/api/v1/songs/${newSongId}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newCurrentUser = body.currentUser
      let newSongs = body.songs
      let newUsers = body.users
      this.setState({
        currentUser: newCurrentUser,
        songs: newSongs,
        users: newUsers,
        songId: newSongId
      });
    });
  }

  render() {
      let counter = -1
      let songs
      if (this.state.songs) {
        songs = this.state.songs.map((song) => {
          counter ++;

          let handleUpvote = () => {
            return(
              this.handleVote('up_vote', song)
            )
          }

          let handleDownvote = () => {
            return(
              this.handleVote('down_vote', song)
            )
          }

          let handleDeleteSong = () => {
            return(
              this.handleDelete(song.id)
            )
          }

          let handleDelete = this.handleDelete
          return(
            <Song
              key = {song.id}
              id = {song.id}
              body = {song.body}
              score = {song.score}
              user = {this.state.users[counter]}
              handleUpvote = {handleUpvote}
              handleDownvote = {handleDownvote}
              handleDelete = {handleDeleteSong}
              currentUser = {this.state.currentUser}
              songId = {this.state.songId}
            />
          )
        })
      }
      songs = songs.sort(function(a,b) {
        return b.key - a.key
      })
      return(
        <div>
          <h4>Songs</h4>
          {songs}
        </div>
      )
    }
}

export default SongList;
