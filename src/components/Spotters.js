import React, { useEffect, useState } from 'react'
import { Table, Dropdown, Form } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createBackline, updateVote } from '../store/actions/showActions';
import '../instagram.css';
import symbolOne from "../1.png";

function Spotters(props) {
  const { auth, shows, users } = props;

  const [buttonStyle, setButtonStyle] = useState("")
  const [active, setActive] = useState(false);
  const [artist, setArtist] = useState(null);

  const [likes, setLikes] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkedBacklines, setCheckedBacklines] = useState([])
  const newArray = [];
  const [voted, setVoted] = useState(false);


  const navigate = useNavigate();

  const handleClick = (e) => {
    shows.map((show) => {
      if (show.id === e.target.id && !show.backlines.includes(auth.uid)) {
        users.map((user) => {
          if (user.id === auth.uid) {
            const backlineObject = {
              title: show.id,
              artist: auth.uid,
              firstName: user.firstName,
              lastName: user.lastName, 
              voteCount: 1,
              votedOn: [auth.uid]
            }
            props.createBackline(backlineObject);
          }
        })
      }
    })

  }

  const pushProfile = (e) => {
    e.preventDefault();
    navigate('/spotterProfile');
  }

  const pushArtistProfile = (e) => {
    e.preventDefault();
    navigate('/artistProfile');
  }

  const pushSpotterProfile = (e) => {
    e.preventDefault();
      navigate("/spotterProfile");
  }

  const pushArtistSignup = (e) => {
    e.preventDefault();
    navigate('/artistSignup');
  }
  
  const handleView = (e) => {
    e.preventDefault();
    navigate('/tickets/' + e.target.id);
  }

  const toggleStatus = (e) => {
    e.preventDefault();
    const activeButton = document.querySelector(".active");
    const pendingButton = document.querySelector(".pending");
    if (e.target.id === "active") {
      pendingButton.classList.add("btn-warning");
      pendingButton.classList.remove("btn-primary");
      activeButton.classList.add("btn-primary");
      activeButton.classList.remove("btn-warning");
      setActive(true);
    } else if (e.target.id === "pending") {
      pendingButton.classList.add("btn-primary");
      pendingButton.classList.remove("btn-warning");
      activeButton.classList.add("btn-warning");
      activeButton.classList.remove("btn-primary");
      setActive(false);
    }
  }




  useEffect(() => {
    if (!auth.uid) {
        navigate("/spotterLogin");
    }
    if (users) {
      users.map((user) => {
        if (user.id === auth.uid && user.isArtist !== true) {
          setButtonStyle(" d-none");
        }
      })
    }
    if (shows) {
      shows.map((show) => {
        if (show.backlines) {
          show.backlines.map((backline) => {
            if (backline.artist === auth.uid) {
              checkedBacklines.push(show.id)
            }
          })
        }
      })
    }
  });

  const handleChange = () => {

  }

  const handleSubmit = () => {

  }


  if (shows) {
    return (
      <div >  
          <Form className="artist-search-form" onSubmit={handleSubmit}>
              <Form.Group className="text-center artist-search-field mb-3" controlId="second" onChange={handleChange}>

                  <Form.Control type="text" placeholder="Search shows"
                  
                  />

              </Form.Group>
              
          </Form>
          <br/>
              {shows && shows.map((show) => {
                if (show.activated && active === true) {
                  return (
                    <div className="ticket-border">
                    <div className=" card-container">
                      <div className="card">
                        <div className="card-header">
                          <h2 className="username">{show.promoterUserName}</h2>
                        </div>
                        <img src="../public/1.png" alt="Post" className="card-img" />
                        
                        <div className="description-dropdown">
                            <div className='description-text'>{show.voteCount}</div>
                            {(() => {
                              if (!show.votedOn.includes(auth.uid)) {
                               
                                return (
                                  <button className="btn btn-primary description-arrow" onClick={() => {   
                                    props.updateVote(auth.uid, show.id); }} id={show.id}>^</button>
                                )
                              }  else if (show.votedOn.includes(auth.uid)) {
                               
                                return <button className="bg-grey description-text">voted</button>
                              }
                            })()}
                        </div>
                        <div className="card-body">
                          <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic " variant="warning" id="dropdown-basic"
                            >
                            {show.artists[0].firstName} {show.artists[0].lastName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {show.artists.map((artist) => {
                                if (artist.type === "artist") {
                                  return (
                                    <div>
                                      <Dropdown.Item className="description-text" href="#/action-1">                             
                                          <Link to={"/artist/" + artist.id}>
                                            {artist.firstName} {artist.lastName}
                                          </Link>
                                      </Dropdown.Item>
                                    </div>
                                  )
                                } else if (artist.type === "band") {
                                  return (
                                    <div>
                                      <Dropdown.Item className="description-text" href="#/action-1">                             
                                          <Link to={"/artist/" + artist.id}>
                                            {artist.bandName}
                                          </Link>
                                      </Dropdown.Item>
                                    </div>
                                  )
                                }

                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  ) 
                } else if ((!show.activated || show.activated === false) && active === false) {
                  return (
                    <div className="ticket-border">
                      <div className=" card-container">
                        <div className="card">
                          <div className="card-header">
                            <h2 className="username">{show.promoterUserName}</h2>
                          </div>
                          <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                            navigate("/tickets/" + show.id)
                          }} />
                        
                            <div className="description-dropdown">
                              <div className='description-text'>{show.voteCount}</div>
                                {(() => {
                                  if (!show.votedOn.includes(auth.uid)) {
                               
                                    return (
                                      <button className="btn btn-primary description-arrow" onClick={() => {   
                                      props.updateVote(auth.uid, show.id); }} id={show.id}>^</button>
                                    )
                                  } else if (show.votedOn.includes(auth.uid)) {
                                  
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
                                        <p className="description-arrow">band</p>
                                      
                                    </div>
                                  )
                                } else if (artist.type === "band") {
                                  return (
                                    <div className="description-dropdown dropdown-link">
                                                                   
                                        <Link className="description-text" to={"/artist/" + artist.id}>
                                          {artist.bandName}
                                        </Link>
                                        <p className="description-arrow">artist</p>
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
          <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    shows: state.firestore.ordered.shows,
    users: state.firestore.ordered.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBackline: (backline) => dispatch(createBackline(backline)),
    updateVote: (voter, show) => dispatch(updateVote(voter, show))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'shows'},
    {collection: 'users'}
  ])
)(Spotters);