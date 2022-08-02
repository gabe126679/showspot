import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link } from "react-router-dom";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { addPlaylist, addPlaylistSong } from '../store/actions/authActions';


function Playlists(props) {

    const { auth, users, playlists } = props;

    let navigate = useNavigate();

    const [artist, setArtist] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [active, setActive] = useState(true);
    const [songs, setSongs] = useState([]);
    const [firstSong, setFirstSong] = useState("");

    const toggleStatus = (e) => {
      e.preventDefault();
      const playlistsButton = document.querySelector(".playlists");
      const purchasedButton = document.querySelector(".purchased-songs");
      const songsButton = document.querySelector(".all-songs");
      const playlists = document.querySelector(".playlists-table");
      const purchasedSongs = document.querySelector(".purchased-songs-table");
      const allSongs = document.querySelector(".all-songs-table");
      if (e.target.id === "playlists") {
        purchasedButton.classList.add("btn-warning");
        purchasedButton.classList.remove("btn-primary");
        songsButton.classList.add("btn-warning");
        songsButton.classList.remove("btn-primary");
        playlistsButton.classList.add("btn-primary");
        playlistsButton.classList.remove("btn-warning");
        playlists.classList.remove("d-none");
        purchasedSongs.classList.add("d-none");
        allSongs.classList.add("d-none");
        setActive(false);
      } else if (e.target.id === "purchased-songs") {
        purchasedButton.classList.add("btn-primary");
        purchasedButton.classList.remove("btn-warning");
        songsButton.classList.add("btn-warning");
        songsButton.classList.remove("btn-primary");
        playlistsButton.classList.add("btn-warning");
        playlistsButton.classList.remove("btn-primary");
        purchasedSongs.classList.remove("d-none");
        playlists.classList.add("d-none");
        allSongs.classList.add("d-none");
        setActive(true);
      } else if (e.target.id === "all-songs") {
        songsButton.classList.add("btn-primary");
        songsButton.classList.remove("btn-warning");
        purchasedButton.classList.add("btn-warning");
        purchasedButton.classList.remove("btn-primary");
        playlistsButton.classList.add("btn-warning");
        playlistsButton.classList.remove("btn-primary");
        purchasedSongs.classList.remove("d-none");
        playlists.classList.add("d-none");
        allSongs.classList.remove("d-none");
        purchasedSongs.classList.add("d-none");
      }
      
    }

    const handleChange = (e) => {
        e.preventDefault();
        setPlaylistName(e.target.value);
        console.log(playlistName);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const playlistObject = {
          name: playlistName,
          creator: auth.uid
        }
        props.addPlaylist(playlistObject);
    }

    const handlePlaylist = (e) => {
      e.preventDefault();
      
    }

    const pushSpotters = (e) => {
      e.preventDefault();
      navigate("/spotters");
    }

    useEffect(() => {
      if (users) {
        users.map((user) => {
          if (user.songs) {
            user.songs.map((song) => {
              if (!songs.includes(song)) {
                songs.push(song);
              }
            })
          }
        })
      }

      if (songs.length > 0) {
        setFirstSong(songs[0].title);
      }
    })

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
          <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          {users && users.map((user) => {
              if (user.id === auth.uid && user.purchasedSongs) {
                return (
                  <div>
                  <div className="profile-border">
                  <br/>
                  <br/>
                  <div className="text-center">
                    {(() => {
                      if (active) {
                        return <h4>ACTIVE SHOWS</h4>
                      } else {
                        return <h4>PENDING SHOWS</h4>
                      }
                    })()}       
                    <br/>
                    <div  className="tab-border">
                      <button className="all-songs btn btn-warning" onClick={toggleStatus} id="all-songs">all songs</button>
                      <button className="playlists btn btn-primary" onClick={toggleStatus} id="playlists">my playlists</button>
                      <button className="purchased-songs btn btn-warning" onClick={toggleStatus} id="purchased-songs">purchased songs</button>
                      <button className="spotters btn btn-warning" onClick={pushSpotters}>Spotters</button>
                    </div>
                  </div>
                    <br/>
                <Table className="playlists-table text-center" hover>
                    <thead >
                        <tr>
                          <th>Title</th>
                          <th>Songs</th>
                          <th>Add Song</th>
                        </tr>
                    </thead>
                    {playlists && playlists.map((playlist) => {
                      console.log(songs);
                      if (songs) {
                        return (
                            <tbody >
                              <tr>
                                  <td>{playlist.name}</td>
                                  <td>
                                    <Dropdown >
                                      <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                      >
                                      {playlist.songs[0].title}
                                      </Dropdown.Toggle>
          
                                      <Dropdown.Menu>
                                        {playlist.songs && playlist.songs.map((playlistSong) => {
                                          
                                            return (
                                              <div>
                                                <Dropdown.Item >                             
                                                  {playlistSong.title}  
                                                </Dropdown.Item>
                                              </div>
                                            )
                                          
                                        })}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </td>
                                  <td className=" text-center"><button className="btn btn-primary" onClick={handlePlaylist}>+</button></td>
                              </tr>
                            </tbody>
                        )
                      }
                    })}
                </Table>
                <Table className="purchased-songs-table d-none text-center" hover>
                    <thead >
                        <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Add To Playlist</th>
                        </tr>
                    </thead>
                    {user.purchasedSongs.map((song) => {
                        users.map((secondUser) => {
                            if (secondUser.songs) {
                                secondUser.songs.map((track) => {
                                    if (track.song === song.song && artist !== user.firstName + " " + user.lastName) {
                                        setArtist(user.firstName + " " + user.lastName)
                                    }
                                })
                            }
                        })
                        return (
                            <tbody >
                            <tr>
                                <td className="song-title">{song.title}</td>
                                <td>{artist}</td>
                                <td className=" text-center">

                                    <Dropdown >
                                      <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                      >
                                      
                                      </Dropdown.Toggle>
          
                                      <Dropdown.Menu>
                                        {playlists && playlists.map((playlist) => {
                                          
                                            return (
                                              <div>
                                                <Dropdown.Item >                             
                                                  <button className="btn btn-primary" onClick={() => {
                                                      const songObject = {
                                                        song: song,
                                                        playlist: playlist.id
                                                      }
                                                      props.addPlaylistSong(songObject);
                                                    }}>{playlist.name}</button>
                                                </Dropdown.Item>
                                              </div>
                                            )
                                          
                                        })}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </td>
                            </tr>
                            </tbody>
                            )
                    })}
                </Table>
                <Table className="all-songs-table d-none text-center" hover>
                    <thead >
                        <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Add To Playlist</th>
                        </tr>
                    </thead>
                    {songs && songs.map((song) => {
                        return (
                            <tbody >
                              <tr>
                                  <td className="song-title">{song.title}</td>
                                  <td>{song.artist}</td>
                                  <td className=" text-center"><button className="btn btn-primary" onClick={handlePlaylist}>+</button></td>
                              </tr>
                            </tbody>
                            )
                    })}
                </Table>
                  </div>
                  <div className="profile-border">
                    <br/>
                    <Form onSubmit={handleSubmit}>
                      <h1 className="text-center">Create Playlist</h1>
                      <br/>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Name Your Playlist</Form.Label>
                          <Form.Control type="text" placeholder="Enter Playlist Name" 
                          
                          />

                      </Form.Group>
                      <div className="d-flex justify-content-center">
                          <Button className="align-center" variant="primary" type="submit">
                              + playlist
                          </Button>
                      </div>
                      <br/>
                    </Form>
                    <br/>
                  </div>
                  </div>
              ) 
              }
            })}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

          </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      playlists: state.firestore.ordered.playlists
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlaylist: (playlist) => dispatch(addPlaylist(playlist)),
    addPlaylistSong: (song) => dispatch(addPlaylistSong(song))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {  collection: 'users'  },
      {  collection: 'playlists'  }
    ])
  )(Playlists);