import React, { useEffect, useState } from 'react'
import { Table, Dropdown, Col } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateBackline, updateVote } from '../store/actions/showActions';


function Spotters(props) {
  const { auth, shows, users } = props;

  const [buttonStyle, setButtonStyle] = useState("")
  

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
              lastName: user.lastName
            }
            props.updateBackline(backlineObject);
          }
        })
      }
    })
    
  }
  
  const handleView = (e) => {
    e.preventDefault();
    navigate('/tickets/' + e.target.id);
  }

  useEffect(() => {
    if (!auth.uid) {
        navigate("/spotterLogin");
    }
  }, []);

  useEffect(() => {
    if (users) {
      users.map((user) => {
        if (user.id === auth.uid && user.isArtist !== true) {
          setButtonStyle(" d-none");
        }
      })
    }
  })

  if (shows) {
    return (
      <div>
        <br/>
        <br/>
        {/* <button onClick={handleClick}> hi </button> */}
        <div className="profile-border">
                <br/>
                  <p className="text-center text-white bg-warning rounded">Active Shows:</p>
                <br/>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Tickets</th>
                      <th>Artists</th>
                      <th>Venue</th>
                      <th>Votes</th>
                      <th>Backlines</th>
                    </tr>
                  </thead>
                {shows && shows.map((show) => {
                  if (show.activated) {
                    return (
                      <tbody>
                        <tr>
                          <td><button className="btn btn-primary" id={show.id} onClick={handleView}>View</button></td>
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
                          <td>{show.venueName}</td>
                          <td>
                            <div className="backlines">
                              <div className="col-4">{show.voteCount}</div>
                              <button className="btn btn-primary" onClick={() => {   
                                props.updateVote(auth.uid, show.id);  
                              }} id={show.id}>^</button>
                            </div>
                            </td>
                          <td className="backlines">
  
                                <div>
  
                                <Dropdown >
                                  <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                  >
                                  {/* {show.backlines[0].firstName + " " + show.backlines[0].lastName} */}
                                  view
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                  {show.backlines && show.backlines.map((backline) => {
                                    return (
                                        <Dropdown.Item href="#/action-1">  
                                          <div className="col">
                                          <Link to={"/artist/" + backline.artist}>
                                            {backline.firstName + " " + backline.lastName}
                                            
                                          </Link>
                                          <button className="btn-sm btn-primary">+</button>
                                          </div>

                                        </Dropdown.Item>
                                    )
                                  })}
                                    </Dropdown.Menu>
                                </Dropdown>
    
                                </div>
  
                              <button className={"btn btn-primary" + buttonStyle} id={show.id} onClick={handleClick}>+</button> 
                          </td>
                        </tr>
                      </tbody>
                    ) 
                  }

                })}
                </Table>
                <br/>
                  <p className="text-center text-white bg-warning rounded">Pending Shows:</p>
                <br/>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Tickets</th>
                      <th>Artists</th>
                      <th>Venue</th>
                      <th>Votes</th>
                      <th>Backlines</th>
                    </tr>
                  </thead>
                {shows && shows.map((show) => {
                  if (!show.activated) {
                    return (
                      <tbody>
                        <tr>
                          <td><button className="btn btn-primary" id={show.id} onClick={handleView}>View</button></td>
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
                          <td>{show.venueName}</td>
                          <td>
                            <div className="backlines">
                              <div className="col-4">{show.voteCount}</div>
                              <button className="btn btn-primary" onClick={() => {   
                                props.updateVote(auth.uid, show.id);  
                              }} id={show.id}>^</button>
                            </div>
                            </td>
                          <td className="backlines">
  
                                <div>
  
                                <Dropdown >
                                  <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                  >
                                  {/* {show.backlines[0].firstName + " " + show.backlines[0].lastName} */}
                                  view
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                  {show.backlines && show.backlines.map((backline) => {
                                    return (
                                        <Dropdown.Item href="#/action-1">  
                                          <Link to={"/artist/" + backline.artist}>
                                            {backline.firstName + " " + backline.lastName}
                                          </Link>
                                        </Dropdown.Item>
                                    )
                                  })}
                                    </Dropdown.Menu>
                                </Dropdown>
    
                                </div>
  
                              <button className={"btn btn-primary" + buttonStyle} id={show.id} onClick={handleClick}>+</button> 
                          </td>
                        </tr>
                      </tbody>
                    ) 
                  }

                })}
                </Table>
        </div>
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
    updateBackline: (backline) => dispatch(updateBackline(backline)),
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