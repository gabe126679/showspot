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
  
  const [checkedBacklines, setCheckedBacklines] = useState([])
  const newArray = [];


  const navigate = useNavigate();

  const handleClick = (e) => {
    // shows.map((show) => {
    //   if (show.id === e.target.id && !show.backlines.includes(auth.uid)) {
    //     users.map((user) => {
    //       if (user.id === auth.uid) {
    //         const backlineObject = {
    //           title: show.id,
    //           artist: auth.uid,
    //           firstName: user.firstName,
    //           lastName: user.lastName, 
    //           voteCount: 1,
    //           votedOn: [auth.uid]
    //         }
    //         props.createBackline(backlineObject);
    //       }
    //     })
    //   }
    // })
    console.log(newArray)
  }
  
  const handleView = (e) => {
    e.preventDefault();
    navigate('/tickets/' + e.target.id);
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
  });

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
                      <th>Artists</th>
                      <th>Details</th>
                      <th>Venue</th>
                    </tr>
                  </thead>
                {shows && shows.map((show) => {
                  if (show.activated) {
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
                                  <Dropdown.Menu  >
                                  {show.backlines && show.backlines.map((backline) => {
                                    const newBackline = {
                                      artist: auth.uid,
                                      show: show
                                    }
                                    if (backline.artist === auth.uid && !checkedBacklines.includes(newBackline)) {
                                      
                                      checkedBacklines.push(newBackline);
                                    }
                                    return (
                                      <div className="container w-100 p-2 m-2">
                                        <Dropdown.Item href="#/action-1">  
                                          <div className="float-start">
                                            <Link to={"/artist/" + backline.artist}>
                                              {backline.firstName + " " + backline.lastName}
                                              
                                            </Link>

                                          </div>

                                        </Dropdown.Item>

                                        
                                      </div>

                                        
                                    )
                                  })}
                                    </Dropdown.Menu>
                                </Dropdown>
    
                                </div>
                                {(() => {
                                  checkedBacklines.map((checkedBackline) => {
                                    if (checkedBackline.artist === auth.uid && checkedBackline.show === show) {
                                      newArray.push(show.id);
                                    } 
                                  })
                                  if (newArray.includes(show.id)) {
                                    console.log(show);
                                    
                                  } else if (!newArray.includes(show.id)) {
                                    console.log(show)
                                    console.log(newArray)
                                    return <button className="btn btn-primary" onClick={handleClick}>+</button>
                                  }
                                })()}   
                               
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
                      <th>Artists</th>
                      <th>Details</th>
                      <th>Venue</th>
                      <th>Backlines</th>
                    </tr>
                  </thead>
                  {shows && shows.map((show) => {
                  if (!show.activated) {
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

                          <td className="backlines">
  
                                <div>
  
                                <Dropdown >
                                  <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                  >
                                  {/* {show.backlines[0].firstName + " " + show.backlines[0].lastName} */}
                                  view
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu  >
                                  {show.backlines && show.backlines.map((backline) => {
                                    const newBackline = {
                                      artist: auth.uid,
                                      show: show
                                    }
                                    if (backline.artist === auth.uid && !checkedBacklines.includes(newBackline)) {
                                      
                                      checkedBacklines.push(newBackline);
                                    }
                                    
                                    return (
                                      <div className="container w-100 p-2 m-2">
                                        <Dropdown.Item href="#/action-1">  
                                          <div>
                                            <Link to={"/artist/" + backline.artist}>
                                              {backline.firstName + " " + backline.lastName}
                                              
                                            </Link>

                                          </div>

                                        </Dropdown.Item>

                                        
                                      </div>

                                      )
                                    })}

                                    </Dropdown.Menu>
                                </Dropdown>
    
                                </div>
                                {(() => {
                                  checkedBacklines.map((checkedBackline) => {
                                    if (checkedBackline.artist === auth.uid && checkedBackline.show === show) {
                                      newArray.push(show.id);
                                    } 
                                  })
                                  if (newArray.includes(show.id)) {
                                    console.log(show);
                                    
                                  } else if (!newArray.includes(show.id)) {
                                    console.log(show)
                                    console.log(newArray)
                                    return <button className="btn btn-primary" onClick={handleClick}>+</button>
                                  }
                                })()}   
                               
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