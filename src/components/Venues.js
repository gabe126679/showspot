import React, { useEffect } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import VenueProfile from './profiles/VenueProfile'

function Venues(props) {
    const { auth, users } = props;
  
    const navigate = useNavigate();
  
    const handleSignUp = () => {
        navigate('/venueSignup');
    }

    const handleClick = () => {
        console.log(props);
        navigate('/venueProfile');
    }
  
    useEffect(() => {

      if (!auth.uid) {
          navigate("/spotterLogin");
      }
    });

    
    if (users) {
        return (
            <div>
            <br/>
            <br/>

            <div className="profile-border">
                    <br/>
                        {users && users.map((user) => {
                            
                            if (user.id === auth.uid && user.isVenue === true) {
                                return (
                                    <button className="btn btn-primary" onClick={handleClick}>
                                        My Profile
                                    </button>
                                )
                            } else if (user.id === auth.uid) {
                                return (
                                    <button className="btn btn-primary" onClick={handleSignUp}>
                                        Become a Venue
                                    </button>
                                )
                            }
                        })}
                        <br/>
                        <br/>
                        <p className="text-center border bg-dark text-white">active venues:</p>
                        
                    <br/>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Owner</th>
                        </tr>
                        </thead>
                    {users && users.map((user) => {
                        if (user.isVenue === true) {
                            return (
                                <tbody >
                                <tr>
                                    <td id={user.id} >                      
                                      <Link to={'/venue/' + user.id}>
                                        {user.venueName}
                                      </Link>
                                    </td>

                                    <td onClick={handleClick}>{user.venueAddress}</td>
                                    <td>{user.userName}</td>
                                </tr>
                                </tbody>
                            ) 
                        }
                    })}
                    </Table>
            </div>
            </div>
        )
    } else {
        return <div> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            loading ... 
            </div>
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'users'
  }])
)(Venues);