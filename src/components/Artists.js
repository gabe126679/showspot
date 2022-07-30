import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArtistProfile from './profiles/ArtistProfile'

function Artists(props) {
    const { auth, users, bands } = props;
  
    const navigate = useNavigate();
  
    const [artists, setArtists] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchCount, setSearchCount] = useState(1);
    const [active, setActive] = useState(true);
    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState([]);

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
                            <div>
                            <button className="artist-profile btn btn-warning" onClick={pushProfile}>artist profile</button>
                            <button className="artists btn btn-primary" onClick={toggleStatus} id="artists">all artists</button>
                            <button className="bands btn btn-warning" onClick={toggleStatus} id="bands">all bands</button>
                            <button className="songs btn btn-warning" onClick={toggleStatus} id="songs">all songs</button>
                            </div>
                        </div>
                        <br/>
                        <Form className="artist-search-form" onSubmit={handleSubmit}>
                            <Form.Group className="artist-search-field mb-3" controlId="second" onChange={handleChange}>

                                <Form.Control type="text" placeholder="Search artists"
                                
                                />

                            </Form.Group>
                            <br/>
                            <Button type="submit">search</Button>
                        </Form>
                        <br/>
                    <Table className="table-search" hover>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Main Instrument</th>
                        </tr>
                        </thead>
                    {(() => {

                        users.map((user) => {
                            if (user.firstName && !artists.includes(user) && searches.length === 0) {
                                artists.push(user);
                            }
                        })
                       
                    })()}
                    
                        {artists.sort((a, b) => {
                            if (a.firstName < b.firstName) return -1;
                            return 1;
                        }
                        ).map((artist) => {
                            if (searches.length === 0) {
                                return (
                                    <tbody className="table-search" >
                                        <tr onClick={() => {
                                            navigate("/artist/" + artist.id);
                                        }}>
                                            <td  >                      
                                            {artist.firstName}
                                            </td>
        
                                            <td onClick={pushProfile}>{artist.lastName}</td>
                                            <td>{artist.mainInstrument}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })}
                        {searches.map((artist) => {
                            
                            return (
                                <tbody  >
                                    <tr onClick={() => {
                                        navigate('/artist/' + artist.id)
                                    }}>
                                        <td >                      
                                        {artist.firstNAme}
                                        </td>
                                        <td onClick={pushProfile}>{artist.lastName}</td>
                                        <td>{artist.mainInstrument}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                    <Table className="bands-search d-none" hover>
                        <thead>
                        <tr>
                            <th>Band Name</th>
                            <th>Members</th>
                            <th>Creator</th>
                        </tr>
                        </thead>
                        {bands && bands.map((band) => {                         
                            return ( 
                                <tbody  >
                                    
                                <tr>
                                    <td id={band.id} onClick={pushBand}>{band.bandName}</td>
                                    
                                    <td>                      
                                    <Dropdown >
                                        <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                        >
                                        {band.members[0].firstName} {band.members[0].lastName}
                                        </Dropdown.Toggle> 

                                                <Dropdown.Menu>
                                                    {band.members.map((member) => {
                                                    return (
                                                        <Dropdown.Item href="#/action-1">  
                                                    
                                                            <Link to={"/artist/" + member.id}>
                                                                {member.firstName} {member.lastName}
                                                            </Link>
                                                        
                                                        </Dropdown.Item>
                                                        )
                                                    })}                                       
                                                </Dropdown.Menu>  

                                    </Dropdown>
                                    </td>
                                    {(() => {
                                        if (band.activated === true) {
                                            return <td>active</td>
                                        } else if (!band.actived || band.activated === false) {
                                            return <td>pending</td>
                                        }
                                    })()}
                                    
                                </tr>
                                    
                                </tbody>
                            
                            ) 
                            
                        })}
                    </Table>
                    <Table className="songs-search d-none" hover>
                        <thead>
                        <tr>
                            <th>Song Title</th>
                            <th>Artist</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                                <tbody  >
                                    <tr>
                                        <td>hi</td>
                                        <td>hi</td>
                                        <td>hi</td>
                                    </tr>
                                </tbody>
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