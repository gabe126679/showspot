import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'




function VenueProfile(props) {

    const { auth, users, shows } = props;

    const localizer = momentLocalizer(moment) 

    let navigate = useNavigate();

    const [myEvents, setMyEvents] = useState([]);
    const [artistShows, setArtistShows] = useState([]);
    const [active, setActive] = useState(true);

    const toggleStatus = (e) => {
      e.preventDefault();
      const activeBtn = document.querySelector(".my-active-shows");
      const songBtn = document.querySelector(".my-pending-shows");
      const active = document.querySelector(".active");
      const pending = document.querySelector(".pending");
      if (e.target.id === "my-pending-shows") {
        songBtn.classList.add("btn-primary");
        songBtn.classList.remove("btn-warning");
        activeBtn.classList.add("btn-warning");
        activeBtn.classList.remove("btn-primary");
        active.classList.add("d-none");
        pending.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "my-active-shows") {
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        activeBtn.classList.add("btn-primary");
        activeBtn.classList.remove("btn-warning");
        pending.classList.add("d-none");
        active.classList.remove("d-none");
        setActive(true);
      }
    }

    const handleClick = (event) => {
      shows.map((show) => {  
        if (show.id === event.id) {
          navigate("/tickets/" + show.id);
        }
      })
    }
    
    const pushPublicVenue = (e) => {
      e.preventDefault();
      navigate('/venue/' + e.target.id);
    }

    const pushShow = (e) => {
      e.preventDefault();
      navigate('/tickets/' + e.target.id);
    }
  
    const pushInvites = () => {
      navigate('/invites');
    }

    useEffect(() => {
      if (shows) {
        shows.map((show) => {
          if (show.venueId === auth.uid && show.venueDecision === true) {
            const showObject = {
              id: show.id,
              title: show.artists[0].firstName + " " + show.artists[0].lastName,
              start: new Date(show.startTime.toDate()),
              end: new Date(show.endTime.toDate())
            }
            if (!myEvents.includes(showObject)) {
              myEvents.push(showObject);
            }
            
          }
          show.artists.map((artist) => {
            if (artist.id === auth.uid && !artistShows.includes(show)) {
              
              artistShows.push(show);
            }
          })
        })
      } 
    }, [])

    if (!auth.uid) return navigate('/venueSignup');

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
              if (user.id === auth.uid && user.isVenue === true) {
                return (
                  <div className="profile-border">
                    <br/>
                    <br/>   
                    <div className="text-center">
                      {(() => {
                        if (active === true) {
                          return <h4>ACTIVE SHOWS</h4>
                        } else if (active === false) {
                          return <h4>PENDING SONGS</h4>
                        } 
                      })()}       
                      <br/>
                      <div  className="tab-border">
                        <button className="public-venue btn btn-warning" onClick={pushPublicVenue} id={user.id}>public venue</button>  
                        <button className="my-active-shows btn btn-primary" onClick={toggleStatus} id="my-active-shows">active shows</button>
                        <button className="my-pending-shows btn btn-warning" onClick={toggleStatus} id="my-pending-shows">pending shows</button>
                        <button className="artist btn btn-warning" onClick={pushInvites}>Invites</button>
                      </div>
                    </div>
                    <br/>
                    <Table className="active" hover>
                      <thead >
                        <tr>
                          <th>Show Details</th>
                          <th>Artists</th>
                          <th>Venue</th>
                        </tr>
                      </thead>
                      <tbody> 
                        {artistShows && artistShows.map((show) => {
                          if (show.activated === true) {
                            return (
                              <tr>
                                <td><button className="btn btn-primary" onClick={pushShow} id={show.id}>view</button></td>
                                <td>
                                  <Dropdown >
                                    <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                    >
                                    {(() => {
                                      if (!show.artists[0].bandName) {
                                        return <div>{show.artists[0].firstName} {show.artists[0].lastName}</div>
                                      } else {
                                        return <div>{show.artists[0].bandName}</div>
                                      }
                                    })()}
                                    
                                    </Dropdown.Toggle>
        
                                    <Dropdown.Menu>
                                      {show.artists.map((artist) => {
                                        return (
                                          
                                            <Dropdown.Item href="#/action-1">
                                                {(() => {
                                                  if (!artist.bandName) {
                                                    return (
                                                      <Link to={"/artist/" + artist.id}>
                                                        {artist.firstName} {artist.lastName}
                                                      </Link>
                                                    )
                                                  } else {
                                                    return (
                                                      <Link to={"/band/" + artist.id}>
                                                        {artist.bandName}
                                                      </Link>
                                                    )
                                                  }
                                                })()}                             
                                            </Dropdown.Item>
                                          
                                        )
                                      })}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                                <td>{show.venueName}</td>
                              </tr>
                            )
                          }
                        })}
                      </tbody>
                    </Table>
                    <Table className="pending d-none" hover>
                      <thead >
                        <tr>
                          <th>Show Details</th>
                          <th>Artists</th>
                          <th>Venue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {artistShows && artistShows.map((show) => {
                          if (!show.activated || show.activated === false) {
                            return (
                              <tr>
                                <td><button className="btn btn-primary" onClick={pushShow} id={show.id}>view</button></td>
                                <td>
                                  <Dropdown >
                                    <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                    >
                                    {(() => {
                                      if (!show.artists[0].bandName) {
                                        return <div className="text-center">{show.artists[0].firstName} {show.artists[0].lastName}</div>
                                      } else {
                                        return <div>{show.artists[0].bandName}</div>
                                      }
                                    })()}
                                    </Dropdown.Toggle>
        
                                    <Dropdown.Menu>
                                      {show.artists.map((artist) => {
                                        return (
                                          
                                            <Dropdown.Item href="#/action-1">
                                                {(() => {
                                                  if (!artist.bandName) {
                                                    return (
                                                      <Link to={"/artist/" + artist.id}>
                                                        {artist.firstName} {artist.lastName}
                                                      </Link>
                                                    )
                                                  } else {
                                                    return (
                                                      <Link to={"/band/" + artist.id}>
                                                        {artist.bandName}
                                                      </Link>
                                                    )
                                                  }
                                                })()}                             
                                            </Dropdown.Item>
                                          
                                        )
                                      })}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                                <td>{show.venueName}</td>
                              </tr>
                            )
                          }
                        })}
                      </tbody>
                    </Table>
                    <br/>
                    <div className="myCustomHeight">
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
      shows: state.firestore.ordered.shows
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'shows' }
    ])
  )(VenueProfile);