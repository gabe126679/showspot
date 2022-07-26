import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams} from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { updateVenue} from '../store/actions/showActions';

function BandInvites(props) {

    const { auth, bands, shows } = props;

    let navigate = useNavigate();

    const { id } = useParams();

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

    if (bands) {
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
                    <th>Band Details</th>
                    <th>Accept</th>
                    <th>Reject</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>                      
                {bands && bands.map((band) => {
                    if (band.id === id) {
                        return (
                            <tr>
                                <td id={band.id}><button className="btn btn-warning" id={band.id} >{band.id}</button></td>
                                <td id={band.id}>band Accepted</td>
                                <td ><button className="btn btn-warning" id={band.id} onClick={handleReject}>Reject</button></td>
                                <td>venue</td>
                            </tr>
                        )
                    }
 
                    // if (
                    //     (band.venueDecision === true && band.venueId === auth.uid)
                    //     ) {
                    //     return (
                    //         <tr>
                    //             <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={Viewband}>{band.id}</button></td>
                    //             <td id={band.id}>band Accepted</td>
                    //             <td ><button className="btn btn-warning" id={band.id} onClick={handleReject}>Reject</button></td>
                    //             <td>venue</td>
                    //         </tr>
                    //     ) 
                    // } else if (
                    //     (band.venueDecision === false && band.venueId === auth.uid)
                    //     ) {
                    //     return (
                    //         <tr>
                    //             <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={Viewband}>{band.id}</button></td>
                    //             <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={handleVenueAccept}>Accept</button></td>
                    //             <td id={band.id}>band Rejecetd</td>
                    //             <td>venue</td>
                    //         </tr>
                    //     ) 
                    // } else if (
                    //     (band.venueId === auth.uid)
                    //     ) {
                    //     return (
                    //         <tr>
                    //             <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={Viewband}>{band.id}</button></td>
                    //             <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={handleVenueAccept}>Accept</button></td>
                    //             <td ><button className="btn btn-warning" id={band.id} onClick={handleReject}>Reject</button></td>
                    //             <td>venue</td>
                    //         </tr>
                    //     ) 
                    // }
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
      bands: state.firestore.ordered.bands
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
        { collection: 'bands' },
        { collection: 'shows' }
    ])
  )(BandInvites);