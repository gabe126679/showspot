import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { addToCart, updateRating, updateBandRating, updateBandSongVote, activateBandSong } from '../../store/actions/authActions'

function PublicArtist(props) {

    const { auth, users, bands } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const [newArray, setNewArray] = useState([]);
    const [bandRating, setBandRating] = useState(5);
    const [bandRatings, setBandRatings] = useState([]);
    const [raters, setRaters] = useState([]);

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

    const pushArtists = () => {
      navigate('/artists');
    }

    const pushBands = () => {
        navigate('/bands');
    }
  
    useEffect(() => {
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
              })
            }
          }
        })
      }

    })

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
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
                    <div>
                        <button className="btn btn-primary " onClick={pushArtists}>
                            Artists
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushBands}>
                            Bands
                        </button>
                        <br/>
                        <br/>
                        <p className="text-center border bg-warning text-white">{band.bandName}</p>
                    </div>
                    <br/>

                    <Table className="text-center" hover>
                      <thead >
                        <tr>
                          <th>Band Name</th>
                          <th>Members</th>
                          <th>Creator</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{band.bandName}</td>
                          <td>                      
                            <Dropdown >
                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                >
                                {band.members[0].firstName} {band.members[0].lastName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                {band.members.map((artist) => {
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
                          <td>{band.creatorUserName}</td>
                        </tr>
                      </tbody>
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
                    <p className="text-center border bg-warning text-white">songs</p>
                    <Table className="text-center" hover>
                      <thead >
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Add to Cart</th>
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
                                
                          
                          if (track.activated) {
                            
                            return (
                                <tbody>
                                  {users && users.map((user) => {
                                    if (user.id === auth.uid && user.cartItems && !user.cartItems.includes(track.song)  && band.activated === true) {
                                        console.log(user.id);
                                      return (
                                        <tr>
                                          <td>{track.title}</td>
                                          <td>{track.price}</td>
                                          {(() => {
  
                                            if (newArray.includes(track.song)) {
                                              return <td className=" text-center">song purchased</td>
                                            } else {
                                              return <td className=" text-center"><button className="btn btn-primary" onClick={addToCart} id={track.song}>+</button></td>                           
                                            }
                                          })()}
  
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
                                    } else if (user.id === auth.uid && !user.cartItems  && band.activated === true) {
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
                                                    <td>voted</td>
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
      bands: state.firestore.ordered.bands
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)), 
    updateRating: (raters, artistRating, artistRatings, artist) => dispatch(updateRating(raters, artistRating, artistRatings, artist)),
    updateBandRating: (raters, bandRating, bandRatings, band) => dispatch(updateBandRating(raters, bandRating, bandRatings, band)),
    updateBandSongVote: (band, songs) => dispatch(updateBandSongVote(band, songs)),
    activateBandSong: (band) => dispatch(activateBandSong(band))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
    {   collection: 'users' },
    {   collection: 'bands' }
]))(PublicArtist);