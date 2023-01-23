import React, {useState, useEffect, useMemo } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Player from '../components/player/Player';

function Footer(props) {

  const { auth, users, playlists } = props; 

  const navigate = useNavigate();

  const [songs, setSongs] = useState([{}]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [standardSongs, setStandardSongs] = useState([]);
  const [standardSongIds, setStandardSongIds] = useState([]);

  const handleClick = () => {
    navigate('/promote')
  }

  const newArray = [];

  useEffect(() => {  
    if (playlists) {
      playlists.map((playlist) => {
        if (playlist.name === "standard") {
          playlist.songs.map((song) => {
            const songObject = {
              title: song.title,
              artist: song.artist,
              src: song.song
            }
            if (!standardSongs.includes(songObject) && !standardSongIds.includes(song) && standardSongs.length <= playlist.songs.length) {
              standardSongIds.push(song);
              standardSongs.push(songObject);
            }
          })
        }
        if (playlist.listeners && playlist.listeners.includes(auth.uid)) {
          playlist.songs.map((song) => {
            const songObject = {
              title: song.title,
              artist: song.artist,
              src: song.song
            }
            if (!newArray.includes(songObject) && newArray.length <= playlist.songs.length) {
              newArray.push(songObject);
            }
          })
        }
      })
      if (newArray.length > 0) {
        setSongs(newArray);
      } else if (newArray.length === 0) {
        setSongs(standardSongs);
      }
    }
  }, [playlists]);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="footer">
        <div className="footer-content">
            <div className="promote-button">
              <Link className="promote-link" to="/promote">PROMOTE</Link>
            </div>

            <div className="song-container">

              <div className="media-player float-start ">
                <Player 
                  currentSongIndex={currentSongIndex} 
                  setCurrentSongIndex={setCurrentSongIndex} 
                  nextSongIndex={nextSongIndex} 
                  songs={songs}
                  setSongs={setSongs}
                />
              </div>
            </div>          
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    playlists: state.firestore.ordered.playlists
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
    { collection: 'playlists' }
  ])
)(Footer);
