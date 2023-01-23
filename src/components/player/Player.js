import React, {useState, useEffect, useRef } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Controls from './Controls';
import { addPlaylistListener, removePlaylistListener } from '../../store/actions/authActions';


const Player = (props) => {

    const { auth, users, playlists, bands } = props;

    const navigate = useNavigate();

    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [opener, setOpener] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState(props.songs);
    const [currentPlaylistName, setCurrentPlaylistName] = useState("standard");

    const handlePlaylist = (e) => {
        e.preventDefault();
        setCurrentPlaylist([]);
        playlists.map((playlist) => {
            if (playlist.id === e.target.id) {
                setCurrentPlaylistName(playlist.name);
                if (playlist.listeners && !playlist.listeners.includes(auth.uid)) {
                    props.addPlaylistListener(playlist.id, auth.uid);
                } else if (!playlist.listeners) {
                    props.addPlaylistListener(playlist.id, auth.uid);      
                }
                
            } else if (playlist.id !== e.target.id && playlist.listeners && playlist.listeners.includes(auth.uid)) {
                props.removePlaylistListener(playlist.id, auth.uid);
            }
        })
        
    }

    const handleOpener = (e) => {
        e.preventDefault();
        const close = document.querySelector(".playlist-container");
        const promote = document.querySelector(".promote-button");
        if (close.style.display === "flex") {
            close.style.display = "none";
            promote.style.bottom = "20px";
            setOpener(0)
        }
        else if (e.target.id === "0") {
            close.style.display = "flex";
            promote.style.bottom = "-25px";
            setOpener(1)
        } 
        console.log(opener);
    }

    const handleOpen = (e) => {
        e.preventDefault();
        const close = document.querySelector(".playlist-container");
        const promote = document.querySelector(".promote-button");
        close.style.display = "none";
        promote.style.bottom = "-25px";
        console.log(close);
        if (e.target.id === "playlistBtn") {
            navigate('/playlists')
        }
        setOpener(0);
    }

    const handleArtist = (e) => {
        e.preventDefault();
        users.map((user) => {
            if (user.firstName + " " + user.lastName === props.songs[props.currentSongIndex].artist) {
                navigate('/artist/' + user.id);
            }
        })
        bands.map((band) => {
            if (band.bandName === props.songs[props.currentSongIndex].artist) {
                navigate('/band/' + band.id);
            }
        })
        setOpener(0);
    }

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div>            
            {/* <div className="c-player">
                <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
                <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
                <div className="c-test">
                    <button className="songButton btn btn-primary" id={opener} onClick={handleOpener}>{props.songs[props.currentSongIndex].title}</button> 
                    <button className="artistButton btn btn-primary" onClick={handleArtist}>{props.songs[props.currentSongIndex].artist}</button>
                </div>
            </div>  */}
            <div className="playlist-button-container">
                <button className="songButton btn btn-primary" id={opener} onClick={handleOpener}>{props.songs[props.currentSongIndex].title}</button> 
                <button className="artistButton btn btn-primary" onClick={handleArtist}>{props.songs[props.currentSongIndex].artist}</button>
            </div>
            <div className="playlist-container">
                <button id="close" className="playlist-button" onClick={handleOpen}>X</button>
                    <div className="player-section">
                        <div className="c-player">
                            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
                            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
                        </div> 
                    </div>
                    <div className="playlist-section">  
                        <p className="text-center">playlist: {currentPlaylistName}</p>   
                        <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {currentPlaylistName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            {playlists && playlists.map((playlist) => {
                                return (
                                    <Dropdown.Item href="#/action-1">                           
                                        <button className="btn btn-primary" onClick={handlePlaylist} id={playlist.id}>{playlist.name}</button> 
                                    </Dropdown.Item>
                                )
                            })}
                                    <Dropdown.Item href="#/playlists">
                                        <button className="btn btn-warning" onClick={handleOpen} id="playlistBtn">my playlists</button>
                                    </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                                            
                    </div>
            </div>          
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      playlists: state.firestore.ordered.playlists,
      bands: state.firestore.ordered.bands
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPlaylistListener: (playlist, listener) => dispatch(addPlaylistListener(playlist, listener)),
        removePlaylistListener: (playlist, listener) => dispatch(removePlaylistListener(playlist, listener))
    }
}
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'playlists' },
      { collection: 'bands' }
    ])
  )(Player);
  // import React, { useState } from "react";

  // function Player() {
  //   // Set up state to store the current song and song list
  //   const [currentSong, setCurrentSong] = useState(null);
  //   const [songList, setSongList] = useState([]);
  
  //   // Add a function to handle uploading new songs
  //   function handleUpload(event) {
  //     const files = event.target.files;
  //     for (let i = 0; i < files.length; i++) {
  //       // Check if the file is an MP3
  //       if (files[i].type === "audio/mpeg") {
  //         // Add the song to the list
  //         setSongList([...songList, files[i]]);
  //       }
  //     }
  //   }
  
  //   // Add functions to control the player
  //   function handlePlay() {
  //     currentSong.play();
  //   }
  //   function handlePause() {
  //     currentSong.pause();
  //   }
  //   function handleStop() {
  //     currentSong.pause();
  //     currentSong.currentTime = 0;
  //   }
  
  //   // Render the MP3 player
  //   return (
  //     <div className="c-player">
  //       {/* Add a song select menu */}
  //       <select className="btn btn-primary" value={currentSong} onChange={(event) => setCurrentSong(event.target.value)}>
  //         {songList.map((song) => (
  //           <option className="btn btn-primary" value={song}>{song.name}</option>
  //         ))}
  //       </select>
  //       {/* Add the player controls */}
  //       <button className="btn btn-primary" onClick={handlePlay}>Play</button>
  //       <button className="btn btn-primary" onClick={handlePause}>Pause</button>
  //       <button className="btn btn-primary" onClick={handleStop}>Stop</button>
  //       {/* Add the song uploader button in the footer */}
  //       <footer>
  //         <label htmlFor="upload-button">+</label>
  //         <input type="file" id="upload-button" multiple onChange={handleUpload} />
  //       </footer>
  //     </div>
  //   );
  // }
  
  // export default Player;
  