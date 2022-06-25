import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

function VenueProfile(props) {

    const { auth, users, user } = props;

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log(user);
    }
  
    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushInvites = () => {
      navigate('/venueInvites');
    }

    if (!auth.uid) return navigate('/venueSignup');

    if (users) {
      return (
          <div>
          <br/>
          <br/>
          <br/>
          <br/>
          {users && users.map((user) => {
              if (user.id === auth.uid) {
                return (
                  <div className="profile-border">
                    <br/>
                    <div>
                        <button className="btn btn-primary" onClick={pushShows}>
                            Shows
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushInvites}>
                            Invites
                        </button>
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
                  </div>
              ) 
              }
            })}
          </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(VenueProfile);