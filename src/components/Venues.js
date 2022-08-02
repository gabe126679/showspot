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
  
    const [active, setActive] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");

    Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

        const toggleStatus = (e) => {
      e.preventDefault();
      const activeBtn = document.querySelector(".active-shows");
      const pendingBtn = document.querySelector(".pending-shows");
      const shows = document.querySelector(".shows");
      const songs = document.querySelector(".songs");
      const bands = document.querySelector(".bands");
      if (e.target.id === "my-songs") {
        pendingBtn.classList.add("btn-primary");
        pendingBtn.classList.remove("btn-warning");
        activeBtn.classList.add("btn-warning");
        activeBtn.classList.remove("btn-primary");
        shows.classList.add("d-none");
        songs.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "my-shows") {
        pendingBtn.classList.add("btn-warning");
        pendingBtn.classList.remove("btn-primary");
        activeBtn.classList.add("btn-primary");
        activeBtn.classList.remove("btn-warning");
        bands.classList.add("d-none");
        songs.classList.add("d-none");
        shows.classList.remove("d-none");
        setActive(true);
      } else if (e.target.id === "my-bands") {
        pendingBtn.classList.add("btn-warning");
        pendingBtn.classList.remove("btn-primary");
        activeBtn.classList.add("btn-warning");
        activeBtn.classList.remove("btn-primary");
        songs.classList.add("d-none");
        shows.classList.add("d-none");
        bands.classList.remove("d-none");
        setActive("bands");
      }
    }

    const handleSignUp = () => {
        navigate('/venueSignup');
    }

    const pushProfile = () => {
        navigate('/venueProfile');
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
                <br/>   
                <div className="text-center">
                    {(() => {
                    if (active) {
                        return <h4>SHOWSPOT ARTISTS</h4>
                    } else {
                        return <h4>SHOWSPOT BANDS</h4>
                    }
                    })()}       
                    <br/>
                    <div  className="tab-border">
                        <button className="venue-profile btn btn-warning" onClick={pushProfile}>venue profile</button>
                        <button className="pending-shows btn btn-primary" onClick={toggleStatus} id="pending-shows">pending shows</button>
                        <button className="active-shows btn btn-warning" onClick={toggleStatus} id="active-shows">active shows</button>
                        <button className="songs btn btn-warning" onClick={toggleStatus} id="songs">all songs</button>
                    </div>
                </div>
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
                                console.log(addresses);
                                return (
                                    <tbody >
                                            <tr>
                                                <td id={user.id} >                      
                                                <Link to={'/venue/' + user.id}>
                                                    {user.venueName}
                                                </Link>
                                                </td>
                                                {(() => {
                                                    addresses.map((address) => {
                                                        if (address.user === user.id && address.name === user.venueName) {
                                                            return <td>{address.address}</td>
                                                        } else {
                                                            return <td>hi</td>
                                                        }
                                                    })

                                                })()} 
                                                <td onClick={() => {
                                                    addresses.map((address) => {
                                                        console.log(addresses);
                                                    })
                                                    
                                                }}>{user.userName}</td>
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