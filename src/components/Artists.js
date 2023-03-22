import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArtistProfile from './profiles/ArtistProfile'
import symbolOne from "../1.png";


function Artists(props) {
    const { auth, users, bands } = props;
  
    const navigate = useNavigate();
  
    const [artists, setArtists] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchCount, setSearchCount] = useState(1);
    const [active, setActive] = useState(true);
    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);



    const handleSignUp = () => {
        navigate('/artistSignup');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(artists);
        console.log(searches);
        console.log(searches.length);
        console.log(searchCount);
    }

    const handleChange = (e) => {
        e.preventDefault();
        let count = 0;
        const tempArtists = [];
        let searchedArtists = [];
        const searchQuery = e.target.value.split("");
        setSearchCount(searchQuery.length);
        let newArtists = [];
        
        if (e.target.value === "") {
            newArtists = [];
            users.map((user) => {
                if (user.firstName && !artists.includes(user)) {
                    artists.push(user);
                }
            })
            // bands.map((band) => {
            //     if (band.ids.includes(auth.uid)) {
            //         bands.push(band);
            //     }
            // })
            setSearchCount(0)
            
        } else {
            users.map((user) => {
                if (user.isArtist) {
                    tempArtists.push(user);
                    
                    const artistQuery = user.firstName.split("");
                    count = searchQuery.length;
                    const userFullName = artistQuery.join("").slice(0, count);
                    const uppercaseSearchQuery = searchQuery.join("").toUpperCase();
                    console.log(userFullName.toUpperCase() === uppercaseSearchQuery);

                    if (userFullName.toUpperCase() === uppercaseSearchQuery) {                       
                        newArtists.push(user);
                        searchedArtists.push(user);
                    } 
                }
            })
            
            tempArtists.map((artist) => {
                if (!searchedArtists.includes(artist)) {
                    newArtists.push(artist);
                }
            })
            setArtists([]);
            const newArrivals = newArtists.sort((a, b) => {
                return a.firstName - b.firstName; 
              })
            setSearches(newArrivals);
        }

    }

    const toggleStatus = (e) => {
        e.preventDefault();
        const artistbtn = document.querySelector(".artists");
        const bandbtn = document.querySelector(".bands");
        const songbtn = document.querySelector(".songs");
        const tableSearch = document.querySelector(".table-search");
        const bandsSearch = document.querySelector(".bands-search");
        const songSearch = document.querySelector(".songs-search");
        if (e.target.id === "artists") {
            bandbtn.classList.add("btn-warning");
            bandbtn.classList.remove("btn-primary");
            songbtn.classList.add("btn-warning");
            songbtn.classList.remove("btn-primary");
            artistbtn.classList.add("btn-primary");
            artistbtn.classList.remove("btn-warning");
            tableSearch.classList.remove("d-none");
            bandsSearch.classList.add("d-none");
            songSearch.classList.add("d-none");
            setActive(true);
        } else if (e.target.id === "bands") {
            bandbtn.classList.add("btn-primary");
            bandbtn.classList.remove("btn-warning");
            songbtn.classList.add("btn-warning");
            songbtn.classList.remove("btn-primary");
            artistbtn.classList.add("btn-warning");
            artistbtn.classList.remove("btn-primary");
            tableSearch.classList.add("d-none");
            bandsSearch.classList.remove("d-none");
            songSearch.classList.add("d-none");
            setActive(false);
        } else if (e.target.id === "songs") {
            songbtn.classList.add("btn-primary");
            songbtn.classList.remove("btn-warning");
            bandbtn.classList.add("btn-warning");
            bandbtn.classList.remove("btn-primary");
            artistbtn.classList.add("btn-warning");
            artistbtn.classList.remove("btn-primary");
            tableSearch.classList.add("d-none");
            bandsSearch.classList.add("d-none");
            songSearch.classList.remove("d-none");
            setActive(false);
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
              if (user.songs) {
                  user.songs.map((song) => {
                      if (!songs.includes(song)) {
                          songs.push(song);
                      }
                  })
              }
          })
          users.map((user) => {
            if (user.firstName && !artists.includes(user)) {
                artists.push(user);
                console.log(user);
            }
          })
      }

    });

    
    if (users) {

        return (
            <div>
                <div >  
                    <Form className="artist-search-form" onSubmit={handleSubmit}>
                        <Form.Group className="text-center artist-search-field mb-3" controlId="second" onChange={handleChange}>


                            <Form.Control className="text-center artist-search-input" type="text" placeholder="Search Artists"
                            
                            />

                        </Form.Group>
                        
                    </Form>
                    

                    <br/>

                        {(() => {
                            users.map((user) => {
                                if (user.firstName && !artists.includes(user)) {
                                    artists.push(user);
                                }
                            })
                        })()}

                        {artists.sort((a, b) => {
                            if (a.firstName < b.firstName) return -1;
                            return 1;
                        }
                        ).map((artist) =>  {
                            
                            return (
                                <div className="ticket-border">
                                    <div className=" card-container">
                                        <div className="card">
                                        <div className="card-header">
                                            <h2 className="username">{artist.firstName} {artist.lastName}</h2>
                                        </div>
                                        <img src={symbolOne} alt="Post" className="card-img" onClick={() => {
                                            navigate("/artist/" + artist.id)
                                        }} />
                                        
                                            <div className="description-dropdown">
                                                    {(() => {
                                                        if (artist.averageRating) {
                                                                
                                                                return <div className="description-text">{artist.averageRating}</div>

                                                        } else if (!artist.averageRating) {
                                                                
                                                                return <div className="description-text">5.0</div>
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (artist.averageRating && artist.raters && !artist.raters.includes(auth.uid)) {
                                                                
                                                                return <button className="btn btn-primary description-arrow" onClick={() => {   
                                                                        props.updateVote(auth.uid, artist.id); }} id={artist.id}>vote</button>

                                                        } else if (artist.averageRating && artist.raters && artist.raters.includes(auth.uid)) {
                                                                
                                                                return <p className="description-arrow">voted</p>
                                                                
                                                        } else {
                                                                
                                                                return <button className="description-arrow" onClick={() => {   
                                                                    props.updateVote(auth.uid, artist.id); }} id={artist.id}>vote
                                                                    </button>
                                                        } 
                                                    })()}
                                            </div>
                                        <div className="dropdown-container">
                                        <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                                            Artist Info
                                        </button>
                                        {showDropdown && (
                                            <div className="dropdown-content">
                                                    <div className="description-dropdown dropdown-link">                       
                                                        <Link className="description-text" to={"/artist/" + artist.id}>
                                                        {artist.firstName} {artist.lastName}
                                                        
                                                        </Link>
                                                        <p className="description-arrow">{artist.mainInstrument}</p>
                                                    
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
)(Artists);