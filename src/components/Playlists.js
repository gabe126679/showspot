import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { storage } from '../config/fbConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addSong } from '../store/actions/authActions';

function Playlists(props) {

    const { auth, users } = props;

    const { register, handleSubmit } = useForm();

    let navigate = useNavigate();

    const [artist, setArtist] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
    }

    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushProfile = () => {
      navigate('/spotterProfile');
    }

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
                    <button className="btn btn-primary" id={auth.uid} onClick={pushProfile}>
                        Spotter Profile
                    </button>
                    <br/>
                        <br/>
                        <p className="text-center border bg-warning text-white">{user.userName}</p>
                    <br/>
                <Table className="text-center" hover>
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
                                <td>{song.title}</td>
                                <td>{artist}</td>
                                <td className=" text-center"><button className="btn btn-primary">+</button></td>
                            </tr>
                            </tbody>
                            )
                    })}
                </Table>
                  </div>
                  <div className="profile-border">
                    <br/>
                    <Form onSubmit={handleSubmit}>
                      <h1 className="text-center">Add Song</h1>
                      <br/>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Name Your Playlist</Form.Label>
                          <Form.Control type="text" placeholder="Playlist number one" 
                          
                          />

                      </Form.Group>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Enter Song, Artist or Band</Form.Label>
                          <Form.Control type="text" placeholder="Bohemian Rhapsody" 
                          
                          />

                      </Form.Group>

                      <div className="d-flex justify-content-center">
                          <Button className="align-center" variant="primary" type="submit">
                              + song
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
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Playlists);