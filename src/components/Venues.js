import React, { useEffect, useState } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Geocode from "react-geocode";

function Venues(props) {
    const { auth, users, shows } = props;
  
    const navigate = useNavigate();
  
    const [active, setActive] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");

    Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

    const toggleStatus = (e) => {
      e.preventDefault();
      const venueBtn = document.querySelector(".my-venues");
      const showBtn = document.querySelector(".my-shows");
      const venues = document.querySelector(".venues");
      const shows = document.querySelector(".shows");
      if (e.target.id === "my-shows") {
        showBtn.classList.add("btn-primary");
        showBtn.classList.remove("btn-warning");
        venueBtn.classList.add("btn-warning");
        venueBtn.classList.remove("btn-primary");
        venues.classList.add("d-none");
        shows.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "my-venues") {
        showBtn.classList.add("btn-warning");
        showBtn.classList.remove("btn-primary");
        venueBtn.classList.add("btn-primary");
        venueBtn.classList.remove("btn-warning");
        shows.classList.add("d-none");
        venues.classList.remove("d-none");
        setActive(true);
      } 
    }

    const handleSignUp = () => {
        navigate('/venueSignup');
    }

    const pushProfile = () => {
        navigate('/venueProfile');
    }

    const pushVenue = (e) => {
        e.preventDefault();
        navigate('/venue/' + e.target.id);
    }

    const pushShow = (e) => {
        e.preventDefault();
        navigate('/tickets/' + e.target.id);
    }

    const pushArtists = (e) => {
        e.preventDefault();
        navigate('/artists');
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
                const venueObject = {
                    address: address,
                    user: user.id,
                    name: user.venueName
                }
                if (!addresses.includes(venueObject)) {
                    addresses.push(venueObject);
                }
                
              },
              (error) => {
                console.error(error);
              }
            );
          }
        })
      }
    }, []);

    
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
                <br/>   
                <div className="text-center">
                    {(() => {
                    if (active) {
                        return <h4>SHOWSPOT VENUES</h4>
                    } else {
                        return <h4>SHOWSPOT SHOWS</h4>
                    }
                    })()}       
                    <br/>
                    <div  className="tab-border">
                        <button className="venue-profile btn btn-warning" onClick={pushProfile}>venue profile</button>
                        <button className="my-venues btn btn-primary" onClick={toggleStatus} id="my-venues">venues</button>
                        <button className="my-shows btn btn-warning" onClick={toggleStatus} id="my-shows">shows</button>
                        <button className="artists btn btn-warning" onClick={pushArtists}>artists</button>
                    </div>
                </div>
                <br/>
                    <Table className="venues" hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Owner</th>
                        </tr>
                        </thead>
                        <tbody >
                            {users && users.map((user) => {
                                if (user.isVenue === true) {
                                    return (
                                        
                                        <tr>
                                            <td>                      
                                            <button className="btn btn-primary" onClick={pushVenue} id={user.id}>{user.venueName}</button>
                                            </td>
                                            {addresses && addresses.map((address) =>{
                                                if (address.user === user.id && address.name === user.venueName) {
                                                    return <td>{address.address}</td>
                                                } 
                                            })} 
                                            <td onClick={() => {
                                                addresses.map((address) => {
                                                    console.log(addresses);
                                                })
                                                
                                            }}>{user.userName}</td>
                                        </tr> 
                                        
                                    ) 
                                }
                            })}
                        </tbody>
                    </Table>
                    <Table className="shows d-none" hover>
                        <thead>
                        <tr>
                            <th>Show Details</th>
                            <th>Venue Details</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        {shows && shows.map((show) => {
                            if (show.venueName) {
                                return (
                                    <tbody >
                                        <tr>
                                            <td>                      
                                            <button className="btn btn-primary" onClick={pushShow} id={show.id}>view</button>
                                            </td>
                                            <td>
                                            <button className="btn btn-primary" onClick={pushVenue} id={show.venueId}>{show.venueName}</button>
                                            </td>
                                            <td>
                                            {(() => {
                                                if (show.activated === true) {
                                                    return <div>active</div>
                                                } else {
                                                    return <div>pending</div>
                                                }
                                            })()}
                                            </td>
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
    shows: state.firestore.ordered.shows
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {   collection: 'users' },
    {   collection: 'shows' }
])
)(Venues);