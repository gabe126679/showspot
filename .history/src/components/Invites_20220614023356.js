import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { updateTicket } from '../store/actions/showActions';
import { updateHeadliner } from '../store/actions/showActions';
import { updateFourth } from '../store/actions/showActions';
import { updateThird } from '../store/actions/showActions';
import { updateSecond } from '../store/actions/showActions';
import { updateOpener } from '../store/actions/showActions';
import { updateVenue} from '../store/actions/showActions';

function Invites(props) {

    const { auth, users, shows } = props;

    let navigate = useNavigate();

    const handleAccept = (e) => {
        e.preventDefault();
        shows.map((show) => {
            const decisionObject = {
                title: e.target.id,
                decision: true
            }
            if (e.target.id === show.id && auth.uid === show.headlinerId) {
                props.updateHeadliner(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.fourthId) {
                props.updateFourth(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.thirdId) {
                props.updateThird(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.secondId) {
                props.updateSecond(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.openerId) {
                props.updateOpener(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.venueId) {
                props.updateVenue(decisionObject)
            }
        })
    }

    const handleReject = (e) => {
        e.preventDefault();
        shows.map((show) => {
            const decisionObject = {
                title: e.target.id,
                decision: false
            }
            if (e.target.id === show.id && auth.uid === show.headlinerId) {
                props.updateHeadliner(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.fourthId) {
                props.updateFourth(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.thirdId) {
                props.updateThird(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.secondId) {
                props.updateSecond(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.openerId) {
                props.updateOpener(decisionObject)
            } else if (e.target.id === show.id && auth.uid === show.venueId) {
                props.updateVenue(decisionObject)
            }
        })
    }

    const handleVenueAccept = (e) => {
        e.preventDefault();
        shows.map((show) => {
            if (e.target.id === show.id && auth.uid === show.venueId) {
                console.log("ruthless");
            }
        })
    }

    const ViewShow = () => {
      navigate('/show/');
    }

    const pushProfile = () => {
      navigate('/artistProfile');
    }

    if (!auth.uid) return navigate('/artistSignup');

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
                        (show.headlinerDecision === true && show.headlinerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>headliner</td>
                            </tr>
                        ) 
                    } else if (
                        (show.fourthDecision === true && show.fourthId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>fourth</td>
                            </tr>
                        ) 
                    } else if (
                        (show.thirdDecision === true && show.thirdId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>third</td>
                            </tr>
                        ) 
                    } else if (
                        (show.secondDecision === true && show.secondId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>second</td>
                            </tr>
                        ) 
                    } else if (
                        (show.openerDecision === true && show.openerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>opener</td>
                            </tr>
                        ) 
                    } else if (
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
                        (show.headlinerDecision === false && show.headlinerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>headliner</td>
                            </tr>
                        ) 
                    } else if (
                        (show.fourthDecision === false && show.fourthId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>fourth</td>
                            </tr>
                        ) 
                    } else if (
                        (show.thirdDecision === false && show.thirdId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>third</td>
                            </tr>
                        ) 
                    } else if (
                        (show.secondDecision === false && show.secondId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>second</td>
                            </tr>
                        ) 
                    } else if (
                        (show.openerDecision === false && show.openerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td id={show.id}>Show Rejecetd</td>
                                <td>opener</td>
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
                        (show.headlinerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>headliner</td>
                            </tr>
                        ) 
                    } else if (
                        (show.fourthId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>fourth</td>
                            </tr>
                        ) 
                    } else if (
                        (show.thirdId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>third</td>
                            </tr>
                        ) 
                    } else if (
                        (show.secondId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>second</td>
                            </tr>
                        ) 
                    } else if (
                        (show.openerId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                                <td>opener</td>
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
      updateHeadliner: (headliner) => dispatch(updateHeadliner(headliner)),
      updateFourth: (fourth) => dispatch(updateFourth(fourth)),
      updateThird: (third) => dispatch(updateThird(third)),
      updateSecond: (second) => dispatch(updateSecond(second)),
      updateOpener: (opener) => dispatch(updateOpener(opener)),
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