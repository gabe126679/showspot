import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { updateVenue} from '../store/actions/showActions';

function Invites(props) {

    const { auth, users, shows } = props;

    let navigate = useNavigate();

    const handleAccept = (e) => {
        e.preventDefault();

    }

    const handleReject = (e) => {
        e.preventDefault();
        shows.map((show) => {
            const decisionObject = {
                title: e.target.id,
                decision: false
            }
            if (e.target.id === show.id && auth.uid === show.venueId) {
                props.updateVenue(decisionObject)
            }
        })
    }

    const handleVenueAccept = (e) => {
        shows.map((show) => {
            const decisionObject = {
                title: e.target.id,
                decision: true
            }
            if (e.target.id === show.id && auth.uid === show.venueId) {
                props.updateVenue(decisionObject)
            }
        })
        navigate('/ticketPrice/' + e.target.id);

    }

    const ViewShow = () => {
      navigate('/show/');
    }

    const pushProfile = () => {
      navigate('/venueProfile');
    }

    if (!auth.uid) return navigate('/spotterSignup');

    if (users) {
      return (
      <div>
      <br/>
      <br/>
      <br/>
      <br/>
        <div className="profile-border">
            <br/>
            <div>
                <button className="btn btn-primary" onClick={pushProfile}>
                    My Profile
                </button>
            </div>
            
            <br/>
            <Table hover>
                <thead >
                <tr>
                    <th>Show Details</th>
                    <th>Accept</th>
                    <th>Reject</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>                      
                {shows && shows.map((show) => {
                    if (
                        (show.venueDecision === true && show.venueId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>venue</td>
                            </tr>
                        ) 
                    } else if (
                        (show.venueDecision === false && show.venueId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleVenueAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>venue</td>
                            </tr>
                        ) 
                    } else if (
                        (show.venueId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleVenueAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>venue</td>
                            </tr>
                        ) 
                    }
                })}
                </tbody>
            </Table>
            </div>
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

const mapDispatchToProps = dispatch => {
    return {
      updateVenue: (venue) => dispatch(updateVenue(venue))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'shows' }
    ])
  )(Invites);