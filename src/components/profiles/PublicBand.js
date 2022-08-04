import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { addToCart, updateRating, updateBandRating, updateBandSongVote, activateBandSong } from '../../store/actions/authActions'

function PublicArtist(props) {

    const { auth, users, bands, shows } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const [newArray, setNewArray] = useState([]);
    const [bandRating, setBandRating] = useState(5);
    const [bandRatings, setBandRatings] = useState([]);
    const [raters, setRaters] = useState([]);
    const [active, setActive] = useState(true);
    const [artistShows, setArtistShows] = useState([]);

    const toggleStatus = (e) => {
        e.preventDefault();
        shows.map((show) => {
            show.artists.map((artist) => {
                if (artist.bandName && !artistShows.includes(show)) {
                    artistShows.push(show);
                }
            })                  
        })
        const songBtn = document.querySelector(".band-songs-btn");
        const bandBtn = document.querySelector(".band-shows-btn");
        const bandSongs = document.querySelector(".band-songs");
        const bandShows = document.querySelector(".band-shows");
        if (e.target.id === "band-songs-btn") {
          songBtn.classList.add("btn-primary");
          songBtn.classList.remove("btn-warning");
          bandBtn.classList.add("btn-warning");
          bandBtn.classList.remove("btn-primary");
          bandShows.classList.add("d-none");
          bandSongs.classList.remove("d-none");
          setActive(false);
        } else if (e.target.id === "band-shows-btn") {
          bandBtn.classList.add("btn-primary");
          bandBtn.classList.remove("btn-warning");
          songBtn.classList.add("btn-warning");
          songBtn.classList.remove("btn-primary");
          bandShows.classList.remove("d-none");
          bandSongs.classList.add("d-none");
          setActive(true);
        } 
    }

    const handleChange = (e) => {
      raters.push(auth.uid);
      bands.map((band) => {
        if (band.id === id && band.raters) {
          band.raters.map((rater) => {
            raters.push(rater);
          })
        }
        if (band.id === id && band.ratings) {
          band.ratings.map((rate) => {
            bandRatings.push(rate);
          })
        }
      })
      let average = 0;
      bandRatings.push(parseInt(e.target.value));
      
      bandRatings.forEach((rating) => {
        average = average + rating
      })
      const averageRating = average / (bandRatings.length)
      setBandRating(averageRating);
      props.updateBandRating(raters, averageRating.toFixed(2), bandRatings, id);
    }

    const addToCart = (e) => {
      e.preventDefault();
      
      bands.map((band) => {
        if (band.id === id) {
          band.songs.map((song) => {
            if (song.song === e.target.id) {
              props.addToCart(song.song);
            }
          })
        }
      })
    }

    const pushBandProfile = (e) => {
        e.preventDefault();
        navigate('/bandProfile/' + id);
    }

    const pushArtists = () => {
      navigate('/artists');
    }

    const pushBands = () => {
        navigate('/bands');
    }

    const pushShow = (e) => {
        e.preventDefault();
        navigate('/tickets/' + e.target.id);
    }
  
    useEffect(() => {
    let activatedSongs = []
      if (bands) {
        bands.map((band) => {
          if (band.id === id) {

            if (band.songs) {
              band.songs.map((song) => {
                if (band.ids.includes(auth.uid)) {
                    if (users) {
                        users.map((user) => {
                            if (user.id === auth.uid && user.purchasedSongs) {
                                user.purchasedSongs.map((item) => {
                                  if (item.song === song.song && newArray && !newArray.includes(item.song)) {
                                    newArray.push(item.song);
                                  }
                                })
                              }
                        })
                    }
                }
                if (band.ids.length === song.voters.length && song.activated !== true) {
                    
                    const activatedSong = {
                        id: song.id,
                        price: song.price,
                        title: song.title,
                        voters: song.voters,
                        song: song.song,
                        activated: true
                    }
                    activatedSongs.push(activatedSong);
                } else {
                    activatedSongs.push(song);
                }
              })
            }
            props.activateBandSong(band.id, activatedSongs);
          }
        })
      }
      
      if (shows) {
        shows && shows.map((show) => {
            show.artists.map((artist) => {
                if (artist.bandName && !artistShows.includes(show)) {
                    artistShows.push(show);
                }
            })                  
        })
      }

    })

    if (!auth.uid) return navigate('/artistSignup');

    if (users && shows) {
      return (
          <div>
            
          <br/>
          <br/>
          <br/>
          <br/>
          {bands && bands.map((band) => {
              if (band.id === id) {
                return (
                  <div className="profile-border">
                    <br/>
                    <br/>   
                    <div className="text-center">
                    <h4>{band.bandName}</h4>    
                        <br/>
                        <div  className="tab-border">
                            <button className="artist-profile btn btn-warning" onClick={pushBandProfile}>band profile</button>
                            <button className="band-songs-btn btn btn-primary" onClick={toggleStatus} id="band-songs-btn">band songs</button>
                            <button className="band-shows-btn btn btn-warning" onClick={toggleStatus} id="band-shows-btn">band shows</button>
                            <button className="artists btn btn-warning" onClick={pushArtists} >all artists</button>
                        </div>
                    </div>
                    <br/>

                    <Table className="band-shows d-none text-center" hover>
                      <thead >
                        <tr>
                          <th>Show Details</th>
                          <th>Artists</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                        {artistShows && artistShows.map((show) => {
                            if (active === true) {
                                return (
                                    <tbody>
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
                                                        <Link to={"/artist/" + artist.id}>
                                                            {artist.firstName} {artist.lastName}
                                                        </Link>
                                                    </Dropdown.Item>
                                                )
                                            })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </td>
                                        <td>
                                        {(() => {
                                            if (!show.activated || show.activated !== true) {
                                                return <div>pending</div>
                                            } else {
                                                return <div>active</div>
                                            }
                                        })()}
                                        </td>
                                    </tr>  
                                    </tbody>
                                )
                            }
                        })}
                    </Table>
                    <Table className="band-songs text-center" hover>
                      <thead >
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {band.songs && band.songs.map((track) => {         
                        
                          bands.map((band) => {
                            if (band.id === id) {
                              band.songs.map((song) => {
                                users.map((user) => {
                                  if (user.id === auth.uid) {
                                    if (user.purchasedSongs) {
                                      user.purchasedSongs.map((item) => {
                                        if (item.song === song.song && !newArray.includes(item.song)) {
                                          setNewArray([...newArray, item.song]);
                                        }
                                      })
                                    }
                                  }
                                })
                              })
                            }
                          }) 
                                
                          
                          if (track.activated === true) {
                            
                            return (
                                <tbody>
                                  {users && users.map((user) => {
                                    if (user.id === auth.uid && user.cartItems && !user.cartItems.includes(track.song) && !user.purchasedSongs.includes(track.song)  && band.activated === true) {
                                        
                                      return (
                                        <tr>
                                          <td>{track.title}</td>
                                          <td>{track.price}</td>
                                          <td className=" text-center"><button className="btn btn-primary" onClick={addToCart} id={track.song}>+</button></td> 
                                        </tr>
                                      )
                                    } else if (user.id === auth.uid && user.cartItems && user.cartItems.includes(track.song) && band.activated === true) {
                                      return (
                                        <tr>
                                          <td>{track.title}</td>
                                          <td>{track.price}</td>
                                          <td className=" text-center">song in cart</td>
                                        </tr>
                                      )
                                    } else if (user.id === auth.uid && !user.cartItems && !user.purchasedSongs.includes(track.song) && band.activated === true ) {
                                      return (
                                        <tr>
                                          <td>{track.title}</td>
                                          <td>{track.price}</td>
                                          <td className=" text-center"><button className="btn btn-primary" onClick={addToCart} id={track.song}>+</button></td> 
                                        </tr>
                                      )
                                    } 
                                  })}
                                </tbody>
                              )
                          } else if (!track.activated || track.activated === false)
                            
                            return (
                                <tbody>
                                    {users && users.map((user) => {
                                        if (user.id === auth.uid && band.ids.includes(auth.uid) && track.voters && track.voters.includes(auth.uid)) {
                                            return (
                                                <tr>
                                                    <td>{track.title}</td>
                                                    <td>{track.price}</td>
                                                    <td>
                                                        <Dropdown >
                                                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                                            >
                                                            voters
                                                            </Dropdown.Toggle>
                    
                                                            <Dropdown.Menu>
                                                            {track.voters.map((artist) => {
                                                                return (
                                                                    <Dropdown.Item href="#/action-1">  
                                                                        {users && users.map((user) => {
                                                                            if (user.id === artist) {
                                                                                return (
                                                                                    <Link to={"/artist/" + artist}>
                                                                                        {user.firstName} {user.lastName}
                                                                                    </Link>
                                                                                )
                                                                            }
                                                                        })}                         
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (user.id === auth.uid && band.ids.includes(auth.uid) && track.voters && !track.voters.includes(auth.uid)) {
                                            return (
                                                <tr>
                                                    <td>{track.title}</td>
                                                    <td>{track.price}</td>
                                                    <td><button className="btn btn-primary" onClick={() => {
                                                        let voterArray = [auth.uid];
                                                        track.voters.map((voter) => {
                                                            voterArray.push(voter);                                                            
                                                        })
                                                        const trackObject = {
                                                            id: track.id,
                                                            price: track.price,
                                                            song: track.song,
                                                            title: track.title,
                                                            voters: voterArray
                                                        }
                                                        let songsArray = [trackObject];
                                                        band.songs.map((song) => {
                                                            if (song !== track) {
                                                                songsArray.push(song);   
                                                            }
                                                        })
                                                      
                                                        props.updateBandSongVote(band.id, songsArray);
                                                        if (band.ids.length === track.voters.length) {
                                                            props.activateBandSong(band.id, true);
                                                        }
                                                        if (band.activated === true && band.ids.length > track.voters.length) {
                                                            props.activateBandSong(band.id, false);
                                                        }
                                                        
                                                    }}>vote</button></td>
                                                </tr>
                                            )
                                        } else if (user.id === auth.uid && !band.ids.includes(auth.uid) && (!band.activated || band.activated === false)) {
                                            return (
                                                <tr>
                                                    <td>{track.title}</td>
                                                    <td>{track.price}</td>
                                                    <td>pending</td>
                                                </tr>
                                            )
                                        } else if (user.id === auth.uid && !band.ids.includes(auth.uid) && (!band.activated || band.activated === true)) {
                                            return (
                                                <tr>
                                                    <td>{track.title}</td>
                                                    <td>{track.price}</td>
                                                    <td>add to cart</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            )
                                    
                      })}
                    </Table>
                    <br/>

                    <div className="ratings-container bg-primary">
                      <h2 className="text-warning">Band Rating</h2>
                      <h1 className="text-warning">{band.averageRating} Stars</h1>
                      {(() => {
                          
                        if (!band.raters || !band.raters.includes(auth.uid)) { 
                            
                          return (
                            <div className="skills bg-info">
                              <h3> Rate band </h3>
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
                    <br/>
                    <br/>
                  </div>
              ) 
              }
              
            })}
          <br/>
          <br/>
          <br/>
            {/* <button onClick={handleClick}>hi</button> */}
          </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      bands: state.firestore.ordered.bands,
      shows: state.firestore.ordered.shows
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)), 
    updateRating: (raters, artistRating, artistRatings, artist) => dispatch(updateRating(raters, artistRating, artistRatings, artist)),
    updateBandRating: (raters, bandRating, bandRatings, band) => dispatch(updateBandRating(raters, bandRating, bandRatings, band)),
    updateBandSongVote: (band, songs) => dispatch(updateBandSongVote(band, songs)),
    activateBandSong: (band, decision) => dispatch(activateBandSong(band, decision))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
    {   collection: 'users' },
    {   collection: 'bands' }, 
    {   collection: 'shows' }
]))(PublicArtist);