import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

function PublicVenue(props) {

    const { auth, users } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const handleClick = () => {
        console.log(id);
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
              if (user.id === id) {
                return (
                  <div className="profile-border">
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.venueName}</td>
                          <td>{user.venueAddress}</td>
                          <td>{user.userName}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
              ) 
              }
            })}
            {/* <button onClick={handleClick}>hi</button> */}
          </div>
      )
    }

}

const mapStateToProps = (state, ownProps) => {
    // const id = ownProps.match.params.id;
    // const users = state.firestore.data.users;
    // const user = users ? users[id] : null
    console.log(ownProps);
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
  )(PublicVenue);