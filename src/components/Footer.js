import React, {useState, useEffect, useMemo } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Player from '../components/player/Player';



function Footer(props) {

  const { auth, users } = props; 

  const navigate = useNavigate();

  const [songs, setSongs] = useState([{}]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  const handleClick = () => {
    navigate('/promote')
  }

  const newArray = [];

  useEffect(() => {  
    if (users) {
      
      users.map((user) => {
       
        console.log(user.id === auth.uid && user.purchasedSongs);
        if (user.id === auth.uid && user.purchasedSongs) {
          
          user.purchasedSongs.map((item) => {
            
            const songObject = {
              title: item.title,
              artist: item.artist,
              src: item.song
            }
            if (!songs.includes(songObject) && songs.length <= user.purchasedSongs.length) {
              newArray.push(songObject);
            }
          })
          
          if (songs.length !== newArray.length) {
            setSongs(newArray);

            console.log(songs);
          }

        }
      })
    }
  });

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
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users'}
  ])
)(Footer);
