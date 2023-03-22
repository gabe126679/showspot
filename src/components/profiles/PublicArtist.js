
import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link, useParams } from "react-router-dom";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { storage } from '../../config/fbConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addSong, addBandSong } from '../../store/actions/authActions';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import symbolOne from "../../1.png";

function PublicArtist(props) {

    const { auth, users, shows, bands } = props;

    const { register, handleSubmit } = useForm();

    const localizer = momentLocalizer(moment) 

    let navigate = useNavigate();

    const { id } = useParams();

    const [mp3Url, setMp3Url] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [song, setSong] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [songDropdown, setSongDropdown] = useState(false);
    const [bandDropdown, setBandDropdown] = useState(false);
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

    // useEffect(() => {
    //   if (shows) {
    //     shows.map((show) => {
    //       if (show.artists) {
    //         show.artists.map((artist) => {
    //           try {
    //             const showObject = {
    //               id: show.id,
    //               title: show.artists[0].firstName + " " + show.artists[0].lastName,
    //               start: new Date(show.startTime.toDate()),
    //               end: new Date(show.endTime.toDate())
    //             }
    //             if (artist.id === auth.uid && show.activated === true && !myEvents.includes(showObject)) {
    //                 myEvents.push(showObject);
    //             }
    //           } catch (err) {
    //             console.log(err);
    //           }
    //         })
    //       }
    //     })
    //   }

    // }, [])

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
          <div>
           <Form className="artist-search-form">
               <Form.Group className="text-center artist-search-field mb-3" controlId="second" onChange={handleChange}>


                   <Form.Control className="text-center artist-search-input" type="text" placeholder="Search Shows, Bands or Songs"
                  
                  />
                <div  className="search-buttons">
                  <button className="my-bands btn btn-warning" onClick={toggleStatus} id="my-bands">bands</button>
                  <button className="my-shows btn btn-primary" onClick={toggleStatus} id="my-shows">shows</button>
                  <button className="my-songs btn btn-warning" onClick={toggleStatus} id="my-songs">songs</button>
                  
                </div>
                
              </Form.Group>

              <button className="action-button btn btn-primary float-end" onClick={() => {
                navigate("/artistProfile");
              }}>my profile</button>
          </Form>
          {/* {users && users.map((user) => {})} */}
          {users && users.map((user) => {
              if (user.id === id) {
                return (
                  <div className="main-container-artist-profile">
                    <div className='shows'>
                      {shows && shows.map((show) => {
                          return (
                            <div >
                              {show.artists.map((item) => {
                                if (item.id === user.id) {
                                  return (
                                    <div className="ticket-border">
                                      <div className=" card-container">
                                        <div className="card">
                                          <div className="card-header">
                                            <h2 className="username description-text">{show.promoterUserName}
                                            </h2>
                                            {(() => {
                                              if (show.activated === true) {
                                                  return <p className="description-arrow text-success">(active)</p>
                                              } else  { 
                                                  return <p className="description-arrow text-secondary">(pending)</p>
                                              }
                                            })()}
                                          </div>
                                          <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                                            navigate("/tickets/" + show.id)
                                          }} />
                                        
                                            <div className="description-dropdown">
                                              <div className='description-text'>{show.voteCount} votes</div>
                                                {(() => {
                                                  if (item.id === user.id && (!item.accepted || item.accepted === false)) {
                                                    return (
                                                      <button className="btn btn-primary description-arrow" onClick={() => {   
                                                      props.updateVote(user.id, show.id); }} id={show.id}>accept</button>
                                                    )
                                                  } else if (item.id === user.id && item.accepted === true) {
                                                    return (
                                                      <div className="description-container">
                                                        <p className="color-warning description-text">accepted</p>
                                                        <button className="btn btn-primary description-text" onClick={() => {   
                                                        props.updateVote(user.id, show.id); }} id={show.id}>reject</button>
                                                      </div>
                                                    )
                                                  } else if (item.id !== user.id && !show.votedOn.includes(user.id)) {
                                                    return  <button className="btn btn-primary description-arrow" onClick={() => {   
                                                      props.updateVote(user.id, show.id); }} id={show.id}>accept</button>
                                                  } else if (item.id !== user.id && show.votedOn.includes(user.id)) {
                                                    return <p className="color-warning description-text">voted</p>
                                                  }
                                                })()}
                                            </div>
                                        <div className="dropdown-container">
                                          <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                                            Show Info
                                          </button>
                                          {showDropdown && (
                                            <div className="dropdown-content">
                                              {show.artists.map((artist) => {
                                                if (artist.type === "artist") {
                                                  return (
                                                    <div className="description-dropdown dropdown-link">                       
                                                        <Link className="description-text" to={"/artist/" + artist.id}>
                                                          {artist.firstName} {artist.lastName}
                                                        
                                                        </Link>
                                                        <p className="description-arrow">artist</p>
                                                      
                                                    </div>
                                                  )
                                                } else if (artist.type === "band") {
                                                  return (
                                                    <div className="description-dropdown dropdown-link">
                                                                                  
                                                        <Link className="description-text" to={"/artist/" + artist.id}>
                                                          {artist.bandName}
                                                        </Link>
                                                        <p className="description-arrow">band</p>
                                                    </div>
                                                  )
                                                }
                
                                              })}
                
                                                <div className="description-dropdown dropdown-link">
                                                  
                                                  <Link className="description-text" to={"/venue/" + show.venueId}>
                                                    {show.venueName}
                                                  </Link>
                                                  {users && users.map((user) => {
                                                    if (user.id=== show.venueId) {
                                                      return (
                                                        <p className="description-arrow">{user.venueAddress}</p>
                                                      )
                                                    } 
                                                  })} 
                
                                              </div>
                                            </div>
                                          )}
                
                                        </div>
                                    </div>
                                  </div>
                                    </div>
                                  )
                                }
                              })}

                            </div>
                          )
                        

                      })}
                    </div>
                    <div className="songs d-none">
                      {user.songs && user.songs.map((song) => {

                        return (
                          <div className=" ticket-border">
                            <div className=" card-container">
                              <div className="card">
                                <div className="card-header">
                                  <h2 className="username">{song.artist}

                                  </h2>
                                  <p className="description-arrow">{song.title}</p>
                                
                                </div>
                              <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                                navigate("/song/" + song.url)
                              }} />
                            
                                <div className="description-dropdown">
                                  <div className='text-warning description-text'>{song.price}</div>
                                    {(() => {
                                      if (!song.buyers.includes(user.id)) {
                                        return <button className="btn btn-primary description-arrow" onClick={() => {   
                                          props.updateVote(user.id, song.url); }} id={song.url}>add to cart
                                        </button>
                                      } else if (song.buyers.includes(user.id)) {
                                        return <p className="text-warning description-text">purchased</p>
                                      }
                                    })()}
                                </div>
                                <div className="dropdown-container">
                                  <button className="dropdown-button" onClick={() => setSongDropdown(!songDropdown)}>
                                    Song Info
                                  </button>
                                    {songDropdown && (
                                      <div className="dropdown-content">
                                        <div className="description-dropdown dropdown-link">                       
                                            <Link className="description-text" to={"/song/" + song.url}>
                                              {song.artist}
                                            
                                            </Link>
                                            <p className="description-arrow">{song.title}</p>
                                          
                                        </div>
                                      </div>
                                    )}

                                </div>
                            
                              </div>
                            </div>

                          </div>
                        )
                      })}

                    </div>
                    <div className="bands d-none">
                      {bands && bands.map((band) => {             
                        return (
                          <div className="ticket-border">
                            <div className=" card-container">
                              <div className="card">
                                <div className="card-header">
                                  <h2 className="username">{band.bandName}

                                  </h2>
                                  {(() => {
                                    if (band.activated === true) {
                                        return <p className="description-arrow text-success">(active)</p>
                                    } else  { 
                                        return <p className="description-arrow text-secondary">(pending)</p>
                                    }
                                  })()}
                                
                                </div>
                              <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                                navigate("/artist/" + band.id)
                              }} />
                            
                                <div className="description-dropdown">
                                  <div className='text-warning description-text'>{band.bandName}</div>
                                    {band.members && band.members.map((member) => {
                                      if (band.members.includes(user.id) && member.id === user.id && member.activated === false) {
                                        return <button className="btn btn-primary description-arrow" onClick={() => {   
                                          props.updateVote(user.id, band.id); }} id={band.id}>accept invite
                                        </button>
                                      } else if (band.members.includes(user.id) && member.id === user.id && member.activated === true) {
                                        return <p className="text-warning description-text">invite accepted</p>
                                      } 
                                    })}
                                </div>
                                <div className="dropdown-container">
                                  <button className="dropdown-button" onClick={() => setBandDropdown(!bandDropdown)}>
                                    Band Info
                                  </button>
                                    {bandDropdown && band.members && band.members.map((member) => {
                                      return (
                                        <div className="dropdown-content">
                                          <div className="description-dropdown dropdown-link">                       
                                              <Link className="description-text" to={"/artist/" + band.id}>
                                                {member.firstName} {member.lastName}
                                              
                                              </Link>
                                              <p className="description-arrow">{band.BandName}</p>
                                            
                                          </div>
                                        </div>
                                      )

                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                  </div>
                )
              }
            })}
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
  )(PublicArtist);