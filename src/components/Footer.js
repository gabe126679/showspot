import React, {useState, useEffect } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Player from '../components/player/Player';
import firebase from "../config/fbConfig";
import "firebase/storage";


function Footer(props) {

  const { auth, users } = props; 

  const navigate = useNavigate();

  const [songs, setSongs] = useState([{}]);

  const handleClick = () => {
    console.log(songs);
  }

  useEffect(() => {
      // firebase.storage().ref('songs/').listAll().then(function (res) {
      //     res.items.forEach((songRef) => {
      //       songRef.getDownloadURL().then((url) => {
      //           console.log(url);
                const newArray = [];
                
                  users.map((user) => {
                    if (user.id === auth.uid && user.purchasedSongs) {
                      user.purchasedSongs.map((item) => {
                        
                        const songObject = {
                          title: item.title,
                          artist: user.firstName + " " + user.lastName,
                          src: item.song
                        }
                        if (!newArray.includes(songObject) && newArray.length <= user.purchasedSongs.length) {
                          newArray.push(songObject);
                          setSongs(newArray);
                        }
                        console.log(!newArray.includes(songObject));
                      })
                    }
                  })
        //     });
        //   });
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
  }, [])

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

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
            <button className="promote-button" to="/promote"><a className="promote-link text-dark" href="/promote">Promote</a></button>
            <div className="song-container">

              <div className="media-player float-start ">
                {/* <audio
                    className="audio-player"
                    controls
                    src="https://firebasestorage.googleapis.com/v0/b/dream-project-1040a.appspot.com/o/songs%2F1.%20Carrie%20Morris.mp3?alt=media&token=7fdfb504-1c5e-4130-be53-c660de585503">
                        Your browser does not support the
                        <code>audio</code> element.

                </audio> */}
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
