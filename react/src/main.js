import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';

$(function() {
  if (document.getElementById('SongList')){
    ReactDOM.render(
      <SongList />,
      document.getElementById('SongList')
    );
  }
});
