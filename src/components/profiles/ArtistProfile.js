import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link } from "react-router-dom";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { storage } from '../../config/fbConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addSong, addBandSong } from '../../store/actions/authActions';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function ArtistProfile(props) {

    const { auth, users, shows, bands } = props;

    const { register, handleSubmit } = useForm();

    const localizer = momentLocalizer(moment) 

    let navigate = useNavigate();

    const [mp3Url, setMp3Url] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [song, setSong] = useState(null);
    const [myEvents, setMyEvents] = useState([]);
    const [bandSong, setBandSong] = useState([]);
    const [type, setType] = useState("artist");
    const [active, setActive] = useState(true);

    const toggleStatus = (e) => {
      e.preventDefault();
      const showBtn = document.querySelector(".my-shows");
      const songBtn = document.querySelector(".my-songs");
      const bandBtn = document.querySelector(".my-bands");
      const shows = document.querySelector(".shows");
      const songs = document.querySelector(".songs");
      const bands = document.querySelector(".bands");
      if (e.target.id === "my-songs") {
        songBtn.classList.add("btn-primary");
        songBtn.classList.remove("btn-warning");
        showBtn.classList.add("btn-warning");
        showBtn.classList.remove("btn-primary");
        bandBtn.classList.add("btn-warning");
        bandBtn.classList.remove("btn-primary");
        bands.classList.add("d-none");
        shows.classList.add("d-none");
        songs.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "my-shows") {
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        showBtn.classList.add("btn-primary");
        showBtn.classList.remove("btn-warning");
        bandBtn.classList.add("btn-warning");
        bandBtn.classList.remove("btn-primary");
        bands.classList.add("d-none");
        songs.classList.add("d-none");
        shows.classList.remove("d-none");
        setActive(true);
      } else if (e.target.id === "my-bands") {
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        showBtn.classList.add("btn-warning");
        showBtn.classList.remove("btn-primary");
        bandBtn.classList.add("btn-primary");
        bandBtn.classList.remove("btn-warning");
        songs.classList.add("d-none");
        shows.classList.add("d-none");
        bands.classList.remove("d-none");
        setActive("bands");
      }
    }

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
                if (type === "band") {
                  console.log(bandSong);
                  const songObject = {
                    id: bandSong.toString(),
                    title: title,
                    price: price,
                    song: downloadURL,
                    voters: [auth.uid]
                  }
                  props.addBandSong(songObject);
                } else if (type === "artist") {
                  const songObject = {
                    title: title,
                    price: price,
                    song: downloadURL
                  }
                  props.addSong(songObject);
                }

                
              }).then(() => {
                console.log("success");
                navigate('/artists');
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
      bands.map((band) => {
        if (e.target.value === band.id) {
          setType("band");
          bandSong.push(band.id);
        }
      })
      users.map((user) => {
        if (e.target.value === user.id) {
          setType("artist");
        }
      })
      console.log(type);
    }

    const handleClick = (e) => {
      navigate("/band/" + e.target.id);
    }

    const pushBand = () => {
      navigate('/bandProfile');
    }

    const pushShow = (e) => {
      navigate('/tickets/' + e.target.id);
    }
  
    const pushInvites = () => {
      navigate('/invites');
    }

    useEffect(() => {
      if (shows) {
        shows.map((show) => {
          if (show.artists) {
            show.artists.map((artist) => {
              try {
                const showObject = {
                  id: show.id,
                  title: show.artists[0].firstName + " " + show.artists[0].lastName,
                  start: new Date(show.startTime.toDate()),
                  end: new Date(show.endTime.toDate())
                }
                if (artist.id === auth.uid && show.activated === true && !myEvents.includes(showObject)) {
                    myEvents.push(showObject);
                }
              } catch (err) {
                console.log(err);
              }
            })
          }
        })
      }

    }, [])

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
              if (user.id === auth.uid) {
                return (
                  <div>
                  <div className="profile-border">
                    <br/>
                    <br/>   
                    <div className="text-center">
                      {(() => {
                        if (active === true) {
                          return <h4>MY SHOWS</h4>
                        } else if (active === false) {
                          return <h4>MY SONGS</h4>
                        } else if (active === "bands") {
                          return <h4>MY BANDS</h4>
                        }
                      })()}       
                      <br/>
                      <div  className="tab-border">
                        <button className="my-bands btn btn-warning" onClick={toggleStatus} id="my-bands">my bands</button>
                        <button className="my-shows btn btn-primary" onClick={toggleStatus} id="my-shows">my shows</button>
                        <button className="my-songs btn btn-warning" onClick={toggleStatus} id="my-songs">my songs</button>
                        <button className="artist btn btn-warning" onClick={pushInvites}>Invites</button>
                      </div>
                    </div>
                    <br/>
                    <Table className="shows" hover>
                      <thead >
                        <tr>
                          
                          <th>Show Details</th>
                          <th>Artists</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {shows && shows.map((show) => {
                        
                          return (
                            <tbody >
                              {show.artists.map((item) => {
                                if (item.id === auth.uid) {
                                  return (
                                    <tr>
                                      <td><button className="btn btn-primary" id={show.id} onClick={pushShow}>view</button></td>
                                      <td>
                                      <Dropdown >
                                        <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                        >
                                        {show.artists[0].firstName} {show.artists[0].lastName}
                                        </Dropdown.Toggle>
            
                                        <Dropdown.Menu>
                                          {show.artists.map((artist) => {
                                            return (
                                              <div>
                                                <Dropdown.Item href="#/action-1">                             
                                                    <Link to={"/artist/" + artist.id}>
                                                      {artist.firstName} {artist.lastName}
                                                    </Link>
                                                </Dropdown.Item>
                                              </div>
                                            )
                                          })}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                      {(() => {
                                        if (show.activated) {
                                          return <td>active</td>
                                        } else {
                                          return <td>pending</td>
                                        }
                                      })()}
                                      
                                    </tr>
                                  )
                                }
                              })}

                            </tbody>
                          )
                        

                      })}

                    </Table>
                    <Table className="songs d-none" hover>
                      <thead >
                        <tr>
                          <th>Title</th>
                          <th>Revenue</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                        {user.songs && user.songs.map((song) => {
                        return (
                          <tbody >
                            <tr>
                              <td>{song.title}</td>
                              <td>${song.revenue}</td>
                              <td>{song.buyers.length}</td>
                            </tr>
                          </tbody>
                        )
                        })}

                    </Table>
                    <Table className="bands d-none" hover>
                      <thead >
                        <tr>
                            <th >Band</th>
                            <th>Members</th>
                            <th>Creator</th>
                        </tr>
                      </thead>
                        {bands && bands.map((band) => {
                          if (band.ids.includes(auth.uid)) {
                            
                            return (
                                <tbody>
                                <tr>
                                    <td><button className="btn btn-primary" onClick={handleClick} id={band.id}>{band.bandName}</button></td>
                                    <td>                      
                                    <Dropdown >
                                        <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                        >
                                        {band.members[0].firstName} {band.members[0].lastName}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        {band.members.map((artist) => {
                                            return (
                                                <Dropdown.Item href="#/action-1">                           
                                                    <Link to={"/artist/" + artist.id}>
                                                        {artist.firstName} {artist.lastName}
                                                    </Link>
                                                </Dropdown.Item>
                                            )
                                        })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                    <td>{band.creatorUserName}</td>
                                </tr>
                                </tbody>
                            )
                          } 
                        })}
                        </Table>
                    <br/>
                  </div>
                  <div className="profile-border">
                    <br/>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <h1 className="text-center">Upload Songs</h1>
                      <br/>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Enter Artist Or Band</Form.Label>
                          <select className="form-select" aria-label="Default select example">

                            {users && users.map((user) => {
                              if (user.id === auth.uid) {
                                return <option selected value={user.id}>{user.firstName} {user.lastName} (you)</option>
                                
                              }
                            })}
                            {bands && bands.map((band) => {
                              if (band.ids.includes(auth.uid)){
                                return <option value={band.id}>{band.bandName}</option>
                              }
                            })}
                            
                          </select>
                          

                      </Form.Group>
                      <Form.Group className="mb-3 text-center" onChange={handleChange} controlId="title" >
                          <Form.Label>Enter Song Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter the title of your song" 
                          
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
                  <br/>
                  <div className="profile-border">
                    <br/>
                    <h1 className="text-center">Artist Calendar</h1>
                    <br/>
                      <div className="myCustomHeight  p-3">
                        <Calendar
                          onSelectEvent={handleClick}
                          selectable
                          localizer={localizer}
                          events={myEvents}
                          startAccessor="start"
                          endAccessor="end"
                          view='week'
                          views={['week']}
                        />
                      </div>
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
      bands: state.firestore.ordered.bands,
      shows: state.firestore.ordered.shows
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song)),
    addBandSong: (song) => dispatch(addBandSong(song))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'shows' },
      { collection: 'bands' }
    ])
  )(ArtistProfile);