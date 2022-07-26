import React, { useEffect, useState } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Geocode from "react-geocode";

function Venues(props) {
    const { auth, users } = props;
  
    const navigate = useNavigate();
  
    const [address, setAddress] = useState("");
    const [addresses, setAddresses] = useState([]);

    Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

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
      if (users) {
        users.map((user) => {
          if (user.isVenue === true) {
            Geocode.fromLatLng(user.venueAddress[0], user.venueAddress[1]).then(
              (response) => {
                const address = response.results[0].formatted_address;
                addresses.push(address);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        })
      }
      console.log(addresses);
    });

    
    if (users) {
        return (
            <div>
        <br/>
        <br/>
        <br/>
        <br/>
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
                        <p className="text-center border bg-warning text-white">active venues:</p>
                        
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
                                            <td>{user.venueAddress}</td>
                                            <td>{user.userName}</td>
                                        </tr> 
                                </tbody>
                            ) 
                        }
                    })}
                    </Table>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

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