// import React from 'react';
// import Song from './Song';
//
// class SongList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: null,
//       songs: [],
//       users: [],
//       songId: null
//     };
//     this.getSongs = this.getSongs.bind(this);
//     this.handleVote = this.handleVote.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//   }
//
//   handleVote(type, id){
//     let data = {
//       song_id: id
//     };
//
//     let jsonStringData = JSON.stringify(data);
//     fetch(`/api/v1/songs/${id}/${type}`, {
//       credentials: 'same-origin',
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: jsonStringData
//     })
//     .then(response => {
//       fetch(`/api/v1/songs`, {
//         credentials: 'same-origin'
//       })
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           let errorMessage = `${response.status}, (${response.statusText})`;
//           let error = new Error(errorMessage);
//           throw(error);
//         }
//       })
//       .then(response => response.json())
//       .then(body => {
//         let newSongs = body.songs;
//         let newUsers = body.users;
//         this.setState({
//           songs: newSongs,
//           users: newUsers
//         });
//       });
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
//   }
//
//   handleDelete(songId) {
//     fetch(`/api/v1/songs/${songId}`, {
//       method: 'delete',
//       credentials: 'same-origin'
//     })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         let errorMessage = `${response.status}, (${response.statusText})`;
//         let error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => {
//       fetch(`/api/v1/songs`, {
//         credentials: 'same-origin'
//       })
//       .then(response => {
//         if(response.ok) {
//           return response;
//         } else {
//           let errorMessage = `${response.status}, (${response.statusText})`;
//           let error = new Error(errorMessage);
//           throw(error);
//         }
//       })
//       .then(response => response.json())
//       .then(body => {
//         let newSongs = body.songs;
//         let newUsers = body.users;
//         this.setState({
//           songs: newSongs,
//           users: newUsers
//         });
//       });
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
//   }
//
//   componentDidMount(){
//     this.getSongs();
//     setInterval(this.getSongs, 10000);
//   }
//
//   getSongs(){
//     fetch('api/v1/songs', {
//       credentials: 'same-origin',
//     }).then(response => {
//       if(response.ok) {
//         return response;
//       } else {
//         let errorMessage = `${response.status}, (${response.statusText})`;
//         let error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => response.json())
//     .then(response => {
//       let newCurrentUser = response.currentUser;
//       let newSongs = [];
//       response.songs.forEach(function(song){
//         newSongs.push(song);
//       });
//       newSongs;
//       this.setState({
//         currentUser: newCurrentUser,
//         songs: newSongs
//       });
//     });
//   }
//
//   render(){
//     let counter = -1;
//     let songs = this.state.songs.map((song)=>{
//       counter ++;
//       let handleUpvote = () => {
//         return(
//           this.handleVote('up_vote', song.id)
//         );
//       };
//       let handleDownvote = () => {
//         return(
//           this.handleVote('down_vote', song.id)
//         );
//       };
//
//       let handleDeleteSong = () => {
//         return(
//           this.handleDelete(song.id)
//         );
//       };
//
//       return(
//         <Song
//           key = {song.id}
//           song = {song}
//           id = {song.id}
//           handleUpvote = {handleUpvote}
//           handleDownvote = {handleDownvote}
//           handleDeleteSong = {handleDeleteSong}
//           currentUser = {this.state.currentUser}
//           score = {song.score}
//         />
//       );
//     });
//
//     return(
//       <div>
//         {songs}
//       </div>
//     );
//   }
// }
//
// export default SongList;

import React from 'react';
import Song from './Song';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      songs: [],
      users: [],
      songId: null
    };
    this.getSongs = this.getSongs.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleVote(type, id){
    let data = {
      song_id: id
    };

    let jsonStringData = JSON.stringify(data);
    fetch(`/api/v1/songs/${id}/${type}`, {
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStringData
    })
    .then(response => {
      fetch(`/api/v1/songs`, {
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
          users: newUsers
        });
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(songId) {
    fetch(`/api/v1/songs/${songId}`, {
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
      fetch(`/api/v1/songs`, {
        credentials: 'same-origin'
      })
      .then(response => {
        if(response.ok) {
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
          users: newUsers
        });
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.getSongs();
    setInterval(this.getSongs, 10000);
  }

  getSongs(){
    fetch('api/v1/songs', {
      credentials: 'same-origin',
    }).then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      let newCurrentUser = response.currentUser;
      let newSongs = [];
      response.songs.forEach(function(song){
        newSongs.push(song);
      });
      newSongs;
      this.setState({
        currentUser: newCurrentUser,
        songs: newSongs
      });
    });
  }

  render(){
    let counter = -1;
    let songs = this.state.songs.map((song)=>{
      counter ++;
      let handleUpvote = () => {
        return(
          this.handleVote('up_vote', song.id)
        );
      };
      let handleDownvote = () => {
        return(
          this.handleVote('down_vote', song.id)
        );
      };

      let handleDeleteSong = () => {
        return(
          this.handleDelete(song.id)
        );
      };

      return(
        <Song
          key = {song.id}
          song = {song}
          id = {song.id}
          handleUpvote = {handleUpvote}
          handleDownvote = {handleDownvote}
          handleDeleteSong = {handleDeleteSong}
          currentUser = {this.state.currentUser}
          score = {song.score}
        />
      );
    });

    return(
      <div>
        {songs}
      </div>
    );
  }
}

export default SongList;
