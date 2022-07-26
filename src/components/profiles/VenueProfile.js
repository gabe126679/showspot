import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'




function VenueProfile(props) {

    const { auth, users, shows } = props;

    const localizer = momentLocalizer(moment) 

    let navigate = useNavigate();

    const [myEvents, setMyEvents] = useState([]);

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
        })
      }
      console.log(myEvents); 
    })

    const handleClick = (event) => {
      shows.map((show) => {  
        if (show.id === event.id) {
          navigate("/tickets/" + show.id);
        }
      })
    }
    
  
    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushInvites = () => {
      navigate('/invites');
    }

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
                    <div>
                        <button className="btn btn-primary" onClick={handleClick}>
                            Shows
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushInvites}>
                            Invites
                        </button>
                        <br/>
                        <br/>
                        <p className="text-center border bg-warning text-white">{user.userName}</p>
                    </div>
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Venue Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.venueName}</td>
                        </tr>
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