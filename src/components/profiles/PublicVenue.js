import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { addToCart } from '../../store/actions/authActions';
import Geocode from "react-geocode";

function PublicVenue(props) {

    const { auth, users, shows } = props;

    const { id } = useParams();

    const [address, setAddress] = useState("");
    const [active, setActive] = useState(true);
    const [artistShows, setArtistShows] = useState([]);

    let navigate = useNavigate();

    Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

    const toggleStatus = (e) => {
      e.preventDefault();
      const activeBtn = document.querySelector(".my-active-shows");
      const songBtn = document.querySelector(".my-pending-shows");
      const active = document.querySelector(".active");
      const pending = document.querySelector(".pending");
      if (e.target.id === "my-pending-shows") {
        songBtn.classList.add("btn-primary");
        songBtn.classList.remove("btn-warning");
        activeBtn.classList.add("btn-warning");
        activeBtn.classList.remove("btn-primary");
        active.classList.add("d-none");
        pending.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "my-active-shows") {
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        activeBtn.classList.add("btn-primary");
        activeBtn.classList.remove("btn-warning");
        pending.classList.add("d-none");
        active.classList.remove("d-none");
        setActive(true);
      }
    }

    const handleChange = () => {
        console.log(id);
    }

    const addToCart = (e) => {
      e.preventDefault();
      props.addToCart(e.target.id);
      navigate('/cart');
    }
  
    const pushVenueProfile = (e) => {
      e.preventDefault();
      navigate('/venueProfile');
    }

    const pushVenues = (e) => {
      e.preventDefault();
      navigate('/venues');
    }

    const pushShow = (e) => {
      e.preventDefault();
      navigate('/tickets/' + e.target.id);
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
      if (shows) {
        shows.map((show) => {
          show.artists.map((artist) => {
            if (artist.id === auth.uid && !artistShows.includes(show)) {
              
              artistShows.push(show);
            }
          })
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
          <br/>
          <br/>
          <div className="profile-border">
             
            <div className="text-center">
              {(() => {
                if (active === true) {
                  return <h4>ACTIVE SHOWS</h4>
                } else if (active === false) {
                  return <h4>PENDING SONGS</h4>
                } 
              })()}       
              <br/>
              <div  className="tab-border">
                <button className="public-venue btn btn-warning" onClick={pushVenueProfile} id={id}>venue profile</button>  
                <button className="my-active-shows btn btn-primary" onClick={toggleStatus} id="my-active-shows">active shows</button>
                <button className="my-pending-shows btn btn-warning" onClick={toggleStatus} id="my-pending-shows">pending shows</button>
                <button className="artist btn btn-warning" onClick={pushVenues}>venues</button>
              </div>
            </div>
            <br/>
            <Table className="active" hover>
              <thead >
                <tr>
                  <th>Show Details</th>
                  <th>Artists</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody> 
                {artistShows && artistShows.map((show) => {
                  if (show.activated === true) {
                    return (
                      <tr>
                        <td><button className="btn btn-primary" onClick={pushShow} id={show.id}>view</button></td>
                        <td>
                          <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {(() => {
                              if (!show.artists[0].bandName) {
                                return <div>{show.artists[0].firstName} {show.artists[0].lastName}</div>
                              } else {
                                return <div>{show.artists[0].bandName}</div>
                              }
                            })()}
                            
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {show.artists.map((artist) => {
                                return (
                                  
                                    <Dropdown.Item href="#/action-1">
                                        {(() => {
                                          if (!artist.bandName) {
                                            return (
                                              <Link to={"/artist/" + artist.id}>
                                                {artist.firstName} {artist.lastName}
                                              </Link>
                                            )
                                          } else {
                                            return (
                                              <Link to={"/band/" + artist.id}>
                                                {artist.bandName}
                                              </Link>
                                            )
                                          }
                                        })()}                             
                                    </Dropdown.Item>
                                  
                                )
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{show.venueName}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </Table>
            <Table className="pending d-none" hover>
              <thead >
                <tr>
                  <th>Show Details</th>
                  <th>Artists</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {artistShows && artistShows.map((show) => {
                  if (!show.activated || show.activated === false) {
                    return (
                      <tr>
                        <td><button className="btn btn-primary" onClick={pushShow} id={show.id}>view</button></td>
                        <td>
                          <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {(() => {
                              if (!show.artists[0].bandName) {
                                return <div className="text-center">{show.artists[0].firstName} {show.artists[0].lastName}</div>
                              } else {
                                return <div>{show.artists[0].bandName}</div>
                              }
                            })()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {show.artists.map((artist) => {
                                return (
                                  
                                    <Dropdown.Item href="#/action-1">
                                        {(() => {
                                          if (!artist.bandName) {
                                            return (
                                              <Link to={"/artist/" + artist.id}>
                                                {artist.firstName} {artist.lastName}
                                              </Link>
                                            )
                                          } else {
                                            return (
                                              <Link to={"/band/" + artist.id}>
                                                {artist.bandName}
                                              </Link>
                                            )
                                          }
                                        })()}                             
                                    </Dropdown.Item>
                                  
                                )
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{show.venueName}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </Table>
            <br/>
            {users && users.map((user) => {
              if (user.id === id) {
                return (
                  <div className="ratings-container">
                    <h2>Venue Rating</h2>
                    <h1>{user.venueRating} Stars</h1>
                    {(() => {
                      if (!user.venueRaters || !user.venueRaters.includes(auth.uid)) { 
                        return (
                          <div className="skills ">
                            <h3> Rate {user.firstName} 1-5</h3>
                            <div className="rating">
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
                )
              }
            })}
            <br/>
            <br/>
            </div>
            <br/>
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