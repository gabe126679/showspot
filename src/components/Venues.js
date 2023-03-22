import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArtistProfile from './profiles/ArtistProfile'
import symbolOne from "../1.png";


function Venues(props) {
    const { auth, users, bands } = props;
  
    const navigate = useNavigate();
  
    const [venues, setVenues] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchCount, setSearchCount] = useState(1);
    const [active, setActive] = useState(true);
    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState([]);
    const [venueDropdown, setVenueDropdown] = useState(false);



    const handleSignUp = () => {
        navigate('/venueSignup');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(venues);
        console.log(searches);
        console.log(searches.length);
        console.log(searchCount);
    }

    const handleChange = (e) => {
        e.preventDefault();
        let count = 0;
        const tempVenues = [];
        let searchedVenues = [];
        const searchQuery = e.target.value.split("");
        setSearchCount(searchQuery.length);
        let newVenues = [];
        
        if (e.target.value === "") {
            newVenues = [];
            users.map((user) => {
                if (user.venueName && !venues.includes(user)) {
                    venues.push(user);
                }
            })
            setSearchCount(0)
            
        } else {
            users.map((user) => {
                if (user.isVenue) {
                    tempVenues.push(user);
                    
                    const venueQuery = user.venueName.split("");
                    count = searchQuery.length;
                    const userFullName = venueQuery.join("").slice(0, count);
                    const uppercaseSearchQuery = searchQuery.join("").toUpperCase();
                    console.log(userFullName.toUpperCase() === uppercaseSearchQuery);

                    if (userFullName.toUpperCase() === uppercaseSearchQuery) {                       
                        newVenues.push(user);
                        searchedVenues.push(user);
                    } 
                }
            })
            
            tempVenues.map((venue) => {
                if (!searchedVenues.includes(venue)) {
                    newVenues.push(venue);
                }
            })
            setVenues([]);
            const newArrivals = newVenues.sort((a, b) => {
                return a.venueName - b.venueName; 
              })
            setSearches(newArrivals);
        }

    }

    const pushProfile = () => {
        navigate('/artistProfile');
    }

    const pushVenue = () => {
        navigate('/venueProfile');
    }

    const pushBands = () => {
        navigate('/bands');
    }
    
    const pushBand = (e) => {
        e.preventDefault();
        navigate('/band/' + e.target.id);
    }
  
    useEffect(() => {
      if (!auth.uid) {
          navigate("/spotterLogin");
      }
      if (users) {
          users.map((user) => {
            if (user.isVenue === true && !venues.includes(user)) {
                venues.push(user);                
            }
          })
      }
      
    }, []);

    
    if (users) {

        return (
            <div>
                <div >  
                    <Form className="artist-search-form" onSubmit={handleSubmit}>
                        <Form.Group className="text-center artist-search-field mb-3" controlId="second" onChange={handleChange}>


                            <Form.Control className="text-center artist-search-input" type="text" placeholder="Search Venues"
                            
                            />

                        </Form.Group>
                        
                    </Form>
                    

                    <br/>

                        {(() => {
                            users.map((user) => {
                                if (user.isVenue === true && !venues.includes(user)) {
                                    venues.push(user);
                                    
                                }
                            })
                        })()}

                        
                        {venues && venues.map((venue) =>  {
                            
                            return (
                                <div className="ticket-border">
                                    <div className=" card-container">
                                        <div className="card">
                                        <div className="card-header">
                                            <h2 className="username">{venue.venueName}</h2>
                                        </div>
                                        <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                                            navigate("/venue/" + venue.id)
                                        }} />
                                        
                                            <div className="description-dropdown">
                                                    {(() => {
                                                        if (venue.averageRating) {
                                                                
                                                                return <div className="description-text">{venue.averageRating} *</div>

                                                        } else if (!venue.averageRating) {
                                                                
                                                                return <div className="description-text">5.0 *</div>
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (venue.averageRating && venue.raters && !venue.raters.includes(auth.uid)) {
                                                                
                                                                return <button className="btn btn-primary description-arrow" onClick={() => {   
                                                                        props.updateVote(auth.uid, venue.id); }} id={venue.id}>vote</button>

                                                        } else if (venue.averageRating && venue.raters && venue.raters.includes(auth.uid)) {
                                                                
                                                                return <p className="description-arrow">voted</p>
                                                                
                                                        } else {
                                                                
                                                                return <button className="description-arrow" onClick={() => {   
                                                                    props.updateVote(auth.uid, venue.id); }} id={venue.id}>vote
                                                                    </button>
                                                        } 
                                                    })()}
                                            </div>
                                        <div className="dropdown-container">
                                        <button className="dropdown-button" onClick={() => setVenueDropdown(!venueDropdown)}>
                                            Venue Info
                                        </button>
                                        {venueDropdown && (
                                            <div className="dropdown-content">
                                                    <div className="description-dropdown dropdown-link">                       
                                                        <Link className="description-text" to={"/venue/" + venue.id}>
                                                        {venue.venueName}
                                                        
                                                        </Link>
                                                        <p className="description-arrow">{venue.firstName} {venue.lastName}</p>
                                                    
                                                    </div>

                                            </div>
                                            
                                        )}

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )  
                        })}
                    <br/>
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
    bands: state.firestore.ordered.bands
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {   collection: 'users'  },
    {   collection: 'bands'  }
])
)(Venues);