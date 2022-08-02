import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { addToCart, updateRating } from '../../store/actions/authActions'

function PublicArtist(props) {

    const { auth, users, bands } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const [newArray, setNewArray] = useState([]);
    const [artistRating, setArtistRating] = useState(5);
    const [artistRatings, setArtistRatings] = useState([]);
    const [raters, setRaters] = useState([]);
    const [active, setActive] = useState(true);

    const toggleStatus = (e) => {
      e.preventDefault();
      const songBtn = document.querySelector(".artist-songs-btn");
      const bandBtn = document.querySelector(".artist-bands-btn");
      const songs = document.querySelector(".artist-songs");
      const bands = document.querySelector(".artist-bands");
      if (e.target.id === "artist-songs-btn") {
        songBtn.classList.add("btn-primary");
        songBtn.classList.remove("btn-warning");
        bandBtn.classList.add("btn-warning");
        bandBtn.classList.remove("btn-primary");
        bands.classList.add("d-none");
        songs.classList.remove("d-none");
        setActive(false);
      } else if (e.target.id === "artist-bands-btn") {
        bandBtn.classList.add("btn-primary");
        bandBtn.classList.remove("btn-warning");
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        bands.classList.remove("d-none");
        songs.classList.add("d-none");
        setActive(true);
      } 
    }

    const handleChange = (e) => {
      raters.push(auth.uid);
      users.map((user) => {
        if (user.id === id && user.raters) {
          user.raters.map((rater) => {
            raters.push(rater);
          })
        }
        if (user.id === id && user.ratings) {
          user.ratings.map((rate) => {
            artistRatings.push(rate);
          })
        }
      })
      let average = 0;
      artistRatings.push(parseInt(e.target.value));
      
      artistRatings.forEach((rating) => {
        average = average + rating
      })
      const averageRating = average / (artistRatings.length)
      setArtistRating(averageRating);
      console.log(average);
      console.log(artistRating);
      console.log(average / artistRatings.length);
      props.updateRating(raters, averageRating.toFixed(2), artistRatings, id);
    }

    const addToCart = (e) => {
      e.preventDefault();
      
      users.map((user) => {
        if (user.id === id) {
          user.songs.map((song) => {
            if (song.song === e.target.id) {
              props.addToCart(song.song);
            }
          })
        }
      })
      // const button = document.querySelector(".addToCart");
      // button.style.display = "none";
      console.log(e.target.id);
      console.log(...newArray);
    }

    const pushArtists = () => {
      navigate('/artists');
    }

    const pushBands = () => {
        navigate('/bands');
    }

    const pushProfile = () => {
      navigate('/artistProfile');
    }
  
    useEffect(() => {
      if (users) {
        users.map((secondUser) => {
          if (secondUser.id === id) {
            if (secondUser.songs) {
              secondUser.songs.map((song) => {
                if (secondUser.id === auth.uid) {
                  if (secondUser.purchasedSongs) {
                    secondUser.purchasedSongs.map((item) => {
                      if (item.song === song.song && newArray && !newArray.includes(item.song)) {
                        newArray.push(item.song);
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
          {users && users.map((user) => {
              if (user.id === id) {
                return (
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
                            <button className="artist-profile btn btn-warning" onClick={pushProfile}>my artist profile</button>
                            <button className="artist-songs-btn btn btn-primary" onClick={toggleStatus} id="artist-songs-btn">artist songs</button>
                            <button className="artist-bands-btn btn btn-warning" onClick={toggleStatus} id="artist-bands-btn">artist bands</button>
                            <button className="artists btn btn-warning" onClick={pushArtists} >all artists</button>
                        </div>
                    </div>
                    <br/>
                    <Table className="artist-songs text-center" hover>
                      <thead >
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Add to Cart</th>
                        </tr>
                      </thead>
                      {user.songs && user.songs.map((track) => {         
                        
                          users.map((secondUser) => {
                            if (secondUser.id === id) {
                              secondUser.songs.map((song) => {
                                users.map((thirdUser) => {
                                  if (thirdUser.id === auth.uid) {
                                    if (thirdUser.purchasedSongs) {
                                      thirdUser.purchasedSongs.map((item) => {
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
                                
                          if (!user.cartItems.includes(track.song)) {

                            return (
                              <tbody>
                                {users && users.map((secondUser) => {
                                  if (secondUser.id === auth.uid && secondUser.cartItems && !secondUser.cartItems.includes(track.song)) {
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
                                  } else if (secondUser.id === auth.uid && secondUser.cartItems && secondUser.cartItems.includes(track.song)) {
                                    return (
                                      <tr>
                                        <td>{track.title}</td>
                                        <td>{track.price}</td>
                                        <td className=" text-center">song in cart</td>
                                      </tr>
                                    )
                                  } else if (secondUser.id === auth.uid && !secondUser.cartItems) {
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
                          } else if (user.id === auth.uid) {
                            
                            return (
                              <tbody>


                              </tbody>
                            )                            
                          }               
                      })}
                    </Table>
                    <Table className="artist-bands d-none text-center" hover>
                      <thead >
                        <tr>
                          <th>Band Name</th>
                          <th>Artists</th>
                          <th>Band Details</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bands && bands.map((band) => {
                          if (band.ids.includes(id)) {
                            return (
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
                                <td><button className="btn btn-primary">view</button></td>
                              </tr> 
                            )
                          }
                        })}
                      </tbody>
                    </Table>
                    <br/>

                    <div className="ratings-container bg-primary">
                      <h2 className="text-warning">Artist Rating</h2>
                      <h1 className="text-warning">{user.averageRating} Stars</h1>
                      {(() => {
                        if (!user.raters || !user.raters.includes(auth.uid)) { 
                          return (
                            <div className="skills bg-info">
                              <h3> Rate {user.firstName}</h3>
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
    updateRating: (raters, artistRating, artistRatings, artist) => dispatch(updateRating(raters, artistRating, artistRatings, artist))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {  collection: 'users' },
      {  collection: 'bands' }
    ])
  )(PublicArtist);