import React, {useState, useEffect, useRef } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Controls from './Controls';


const Player = (props) => {

    const { auth, users, playlists } = props;

    const navigate = useNavigate();

    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [opener, setOpener] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    const [currentPlaylistName, setCurrentPlaylistName] = useState("purchased songs");

    const handleSong = (e) => {
        e.preventDefault();
        // const close = document.querySelector(".playlist-container");
        // if (e.target.id === true) {
        //     close.style.display = "none";
        // } else if (e.target.id === false) {
        //     close.style.display = "flex";

        // }

        // users.map((user) => {
        //     if (user.firstName + " " + user.lastName === props.songs[props.currentSongIndex].artist) {
                
        //         user.songs.map((track) => {
        //             if (track.song === props.songs[props.currentSongIndex].src) {
        //                 console.log(track);
        //             }
        //         })
        //     }
        // })
        playlists.map((playlist) => {
            playlist.songs.map((song) => {
                const songObject = {
                    title: song.title,
                    artist: song.artist,
                    src: song.song
                }
                if (!currentPlaylist.includes(songObject)) {
                    currentPlaylist.push(songObject);
                }
            })
        })
        
    }

    const handlePlaylist = (e) => {
        e.preventDefault();
        playlists.map((playlist) => {
            if (playlist.id === e.target.id) {
                setCurrentPlaylistName(playlist.name);
                playlist.songs.map((song) => {
                    const songObject = {
                        title: song.title,
                        artist: song.artist,
                        src: song.song
                    }
                    if (!currentPlaylist.includes(songObject)) {
                        currentPlaylist.push(songObject);
                    }
                })
            }
            
        })
        props.setSongs(currentPlaylist);
    }

    const handleOpener = (e) => {
        e.preventDefault();
        const close = document.querySelector(".playlist-container");
        if (close.style.display === "flex") {
            close.style.display = "none";
            setOpener(0)
        }
        else if (e.target.id === "0") {
            close.style.display = "flex";
            setOpener(1)
        } 
    }

    const handleOpen = (e) => {
        e.preventDefault();
        const close = document.querySelector(".playlist-container");
        close.style.display = "none";
        console.log(close);
        if (e.target.id === "playlistBtn") {
            navigate('/playlists')
        }
    }

    const handleArtist = (e) => {
        e.preventDefault();
        users.map((user) => {
            if (user.firstName + " " + user.lastName === props.songs[props.currentSongIndex].artist) {
                navigate('/artist/' + user.id);
            }
        })
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
        <div className="c-player">
            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <div className="c-test">
                <button className="playerButton btn btn-primary" id={opener} onClick={handleOpener}>{props.songs[props.currentSongIndex].title}</button> 
                <button className="playerButton btn btn-primary" onClick={handleArtist}>{props.songs[props.currentSongIndex].artist}</button>
            </div>

            <div className="playlist-container">
                <button id="close" className="playlist-button" onClick={handleOpen}>X</button>
                {users && users.map((user) => {
                    if (user.id === auth.uid && user.purchasedSongs) {
                        return (
                            <div className="playlist-section">

                                <p className="playlist-banner text-center">playlist:</p>
                                <p className="text-center">"Purchased Songs"</p>     
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
                                            <button class="btn btn-warning" onClick={() => {
                                                navigate('/playlists');
                                            }}>my playlists</button>
                                    </Dropdown.Menu>
                                </Dropdown>
                                                    
                                <br/>  
                                <table>
                                    <tbody>
                                        {props.songs.map((song) => {
                                            return (
                                                    <tr className="p-3 m-1 border" >
                                                        <td className="p-3 m-1 border bg-warning text-white" key={song.src}>{song.title}</td>
                                                    </tr> 
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )
                    } 
                })}

                <div className="current-song-section">
                    <p className="playlist-banner text-center ">playing:</p>
                    <p className="text-center">current song:</p>
                    <button className="m-3 p-2 text-center btn-sm btn-primary" onClick={handleSong}>{props.songs[props.currentSongIndex].title}</button>
                    <p className="text-center">current artist:</p>
                    <button className="m-3 p-2 text-center btn-sm btn-primary" onClick={handleArtist}>{props.songs[props.currentSongIndex].artist}</button>
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
  )(Player);
