import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArtistProfile from './profiles/ArtistProfile'

function Artists(props) {
    const { auth, users } = props;
  
    const navigate = useNavigate();
  
    const [artists, setArtists] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchCount, setSearchCount] = useState(1);

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

    const pushProfile = () => {
        navigate('/artistProfile');
    }

    const pushBands = () => {
        navigate('/bands');
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
        <br/>
        <br/>
        <br/>
        <br/>

            <div className="profile-border">
                    <br/>
                        {users && users.map((user) => {
                            
                            if (user.id === auth.uid && user.isArtist === true) {
                                
                                return (
                                    <div>
                                        <button className="btn btn-primary" onClick={pushProfile}>
                                            My Profile
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushBands}>
                                            Bands
                                        </button>
                                    </div>
                                )
                            } else if (user.id === auth.uid) {
                                return (
                                    <div>
                                        <button className="btn btn-primary" onClick={handleSignUp}>
                                            Become an Artist
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushBands}>
                                            Bands
                                        </button>
                                    </div>

                                )
                            }
                        })}
                        <br/>
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
                        <p className="text-center border bg-warning text-white">active artists:</p>
                        
                    <br/>
                    <Table hover>
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
                                <tbody >
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
                            <tbody >
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
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'users'
  }])
)(Artists);