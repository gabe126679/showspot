import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { addToCart } from '../../store/actions/authActions';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Geocode from "react-geocode";

function PublicVenue(props) {

    const { auth, users, shows } = props;

    const { id } = useParams();

    const [address, setAddress] = useState("");


    let navigate = useNavigate();

    Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

    const handleChange = () => {
        console.log(id);
    }

    const addToCart = (e) => {
      e.preventDefault();
      props.addToCart(e.target.id);
      navigate('/cart');
    }
  

    useEffect(() => {
      if (users) {
        users.map((user) => {
          if (user.id === id) {
            Geocode.fromLatLng(user.venueAddress[0], user.venueAddress[1]).then(
              (response) => {
                const address = response.results[0].formatted_address;
                setAddress(address);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        })
      }
    }, []);

    if (!auth.uid) return navigate('/venueSignup');

    if (users) {
      return (
          <div>
        <br/>
        <br/>
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
                          <td>{address}</td>
                          <td>{user.userName}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <br/>
                    <div className="ratings-container">
                      <h2>Venue Rating</h2>
                      <h1>{user.venueRating} Stars</h1>
                      {(() => {
                        if (!user.venueRaters || !user.venueRaters.includes(auth.uid)) { 
                          return (
                            <div className="skills ">
                              <h3> Rate {user.firstName} 1-5</h3>
                              <div className="rating text-center">
                                <input type="radio" />
                                <input type="radio"value="5" onChange={handleChange} />
                                <input type="radio"  />
                                <input type="radio" onChange={handleChange}  value="4" />
                                <input type="radio"  />
                                <input type="radio" value="3" onChange={handleChange} />
                                <input type="radio" />
                                <input type="radio" onChange={handleChange}  value="2" />
                                <input type="radio" onChange={handleChange}  value="1" />
                              </div>
                            </div>      
                          )
                        }
                      })()}
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <p className="text-center border bg-warning text-white">active shows:</p>
                      <Table className="text-center" hover>
                        <thead >
                          <tr>
                            <th>Artists</th>
                            <th>Detals</th>
                            <th>Price</th>
                            <th>Add to Cart</th>
                          </tr>
                        </thead>
                        {shows && shows.map((show) => {                 
                            if (show.venueName === user.venueName) {
                              return (
                                <tbody>
                                  <tr>
                                    <td>
                                      <Dropdown >
                                        <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                        >
                                        {show.artists[0].firstName} {show.artists[0].lastName}
                                        </Dropdown.Toggle>
            
                                        <Dropdown.Menu>
                                          {show.artists.map((artist) => {
                                            return (
                                              <div>
                                                <Dropdown.Item href="#/action-1">                             
                                                    <Link to={"/artist/" + artist.id}>
                                                      {artist.firstName} {artist.lastName}
                                                    </Link>
                                                </Dropdown.Item>
                                              </div>
                                            )
                                          })}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                    <td><button onClick={() => {
                                      navigate('/tickets/' + show.id)
                                    }} className="btn btn-primary">view</button></td>

                                    <td>{show.ticketPrice}</td>
                                    <td className=" text-center"><button className="btn btn-primary" onClick={addToCart} id={show.id} >+</button></td>  

                                  </tr>
                                </tbody>
                              )                            
                            }           
                        })}
                      </Table>
                  
                  </div>

                  
              ) 
              }
            })}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
      )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      shows: state.firestore.ordered.shows,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'shows' }
    ])
  )(PublicVenue);