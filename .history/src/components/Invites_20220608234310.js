import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
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
                </tr>
                </thead>
                <tbody>                      
                {shows && shows.map((show) => {
                    if (
                        (show.headlinerDecision === true && show.headlinerId === auth.uid) ||
                        (show.fourthDecision === true && show.fourthId === auth.uid) ||
                        (show.thirdDecision === true && show.thirdId === auth.uid) ||
                        (show.secondDecision === true && show.secondId === auth.uid) ||
                        (show.openerDecision === true && show.openerId === auth.uid) ||
                        (show.venueDecision === true && show.venueId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>Show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
                            </tr>
                        ) 
                    } else if (
                        (show.headlinerDecision === false && show.headlinerId === auth.uid) ||
                        (show.fourthDecision === false && show.fourthId === auth.uid) ||
                        (show.thirdDecision === false && show.thirdId === auth.uid) ||
                        (show.secondDecision === false && show.secondId === auth.uid) ||
                        (show.openerDecision === false && show.openerId === auth.uid) ||
                        (show.venueDecision === false && show.venueId === auth.uid)
                        ) {
                        return (
                            <tr>
                                <td><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td>Show Rejected</td>
                            </tr>
                        ) 
                    } else if 
                        (
                        show.headlinerId === auth.uid ||
                        show.fourthId === auth.uid ||
                        show.thirdId === auth.uid ||
                        show.secondId === auth.uid ||
                        show.openerId === auth.uid ||
                        show.venueId === auth.uid 
                        ) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" onClick={ViewShow} id={show.id}>{show.id}</button></td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={handleAccept}>Accept</button></td>
                                <td><button className="btn btn-warning" id={show.id} onClick={handleReject}>Reject</button></td>
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