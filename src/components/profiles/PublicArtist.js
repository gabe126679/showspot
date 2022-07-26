import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { addToCart, updateRating } from '../../store/actions/authActions'

function PublicArtist(props) {

    const { auth, users } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const [newArray, setNewArray] = useState([]);
    const [artistRating, setArtistRating] = useState(5);
    const [artistRatings, setArtistRatings] = useState([]);
    const [raters, setRaters] = useState([]);

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
                    <div>
                        <button className="btn btn-primary " onClick={pushArtists}>
                            Artists
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushBands}>
                            Bands
                        </button>
                        <br/>
                        <br/>
                        <p className="text-center border bg-warning text-white">{user.firstName} {user.lastName}</p>
                    </div>
                    <br/>

                    <Table className="text-center" hover>
                      <thead >
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Main Instrument</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.mainInstrument}</td>
                        </tr>
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
                    <p className="text-center border bg-warning text-white">songs:</p>
                    <Table className="text-center" hover>
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
      users: state.firestore.ordered.users
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
    firestoreConnect([{
      collection: 'users'
    }])
  )(PublicArtist);