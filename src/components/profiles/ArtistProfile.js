import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { storage } from '../../config/fbConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addSong } from '../../store/actions/authActions';

function ArtistProfile(props) {

    const { auth, users } = props;

    const { register, handleSubmit } = useForm();

    let navigate = useNavigate();

    const [mp3Url, setMp3Url] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [song, setSong] = useState(null);
    
    const onSubmit = (data) => {
        const file = data.song[0]
      
        setSong(file);

        if (!file) return;

        const storageRef = ref(storage, `songs/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMp3Url(downloadURL)
              }).then(() => {
                if (mp3Url) {
                  const songObject = {
                    title: title,
                    price: price,
                    song: mp3Url
                  }
                  props.addSong(songObject);
                  navigate('/artists');
                }
              });
          }
        );
      }

    const handleChange = (e) => {
      if (e.target.id === "title") {
        setTitle(e.target.value);
      }
      if (e.target.id === "price") {
        setPrice(e.target.value);
      }
      if (e.target.id === "song") {
        onSubmit();
      }
    }

    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushInvites = () => {
      navigate('/invites');
    }

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
          <div>
          <br/>
          <br/>
          <br/>
          <br/>
          {users && users.map((user) => {
              if (user.id === auth.uid) {
                return (
                  <div>
                  <div className="profile-border">
                    <br/>
                    <div>
                        <button className="btn btn-primary" onClick={pushShows}>
                            Shows
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushInvites}>
                            Invites
                        </button>
                    </div>
                    
                    <br/>
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Main Instrument</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.mainInstrument}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="profile-border">
                    <br/>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <h1 className="text-center">Ticket Price</h1>
                      <br/>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Enter Song Title</Form.Label>
                          <Form.Control type="text" placeholder="Bohemian Rhapsody" 
                          
                          />

                      </Form.Group>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="price" >
                          <Form.Label>Enter Price</Form.Label>
                          <Form.Control type="text" placeholder="$10" 
                          
                          />

                      </Form.Group>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="song" 
                      {...register('song', { required: true })} type="file" name="song"
                      >
                          <Form.Label>Upload Song</Form.Label>
                          <Form.Control type="file" 
                          name="song"
                          />

                      </Form.Group>
                      <br/>
                      <br/>
                      <h3 className="text-center">price per download</h3>                    
                      <br/>
                      <br/>
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
  )(ArtistProfile);