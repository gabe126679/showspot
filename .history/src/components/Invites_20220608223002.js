import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { updateShow } from '../store/actions/showActions';

function Invites(props) {

    const { auth, users, shows } = props;

    const [headlinerDecision, setHeadlinerDecision] = useState(null);
    const [fourthDecision, setFourthDecision] = useState(null);
    const [thirdDecision, setThirdDecision] = useState(null);
    const [secondDecision, setSecondDecision] = useState(null);
    const [openerDecision, setOpenerDecision] = useState(null);
    const [venueDecision, setVenueDecision] = useState(null);
    const [title, setTitle] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        shows.map((show) => {
            if (show.headlinerDecision) {
                setHeadlinerDecision(show.headlinerDecision);
            }
            if (show.fourthDecision) {
                setFourthDecision(show.fourthDecision);
            }
            if (show.thirdDecision) {
                setThirdDecision(show.thirdDecision);
            }
            if (show.secondDecision) {
                setSecondDecision(show.secondDecision);
            }
            if (show.openerDecision) {
                setOpenerDecision(show.openerDecision);
            }
            if (show.venueDecision) {
                setVenueDecision(show.venueDecision);
            }
        })
    }, []);

    const handleAccept = (e) => {
        e.preventDefault();
        shows.map((show) => {
            console.log(show)
        })
        const stateObject = {
            headlinerDecision,
            fourthDecision,
            thirdDecision,
            secondDecision,
            openerDecision,
            venueDecision,
            title
        }
        // console.log(stateObject)
        // props.updateShow(stateObject);
    }

    const handleReject = (e) => {
        e.preventDefault();
        shows.map((show) => {
            if (show.id === e.target.id && show.headlinerId === auth.uid && show.headlinerDecision !== true) {
                setHeadlinerDecision(false);
            }
            if (show.id === e.target.id && show.fourthId === auth.uid && show.fourthDecision !== true) {
                setFourthDecision(false);
            }
            if (show.id === e.target.id && show.thirdId === auth.uid && show.thirdDecision !== true) {
                setThirdDecision(false);
            }
            if (show.id === e.target.id && show.secondId === auth.uid && show.secondDecision !== true) {
                setSecondDecision(false);
            }
            if (show.id === e.target.id && show.openerId === auth.uid && show.openerDecision !== true) {
                setOpenerDecision(false);
            }
            if (show.venueId === auth.uid && show.venueDecision !== true) {
                setVenueDecision(false);
            }
            const stateObject = {
                headlinerDecision,
                fourthDecision,
                thirdDecision,
                secondDecision,
                openerDecision,
                venueDecision,
                title
            }
            props.updateShow(stateObject);
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
      updateShow: (show) => dispatch(updateShow(show))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'shows' }
    ])
  )(Invites);