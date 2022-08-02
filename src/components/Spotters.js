import React, { useEffect, useState } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createBackline, updateVote } from '../store/actions/showActions';

function Spotters(props) {
  const { auth, shows, users } = props;

  const [buttonStyle, setButtonStyle] = useState("")
  const [active, setActive] = useState(true);
  const [artist, setArtist] = useState(null);

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
      setActive(false);
    } else if (e.target.id === "pending") {
      pendingButton.classList.add("btn-primary");
      pendingButton.classList.remove("btn-warning");
      activeButton.classList.add("btn-warning");
      activeButton.classList.remove("btn-primary");
      setActive(true);
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

  if (shows) {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
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
            <button className="spotter btn btn-warning" onClick={pushSpotterProfile}>spotter profile</button>
            <button className="pending btn btn-primary" onClick={toggleStatus} id="pending">pending shows</button>
            <button className="active btn btn-warning" onClick={toggleStatus} id="active">active shows</button>
            <button className="artist btn btn-warning" onClick={pushArtistProfile}>artist profile</button>
          </div>
        </div>
                <br/>
                <br/>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Artists</th>
                      <th>Details</th>
                      <th>Venue</th>
                      <th>Votes</th>
                      
                    </tr>
                  </thead>
                {shows && shows.map((show) => {
                  if (show.activated && active === true) {
                    return (
                      <tbody>
                        <tr>
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
                          <td><button className="btn btn-primary" id={show.id} onClick={handleView}>View</button></td>
                          <td>{show.venueName}</td>
                          <td>
                            <div className="backlines">
                              <div className="col-4">{show.voteCount}</div>
                              {(() => {
                                if (!show.votedOn.includes(auth.uid)) {
                                  <button className="btn btn-primary" onClick={() => {   
                                    props.updateVote(auth.uid, show.id);  
                                  }} id={show.id}>^</button>
                                }
                              })()}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) 
                  } else if (!show.activated && active === false) {
                    return (
                      <tbody>
                        <tr>
                          
                          <td>
                            <Dropdown >
                              <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                              >
                              {show.artists[0].firstName} {show.artists[0].lastName}
                              </Dropdown.Toggle>
  
                              <Dropdown.Menu>
                                {show.artists.map((artist) => {
                                  if (artist.type === "artist") {
                                    return (
                                      <div>
                                        <Dropdown.Item href="#/action-1">                             
                                            <Link to={"/artist/" + artist.id}>
                                              {artist.firstName} {artist.lastName}
                                            </Link>
                                        </Dropdown.Item>
                                      </div>
                                    )
                                  } else if (artist.type === "band") {
                                    return (
                                      <div>
                                        <Dropdown.Item href="#/action-1">                             
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
                          </td>
                          <td><button className="btn btn-primary" id={show.id} onClick={handleView}>View</button></td>
                          <td>{show.venueName}</td>
                          <td>
                            <div className="backlines">
                              <div className="col-4">{show.voteCount}</div>
                              {(() => {
                                if (!show.votedOn.includes(auth.uid)) {
                                  <button className="btn btn-primary" onClick={() => {   
                                    props.updateVote(auth.uid, show.id);  
                                  }} id={show.id}>^</button>
                                }
                              })()}
                            </div>
                          </td>

                        </tr>
                      </tbody>
                    )
                  }

                })}
                </Table>
        </div>
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